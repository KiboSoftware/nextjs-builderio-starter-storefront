export const StandardShippingStepStyle = {
  primaryButton: {
    backgroundColor: 'primary.main',
    color: '#fff',
    borderRadius: '0px 26px',
    border: '1px solid',
    borderColor: 'primary.main',
    display: 'inline-flex',
    padding: '12px 38px',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: { md: '49px' },
    '&:hover': {
      backgroundColor: 'primary.light',
    },
  },
  secondaryButton: {
    backgroundColor: 'secondary.light',
    color: 'primary.main',
    borderRadius: '0px 26px',
    border: '1px solid',
    display: 'inline-flex',
    // padding: '12px 38px',  //This is defined directly in the inline sx because diference in paddings of 2 secondary buttons in use
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: 'fitContent !important',
    height: { md: '49px' },
    '&:hover': {
      backgroundColor: 'secondary.main',
      // border: '1px solid secondary.main',
      color: 'primary.light',
    },
  },
}
