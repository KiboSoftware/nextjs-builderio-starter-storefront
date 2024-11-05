import { apiAuthClient } from '@/lib/api/util/api-auth-client'

export default async function handler(req, res) {
  const authToken = await apiAuthClient.getAccessToken()
  // Ensure method is POST
  const { purchaseOrderPayLoad } = req.body

  const baseUrl = process.env.KIBO_API_HOST
  const accountId = purchaseOrderPayLoad?.accountId

  const url = `https://${baseUrl}/api/commerce/customer/accounts/${accountId}/purchaseOrderAccount`
  const siteId = parseInt(process.env.KIBO_API_HOST_SiteId, 10)
  try {
    // Make the request to Purchase order
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        customerPurchaseOrderPaymentTerms: [
          { description: '10 Years', code: '10-years', siteId: siteId },
        ],
        accountId: accountId,
        isEnabled: true,
        creditLimit: 1000000,
        overdraftAllowanceType: 'Amount',
      }),
    })

    const data = await response.json()
    res.status(200).json({
      entityDetails: data,
      success: true,
    })
  } catch (error) {
    console.error('Error in Purchase Order', error)
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
}
