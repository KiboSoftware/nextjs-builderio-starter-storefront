/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
// eslint-disable-next-line import/order
import { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import 'next-i18next.config'
// eslint-disable-next-line import/order
import Router from 'next/router'
import NProgress from 'nprogress'

import { DefaultLayout } from '@/components/layout'
import { RQNotificationContextProvider } from '@/context'
import createEmotionCache from '@/lib/createEmotionCache'
import type { NextPageWithLayout } from '@/lib/types'

import '@/styles/global.css'
import '@splidejs/react-splide/css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type KiboAppProps = AppProps & {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = (props: KiboAppProps) => {
  const { publicRuntimeConfig } = getConfig()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { siteTitle, defaultTitle, defaultDescription } = publicRuntimeConfig?.metaData || {}
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout pageProps={pageProps}>{page}</DefaultLayout>)
  const pageTitle = `${siteTitle} | ${pageProps?.metaData?.title || defaultTitle}`
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageProps?.metaData?.title || defaultTitle} />
        <meta name="description" content={pageProps?.metaData?.description || defaultDescription} />
        <meta name="keywords" content={pageProps?.metaData?.keywords} />
        {pageProps?.metaData?.robots && (
          <meta name="robots" content={pageProps?.metaData?.robots} />
        )}
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        </style>
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <RQNotificationContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </RQNotificationContextProvider>
    </CacheProvider>
  )
}
export default appWithTranslation<KiboAppProps>(App)
