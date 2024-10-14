import React, { useEffect, useState } from 'react'

import builder from '@builder.io/react'
import { Stack, Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { B2BAccountFormDialog } from '@/components/dialogs'
import { RegisterAccountDialog, ResetPasswordDialog } from '@/components/layout'
import LoginContent, { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useAuthContext } from '@/context'
import { useModalContext } from '@/context/ModalContext'
import { useCreateCustomerB2bAccountMutation } from '@/hooks'
import { buildCreateCustomerB2bAccountParams } from '@/lib/helpers'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

export interface LoginFooterProps {
  onRegisterNow: () => void
}

const StyledActionsComponent = styled(Stack)(() => ({
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 2%',
  marginBottom: '1.438rem',
  marginTop: '1.438rem',
}))

const LoginFooter = (props: LoginFooterProps) => {
  const { onRegisterNow } = props

  const { t } = useTranslation('common')

  return (
    <StyledActionsComponent>
      <Typography variant="h3" color={'primary'} pb={1}>
        {t('dont-have-an-account-yet')}
      </Typography>
      <Link component="button" variant="body1" color="text.primary" onClick={onRegisterNow}>
        {t('register-now')}
      </Link>
    </StyledActionsComponent>
  )
}

const LoginDialog = () => {
  const { t } = useTranslation('common')

  const { login } = useAuthContext()
  const { showModal, closeModal } = useModalContext()
  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()

  const onRegisterClick = () => {
    showModal({
      Component: B2BAccountFormDialog,
      props: {
        isAddingAccountToChild: false,
        isRequestAccount: true,
        primaryButtonText: t('create-account'),
        formTitle: t('b2b-account-request'),
        onSave: (formValues: CreateCustomerB2bAccountParams) => handleAccountRequest(formValues),
        onClose: () => closeModal(),
      },
    })
  }

  function extractDomain(email: string | string[]) {
    // Assuming email is a valid email address
    const atIndex = email.indexOf('@')
    if (atIndex !== -1) {
      return email.slice(atIndex + 1)
    }
    return '' // Handle invalid email format or other cases
  }

  const [googleReCaptcha, setGoogleReCaptcha] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await builder.get('theme-setting').promise()
      setGoogleReCaptcha(settings.data?.googleReCaptcha)
    }
    fetchSettings()
  }, [])

  const handleAccountRequest = async (formValues: CreateCustomerB2bAccountParams) => {
    const variables = buildCreateCustomerB2bAccountParams(formValues)
    if ((googleReCaptcha as any)?.reCaptchAccountCreation) {
      try {
        console.log('formValues', formValues)
        // Ensure grecaptcha is available and ready
        const siteKey = (googleReCaptcha as any)?.accountCreationSiteKey
          ? (googleReCaptcha as any)?.accountCreationSiteKey
          : process.env.siteKeySignup

        grecaptcha.enterprise.ready(async () => {
          const reCaptchaResponseCode = await grecaptcha.enterprise.execute(siteKey, {
            action: 'signup',
          })
          const payLoad = {
            googleReCaptcha: googleReCaptcha,
            responseKey: reCaptchaResponseCode,
          }

          const response = await fetch('/api/user/validate-recaptcha', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payLoad }),
          })

          const result = await response.json()
          console.log('result:', result)
          if (result?.success === true) {
            // Proceed with account creation API call here
            const emailDomain = extractDomain(formValues?.emailAddress)
            console.log('emailDomain', emailDomain)

            // await createCustomerB2bAccount.mutateAsync(variables)
            closeModal()
          } else {
            console.log('error model')
            // await createCustomerB2bAccount.mutateAsync(variables)
            closeModal()
          }
        })
      } catch (error) {
        console.error('Error handling account request:', error)
        await createCustomerB2bAccount.mutateAsync(variables)
      }
    } else {
      console.log('recapcha disabled')
      await createCustomerB2bAccount.mutateAsync(variables)
      // closeModal()
    }
  }

  const onForgotPassword = () => {
    showModal({ Component: ResetPasswordDialog })
  }

  const handleLogin = (params: LoginData) => {
    login(params, closeModal)
  }

  return (
    <KiboDialog
      Title={t('log-in')}
      Content={<LoginContent onLogin={handleLogin} onForgotPasswordClick={onForgotPassword} />}
      Actions={<LoginFooter onRegisterNow={onRegisterClick} />}
      customMaxWidth="32.375rem"
      onClose={closeModal}
    />
  )
}

export default LoginDialog
