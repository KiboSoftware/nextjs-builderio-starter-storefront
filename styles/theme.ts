import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import type {} from '@mui/lab/themeAugmentation'
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    red?: PaletteColorOptions
  }
}

export const grey = {
  900: '#020027', //Fortis theme
  // Fill Form Label Text, information text
  700: '#494949',
  // Home Page background
  600: '#8D8D8D', //Fortis theme
  // Thin borders, placeholder text
  500: '#6A6A6A', //Fortis theme
  // Header Accent Color, page separator bar
  400: '#CDCDCD',
  // Button background and border color
  300: '#EDEDED', //Fortis theme
  // Order Summary Background
  100: '#F7F7F7',
  // Secondary Button (cancel button)
  50: '#FAFAFA',
}

export const red = {
  900: '#BD3742', //Fortis theme
  // wishlist color
  700: '#BD3742', //Fortis theme
  600: '#BD3742', //Fortis theme
  500: '#BD3742', //Fortis theme
  300: '#EBC3C6', //Fortis theme
  100: '#EBC3C6', //Fortis theme
  50: '#EBC3C6', //Fortis theme
}

const buttonStyleOverrides = {
  root: {
    textTransform: 'capitalize' as any,

    '&:hover': {
      boxShadow: 'none',
    },
  },
  containedPrimary: ({ ownerState, theme }: { ownerState: any; theme: any }) => ({
    ...(ownerState.disabled && {
      backgroundColor: `${theme.palette.primary.light} !important`,
      color: `${theme.palette.common.white} !important`,
    }),
  }),
  containedSecondary: {
    backgroundColor: grey[50],
    borderColor: grey[500],
    borderWidth: 1,
    borderStyle: 'solid',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: grey[300],
    },
  },
  containedInherit: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    boxShadow: 'none',
    color: '#fff',
    '&:hover': {
      backgroundColor: grey[900],
    },
  },
}
// Create a base theme instance and define the basic design options
let theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '1.75rem', // 28px
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.5rem', // 24px
      },
    },
    h2: {
      fontSize: '1.5rem', // 24px
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.25rem', // 20px
      },
    },
    h3: {
      fontSize: '1.25rem', // 20px
      '@media (max-width:600px)': {
        fontSize: '1rem', // 16px
      },
    },
    subtitle1: {
      fontSize: '1.125rem', // 18px
    },
    subtitle2: {
      fontSize: '1rem', // 16px
    },
    // body1: {
    //   fontSize: '1rem', // 16px
    // },
    // body2: {
    //   fontSize: '0.875rem', // 14px
    // },
  },
  palette: {
    primary: {
      main: '#30299A', //Fortis theme
      light: '#4C47C4', //Fortis theme
    },
    secondary: {
      main: '#E3E2FF', //Fortis theme
      light: '#FFFFFF',
    },
    text: {
      primary: grey[900],
      secondary: grey[500],
    },
    warning: {
      main: '#EBC3C6', //Fortis theme
    },
    error: {
      main: '#BD3742', //Fortis theme
    },
    grey: { ...grey },
    red: { ...red },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        ...buttonStyleOverrides,
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        ...buttonStyleOverrides,
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          zIndex: 2000,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .Mui-selected': {
            backgroundColor: `${grey[900]} !important`,
            color: '#FFFFFF',
          },
        },
      },
    },
  },
})
// compose theme (place theme options that depend on the base theme here)
theme = createTheme(theme)
export default responsiveFontSizes(theme)
