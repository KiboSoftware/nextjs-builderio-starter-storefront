import React, { RefObject } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Clear from '@mui/icons-material/Clear'
import Search from '@mui/icons-material/Search'
import { IconButton, InputBase, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

// Interface
interface SearchProps {
  placeHolder?: string
  mobilePlaceHolder?: string
  searchTerm: string
  onSearch: (searchText: string) => void
  onKeyEnter?: (searchText: string) => void
  showClearButton: boolean
  childInputRef?: RefObject<HTMLInputElement | undefined>
  inputProps?: any
}
// MUI
const style = {
  paper: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '9px',
    boxShadow: 'none',
    // height: '27px',
  },
  inputBase: {
    // ml: 1,
    flex: 1,
    height: 'auto',
    color: 'primary.main',
    fontFamily: 'poppins',
    input: {
      paddingBottom: 0,
      '&::placeholder': {
        color: 'primary.main',
      },
    },
  },
  divider: { height: 20, m: 0.5 },
}
// Component
const SearchBar = (props: SearchProps) => {
  const {
    placeHolder = 'SEARCH',
    mobilePlaceHolder = 'Begin typing...',
    searchTerm,
    onSearch,
    childInputRef,
    showClearButton = false,
    inputProps,
    onKeyEnter,
    ...rest
  } = props
  const { t } = useTranslation('common')
  const SearchAriaLabel = t('search-icon')
  const searchInputAriaLabel = t('search-input')
  const clearSearchAriaLabel = t('clear-search')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearch(event.target.value)
  }
  const handleClear = () => {
    onSearch('')
  }
  return (
    <Paper
      component="form"
      sx={{
        ...style.paper,
        borderBottom: isMobile ? '1px solid #5A48FB' : null, // Change border for mobile
        borderRadius: isMobile ? '0' : '9px',
        height: isMobile ? '40px' : '27px',
      }}
    >
      <InputBase
        name="searchInput"
        inputRef={childInputRef}
        value={searchTerm}
        placeholder={isMobile ? mobilePlaceHolder : placeHolder}
        onChange={handleSearch}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onKeyEnter?.(searchTerm)
          }
        }}
        size="small"
        sx={{
          ...style.inputBase,
          height: isMobile ? '40px' : '27px',
          'input::placeholder': {
            color: isMobile ? 'text.secondary' : 'primary.main', // Placeholder color change in mobile view
          },
        }}
        inputProps={{ 'aria-label': searchInputAriaLabel }}
        {...inputProps}
        autoComplete="off"
        startAdornment={
          isMobile ? null : (
            <IconButton
              size="small"
              aria-label={SearchAriaLabel}
              sx={{ color: 'primary.main', marginRight: '13px' }}
            >
              <Search fontSize="small" />
            </IconButton>
          )
        }
        endAdornment={
          isMobile ? (
            <IconButton size="small" aria-label={SearchAriaLabel} sx={{ color: '#5A48FB' }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          ) : null
          // showClearButton && (
          //   <IconButton
          //   name="clearButton"
          //   size="small"
          //   onClick={handleClear}
          //   disabled={searchTerm.length === 0}
          //   aria-label={clearSearchAriaLabel}
          // >
          //   <Clear fontSize="medium" />
          // </IconButton>
          // )
        }
        {...rest}
      />
    </Paper>
  )
}
export default SearchBar
