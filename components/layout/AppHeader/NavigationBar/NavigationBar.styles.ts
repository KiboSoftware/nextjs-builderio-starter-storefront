// components/Navbar.styles.ts
import { SxProps } from '@mui/system'

export const navbarStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'white',
  transition: 'height 0.3s ease',
  height: '90px',
  '&.scrolled': {
    height: '58px', // Height when scrolled
  },
}

export const logoStyles: SxProps = {
  width: '43px',
}

export const navMenuStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
}

export const navItemStyles: SxProps = {
  margin: '0 15px',
  display: 'flex',
  '& a': {
    textDecoration: 'none',
    color: '#1e2ba6',
    fontSize: '16px',
    fontWeight: 500,
    '&:hover': {
      color: '#555',
    },
  },
}
