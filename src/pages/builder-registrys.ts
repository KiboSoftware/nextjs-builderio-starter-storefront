import { Builder } from '@builder.io/react'

import IconTextButton from '@/components/customComponent/iconAndTextButton'

const BuilderComponents = () => {
  Builder.registerComponent(IconTextButton, {
    name: 'Icon And Text Button',

    inputs: [
      {
        name: 'title',
        type: 'text',
      },
      {
        name: 'Icon',
        type: 'file',
      },
    ],

    image:
      'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bef27ee40d24f3b88239fd7e616f82a',
  })
}
export default BuilderComponents
