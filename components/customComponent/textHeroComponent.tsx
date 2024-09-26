/* eslint-disable import/order */
import txtCss from '@/components/customComponent/textHeroComponent.module.css'
import Image from 'next/image'
import Box from '@mui/material/Box'

const TextHero = (props: any) => {
  return (
    <Box className={txtCss.Container1}>
      <Box className={txtCss.imgContainer}>
        {/* First Image */}
        <Box className={txtCss.imageContainer1}>
          <Image src={props.FirstImage} alt="First Image" fill />
        </Box>

        {/* Second Image */}
        <Box className={txtCss.imageContainer2}>
          <Image src={props.SecondImage} alt="Second Image" fill />
        </Box>
      </Box>

      {/* Paragraph with Rich Text and Normal Text */}
      <Box className={txtCss.paragraphText}>
        {props.paragraphText ? (
          <p>
            <span dangerouslySetInnerHTML={{ __html: props.paragraphText }} />
          </p>
        ) : (
          ''
        )}
      </Box>
    </Box>
  )
}

export default TextHero
