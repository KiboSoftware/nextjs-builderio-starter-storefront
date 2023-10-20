/* eslint-disable import/no-named-as-default */

import { productInfo } from '../fragments'

const getProductQuery = /* GraphQL */ `
  ${productInfo}

  query product($productCode: String!) {
    product(productCode: $productCode) {
      ...productInfo
      productCollectionMembers {
        memberKey {
          value
        }
      }
    }
  }
`
export default getProductQuery
