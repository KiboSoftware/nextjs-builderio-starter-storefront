import { Box, Grid } from '@mui/material'
import getConfig from 'next/config'
import Link from 'next/link'

const { publicRuntimeConfig } = getConfig()

const styles = {
  flexDirectionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  iconCss: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: '10px',
    color: 'primary.main',
  },
  iconText: {
    display: 'inline-block',
    color: 'primary.main',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '25px',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationSkipInk: 'none',
    textDecorationThickness: 'auto',
    textUnderlineOffset: 'auto',
    textUnderlinePosition: 'from-font',
    '&:hover': {
      textDecorationLine: 'none',
    },
  },
}

const PdpIconAttributes = (props: any) => {
  const { product } = props
  const properties = product.properties
  return (
    <Grid container spacing={2} mb={2}>
      {properties.map((data: any) => {
        return data.attributeFQN === publicRuntimeConfig?.validationTextAttrFQN ? (
          <Grid item xs={6} md={3} sm={3}>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Box sx={styles.flexDirectionRow}>
                <Box sx={{ ...styles.iconCss, color: '#348345' }}>
                  <span className="material-symbols-outlined">verified</span>
                </Box>
                <Box
                  sx={{
                    ...styles.iconText,
                    color: '#348345',
                  }}
                >
                  Validated
                </Box>
              </Box>
            </Link>
          </Grid>
        ) : null
      })}

      <Grid item xs={6} md={3} sm={3}>
        <Link href="" style={{ textDecoration: 'none' }}>
          <Box sx={styles.flexDirectionRow}>
            <Box sx={styles.iconCss}>
              <span className="material-symbols-outlined">draft</span>
            </Box>
            <Box sx={styles.iconText}>Documents</Box>
          </Box>
        </Link>
      </Grid>

      {properties.map((data: any) => {
        return data.attributeFQN === publicRuntimeConfig?.citationCountVariantAttrFQN ? (
          data.values[0].value > 0 ? (
            <Grid item xs={6} md={3} sm={3}>
              <Link href="#" style={{ textDecoration: 'none' }}>
                <Box sx={styles.flexDirectionRow}>
                  <Box sx={styles.iconCss}>
                    <span className="material-symbols-outlined">note_stack</span>
                  </Box>
                  <Box sx={styles.iconText}>Citations({data.values[0].value})</Box>
                </Box>
              </Link>
            </Grid>
          ) : null
        ) : null
      })}

      {properties.map((data: any) => {
        return data.attributeFQN === publicRuntimeConfig?.mfgCertificationAttrFQN ? (
          data.values[0].value === 'ISO13485' ? (
            <Grid item xs={6} md={3} sm={3}>
              <Box sx={styles.flexDirectionRow}>
                <Box sx={styles.iconCss}>
                  <span className="material-symbols-outlined">task_alt</span>
                </Box>
                <Box sx={styles.iconText}>{data.values[0].value}</Box>
              </Box>
            </Grid>
          ) : null
        ) : null
      })}

      {properties.map((data: any) => {
        return data.attributeFQN === publicRuntimeConfig?.mfgAvailabilityAttrFQN ? (
          data.values[0].value === 'gmp_ready' ? (
            <Grid item xs={6} md={3} sm={3}>
              <Box sx={styles.flexDirectionRow}>
                <Box sx={styles.flexDirectionRow}>
                  <Box sx={styles.iconCss}>
                    <span className="material-symbols-outlined">manufacturing</span>
                  </Box>
                  <Box sx={styles.iconText}>{data.values[0].stringValue}</Box>
                </Box>
              </Box>
            </Grid>
          ) : null
        ) : null
      })}

      {properties.map((data: any) => {
        return data.attributeFQN === publicRuntimeConfig?.mfgAvailabilityAttrFQN ? (
          data.values[0].value === 'Lyo-Ready' ? (
            <Grid item xs={6} md={3} sm={3}>
              <Box sx={styles.flexDirectionRow}>
                <Box sx={styles.flexDirectionRow}>
                  <Box sx={styles.iconCss}>
                    <span className="material-symbols-outlined">grain</span>
                  </Box>
                  <Box sx={styles.iconText}>{data.values[0].stringValue}</Box>
                </Box>
              </Box>
            </Grid>
          ) : null
        ) : null
      })}
    </Grid>
  )
}

export default PdpIconAttributes
