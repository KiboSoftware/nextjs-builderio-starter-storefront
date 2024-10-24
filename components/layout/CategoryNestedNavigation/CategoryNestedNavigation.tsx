import React, { ReactNode, useEffect, useState } from 'react'

import builder from '@builder.io/react'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import Close from '@mui/icons-material/Close'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Slide,
  Theme,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { findParentNode } from '@/lib/helpers'

import type { Maybe, MenuItem, PrCategory } from '@/lib/gql/types'

interface CategoryNestedNavigationProps {
  categoryTree?: Maybe<PrCategory>[]
  children?: ReactNode
  onCategoryClick: (categoryCode: string, slug?: string) => void
  onCloseMenu: (isOpen: boolean) => void
}

const styles = {
  floatRight: {
    marginLeft: 'auto',
  },
  smallIcon: {
    fontSize: (theme: Theme) => theme.typography.body2,
    color: 'primary.main',
  },
  listHeader: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1.5,
    paddingBottom: 1.5,
  },
  listContent: {
    backgroundColor: 'common.white',
    paddingLeft: 2,
    paddingRight: 2,
  },
  directLinks: {
    color: 'primary.main',
    textDecoration: 'underline',
    textDecorationColor: '#30299A',
    textUnderlineOffset: '6px',
  },
}

const CategoryNestedNavigation = (props: CategoryNestedNavigationProps) => {
  const { children, onCloseMenu } = props
  const { t } = useTranslation('common')

  const router = useRouter()

  const gotoCart = () => {
    router.push('/cart')
    onCloseMenu(true)
  }

  const initialSubHeader: {
    backLink: string | null
    categoryCode: string
    label: string | null
  } = {
    backLink: null,
    categoryCode: '',
    label: null,
  }

  useEffect(() => {
    async function fetchMenuContent() {
      try {
        const content = await builder.get('menu').toPromise()
        setMenuContent(content.data?.category)
      } catch (error) {
        console.error('Failed to fetch menu content:', error)
      }
    }
    fetchMenuContent()
  }, [])

  const [menuContent, setMenuContent] = useState<MenuItem[]>([])
  const [subHeader, setSubHeader] = useState<typeof initialSubHeader>(initialSubHeader)
  const [activeCategory, setActiveCategory] = useState<MenuItem[] | null>(menuContent)

  const reset = () => {
    setActiveCategory(menuContent)
    setSubHeader(initialSubHeader)
  }

  const handleCategoryClick = (clickedCategory: Maybe<MenuItem>) => {
    if (clickedCategory?.childCategory?.length) {
      const selectedCategory: Maybe<MenuItem> = activeCategory?.find(
        (category) => category?.categoryCode === clickedCategory?.categoryCode
      ) as Maybe<MenuItem>

      setActiveCategory(selectedCategory?.childCategory as [])

      setSubHeader({
        backLink: t('back'),
        label: selectedCategory?.categoryName as string,
        categoryCode: selectedCategory?.categoryCode as string,
      })
    } else {
      null
    }
  }

  const handleBackClick = () => {
    const previousCategory: Maybe<MenuItem | undefined | null> = findParentNode(
      menuContent,
      subHeader.categoryCode
    )

    if (previousCategory === null) reset()
    if (previousCategory === undefined) onCloseMenu(false)
    if (previousCategory) {
      setActiveCategory(previousCategory?.childCategory as MenuItem[])

      // const parentCategory: Maybe<MenuItem | undefined | null> = findParentNode(
      //   menuContent,
      //   previousCategory?.categoryCode
      // )

      setSubHeader({
        backLink: t('back'),
        label: previousCategory?.categoryName as string,
        categoryCode: previousCategory?.categoryCode as string,
      })
    }
  }

  useEffect(() => {
    if (menuContent) setActiveCategory(menuContent)
  }, [menuContent])

  return (
    <>
      <Box
        sx={{
          height: '8px',
          width: '100%',
          backgroundColor: 'secondary.main',
        }}
      ></Box>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper', pb: 0 }}
        aria-labelledby="category-nested-list"
        role="list"
        subheader={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            pl={2}
            pr={2}
            pt={'4px'}
            height={'52px'}
          >
            {subHeader.backLink !== null && (
              <>
                <IconButton
                  size="small"
                  aria-label="back-arrow-button"
                  onClick={handleBackClick}
                  sx={{ padding: 0 }}
                >
                  <ArrowBackIos sx={{ ...styles.smallIcon }} />
                </IconButton>
                <ListSubheader
                  component="div"
                  sx={{ ...styles.directLinks, flex: 1, paddingX: 1, color: 'primary.main' }}
                >
                  {subHeader.backLink}
                </ListSubheader>
              </>
            )}
            <IconButton size="small" aria-label="close-button" onClick={() => onCloseMenu(false)}>
              <Close sx={{ color: 'primary.main' }} />
            </IconButton>
          </Box>
        }
      >
        {subHeader.label !== null && subHeader.label !== '' && (
          <ListItem sx={styles.listHeader}>
            <ListItemText
              primary={
                <Typography variant="h4" sx={{ color: 'primary.main' }}>
                  {subHeader.label}
                </Typography>
              }
            />
          </ListItem>
        )}
        {/* <Divider /> */}
        {activeCategory?.map((category: Maybe<MenuItem>) => {
          return (
            <Slide
              key={category?.categoryCode}
              direction="right"
              in={Boolean(activeCategory.length)}
              appear={true}
            >
              <Box>
                <ListItemButton sx={{ paddingInline: 2 }}>
                  <Link href={category?.categoryLink || '#'} passHref legacyBehavior>
                    <ListItemText
                      primary={
                        <Typography
                          variant={category?.typeOfMenu ? 'h4' : 'body2'}
                          sx={category?.childCategory?.length ? null : styles.directLinks}
                          color="primary"
                        >
                          {category?.categoryName}
                        </Typography>
                      }
                      onClick={() => onCloseMenu(true)}
                    />
                  </Link>
                  {category?.childCategory?.length ? (
                    <Box component="span">
                      <NavigateNextIcon
                        onClick={() => handleCategoryClick(category)}
                        sx={{ color: 'primary.main' }}
                      />
                    </Box>
                  ) : null}
                </ListItemButton>
              </Box>
            </Slide>
          )
        })}
        {children && subHeader.label === initialSubHeader.label && (
          <>
            <Divider variant="middle" sx={{ paddingTop: '12px', marginBottom: '16px' }} />
            <ListItemButton sx={styles.listContent}>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={styles.directLinks} color="primary">
                    Contact
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={styles.listContent}>
              <ListItemText primary={children} />
            </ListItemButton>
            <ListItemButton onClick={gotoCart} sx={styles.listContent}>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={styles.directLinks} color="primary">
                    Cart
                  </Typography>
                }
              />
            </ListItemButton>
          </>
        )}
      </List>
    </>
  )
}

export default CategoryNestedNavigation
