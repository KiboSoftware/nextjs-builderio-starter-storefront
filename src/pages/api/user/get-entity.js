import { apiAuthClient } from '@/lib/api/util/api-auth-client'

export default async function handler(req, res) {
  const authToken = await apiAuthClient.getAccessToken()
  // Ensure method is POST
  const { entityPayLoad } = req.body

  const baseUrl = process.env.KIBO_API_HOST
  const entityListFullName = entityPayLoad?.entityListFullName
  const id = entityPayLoad?.id
  const url = `https://${baseUrl}/api/platform/entitylists/${entityListFullName}/entities/${id}`

  try {
    // Make the request to Get Entity Details
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
    })

    const data = await response.json()
    res.status(200).json({
      entityDetails: data,
    })
  } catch (error) {
    console.error('Error in recaptcha validation', error)
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}
