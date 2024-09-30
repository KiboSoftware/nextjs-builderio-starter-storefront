import { Builder } from '@builder.io/react'

import IconTextButton from '@/components/customComponent/iconAndTextButton'
import Button from '@/components/customComponent/textButton'
import TextHero from '@/components/customComponent/textHeroComponent'

const BuilderComponents = () => {
  Builder.registerComponent(Button, {
    name: 'textButton',
    inputs: [{ name: 'textButton', type: 'text' }],
  })
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
  Builder.registerComponent(TextHero, {
    name: 'Home Page Hero Banner Component',
    inputs: [
      {
        name: 'FirstImage',
        type: 'file',
        friendlyName: 'First Image',
      },
      {
        name: 'SecondImage',
        type: 'file',
        friendlyName: 'Second Image',
      },
      {
        name: 'paragraphText',
        type: 'richText', // Rich text editor
        friendlyName: 'Text with Rich Formatting',
        helperText: 'You can add normal text in the same paragraph.',
      },
    ],
  })
}
export default BuilderComponents
