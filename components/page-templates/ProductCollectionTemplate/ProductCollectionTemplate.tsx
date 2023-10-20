import React, { useEffect, useRef, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Grid,
  Rating,
  Button,
  Typography,
  Divider,
  Link as MuiLink,
  styled,
  Theme,
  MenuItem,
  Drawer,
  ImageList,
  ImageListItem,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboImage, QuantitySelector } from '@/components/common'
import Price from '@/components/common/Price/Price'
import { ImageGallery } from '@/components/core'
import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import { AddToCartDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useAddCartItem, useGetProductPrice, useGetProducts, usePriceRangeFormatter } from '@/hooks'
import { productGetters } from '@/lib/getters'

import { Product } from '@/lib/gql/types'

function TruncatedText({ text, maxLine = 1 }: any) {
  const [isTruncated, setIsTruncated] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    if ((textRef as any)?.current?.scrollHeight > (textRef as any)?.current?.offsetHeight) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [text])

  return (
    <div>
      <Typography
        ref={textRef}
        variant="body1"
        sx={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: isTruncated ? maxLine : undefined,
          WebkitBoxOrient: 'vertical',
        }}
      >
        <Box
          data-testid="short-description"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </Typography>
      {showButton && (
        <Button color="primary" onClick={() => setIsTruncated(!isTruncated)}>
          {isTruncated ? 'View More' : 'View Less'}
        </Button>
      )}
    </div>
  )
}

const Collection = (props: any) => {
  const { collectionProducts } = props
  const [open, setOpen] = useState(false)
  const [drawerText, setDrawerText] = useState('')
  const handleView = (text: any) => {
    setDrawerText(text)
    setOpen(true)
  }

  return (
    <>
      <Typography id="collection" variant="h2" gutterBottom>
        Collection Products
      </Typography>
      <Grid container sx={{ marginTop: '20px' }}>
        {collectionProducts?.items?.map((item: any, idx: any) => (
          <>
            {idx !== 0 && <Divider sx={{ width: '100%', my: 3 }} />}
            <CollectionMember product={item} onViewDescription={handleView} />
          </>
        ))}
        {/* <Drawer
          sx={{
            width: '600px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '600px',
              boxSizing: 'border-box',
            },
          }}
          anchor="right"
          open={open}
        >
          <Box
            data-testid="short-description"
            dangerouslySetInnerHTML={{
              __html: drawerText,
            }}
          />
        </Drawer> */}
      </Grid>
    </>
  )
}

const CollectionMember = (props: { product: Product; onViewDescription: any }) => {
  const { product, onViewDescription } = props
  const { t } = useTranslation('common')
  const productPrice = productGetters.getPrice(product)
  const { addToCart } = useAddCartItem()
  const [quantity, setQuantity] = useState<number>(1)
  const { showModal, closeModal } = useModalContext()

  const handleAddToCart = async () => {
    try {
      const cartResponse = await addToCart.mutateAsync({
        product: {
          productCode: product.productCode as string,
          fulfillmentMethod: 'Ship',
          options: [],
        },
        quantity: quantity,
      })

      if (cartResponse.id) {
        showModal({
          Component: AddToCartDialog,
          props: {
            cartItem: cartResponse,
          },
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Grid item xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {productGetters.getName(props.product)}
        </Typography>
        <Price price={t<string>('currency', { val: productPrice.regular })} />
        <Box sx={{ height: '200px', width: '200px', position: 'relative' }}>
          <KiboImage
            src={productGetters.handleProtocolRelativeUrl(productGetters.getCoverImage(product))}
            alt={productGetters.getName(props.product)}
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Grid>
      <Grid alignItems="flex-end" item xs={12} md={4} sx={{ pb: { xs: 3, md: 0 } }}>
        <Box paddingY={1} display={productGetters.getShortDescription(product) ? 'block' : 'none'}>
          <TruncatedText text={productGetters.getShortDescription(product)} maxLine={8} />
          {/* <Box
            data-testid="short-description"
            dangerouslySetInnerHTML={{
              __html: productGetters.getShortDescription(product),
            }}
          /> */}
        </Box>

        <Box paddingY={1}>
          <QuantitySelector
            label="Qty"
            quantity={quantity}
            onIncrease={() => setQuantity((prevQuantity: number) => Number(prevQuantity) + 1)}
            onDecrease={() => setQuantity((prevQuantity: number) => Number(prevQuantity) - 1)}
          />
        </Box>
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleAddToCart()}
          loading={addToCart.isPending}
        >
          {t('add-to-cart')}
        </LoadingButton>
        {/* <LoadingButton
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => onViewDescription(productGetters.getShortDescription(product))}
        >
          View Details
        </LoadingButton> */}
      </Grid>
    </>
  )
}
export default function ProductCollectionTemplate(props: any) {
  const { product, breadcrumbs } = props
  const { data: productPriceResponse } = useGetProductPrice(product?.productCode as string, false)
  const productName = productGetters.getName(product)
  const shortDescription = productGetters.getShortDescription(product)
  const productPriceRange = productGetters.getPriceRange(productPriceResponse)
  const productPrice = productGetters.getPDPProductPrice(product)
  const { t } = useTranslation('common')
  const collectionMembers = product?.productCollectionMembers?.map(
    (member: any) => member.memberKey?.value
  )
  const { data: collectionProducts } = useGetProducts(collectionMembers)
  const { productGallery } = productGetters.getProductDetails(product)
  const scrollToItems = () => {
    const parentElm = document.getElementById('collection')
    if (parentElm) {
      parentElm.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const { addToCart } = useAddCartItem()
  const { showModal, closeModal } = useModalContext()

  const handleAddAllToCart = async () => {
    try {
      let cartResponse
      for (const item of collectionMembers) {
        cartResponse = await addToCart.mutateAsync({
          product: {
            productCode: item as string,
            fulfillmentMethod: 'Ship',
            options: [],
          },
          quantity: 1,
        })
      }

      showModal({
        Component: AddToCartDialog,
        props: {
          cartItem: cartResponse,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Grid container sx={{ paddingBottom: '40px' }}>
        <Grid item xs={12} alignItems="center" sx={{ paddingBlock: 4 }}>
          <KiboBreadcrumbs breadcrumbs={breadcrumbs} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
          <ImageGallery images={productGallery as any} title={''} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ width: '100%', pl: { xs: 0, md: 5 } }}>
          <Typography variant="h1" gutterBottom>
            {productName}
          </Typography>
          <Price
            price={t<string>('currency', { val: productPrice.regular })}
            {...(productPrice.special && {
              salePrice: t<string>('currency', { val: productPrice.special }),
            })}
            priceRange={usePriceRangeFormatter(productPriceRange)}
          />
          <Box paddingY={1} display={shortDescription ? 'block' : 'none'}>
            <Box
              data-testid="short-description"
              dangerouslySetInnerHTML={{
                __html: shortDescription,
              }}
            />
          </Box>
          <Box paddingY={1}>
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleAddAllToCart()}
            >
              Add All To Cart
            </LoadingButton>
          </Box>
          <Box paddingY={1}>
            <LoadingButton
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => scrollToItems()}
            >
              View Collection
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: '20px', width: '100%', my: 3 }} />
      <Collection collectionProducts={collectionProducts} />
    </>
  )
}
