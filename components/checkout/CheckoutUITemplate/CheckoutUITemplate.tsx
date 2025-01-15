import React, { useCallback, useEffect } from 'react'

import { Box, Stack, Button, SxProps, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import { KiboStepper, OrderReview } from '@/components/checkout'
import { OrderSummary, PromoCodeBadge } from '@/components/common'
import { useCheckoutStepContext, STEP_STATUS } from '@/context'
import { checkoutGetters, orderGetters } from '@/lib/getters'

import type { Checkout, CrOrder } from '@/lib/gql/types'

interface CheckoutUITemplateProps<T> {
  checkout: T
  promoError: string
  isMultiShipEnabled?: boolean
  handleApplyCouponCode: (couponCode: string) => void
  handleRemoveCouponCode: (couponCode: string) => void
  children?: React.ReactNode
}
const buttonStyle = {
  height: '48px',
  width: '188px',
  background: 'primary.main',
  color: '#ffffff',
  border: 0,
  borderRadius: '0px 26px',
  padding: '12px 16px',
  textAlign: 'center',
  fontFamily: 'Poppins',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '24px',
  cursor: 'pointer',
  '&:hover': {
    background: '#4C47C4',
  },
  '&:disabled': {
    backgroundColor: '#8D8D8D !important',
  },
} as SxProps<Theme> | undefined

const CheckoutUITemplate = <T extends CrOrder | Checkout>(props: CheckoutUITemplateProps<T>) => {
  const {
    checkout,
    handleApplyCouponCode,
    handleRemoveCouponCode,
    promoError,
    isMultiShipEnabled = false,
    children,
  } = props
  const { t } = useTranslation('common')
  const { activeStep, stepStatus, steps, setStepStatusSubmit, setStepBack } =
    useCheckoutStepContext()
  const buttonLabels = [t('go-to-payment'), t('review-order')] //t('go-to-shipping'),
  const shippingStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('shipping').toLowerCase()
  )
  const paymentStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('payment').toLowerCase()
  )
  const reviewStepIndex = steps.findIndex(
    (step: string) => step.toLowerCase() === t('review').toLowerCase()
  )
  const handleBack = () => setStepBack()
  const handleSubmit = useCallback(() => setStepStatusSubmit(), [])

  const orderSummaryArgs = {
    nameLabel: t('Order Summary'),
    subTotalLabel: `Subtotal`,
    shippingTotalLabel: t('Shipping'),
    taxLabel: t('Estimated Tax'),
    totalLabel: t('Total'),
    handlingLabel: t('Handling'),
    orderDetails: checkout,
    checkoutLabel: t('go-to-checkout'),
    shippingLabel: t('go-to-shipping'),
    backLabel: t('go-back'),
    /*promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyCouponCode}
        onRemoveCouponCode={handleRemoveCouponCode}
        promoList={checkout?.couponCodes as string[]}
        promoError={!!promoError}
        helpText={promoError}
      />
    ),*/
  }
  const showCheckoutSteps = activeStep !== steps.length

  const { publicRuntimeConfig } = getConfig()
  const reCaptchaKey = publicRuntimeConfig.recaptcha.reCaptchaKey

  const commonElements = showCheckoutSteps ? (
    <Stack
      sx={{ paddingTop: '20px', paddingBottom: { md: '40px' } }}
      direction={{ xs: 'column', md: 'row' }}
      gap={0}
    >
      <Stack sx={{ width: '100%', maxWidth: '920' }} gap={1}>
        <Typography variant="h1" sx={{ color: 'primary.main' }}>
          {t('checkout')}
        </Typography>

        <KiboStepper isSticky={true}>{children}</KiboStepper>

        {activeStep < buttonLabels.length && (
          
          <Stack direction="column" gap={2} justifyContent={'end'} alignItems={'flex-end'}>
            <Divider orientation="horizontal" flexItem sx={{ mt: 2 }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ ...buttonStyle }}
              fullWidth
              onClick={handleSubmit}
              disabled={stepStatus !== STEP_STATUS.VALID || activeStep === steps.length - 1}
            >
              {t('continue') || buttonLabels[activeStep]}
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              sx={{ ...buttonStyle, display: 'none' }}
              fullWidth
              onClick={handleBack}
              disabled={activeStep === shippingStepIndex}
            >
              {t('go-back')}
            </Button> */}
          </Stack>
        )}
      </Stack>
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xm: '100%',
            sm: '100%',
            md: '380px',
            lg: '380px',
          },
          height: 'fit-content',
          marginLeft: { lg: '1rem' },
          position: { md: 'sticky' },
          top: '80px',
        }}
      >
        <OrderSummary {...orderSummaryArgs}></OrderSummary>

        {/* {activeStep === reviewStepIndex && (
          <OrderReview
            checkout={checkout as CrOrder}
            isMultiShipEnabled={isMultiShipEnabled}
            handleApplyCouponCode={handleApplyCouponCode}
            handleRemoveCouponCode={handleRemoveCouponCode}
            promoError={promoError}
          />
        )} */}
      </Box>
    </Stack>
  ) : null

  return (
    <React.Fragment>
      {reCaptchaKey ? (
        <ReCaptchaProvider reCaptchaKey={reCaptchaKey}>{commonElements}</ReCaptchaProvider>
      ) : (
        commonElements
      )}
    </React.Fragment>
  )
}

export default CheckoutUITemplate
