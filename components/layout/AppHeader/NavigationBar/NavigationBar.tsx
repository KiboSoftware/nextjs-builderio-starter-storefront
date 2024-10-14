import { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/material'
import Link from 'next/link'

import { logoStyles, navbarStyles, navItemStyles, navMenuStyles } from './NavigationBar.styles'
import logo from '@/assets/fortisLogo.png'
import { KiboLogo } from '@/components/common'

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const buffer = 20 // Buffer of 20px

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 70 // Trigger at 70px

      if (currentScrollY > scrollThreshold + buffer && !scrolled) {
        setScrolled(true) // Add 'scrolled' class
      } else if (currentScrollY < scrollThreshold - buffer && scrolled) {
        setScrolled(false) // Remove 'scrolled' class
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <Box component="nav" sx={navbarStyles} className={scrolled ? 'scrolled' : ''}>
      <Box component="section" sx={logoStyles}>
        <Link href="/">
          <KiboLogo logo={logo} small={scrolled} />
        </Link>
      </Box>
      <Box component="ul" sx={navMenuStyles}>
        {['Products', 'Services', 'Learning Center', 'About Fortis'].map((text) => (
          <Box component="li" sx={navItemStyles} key={text}>
            <Link href={`/${text.toLowerCase().replace(' ', '-')}`}>{text}</Link>
            <KeyboardArrowDownIcon sx={{ color: '#30299a', marginLeft: '10px' }} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default NavigationBar
