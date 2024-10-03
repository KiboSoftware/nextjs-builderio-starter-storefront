import { useEffect, useState } from 'react'

import { BuilderComponent, builder } from '@builder.io/react'

const FooterSection = () => {
  const [footerContent, setFooterContent] = useState(null)

  useEffect(() => {
    async function fetchFooterContent() {
      const content = await builder.get('footer').toPromise()
      setFooterContent(content)
    }

    fetchFooterContent()
  }, [])

  return (
    <footer>
      {footerContent ? (
        <BuilderComponent model="footer" content={footerContent} />
      ) : (
        <p>Loading footer...</p>
      )}
    </footer>
  )
}

export default FooterSection
