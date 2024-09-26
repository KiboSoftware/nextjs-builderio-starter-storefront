/* eslint-disable import/order */
import txtCss from '@/components/customComponent/textHeroComponent.module.css'

import Image from 'next/image'
const TextHero = (props: any) => {
  return (
    <div className={txtCss.Container1}>
      <div className={txtCss.imgContainer}>
        {/* First Image */}
        <div className={txtCss.imageContainer1}>
          <Image src={props.FirstImage} alt="Example Image" fill />
        </div>

        {/* Second Image */}
        <div className={txtCss.imageContainer2}>
          <Image src={props.SecondImage} alt="Example Image" fill />
        </div>
      </div>

      {/* Paragraph with Rich Text and Normal Text */}
      <div className={txtCss.paragraphText}>
        {props.paragraphText ? (
          <p>
            {/* Assuming rich text content with mixed formatting */}
            <span dangerouslySetInnerHTML={{ __html: props.paragraphText }} />
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default TextHero
