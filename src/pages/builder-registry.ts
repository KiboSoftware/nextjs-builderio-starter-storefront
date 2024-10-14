import { Builder } from '@builder.io/react'

import IconTextButton from '@/components/customComponent/iconAndTextButton'
import LeftTextHero from '@/components/customComponent/leftTextHeroComponent'
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
  Builder.registerComponent(LeftTextHero, {
    name: 'Left Text Hero Component',
    inputs: [
      {
        name: 'leftTextImage',
        type: 'file',
        friendlyName: 'Image',
        helperText: 'Upload the image for the component.',
      },
      {
        name: 'leftTextHeading',
        type: 'text',
        friendlyName: 'Heading Text',
        helperText: 'Heading Text.',
      },
      {
        name: 'backgroundImage',
        type: 'file',
        friendlyName: 'Background Image',
        helperText: 'Upload the background image for the leftTxtBox (optional).',
      },
      {
        name: 'leftTextParagraph',
        type: 'text',
        friendlyName: 'Paragraph Text',
        helperText: 'Paragraph Text.',
      },
      {
        name: 'primaryButtonText',
        type: 'text',
        friendlyName: 'Primary Button Text',
        helperText: 'Primary Button Text.',
      },
      {
        name: 'primaryButtonUrl',
        type: 'url',
        friendlyName: 'Primary Button URL',
        helperText: 'Primary Button URL.',
      },
      {
        name: 'secondaryButtonText',
        type: 'text',
        friendlyName: 'Secondary Button Text',
        helperText: 'Secondary Button Text.',
      },
      {
        name: 'secondaryButtonUrl',
        type: 'url',
        friendlyName: 'Secondary Button URL',
        helperText: 'Secondary Button URL.',
      },
    ],
  })
}
export default BuilderComponents
