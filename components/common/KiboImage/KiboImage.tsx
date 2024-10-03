import { SyntheticEvent } from 'react'

import { SvgIconComponent } from '@mui/icons-material'
import Image, { ImageProps } from 'next/image'

import DefaultImage from '@/public/product_placeholder.svg'

interface KiboImageProps extends ImageProps {
  errorimage?: ImageData | SvgIconComponent
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  mobile?: boolean
}

const errorImage = { image: DefaultImage }

const onImageError = (
  event: SyntheticEvent<HTMLImageElement, Event> & {
    target: HTMLImageElement
  }
) => {
  const { target } = event
  target.src = errorImage.image
}

const KiboImage = (props: KiboImageProps) => {
  errorImage.image = props.errorimage
  const mobile = props.mobile
  return (
    <Image
      {...props}
      alt={props.alt}
      onError={onImageError}
      style={{
        objectFit: props.objectFit ?? 'contain',
        ...(props.alt === 'kibo-logo' && { position: 'relative' }),
        ...(mobile && { width: 'inherit', height: 'inherit' }), // Apply only when mobile is true
      }}
      // Only add the "fill" property if the alt is NOT "kibo-logo"
      fill={props.alt !== 'kibo-logo'}
    />
  )
}

export default KiboImage
