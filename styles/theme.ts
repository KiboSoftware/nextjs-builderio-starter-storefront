import { createTheme } from '@mui/material/styles'
import type {} from '@mui/lab/themeAugmentation'
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    red?: PaletteColorOptions
  }
}

export const grey = {
  900: '#2B2B2B',
  // Fill Form Label Text, information text
  700: '#494949',
  // Home Page background
  600: '#7C7C7C',
  // Thin borders, placeholder text
  500: '#C7C7C7',
  // Header Accent Color, page separator bar
  400: '#CDCDCD',
  // Button background and border color
  300: '#EAEAEA',
  // Order Summary Background
  100: '#F7F7F7',
  // Secondary Button (cancel button)
  50: '#FAFAFA',
}

export const red = {
  900: '#bb2500',
  // wishlist color
  700: '#e13b0e',
  600: '#ef4214',
  500: '#fa4818',
  300: '#fc825e',
  100: '#fec9b9',
  50: '#fbe8e6',
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
    fontFamily: 'Poppins',
    htmlFontSize: 16,
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: '500',
      lineHeight: '3.438rem', //55px
      '@media (max-width:910px)': {
        fontSize: '1.875rem', // 30px
        lineHeight: '2.625rem', // 42px
      },
    },
    h2: {
      fontSize: '2.375rem', // 38px
      fontWeight: '500',
      lineHeight: '3.25rem', //52px
      '@media (max-width:910px)': {
        fontSize: '1.625rem', // 26px
        lineHeight: '2.188rem', // 35px
      },
    },
    h3: {
      fontSize: '1.875rem', // 30px
      fontWeight: '500',
      lineHeight: '2.813rem', //45px
      '@media (max-width:910px)': {
        fontSize: '1.5rem', // 24px
        lineHeight: '2.188rem', // 35px
      },
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: '500',
      lineHeight: '1.563rem', // 25px
      '@media (max-width:910px)': {
        fontSize: '1rem', // 16px
        lineHeight: '1.375rem', // 22px
      },
    },
    h5: {
      fontSize: '1.5rem', // 24px
      fontWeight: '300',
      lineHeight: '2.188rem', //35px
      '@media (max-width:910px)': {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.875rem', //30px
      },
    },
    h6: {
      fontSize: '0.875rem', // 14px
      fontWeight: '500',
      lineHeight: '1.25rem', // 20px
      '@media (max-width:910px)': {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
      },
    },
    subtitle1: {
      // footnote
      fontSize: '0.688rem', // 11px
      fontWeight: '500',
      lineHeight: '1.25rem', // 20px,
    },
    // subtitle2: {
    //   fontSize: '1rem', // 16px
    // },
    body1: {
      fontSize: '1.375rem', // 22px
      fontWeight: '300',
      lineHeight: '2.5rem', // 40px
      '@media (max-width:910px)': {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.75rem', // 28px
      },
    },
    body2: {
      fontSize: '1rem', // 16px
      fontWeight: '300',
      lineHeight: '1.563rem', //25px
      '@media (max-width:910px)': {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.375rem', // 22px
      },
    },
    button: {
      //Button1-Large
      fontSize: '1.375rem', // 22px
      fontWeight: '300',
      lineHeight: '1.875rem', //30px
      '@media (max-width:910px)': {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
      },
    },
  },
  palette: {
    primary: {
      main: '#2ea195',
      light: '#C0E3DF',
    },
    secondary: {
      main: '#c0e3df',
      light: '#FFFFFF',
    },
    text: {
      primary: grey[900],
      secondary: grey[600],
    },
    warning: {
      main: '#f8ca24',
    },
    error: {
      main: '#e42d00',
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
export default theme
