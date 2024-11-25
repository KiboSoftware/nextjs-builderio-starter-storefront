import React from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import {
  Card,
  Typography,
  CardMedia,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductCardStyles } from './ProductCard/ProductCard.styles'
import { KiboImage } from '@/components/common'
import { productGetters } from '@/lib/getters'
import abcore from '@/public/Brand_Logo/abcore-logo.png'
import arista from '@/public/Brand_Logo/arista-logo.png'
import bethyl from '@/public/Brand_Logo/bethyl-logo.png'
import empirical from '@/public/Brand_Logo/empirical-logo.png'
import fortis from '@/public/Brand_Logo/fortis-logo.png'
import ipoc from '@/public/Brand_Logo/ipoc-logo.png'
import nanocomposix from '@/public/Brand_Logo/nanocomposix-logo.png'
import vector from '@/public/Brand_Logo/vector-logo.png'
import DefaultImage from '@/public/noImage.png'

const brandImages: Record<string, string> = {
  arista: arista.src,
  bethyl: bethyl.src,
  abcore: abcore.src,
  empirical: empirical.src,
  nanocomposix: nanocomposix.src,
  vector: vector.src,
  ipoc: ipoc.src,
  fortis: fortis.src,
}

const RelatedProductsCarousel = (props: any) => {
  const { product } = props
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const slidesPerView = () => {
    if (isDesktop) return 4
    if (isTablet) return 3
    if (isMobile) return 1
    return 4
  }

  if (product.length > 0)
    return (
      <Box
        sx={{
          maxWidth: '1200px', // Limit the width
          width: '100%',
          margin: '0 auto', // Center the component
        }}
      >
        <Box sx={{ display: 'block', width: '100%', marginBottom: '18px' }}>
          <Typography variant="h3">Related Products</Typography>
        </Box>
        <Swiper
          modules={[Navigation]}
          spaceBetween={26}
          slidesPerView={slidesPerView()}
          navigation={true}
        >
          {product.map((data: any, index: number) => {
            const productName = data?.title
            const productCode = data?.productCode
            const brandImg = data?.brand?.value
            const brandName = data?.brand?.stringValue
            const categoryCode = data?.categoryCode
            const seoFriendlyUrl = data?.seoFriendlyUrl
            const imgUrl = productGetters.handleProtocolRelativeUrl(
              data?.productImages[0]?.imageUrl as string
            )
            const altText = 'product-image-alt'
            const productUrl =
              categoryCode !== undefined && seoFriendlyUrl
                ? `/products/${categoryCode}/${seoFriendlyUrl}/${productCode}`
                : `/product/${productCode}`

            return (
              <SwiperSlide key={index} style={{ width: '260px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Link href={productUrl} passHref data-testid="product-card-link">
                    <Box>
                      <Card
                        sx={{
                          ...ProductCardStyles.cardRoot,
                          minHeight: 360,
                          [theme.breakpoints.down('md')]: {
                            width: '100%',
                            maxWidth: '230px',
                            padding: '0.5rem',
                          },
                        }}
                        data-testid="product-card"
                      >
                        <CardMedia
                          className="product-image"
                          sx={{
                            ...ProductCardStyles.cardMedia,
                            height: 180,
                            zIndex: 1,
                            position: 'relative',
                          }}
                        >
                          <KiboImage
                            src={imgUrl || brandImages[brandImg?.toLowerCase()] || DefaultImage}
                            alt={altText}
                            fill
                            quality={100}
                            sizes="(max-width: 240px) 240px, 240px"
                            style={{ objectFit: 'contain' }}
                            data-testid="product-image"
                          />
                        </CardMedia>
                        <Box flexDirection="column">
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{
                              ...ProductCardStyles.brandLabel,
                              fontSize: '14px',
                              color: 'grey.900',
                              lineHeight: 'normal',
                              margin: '9px 0',
                            }}
                          >
                            {brandName}
                          </Typography>
                          <Typography
                            variant="body2"
                            gutterBottom
                            fontWeight={500}
                            className="productNameStyle"
                            sx={{ ...ProductCardStyles.productNameStyle, color: '#2B2B2B' }}
                          >
                            {productName}
                          </Typography>
                        </Box>
                        <IconButton sx={ProductCardStyles.iconButton}>
                          <ArrowForwardIos sx={{ color: 'white' }} />
                        </IconButton>
                      </Card>
                    </Box>
                  </Link>
                </Box>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    )

  return null
}

export default RelatedProductsCarousel
