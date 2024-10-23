import builder from '@builder.io/react'

const GetThemeSettings = async () => {
  const content = await builder.get('theme-settings').toPromise()
  return content
}
export default GetThemeSettings
