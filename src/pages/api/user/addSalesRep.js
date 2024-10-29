import { apiAuthClient } from '@/lib/api/util/api-auth-client'

export default async function handler(req, res) {
  const authToken = await apiAuthClient.getAccessToken()
  const { purchaseOrderPayLoad } = req.body

  const baseUrl = process.env.KIBO_API_HOST
  const accountId = purchaseOrderPayLoad?.accountId

  const url = `https://${baseUrl}/api/commerce/customer/b2baccounts/${accountId}/addsalesreps`

  try {
    // Make the request to Add Sails Rep
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify([process.env.SalesRep_Id]),
    })
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.error('Error in Adding Sails Rep', error)
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}
