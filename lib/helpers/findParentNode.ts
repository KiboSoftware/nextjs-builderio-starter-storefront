import type { Maybe, MenuItem, PrCategory } from '../gql/types'

export const findParentNode = (
  items: Maybe<MenuItem>[],
  categoryCode?: string | null,
  parent: Maybe<MenuItem | null> = null
): Maybe<MenuItem | undefined | null> => {
  /* looping through all the categories to find the provided categoryCode.
      If a match is found and it's the root label, return null else return the immediate parent.
      findParent will be called recursively */
  for (const item of items) {
    const res: Maybe<MenuItem | undefined | null> =
      item?.categoryCode === categoryCode
        ? parent
        : item?.childCategory &&
          findParentNode(item?.childCategory as MenuItem[], categoryCode, item)
    if (res || res === null) return res
  }
}
