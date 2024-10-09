import { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/material'
import Link from 'next/link'

import { logoStyles, navbarStyles, navItemStyles, navMenuStyles } from './NavigationBar.styles'
import logo from '@/assets/fortisLogo.png'
import { KiboLogo } from '@/components/common'

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const scrollTop = window.scrollY
    if (scrollTop > 50) {
      // Adjust this threshold as needed
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box component="nav" sx={navbarStyles} className={scrolled ? 'scrolled' : ''}>
      <Box component={'section'} sx={logoStyles}>
        <Link href="/">
          <KiboLogo logo={logo} small={scrolled} />
        </Link>
      </Box>
      <Box component="ul" sx={navMenuStyles}>
        <Box component="li" sx={navItemStyles}>
          <Link href="/products">Products</Link>
          <KeyboardArrowDownIcon sx={{ color: '#30299a', marginLeft: '10px' }} />
        </Box>
        <Box component="li" sx={navItemStyles}>
          <Link href="/services">Services</Link>
          <KeyboardArrowDownIcon sx={{ color: '#30299a', marginLeft: '10px' }} />
        </Box>
        <Box component="li" sx={navItemStyles}>
          <Link href="/learning-center">Learning Center</Link>
          <KeyboardArrowDownIcon sx={{ color: '#30299a', marginLeft: '10px' }} />
        </Box>
        <Box component="li" sx={navItemStyles}>
          <Link href="/about">About Fortis</Link>
          <KeyboardArrowDownIcon sx={{ color: '#30299a', marginLeft: '10px' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default NavigationBar
