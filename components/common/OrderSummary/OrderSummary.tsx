/** @format */
import { ReactNode } from 'react'

import { Card, Typography, Box, CardContent, Divider } from '@mui/material'

import { OrderPriceProps } from '../OrderPrice/OrderPrice'
import { OrderPrice } from '@/components/common'

interface OrderSummaryProps extends OrderPriceProps {
  nameLabel: string
  backLabel?: string
  checkoutLabel?: string
  shippingLabel?: string
  children?: ReactNode
}

const styles = {
  boxStyle: {
    lineHeight: '1.063rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerStyle: {
    lineHeight: '1.5rem',
    textAlign: 'left',
  },
}

const OrderSummary = (props: OrderSummaryProps) => {
  const {
    subTotalLabel,
    shippingTotalLabel,
    taxLabel,
    totalLabel,
    subTotal,
    discountedSubtotal,
    shippingTotal,
    tax,
    total,
    nameLabel,
    promoComponent,
    isShippingTaxIncluded,
  } = props

  const orderPriceProps: OrderPriceProps = {
    subTotalLabel,
    shippingTotalLabel,
    taxLabel,
    totalLabel: totalLabel,
    subTotal,
    discountedSubtotal,
    shippingTotal,
    tax,
    total,
    promoComponent,
    isShippingTaxIncluded,
  }
  return (
    <Card>
      <CardContent>
        <Box sx={styles.headerStyle}>
          <Typography color="text.primary" fontWeight="bold" pt={0.5}>
            {nameLabel}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <OrderPrice {...orderPriceProps} />
      </CardContent>
      <CardContent>
        <Box textAlign="center">{props.children}</Box>
      </CardContent>
    </Card>
  )
}
export default OrderSummary
