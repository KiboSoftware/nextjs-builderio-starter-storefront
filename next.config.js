/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const LOCATION_COOKIE = 'kibo_purchase_location'
const DEFAULT_WISHLIST_NAME = 'default-wishlist'

module.exports = {
  reactStrictMode: false,
  // This config ensures that when you import an SVG file, it will be treated as a React component.
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
    emotion: true,
  },
  i18n,
  images: {
    domains: [
      'd1slj7rdbjyb5l.cloudfront.net',
      'cdn-tp1.mozu.com',
      'cdn-tp2.mozu.com',
      'cdn-tp3.mozu.com',
      'cdn-tp4.mozu.com',
      'cdn-sb.mozu.com',
      'cdn-stg1.mozu.com',
      'encrypted-tbn0.gstatic.com',
      'images.ctfassets.net',
      'cdn.builder.io',
      'cdn-sb.euw1.kibocommerce.com',
      'https://www.fortislife.com/',
      'fortislife.cloud.akeneo.com',
    ],
    deviceSizes: [
      100, 240, 340, 380, 400, 450, 500, 550, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
  },
  publicRuntimeConfig: {
    currentUrl: process.env.CURRENT_DOMAIN,
    metaData: {
      siteTitle: 'Kibo Commerce',
      defaultTitle: 'Storefront',
      defaultDescription: 'Kibo Commerce Storefront',
    },
    recaptcha: {
      reCaptchaKey: process.env.RECAPTCHA_KEY,
      reCaptchaSecret: process.env.RECAPTCHA_SECRET,
      reCaptchaThreshold: process.env.RECAPTCHA_THRESHOLD,
    },
    allowInvalidAddresses: true,
    customerAddressesPageSize: 50,
    shippingAddressPageSize: 5,
    billingAddressPageSize: 5,
    paymentMethodPageSize: 5,
    b2bProductSearchPageSize: 16,
    badgeAttributeFQN: 'Tenant~badge',
    variantProductAttributeName: 'tenant~variant-product-name',
    brandAttrName: 'tenant~brand',
    catalogNumberAttr: 'tenant~plp-catalog-number',
    newProductAttrName: 'tenant~new-product',
    resourceTypeName: 'tenant~resourcetype',
    occasionAttributeFQN: 'Tenant~occasion',
    colorAttributeFQN: 'Tenant~Color',
    sizeAttributeFQN: 'Tenant~Size',
    validationTextAttrFQN: 'tenant~validation-text',
    citationCountVariantAttrFQN: 'tenant~citation-count-variant',
    mfgCertificationAttrFQN: 'tenant~mfgcertification',
    mfgAvailabilityAttrFQN: 'tenant~mfgavailability',
    paymentTypes: [
      {
        id: 'PurchaseOrder',
        name: 'Purchase Order',
      },
      {
        id: 'CreditCard',
        name: 'Credit / Debit Card',
      },
    ],
    // countries: ['US', 'AT', 'DE', 'NL', 'CA'],
    countries: ['US'],
    states: [
      { id: 'AL', name: 'Alabama' },
      { id: 'AK', name: 'Alaska' },
      { id: 'AZ', name: 'Arizona' },
      { id: 'AR', name: 'Arkansas' },
      { id: 'CA', name: 'California' },
      { id: 'CO', name: 'Colorado' },
      { id: 'CT', name: 'Connecticut' },
      { id: 'DE', name: 'Delaware' },
      { id: 'DC', name: 'District Of Columbia' },
      { id: 'FL', name: 'Florida' },
      { id: 'GA', name: 'Georgia' },
      { id: 'HI', name: 'Hawaii' },
      { id: 'ID', name: 'Idaho' },
      { id: 'IL', name: 'Illinois' },
      { id: 'IN', name: 'Indiana' },
      { id: 'IA', name: 'Iowa' },
      { id: 'KS', name: 'Kansas' },
      { id: 'KY', name: 'Kentucky' },
      { id: 'LA', name: 'Louisiana' },
      { id: 'ME', name: 'Maine' },
      { id: 'MD', name: 'Maryland' },
      { id: 'MA', name: 'Massachusetts' },
      { id: 'MI', name: 'Michigan' },
      { id: 'MN', name: 'Minnesota' },
      { id: 'MS', name: 'Mississippi' },
      { id: 'MO', name: 'Missouri' },
      { id: 'MT', name: 'Montana' },
      { id: 'NE', name: 'Nebraska' },
      { id: 'NV', name: 'Nevada' },
      { id: 'NH', name: 'New Hampshire' },
      { id: 'NJ', name: 'New Jersey' },
      { id: 'NM', name: 'New Mexico' },
      { id: 'NY', name: 'New York' },
      { id: 'NC', name: 'North Carolina' },
      { id: 'ND', name: 'North Dakota' },
      { id: 'OH', name: 'Ohio' },
      { id: 'OK', name: 'Oklahoma' },
      { id: 'OR', name: 'Oregon' },
      { id: 'PA', name: 'Pennsylvania' },
      { id: 'RI', name: 'Rhode Island' },
      { id: 'SC', name: 'South Carolina' },
      { id: 'SD', name: 'South Dakota' },
      { id: 'TN', name: 'Tennessee' },
      { id: 'TX', name: 'Texas' },
      { id: 'UT', name: 'Utah' },
      { id: 'VT', name: 'Vermont' },
      { id: 'VA', name: 'Virginia' },
      { id: 'WA', name: 'Washington' },
      { id: 'WV', name: 'West Virginia' },
      { id: 'WI', name: 'Wisconsin' },
      { id: 'WY', name: 'Wyoming' },
    ],
    debounceTimeout: '1000',
    productListing: {
      sortOptions: [
        { value: 'Relevance', id: '' },
        { value: 'Price: Low to High', id: 'price asc' },
        { value: 'Price: High to Low', id: 'price desc' },
        { value: 'Date Added: Most Recent First', id: 'createDate desc' },
        { value: 'Date Added: Most Recent Last', id: 'createDate asc' },
      ],
      // For Infinite Scroll use this.
      pageSize: 15,
      // For Pagination use this.
      // pageSize: [15, 30, 50],
    },
    B2BQuotes: {
      sortOptions: [
        { value: 'Expiry Date Asc', id: 'expirationDate asc' },
        { value: 'Expiry Date Desc', id: 'expirationDate desc' },
        { value: 'Quote number: Low-High', id: 'number asc' },
        { value: 'Quote number: High-Low', id: 'number desc' },
      ],
      pageSize: 5,
    },
    orderHistory: {
      startIndex: 0,
      pageSize: 20,
    },
    ratingAttrFQN: `tenant~rating`,
    userCookieKey: process.env.KIBO_USER_COOKIE_KEY || 'kibo_at',
    maxCookieAge: 5 * 24 * 60 * 60 * 1000, //5 days
    fulfillmentOptions: [
      {
        value: 'DirectShip',
        code: 'DS',
        name: 'Direct Ship',
        label: 'Ship to Home',
        details: 'Available to Ship',
        unavailableDetails: 'Unavailable to Ship',
        isRequired: false,
        shortName: 'Ship',
      },
      {
        value: 'InStorePickup',
        code: 'SP',
        name: 'In Store Pickup',
        label: 'Pickup in Store',
        details: 'Available at',
        unavailableDetails: 'Unavailable at',
        isRequired: false,
        shortName: 'Pickup',
      },
    ],
    storeLocator: {
      defaultRange: '160934',
    },
    storeLocationCookie: LOCATION_COOKIE,
    defaultWishlistName: DEFAULT_WISHLIST_NAME,
    pciHost: process.env.KIBO_PCI_HOST,
    apiHost: process.env.KIBO_API_HOST,
    isMultiShipEnabled: false,
    shipOptions: [
      {
        value: 'ShipToHome',
        code: 'STH',
        name: 'Ship to Home',
        label: 'Ship to Home',
        shortName: 'SingleShip',
      },
      {
        value: 'ShipToMultiAddress',
        code: 'STMA',
        name: 'Ship to more than one address',
        label: 'Ship to more than one address',
        shortName: 'MultiShip',
      },
    ],
    isSubscriptionEnabled: true,
    b2bUserListing: {
      startIndex: 0,
      pageSize: 5,
      defaultFilter: 'isRemoved eq false',
      defaultStartIndex: 0,
      defaultPageSize: 5,
      defaultPage: 1,
    },
    b2bList: {
      startIndex: 0,
      pageSize: 5,
      sortBy: 'createDate desc',
      filter: '',
    },
    b2bUserRoles: [
      { roleName: 'Admin', roleId: 1 },
      { roleName: 'Purchaser', roleId: 2 },
      { roleName: 'Nonpurchaser', roleId: 3 },
    ],
    userFormRadioOptions: [
      {
        label: 'Admin',
        name: 'role',
        value: 'Admin',
      },
      {
        label: 'Purchaser',
        name: 'role',
        value: 'Purchaser',
      },
      {
        label: 'Non Purchaser',
        name: 'role',
        value: 'Nonpurchaser',
      },
    ],
    builderIO: {
      apiKey: process.env.BUILDER_IO_API_KEY,
      modelKeys: {
        defaultPage: 'page',
        productDetailSection: 'product-detail-section',
        cartBottomSection: 'cart-bottom-content-section',
        cartTopSection: 'cart-top-content-section',
        categoryTopSection: 'category-section',
        cartEmptySection: 'cart-empty-content-section',
      },
    },
    inventorySettings: {
      buffer: 2,
      USShippingCutOffTime: '15:00-06:00',
      USMonday: true,
      USTuesday: true,
      USWednesday: true,
      USThursday: true,
      USFriday: false,
      USSaturday: false,
      USSunday: false,
      CAShippingCutOffTime: '19:50+06:00',
      CAMonday: true,
      CATuesday: false,
      CAWednesday: true,
      CAThursday: true,
      CAFriday: true,
      CASaturday: false,
      CASunday: false,
      nonShippingDates:
        '11/27/2024, 11/28/2024, 12/23/2024, 12/24/2024, 12/25/2024, 12/30/2024, 12/31/2024, 01/01/20245, 01/20/2025, 02/17/2025, 05/26/2025, 06/19/2025, 07/03/2025, 07/04/2025, 09/01/2025, 11/27/2025, 11/28/2025, 12/24/2025, 12/25/2025',
      nonShippingDatesCanada: '',
      discontinuedProduct: 'Product has been discontinued',
    },
  },
  serverRuntimeConfig: {
    currentUrl: process.env.CURRENT_DOMAIN,
    revalidate: process.env.GLOBAL_PAGE_REVALIDATE || 30,
    pageSize: 1000,
    cacheKey: 'categoryTree',
    cacheTimeOut: 10000,
    isMultiShipEnabled: false,
    pageConfig: {
      productDetail: {
        staticPathsMaxSize: 10,
      },
      productListing: {
        staticPathsMaxSize: 10,
      },
    },
    recaptcha: {
      reCaptchaKey: process.env.RECAPTCHA_KEY,
      reCaptchaSecret: process.env.RECAPTCHA_SECRET,
      reCaptchaThreshold: process.env.RECAPTCHA_THRESHOLD,
    },
    B2BQuotes: {
      pageSize: 5,
    },
  },
  staticPageGenerationTimeout: 1000,
  experimental: {
    workerThreads: false,
  },
  async rewrites() {
    //custom routes
    return [
      {
        source: '/products/:categoryCode/:productSlug/:productCode', // Match product URLs under categories
        destination: '/product/:productCode', // Destination for the product page
      },
      {
        source: '/p/:productCode', // Match product URLs under categories
        destination: '/product/:productCode', // Destination for the product page
      },
    ]
  },
}
