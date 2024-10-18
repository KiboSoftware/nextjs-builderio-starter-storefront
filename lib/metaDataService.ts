// lib/metadataService.ts

export async function fetchMetadata(
  url: string
): Promise<{ title: string | null; image: string | null; description: string | null }> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch the URL')
  }

  const html = await response.text()

  // Use DOMParser to parse the HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const title =
    doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    doc.querySelector('title')?.textContent ||
    null
  const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || null
  const description =
    doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || null

  return { title, image, description }
}
