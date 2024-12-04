const updateCheckoutAttributes = /* GraphQL */ `
  mutation updateCheckoutAttributes(
    $checkoutId: String!
    $removeMissing: Boolean
    $orderAttributeInput: [CrOrderAttributeInput]
  ) {
    updateCheckoutAttributes(
      checkoutId: $checkoutId
      removeMissing: $removeMissing
      orderAttributeInput: $orderAttributeInput
    ) {
      fullyQualifiedName
      attributeDefinitionId
      values
    }
  }
`

export default updateCheckoutAttributes
