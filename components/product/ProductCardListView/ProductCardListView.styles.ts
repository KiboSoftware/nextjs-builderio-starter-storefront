export const ProductCardStyles = {
  main: {
    width: '100%',
    '& a': {
      textDecoration: 'none',
    },
  },
  cardRoot: {
    position: 'relative',
    display: { xs: 'block', sm: 'flex' },
    padding: '0.625rem',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 2px 16px 4px rgb(11 32 61 / 7%)',
      borderColor: 'primary.light',
    },
    '&:hover .MuiIconButton-root': {
      opacity: 1,
    },
  },
  quickView: {
    opacity: 0,
    width: '100%',
    marginTop: '1 rem',
  },
  cardMedia: {
    width: {
      xs: '100%',
      sm: '25%',
    },
    position: 'relative',
    zIndex: 1,
    mt: 3,
  },
  shopNow: { width: '100%', marginTop: '3.063rem' },
  hoveredButtons: {
    display: ' flex',
    alignItems: 'center',
    padding: 0.5,
    whiteSpace: 'nowrap',
    backgroundColor: '#E2E5EA',
    '&:hover': {
      backgroundColor: 'primary.main',
      '& > *': {
        color: 'secondary.light',
      },
    },
  },
  quickViewButton: {
    backgroundColor: 'primary.main',
    color: 'common.white',
    px: 2,
  },
  listIconButton: {
    backgroundColor: 'primary.light',
    width: 50,
    height: 50,
    borderRadius: '25px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    '&:hover': {
      opacity: 1,
      backgroundColor: 'primary.light',
    },
  },
  listNewTag: {
    width: 80,
    height: 41,
    top: '0px',
    position: 'absolute',
    left: '0px',
    zIndex: 2,
  },
  brandStyle: {
    backgroundColor: '#EDEDED',
    height: '31px',
    width: 'auto',
    display: 'flex',
    justifyContent: 'flexStart',
    paddingLeft: '10px',
    alignItems: 'end',
    marginBottom: '30px',
  },
  brandLable: {
    color: '#020027',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 'normal',
    fontFamily: 'Poppins',
  },
  brandLogoImage: {
    width: '127px',
    height: '45px',
    display: 'flex',
    top: '13px',
    right: '13px',
    position: 'absolute',
  },
  productTitle: {
    width: '85%',
    height: 'auto',
  },
}
