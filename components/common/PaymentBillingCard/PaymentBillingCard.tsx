import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressCard, KeyValueDisplay, PaymentCard } from '@/components/common'
import { PageType, PaymentType } from '@/lib/constants'

import { CrPurchaseOrderPaymentTerm } from '@/lib/gql/types'

interface PaymentBillingCardProps {
  showAddress?: boolean
  pageType?: string
  cardNumberPart?: string
  expireMonth?: number
  expireYear?: number
  cardType?: string
  address1?: string
  address2?: string
  cityOrTown?: string
  postalOrZipCode?: string
  stateOrProvince?: string
  firstName?: string
  lastNameOrSurname?: string
  purchaseOrderNumber?: string
  paymentTerm?: CrPurchaseOrderPaymentTerm
  paymentType?: string
}

const PaymentBillingCard = (props: PaymentBillingCardProps) => {
  const {
    showAddress,
    pageType,
    cardNumberPart,
    expireMonth,
    expireYear,
    cardType,
    address1,
    address2,
    cityOrTown,
    postalOrZipCode,
    stateOrProvince,
    firstName,
    lastNameOrSurname,
    purchaseOrderNumber,
    paymentTerm,
    paymentType,
  } = props
  const { t } = useTranslation('common')

  return (
    <Box
      width={'100%'}
      maxWidth={873}
      display="flex"
      sx={{
        flexDirection: 'row',
        gap: 1,
      }}
    >
      {paymentType === PaymentType.CREDITCARD && (
        <>
          <PaymentCard
            pageType={pageType}
            cardNumberPart={cardNumberPart as string}
            expireMonth={expireMonth as number}
            expireYear={expireYear as number}
            cardType={cardType}
            // onPaymentCardSelection={() => null}
          />
          {showAddress && (
            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, ml: 5 }}>
              <AddressCard
                title={t('billing-address')}
                variant={'body2'}
                firstName={firstName}
                lastNameOrSurname={lastNameOrSurname}
                address1={address1}
                address2={address2}
                cityOrTown={cityOrTown}
                stateOrProvince={postalOrZipCode}
                postalOrZipCode={stateOrProvince}
              />
            </Box>
          )}
        </>
      )}

      {paymentType === PaymentType.PURCHASEORDER && (
        <Box data-testid="purchase-order-card">
          <KeyValueDisplay
            option={{
              name: t('po-number'),
              value: purchaseOrderNumber,
            }}
            variant="body1"
          />
          <KeyValueDisplay
            option={{
              name: t('payment-terms'),
              value: paymentTerm?.description,
            }}
            variant="body1"
          />

          <AddressCard
            title={t('billing-address')}
            variant={'body2'}
            firstName={firstName}
            lastNameOrSurname={lastNameOrSurname}
            address1={address1}
            address2={address2}
            cityOrTown={cityOrTown}
            stateOrProvince={postalOrZipCode}
            postalOrZipCode={stateOrProvince}
          />
        </Box>
      )}
    </Box>
  )
}
export default PaymentBillingCard
