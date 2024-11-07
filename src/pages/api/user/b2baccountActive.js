import { apiAuthClient } from '@/lib/api/util/api-auth-client'

export default async function handler(req, res) {
  const authToken = await apiAuthClient.getAccessToken()
  // Ensure method is POST
  const { purchaseOrderPayLoad } = req.body

  const baseUrl = process.env.KIBO_API_HOST
  const accountId = purchaseOrderPayLoad?.accountId

  const url = `https://${baseUrl}/api/commerce/customer/b2baccounts/${accountId}/status/approve`

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
    })
    const data = await response.json()
    res.status(200).json({
      success: true,
      data: data,
    })
  } catch (error) {
    console.error('Error in Approving Account', error)
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}
