export const megaMenuContainer = {
  display: 'flex',
  backgroundColor: 'common.white', // Light grey background
  border: '1px solid #e0e0e0', // Light border to match the container
  paddingLeft: '35px',
  paddingRight: '35px',
  paddingTop: '28px',
  paddingBottom: '35px',
  borderRadius: '8px', // Rounded corners
  width: '100%',
  minHeight: '400px',
}

export const menuSection = {
  paddingTop: '28px !important',
  paddingBottom: '28px !important',
}

export const dividerStyle = {
  width: '100% !important',
  marginTop: '10px',
  marginLeft: '7px',
  marginRight: '7px',
}

export const menuColumn = {
  paddingRight: '16px',
  flex: 1,
}

export const menuItem = {
  cursor: 'pointer',
  color: 'primary.main', // Dark blue text color
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Align the arrow to the right
  height: '44px',

  '&.active, &:hover': {
    backgroundColor: 'secondary.main',
    borderLeft: '5px solid #30299A !important',
  },
}

export const subMenuSection = {
  height: '100%',
  paddingTop: '28px !important',
  paddingBottom: '28px !important',
  backgroundColor: 'secondary.main',
}

export const submenuColumn = {
  paddingLeft: '14px',
  backgroundColor: '#e7e7f6', // Light blue background
  borderRadius: '8px', // Rounded corners
  padding: '16px', // Padding inside the submenu
  flex: 2,
}

export const featuredContentColumn = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '7px',
  marginBottom: '35px',
}

export const featuredText = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '130px',
  marginLeft: '15px',
  width: '50%',
}

export const submenuItem = {
  padding: '8px 0',
  textDecoration: 'underline',
  textDecorationColor: '#30299A',
  textUnderlineOffset: '6px',

  '&:hover': {
    cursor: 'pointer',
  },
}

export const arrowIcon = {
  fontSize: '1.2em',
  marginLeft: '8px',
  paddingRight: '64px',
  display: 'flex',
}

export const hoveredArrowIcon = {
  fontSize: '1.1em',
  marginLeft: '8px',
  paddingRight: '58px',
  display: 'flex',
}
