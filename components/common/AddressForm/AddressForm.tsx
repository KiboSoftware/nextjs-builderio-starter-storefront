/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, FormControlLabel, Checkbox } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboSelect, KiboTextBox } from '@/components/common'
import { CountryCode } from '@/lib/constants'
import type { Address, ContactForm } from '@/lib/types'

interface AddressFormProps {
  contact?: ContactForm
  countries?: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  isAddressFormInDialog?: boolean
  setAutoFocus?: boolean
  validateForm: boolean
  showDefaultPaymentMethodCheckbox?: boolean
  onSaveAddress: (data: Address) => void
  onFormStatusChange?: (status: boolean) => void
  onDefaultPaymentChange?: (value: boolean) => void
}

interface Countries {
  name: string
  code: string
}

interface Province {
  name: string
  code: string
}

export const useFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object().shape({
    firstName: yup.string().required(t('this-field-is-required')),
    lastNameOrSurname: yup.string().required(t('this-field-is-required')),
    companyOrOrganization: yup.string().required(t('this-field-is-required')),
    address: yup.object().shape({
      address1: yup.string().required(t('this-field-is-required')),
      address2: yup.string().nullable(true).notRequired(),
      cityOrTown: yup.string().required(t('this-field-is-required')),
      stateOrProvince: yup.string().when('countryCode', ([countryCode], schema) => {
        if (countryCode == CountryCode.US) {
          return schema.required(t('this-field-is-required'))
        }
        return schema
      }),
      postalOrZipCode: yup.string().when('countryCode', {
        is: CountryCode.US || CountryCode.CA,
        then: yup.string().required(t('this-field-is-required')).min(4, t('enter-valid-zip-code')),
      }),
      countryCode: yup.string().required(t('this-field-is-required')),
    }),
    phoneNumbers: yup.object().shape({
      home: yup.string().required(t('this-field-is-required')),
    }),
  })
}

// Component
const AddressForm = (props: AddressFormProps) => {
  const { publicRuntimeConfig } = getConfig()

  const {
    contact,
    countries = publicRuntimeConfig.countries,
    isUserLoggedIn = false,
    saveAddressLabel,
    isAddressFormInDialog = false,
    setAutoFocus = false,
    validateForm = false,
    showDefaultPaymentMethodCheckbox = false,
    onSaveAddress,
    onFormStatusChange,
    onDefaultPaymentChange,
  } = props

  const provinces = publicRuntimeConfig.provinces

  const addressSchema = useFormSchema()
  // Define Variables and States
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: contact ? contact : undefined,
    resolver: yupResolver(addressSchema),
    shouldFocusError: true,
  })

  const [_, setSaveAddress] = useState<boolean>(false)

  const { t } = useTranslation('common')

  const generateSelectOptions = () => {
    return countries?.map((country: Countries) => {
      return (
        <MenuItem key={country?.name} value={country?.code}>
          {country?.name}
        </MenuItem>
      )
    })
  }

  const generateProvincesOptions = (provinces: Province[]) =>
    provinces?.map((province: Province) => {
      return (
        <MenuItem key={province.name} value={province.code}>
          {province.name}
        </MenuItem>
      )
    })

  const onValid = async (formData: ContactForm) =>
    onSaveAddress({ contact: formData, isDataUpdated: true })

  useEffect(() => {
    if (onFormStatusChange) onFormStatusChange(isValid)
    if (validateForm) handleSubmit(onValid)()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, validateForm])

  useEffect(() => {
    reset(contact)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact?.firstName])

  return (
    <Box
      component="form"
      sx={{
        my: 1,
        mx: 0,
        maxWidth: '872px',
      }}
      noValidate
      autoComplete="off"
      data-testid="address-form"
    >
      <Grid container rowSpacing={0} columnGap={2.5}>
        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 5.82}>
          <Controller
            name="firstName"
            control={control}
            defaultValue={contact?.firstName}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('first-name')}
                ref={null}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                autoFocus={setAutoFocus}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 5.82}>
          <Controller
            name="lastNameOrSurname"
            control={control}
            defaultValue={contact?.lastNameOrSurname}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('last-name-or-sur-name')}
                ref={null}
                error={!!errors?.lastNameOrSurname}
                helperText={errors?.lastNameOrSurname?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="companyOrOrganization"
            control={control}
            defaultValue={contact?.companyOrOrganization}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('company-or-organization')}
                ref={null}
                error={!!errors?.companyOrOrganization}
                helperText={errors?.companyOrOrganization?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 5.82}>
          <Controller
            name="phoneNumbers.home"
            control={control}
            defaultValue={contact?.phoneNumbers?.home}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('phone-number-home')}
                ref={null}
                error={!!errors?.phoneNumbers?.home}
                helperText={errors?.phoneNumbers?.home?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 5.82}>
          <Controller
            name="address.countryCode"
            control={control}
            defaultValue={contact?.address?.countryCode || countries[0]?.code}
            render={({ field }) => (
              <Box>
                <KiboSelect
                  sx={{ color: '#020027', '> fieldSet': { borderColor: '#020027' } }}
                  name="country-code"
                  label={t('country-code')}
                  value={field.value}
                  error={!!errors?.address?.countryCode}
                  helperText={errors?.address?.countryCode?.message}
                  onChange={(_name, value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                >
                  {generateSelectOptions()}
                </KiboSelect>
              </Box>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address.address1"
            control={control}
            defaultValue={contact?.address?.address1}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('address1')}
                ref={null}
                error={!!errors?.address?.address1}
                helperText={errors?.address?.address1?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address.address2"
            control={control}
            defaultValue={contact?.address?.address2}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('address2')}
                ref={null}
                error={!!errors?.address?.address2}
                helperText={errors?.address?.address2?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address.cityOrTown"
            control={control}
            defaultValue={contact?.address?.cityOrTown}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('city-or-town')}
                ref={null}
                error={!!errors?.address?.cityOrTown}
                helperText={errors?.address?.cityOrTown?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 5.82}>
          <Controller
            name="address.stateOrProvince"
            control={control}
            defaultValue={contact?.address?.stateOrProvince}
            render={({ field }) => (
              <Box>
                <KiboSelect
                  sx={{ color: '#020027', '> fieldSet': { borderColor: '#020027' } }}
                  name="state-or-province"
                  label={t('state-or-province')}
                  value={field.value}
                  error={!!errors?.address?.stateOrProvince}
                  helperText={errors?.address?.stateOrProvince?.message}
                  onChange={(_name: string, value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                >
                  {generateProvincesOptions(provinces)}
                </KiboSelect>
              </Box>
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 5.82}>
          <Controller
            name="address.postalOrZipCode"
            control={control}
            defaultValue={contact?.address?.postalOrZipCode}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('postal-or-zip-code')}
                ref={null}
                error={!!errors?.address?.postalOrZipCode}
                helperText={errors?.address?.postalOrZipCode?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        {isUserLoggedIn && saveAddressLabel && (
          <Grid item md={12}>
            <FormControlLabel
              control={<Checkbox onChange={() => setSaveAddress((prevState) => !prevState)} />}
              label={saveAddressLabel}
            />
          </Grid>
        )}

        {showDefaultPaymentMethodCheckbox && (
          <Grid item md={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(_, checked) =>
                    onDefaultPaymentChange && onDefaultPaymentChange(checked)
                  }
                />
              }
              label={t('make-this-my-default-payment')}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AddressForm
