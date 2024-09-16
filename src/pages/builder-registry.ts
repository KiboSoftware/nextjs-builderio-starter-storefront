import { Builder } from '@builder.io/react'

import Button from '@/components/customComponent/textButton'
const BuilderComponents = () => {
  Builder.registerComponent(Button, {
    name: 'textButton',
    inputs: [{ name: 'textButton', type: 'text' }],
  })
}
export default BuilderComponents
