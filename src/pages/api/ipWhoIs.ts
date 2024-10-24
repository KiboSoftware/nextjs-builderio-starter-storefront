import * as cookienext from 'cookies-next'

import GetThemeSettings from './getThemeSettings'

const IpWhoIs = async () => {
  try {
    const ipWhoIsApiKey = process.env.IP_WHO_IS_API_KEY
    const themeSettingsValues = await GetThemeSettings()

    if (!themeSettingsValues || !themeSettingsValues?.data) {
      console.error('Failed to load theme settings')
      return
    }

    const countryCode = themeSettingsValues.data.ipBasedCountryCode

    if (!cookienext.getCookie('ipBasedCountryCode')) {
      const expiryDate = new Date()
      expiryDate.setMonth(expiryDate.getMonth() + 1)

      // Make sure countryCode is not undefined or null
      if (countryCode && (countryCode === 'US' || countryCode === 'CA')) {
        cookienext.setCookie('ipBasedCountryCode', countryCode, {
          expires: expiryDate,
          secure: true,
        })
      } else {
        // Fallback to IP-based country detection
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()

        const res = await fetch(`https://ipwhois.app/json/${data.ip}?key=${ipWhoIsApiKey}`)
        const ipData = await res.json()

        cookienext.setCookie('ipBasedCountryCode', ipData.country_code, {
          expires: expiryDate,
          secure: true,
        })
      }
    }
  } catch (error) {
    console.error('Error fetching IP-based country code:', error)
  }
}

export default IpWhoIs
