import React, { useEffect, useState } from 'react'

import { ArrowForwardIos } from '@mui/icons-material' // Same icon as FeaturedPageButton
import { Box, Typography, IconButton } from '@mui/material'
import Image from 'next/image'

import { buttonStyle } from '../customComponent/featuredPageButtonComponent.style' // Import the style

interface Metadata {
  title: string | null
  image: string | null
  description: string | null
}

interface MetadataComponentProps {
  url: string
  styleType: 'primary' | 'secondary' // Added to distinguish between styles
}

const MetadataComponent: React.FC<MetadataComponentProps> = ({ url, styleType }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null)

  useEffect(() => {
    async function loadMetadata() {
      const response = await fetch(`/api/fetchMetadata?url=${encodeURIComponent(url)}`)
      const data = await response.json()
      setMetadata(data)
    }
    loadMetadata()
  }, [url])

  console.log('This is the metaData -----> ', metadata)

  if (!metadata) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={buttonStyle.featuredButtonContainer}>
      <Box
        sx={
          styleType === 'primary'
            ? buttonStyle.primaryImageContainer
            : buttonStyle.secondaryImageContainer
        }
      >
        {metadata.image && <Image src={metadata.image} alt={metadata.title || 'Image'} />}
      </Box>

      <Box
        sx={[
          buttonStyle.featuredButtonContent,
          styleType === 'primary' && buttonStyle.primaryHoverEffect,
        ]}
      >
        <Typography
          variant="h4"
          sx={
            styleType === 'primary'
              ? buttonStyle.primaryHeadingText
              : buttonStyle.secondaryHeadingText
          }
        >
          {metadata.title}
        </Typography>

        <Typography
          variant="body2"
          sx={
            styleType === 'primary'
              ? buttonStyle.primaryParagraphText
              : buttonStyle.secondaryParagraphText
          }
        >
          {metadata.description}
        </Typography>

        <Box sx={buttonStyle.iconContainer}>
          <IconButton
            sx={
              styleType === 'primary'
                ? buttonStyle.arrowPrimaryButton
                : buttonStyle.arrowSecondaryButton
            }
          >
            <ArrowForwardIos
              sx={
                styleType === 'primary'
                  ? buttonStyle.primaryArrowIcon
                  : buttonStyle.secondaryArrowIcon
              }
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default MetadataComponent
