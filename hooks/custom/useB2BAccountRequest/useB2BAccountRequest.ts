import { useEffect, useRef, useState } from 'react'

import builder from '@builder.io/react'

import { useCreateCustomerB2bAccountMutation } from '@/hooks/mutations/b2b/accountHierarchy/useCreateCustomerB2bAccount/useCreateCustomerB2bAccount'
import { buildCreateCustomerB2bAccountParams } from '@/lib/helpers/buildCreateCustomerB2bAccountParams'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

export interface B2BAccountRequestCallbacks {
  onExistingUser: () => void
  onSuccess: () => void
  onError: (error: unknown) => void
}

const B2B_ACCOUNT_MAPPING_ENTITY_LIST = 'B2BAccountMapping@fortis'

const postJson = async (url: string, body: unknown) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return response.json()
}

const extractDomain = (email: string) => {
  const atIndex = email.indexOf('@')
  return atIndex !== -1 ? email.slice(atIndex + 1) : ''
}

export const useB2BAccountRequest = () => {
  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  const [googleReCaptcha, setGoogleReCaptcha] = useState<any>(null)
  const [pardotFormUrl, setPardotFormUrl] = useState('')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await builder.get('theme-setting').promise()
        setGoogleReCaptcha(settings?.data?.googleReCaptcha)
        setPardotFormUrl(settings?.data?.pardotFormHandlerUrl)
      } finally {
        setIsReady(true)
      }
    }
    fetchSettings()
  }, [])

  const validateReCaptcha = async () => {
    if (!googleReCaptcha?.reCaptchAccountCreation) return null
    if (typeof grecaptcha === 'undefined' || !grecaptcha.enterprise) return null

    const siteKey = googleReCaptcha?.accountCreationSiteKey || process.env.accountCreationSiteKey

    return new Promise<any>((resolve) => {
      grecaptcha.enterprise.ready(async () => {
        try {
          const responseKey = await grecaptcha.enterprise.execute(siteKey, { action: 'signup' })
          resolve(
            await postJson('/api/user/validate-recaptcha', {
              payLoad: { googleReCaptcha, responseKey },
            })
          )
        } catch {
          resolve(null)
        }
      })
    })
  }

  const finalizeAccount = async (accountId: number, entityResult: any) => {
    const purchaseOrderPayLoad = { accountId }

    const salesRepDetails = await postJson('/api/user/addSalesRep', { purchaseOrderPayLoad })
    if (salesRepDetails?.success !== true) return

    const activeAccountDetails = await postJson('/api/user/b2baccountActive', {
      purchaseOrderPayLoad,
    })
    if (activeAccountDetails?.success !== true) return

    if (pardotFormUrl) {
      const user = activeAccountDetails?.data?.users?.[0]
      await fetch(pardotFormUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'no-cors',
        body: new URLSearchParams({
          userFirstName: user?.firstName,
          userLastName: user?.lastName,
          companyName: activeAccountDetails?.data?.companyOrOrganization,
          userEmail: user?.emailAddress,
          customerID: user?.userId,
          accountID: activeAccountDetails?.data?.id,
          marketing_optin: user?.acceptsMarketing,
        }),
      }).catch(() => undefined)
    }

    const creditLine = entityResult?.entityDetails?.creditLine
    if (creditLine === 'true' || creditLine === true) {
      await postJson('/api/user/create-purchase-order', { purchaseOrderPayLoad })
    }
  }

  const submitAccountRequest = async (
    formValues: CreateCustomerB2bAccountParams,
    { onExistingUser, onSuccess, onError }: B2BAccountRequestCallbacks
  ) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      const emailAddress = formValues.emailAddress

      const userDetails = await postJson('/api/user/getAccountsByUser', { emailAddress })
      if (userDetails?.success === true) {
        onExistingUser()
        return
      }

      const entityResult = await postJson('/api/user/get-entity', {
        entityPayLoad: {
          entityListFullName: B2B_ACCOUNT_MAPPING_ENTITY_LIST,
          id: extractDomain(emailAddress),
        },
      })

      const reCaptchaResult = await validateReCaptcha()

      const variables = buildCreateCustomerB2bAccountParams(formValues)
      const createdAccount = await createCustomerB2bAccount.mutateAsync({
        ...variables,
        b2BAccountInput: {
          ...variables.b2BAccountInput,
          ...(entityResult?.entityDetails?.externalID && {
            externalId: entityResult.entityDetails.externalID,
          }),
          ...(reCaptchaResult?.success
            ? {
                attributes: [
                  {
                    fullyQualifiedName: 'tenant~recaptcha-score',
                    values: reCaptchaResult?.score,
                  },
                ],
              }
            : {}),
        },
      })

      if (!createdAccount?.id) throw new Error('B2B account was not created')

      await finalizeAccount(createdAccount.id, entityResult)
      onSuccess()
    } catch (error) {
      console.error('Account request error:', error)
      onError(error)
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return { submitAccountRequest, isSubmitting, isReady }
}
