const createCheckoutAttribute = /* GraphQL */ `
  mutation createCheckoutAttribute(
    $checkoutId: String!
    $orderAttributeInput: [CrOrderAttributeInput]
  ) {
    createCheckoutAttribute(checkoutId: $checkoutId, orderAttributeInput: $orderAttributeInput) {
      fullyQualifiedName
      attributeDefinitionId
      values
    }
  }
`

export default createCheckoutAttribute
