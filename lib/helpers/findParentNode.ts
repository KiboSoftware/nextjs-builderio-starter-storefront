import type { Maybe, MenuItem, PrCategory } from '../gql/types'

export const findParentNode = (
  items: Maybe<MenuItem>[],
  categoryCode?: string | null,
  parent: Maybe<MenuItem | null> = null
): Maybe<MenuItem | undefined | null> => {
  for (const item of items) {
    const res: Maybe<MenuItem | undefined | null> =
      item?.categoryCode === categoryCode
        ? parent
        : item?.childCategory &&
          findParentNode(item?.childCategory as MenuItem[], categoryCode, item)

    if (res || res === null) {
      return res
    }
  }

  console.log(`No parent found for code: ${categoryCode}`)
  return undefined
}
