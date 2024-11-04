// pages/api/fetchMetadata.ts

import * as cheerio from 'cheerio' // Import cheerio
import fetch from 'node-fetch' // Make sure to use node-fetch for SSR

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' })
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.error('Failed to fetch the URL:', response.statusText)
      throw new Error(`Failed to fetch the URL: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html) // Load HTML into cheerio

    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="title"]').attr('content') ||
      $('title').text() ||
      null
    const image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="image"]').attr('content') ||
      null
    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      null

    res.status(200).json({ title, image, description })
  } catch (error) {
    console.error('Error occurred:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({ error: errorMessage })
  }
}
