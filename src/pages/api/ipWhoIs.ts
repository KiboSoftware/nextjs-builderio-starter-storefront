import * as cookienext from 'cookies-next'

import GetThemeSettings from './getThemeSettings'

const IpWhoIs = async () => {
  const themeSettingsValues = await GetThemeSettings()
  const countryCode = themeSettingsValues?.data?.ipBasedCountryCode
  if (!cookienext.getCookie('ipBasedCountryCode')) {
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 1)
    if (countryCode === 'US' || countryCode === 'CA') {
      cookienext.setCookie('ipBasedCountryCode', countryCode, {
        expires: expiryDate,
        secure: true,
      })
    } else {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()

      const res = await fetch(`https://ipwhois.app/json/${data.ip}?key=TvQbfSbE46pxtkHP`)
      const ipData = await res.json()

      cookienext.setCookie('ipBasedCountryCode', ipData.country_code, {
        expires: expiryDate,
        secure: true,
      })
    }
  }
}

export default IpWhoIs
