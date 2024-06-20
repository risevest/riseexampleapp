import { TEST_EMAIL } from '@env'
import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { NewButton as Button, Screen, TextField } from 'app/components'
import { SpringBox } from 'app/components/animated/spring-box'
import { Checkbox2 } from 'app/components/Checkbox/checkbox2'
import constants from 'app/config/constants'
import { useValidateSignUp } from 'app/domains/auth/hooks'
import { SignUpPayload } from 'app/domains/auth/types'
import { useToggle } from 'app/hooks'
import { useSavedOnboardingProps, useSettingsActions } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import CustomerIO from 'app/utils/analytics/customer-io'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import { format } from 'date-fns'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import {
  InteractionManager,
  TextInput,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import RNDatePicker from 'react-native-modal-datetime-picker'
import { FadeInDown } from 'react-native-reanimated'
import * as Yup from 'yup'

import LegalNameModal from './sections/legal-name-modal'

export type MoreInformationFields = Pick<
  SignUpPayload,
  'firstName' | 'lastName' | 'dateOfBirth' | 'emailAddress'
>

const fieldValues: MoreInformationFields = __DEV__
  ? {
      dateOfBirth: '',
      emailAddress: TEST_EMAIL || '',
      firstName: 'daniel',
      lastName: "o'connor"
    }
  : {
      dateOfBirth: '',
      emailAddress: '',
      firstName: '',
      lastName: ''
    }

export function MoreInformation({
  navigation
}: AuthStackScreenProps<'MoreInformation'>) {
  const validateSignUp = useValidateSignUp()
  const savedProps = useSavedOnboardingProps()
  const { setSavedOnboardingProps } = useSettingsActions()
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const [isDatePickerOpen, { toggle: toggleDatePicker, off: closeDatePicker }] =
    useToggle()
  const [showLegalName, { toggle: toggleLegalName }] = useToggle()
  const [subscribeToNewsletter, { toggle: toggleSubscription }] = useToggle(
    savedProps?.newsletterSubscribed ?? true
  )

  const error = 'Please enter non-special characters only'

  const MoreInfoSchema = Yup.object().shape({
    dateOfBirth: Yup.string().required('Please enter your date of birth'),
    emailAddress: Yup.string()
      .trim()
      .email('Please enter a valid email')
      .required('Please enter an email'),
    firstName: Yup.string()
      .trim()
      .min(1)
      .matches(constants.ALPHABET_REGEX, error)
      .required('Please enter your first name'),
    lastName: Yup.string()
      .trim()
      .min(1)
      .matches(constants.ALPHABET_REGEX, error)
      .required('Please enter your last name')
  })

  const getYearAllowed = (preset: 'max' | 'min'): Date => {
    const currentDate = new Date()

    const value = preset === 'max' ? 100 : 18
    return (currentDate.setUTCFullYear(currentDate.getUTCFullYear() - value) &&
      currentDate) as Date
  }

  return (
    <Box as={Screen} paddingHorizontal="m" paddingTop={75}>
      <Text color="neutral-dark-mode" variant="header-h2-20-medium">
        Tell us more about you
      </Text>

      <Formik
        initialValues={{ ...fieldValues, ...savedProps }}
        onSubmit={(values) => {
          validateSignUp.mutate(
            {
              identifier: values.emailAddress,
              identityType: 'email'
            },
            {
              onSuccess: () => {
                logEvent('update_personal_info')
                const navigationProps = {
                  ...savedProps,
                  ...values,
                  newsletterSubscribed: subscribeToNewsletter
                } as const
                setSavedOnboardingProps(navigationProps)
                amplitude.logEvent('Personal Info Updated')
                CustomerIO.logEvent('personal_info_updated')
                navigation.navigate('ReviewDetails')
              }
            }
          )
        }}
        validationSchema={MoreInfoSchema}
      >
        {({
          errors,
          values,
          setFieldTouched,
          touched,
          handleSubmit,
          handleChange,
          setFieldValue
        }) => {
          return (
            <Box marginTop={8}>
              <SpringBox delayFactor={3} entering={FadeInDown}>
                <TextField
                  blurOnSubmit={false}
                  defaultValue={savedProps?.firstName}
                  errorText={errors?.firstName}
                  icon={
                    <TouchableOpacity onPress={toggleLegalName}>
                      <Box flex={1} justifyContent="center">
                        <Icon name="question-light" />
                      </Box>
                    </TouchableOpacity>
                  }
                  label="Legal first name"
                  onBlur={(e) => {
                    if (e?.nativeEvent?.text !== undefined) {
                      setSavedOnboardingProps({
                        firstName: e.nativeEvent.text
                      })
                    }
                    setFieldTouched('firstName', touched?.firstName)
                  }}
                  onChangeText={(text) =>
                    handleChange('firstName')(text.trim())
                  }
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  preset="default"
                  returnKeyType="next"
                  style={{
                    ...INPUT_STYLE
                  }}
                  textContentType="givenName"
                  touched={touched?.firstName}
                  value={values.firstName}
                />

                <TextField
                  blurOnSubmit={false}
                  defaultValue={savedProps?.lastName}
                  errorText={errors?.lastName}
                  label="Legal last name"
                  onBlur={(e) => {
                    if (e?.nativeEvent?.text !== undefined) {
                      setSavedOnboardingProps({
                        lastName: e.nativeEvent.text
                      })
                    }
                    setFieldTouched('lastName', touched?.dateOfBirth)
                  }}
                  onChangeText={(text) => handleChange('lastName')(text.trim())}
                  onSubmitEditing={() => {
                    lastNameRef.current?.blur()
                    toggleDatePicker()
                  }}
                  preset="default"
                  ref={lastNameRef}
                  returnKeyType="next"
                  style={{
                    ...INPUT_STYLE
                  }}
                  textContentType="familyName"
                  touched={touched?.lastName}
                  value={values.lastName}
                />

                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={toggleDatePicker}
                  >
                    <TextField
                      editable={false}
                      errorText={errors?.dateOfBirth}
                      icon={
                        <Box flex={1} justifyContent="center">
                          <Icon name="calender" size={24} />
                        </Box>
                      }
                      keyboardType="phone-pad"
                      label="Date of Birth"
                      onBlur={() =>
                        setFieldTouched('dateOfBirth', touched?.dateOfBirth)
                      }
                      pointerEvents="none"
                      preset="default"
                      sensitiveField
                      style={{
                        ...INPUT_STYLE
                      }}
                      touched={touched?.dateOfBirth}
                      value={
                        savedProps?.dateOfBirth
                          ? format(
                              new Date(savedProps.dateOfBirth),
                              'do MMMM, YYY'
                            )
                          : values.dateOfBirth
                            ? format(
                                new Date(String(values?.dateOfBirth)),
                                'do MMMM, YYY'
                              )
                            : ''
                      }
                    />
                  </TouchableOpacity>
                  <RNDatePicker
                    date={
                      savedProps?.dateOfBirth
                        ? new Date(savedProps.dateOfBirth)
                        : !!values.dateOfBirth
                          ? (values.dateOfBirth as Date)
                          : getYearAllowed('min')
                    }
                    isVisible={isDatePickerOpen}
                    maximumDate={getYearAllowed('min')}
                    minimumDate={getYearAllowed('max')}
                    mode="date"
                    onCancel={closeDatePicker}
                    onChange={(date) => {
                      setFieldValue('dateOfBirth', date.toISOString())
                    }}
                    onConfirm={(date) => {
                      setSavedOnboardingProps({
                        dateOfBirth: date.toISOString()
                      })
                      closeDatePicker()
                      setFieldValue('dateOfBirth', date.toISOString())
                      InteractionManager.runAfterInteractions(() => {
                        emailRef.current?.focus()
                      })
                    }}
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                  />
                </>

                <TextField
                  defaultValue={savedProps?.emailAddress}
                  errorText={errors?.emailAddress}
                  keyboardType="email-address"
                  label="Enter email address"
                  onBlur={(e) => {
                    if (e?.nativeEvent?.text !== undefined) {
                      setSavedOnboardingProps({
                        emailAddress: e.nativeEvent.text
                      })
                    }
                    setFieldTouched('emailAddress', touched?.emailAddress)
                  }}
                  onChangeText={handleChange('emailAddress')}
                  preset="default"
                  ref={emailRef}
                  returnKeyType="done"
                  style={{
                    ...INPUT_STYLE
                  }}
                  textContentType="emailAddress"
                  touched={touched?.emailAddress}
                  value={values.emailAddress}
                />
              </SpringBox>

              <SpringBox delayFactor={2} mt="m">
                <Box marginTop={14}>
                  <Checkbox2
                    checked={subscribeToNewsletter}
                    label="Send me updates and newsletters about Rise products & services."
                    onPress={() => {
                      setSavedOnboardingProps({
                        newsletterSubscribed: !subscribeToNewsletter
                      })
                      toggleSubscription()
                    }}
                  />
                </Box>
                <Box marginTop={18}>
                  <Button
                    disabled={Boolean(
                      !values.firstName ||
                        !values.lastName ||
                        !values.dateOfBirth ||
                        !values.emailAddress
                    )}
                    isLoading={validateSignUp.isLoading}
                    onPress={() => handleSubmit()}
                    text="Continue"
                  />
                </Box>
              </SpringBox>
            </Box>
          )
        }}
      </Formik>

      <LegalNameModal isOpen={showLegalName} toggle={toggleLegalName} />
    </Box>
  )
}

const INPUT_STYLE: ViewStyle = {
  marginTop: 18
}
