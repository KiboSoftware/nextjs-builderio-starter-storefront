import { useEffect, useState } from 'react'

import { BuilderComponent, builder } from '@builder.io/react'
import { useRouter } from 'next/router'

import CheckoutFooter from '@/components/checkout/CheckoutFooter/CheckoutFooter'

const FooterSection = () => {
  const [footerContent, setFooterContent] = useState(null)
  const [isCheckout, setIsCheckout] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchFooterContent() {
      const content = await builder.get('footer').toPromise()
      setFooterContent(content)
    }

    fetchFooterContent()
    setIsCheckout(router.pathname === '/checkout/[checkoutId]' ? true : false)
  }, [])

  return (
    <footer>
      {footerContent ? (
        isCheckout ? (
          <CheckoutFooter />
        ) : (
          <BuilderComponent model="footer" content={footerContent} />
        )
      ) : (
        <p>Loading footer...</p>
      )}
    </footer>
  )
}

export default FooterSection
