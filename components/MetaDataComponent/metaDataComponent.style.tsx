export const buttonStyle = {
  featuredButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '388px',
    height: 'auto',
    position: 'relative',
    flexDirection: { md: 'row', sm: 'column', xs: 'column' },
    padding: '0 20px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  imageContainer: {
    width: '100%',
    height: '255px',
    borderRadius: '5px',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
    top: '10%',
    transition: 'box-shadow 0.3s ease',
    boxShadow: 'none',
    '@media (min-width: 992px) and (max-width: 999px)': {
      top: '5%',
    },
  },
  image: {
    width: '100%',
    height: '255px',
    objectFit: 'cover',
  },
  featuredButtonContent: {
    width: '100%', //
    height: '374px',
    position: 'relative',
    top: { md: '0px', sm: '-15px', xs: '-15px' },
    '@media (min-width: 900px) and (max-width: 999px)': {
      top: '-45px',
    },
    zIndex: 1,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
    '&:hover': {
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    },
  },

  /* Primary Style */
  primaryHeadingText: {
    width: '100%',
    height: 'auto',
    color: '#30299A',
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '25px',
    fontFamily: 'Poppins',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '20px',
    paddingLeft: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#4C47C4',
    },
  },
  primaryParagraphText: {
    width: '347px',
    height: 'auto',
    color: '#30299A',
    fontSize: '16px',
    fontWeight: '300',
    lineHeight: '25px',
    fontFamily: 'Poppins',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '24px',
    paddingRight: '20px',
    paddingLeft: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#4C47C4',
    },
  },
  arrowPrimaryButton: {
    width: '61px',
    height: '74px',
    color: '#30299A',
    borderRadius: '26px 0px',
    border: '1px solid #30299A',
    backgroundColor: '#30299A',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#4C47C4',
    },
  },
  primaryArrowIcon: {
    color: '#fff',
  },

  /* Secondary Style */
  secondaryHeadingText: {
    width: '347px',
    height: 'auto',
    color: '#30299A',
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '25px',
    fontFamily: 'Poppins',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '95px',
    paddingRight: '20px',
    paddingLeft: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#4C47C4',
    },
  },
  secondaryParagraphText: {
    width: '347px',
    height: 'auto',
    color: '#30299A',
    fontSize: '16px',
    fontWeight: '300',
    lineHeight: '25px',
    fontFamily: 'Poppins',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '24px',
    paddingRight: '20px',
    paddingLeft: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#4C47C4',
    },
  },
  arrowSecondaryButton: {
    width: '61px',
    height: '74px',
    color: '#E3E2FF',
    borderRadius: '26px 0px',
    backgroundColor: '#E3E2FF',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#4C47C4',
    },
  },
  secondaryArrowIcon: {
    color: '#30299A',
  },

  /* Primary-specific hover with upward movement */
  primaryHoverEffect: {
    '&:hover': {
      transform: 'translateY(-5%)',
    },
  },
}
