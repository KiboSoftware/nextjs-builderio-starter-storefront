import { useEffect, useState } from 'react'

import {
  Box,
  GlobalStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import GetThemeSettings from '@/src/pages/api/getThemeSettings'

const styles = {
  a: {
    color: '#30299A',
    textDecoration: 'underline',
  },
}

// Define TypeScript types
interface ApplicationRange {
  Application: string
  ApplicationDilutionRange: string
}

interface ThemeMapping {
  applId: string
  longName: string
}

const ProductApplications = (props: any) => {
  const { product } = props

  const [themeCodeMapping, setThemeCodeMapping] = useState<ThemeMapping[]>([])
  const [applicationText, setApplicationText] = useState<string | null>(null)
  const [applicationTextVariant, setApplicationTextVariant] = useState<string | null>(null)
  const [applicationDilutionRange, setApplicationDilutionRange] = useState<ApplicationRange[]>([])
  const [newArray, setNewArray] = useState<ApplicationRange[]>([])
  const [showView, setShowView] = useState(false)

  // Update state from product properties
  useEffect(() => {
    const properties = product?.properties || []
    const getApplicationText = properties.find(
      (data: any) => data.attributeFQN === 'tenant~application-text'
    )
    const getApplicationTextVariant = properties.find(
      (data: any) => data.attributeFQN === 'tenant~application-text-variant'
    )
    const getApplicationDilutionRange = properties.find(
      (data: any) => data.attributeFQN === 'tenant~application-dilution-range'
    )

    setApplicationText(getApplicationText?.values[0]?.stringValue || null)
    setApplicationTextVariant(getApplicationTextVariant?.values[0]?.stringValue || null)
    setApplicationDilutionRange(
      JSON.parse(getApplicationDilutionRange?.values[0]?.stringValue || '[]')
    )

    const hasRelevantData =
      !!getApplicationText || !!getApplicationTextVariant || !!getApplicationDilutionRange
    setShowView(hasRelevantData)
  }, [product])

  // Generate updated array when dependencies change
  useEffect(() => {
    const updateNewArray = () => {
      if (!applicationDilutionRange.length || !themeCodeMapping.length) return

      const updatedArray = applicationDilutionRange.map((data) => {
        const matchedItem = themeCodeMapping.find(
          (item) => data?.Application?.toLowerCase() === item?.applId?.toLowerCase()
        )
        return matchedItem
          ? {
              Application: matchedItem?.longName,
              ApplicationDilutionRange: data?.ApplicationDilutionRange,
            }
          : data
      })

      setNewArray(updatedArray)
    }

    updateNewArray()
  }, [applicationDilutionRange, themeCodeMapping])

  // Fetch theme settings on mount
  useEffect(() => {
    async function fetchThemeSettings() {
      const settings = await GetThemeSettings()
      setThemeCodeMapping(settings?.data?.themeCodeMapping || [])
    }
    fetchThemeSettings()
  }, [])

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {showView && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: '10px' }}>
            Applications
          </Typography>

          {applicationText && (
            <Box
              sx={{
                marginBottom: '22px',
                color: `${grey[900]}`,
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{ color: '#020027' }}
                dangerouslySetInnerHTML={{
                  __html: applicationText,
                }}
              />
            </Box>
          )}

          {applicationTextVariant && (
            <Box
              sx={{
                marginBottom: '22px',
                color: `${grey[900]}`,
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{ color: '#020027' }}
                dangerouslySetInnerHTML={{
                  __html: applicationTextVariant,
                }}
              />
            </Box>
          )}

          {applicationDilutionRange && (
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 0,
                boxShadow: '0px 1px 0px rgba(0,0,0,0.14),0px 1px 0px rgba(0,0,0,0.12)',
              }}
            >
              <Table>
                <TableBody>
                  {newArray.map((data: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell
                        variant="head"
                        sx={{
                          width: '25%',
                          backgroundColor: `${grey[300]}`,
                          color: `${grey[900]}`,
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          fontWeight: 500,
                          lineHeight: '42px',
                          padding: 0,
                          paddingLeft: '20px',
                        }}
                      >
                        {data?.Application}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: '75%',
                          color: `${grey[900]}`,
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          fontWeight: 300,
                          lineHeight: '42px',
                          padding: 0,
                          paddingLeft: '20px',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: data?.ApplicationDilutionRange,
                        }}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <GlobalStyles styles={styles} />
        </Box>
      )}
    </Box>
  )
}

export default ProductApplications
