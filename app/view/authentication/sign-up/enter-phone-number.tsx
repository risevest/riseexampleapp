import { TEST_PHONE } from '@env'
import { Box, Text } from '@risemaxi/sarcelle'
import {
  NewButton as Button,
  NewHeader as Header,
  Screen,
  TextField
} from 'app/components'
import { SpringBox } from 'app/components/animated/spring-box'
import { Footer } from 'app/components/footers'
import { useValidateSignUp } from 'app/domains/auth/hooks'
import { useDisplayMessage } from 'app/hooks'
import { getPhoneNumber } from 'app/internals/strings'
import { useSettingsActions } from 'app/store/settings'
import { requestTrackingTransparency } from 'app/utils/analytics/fbsdk'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import { Formik, FormikErrors, FormikProps } from 'formik'
import { CountryCode } from 'libphonenumber-js'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { Keyboard, ViewStyle } from 'react-native'
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import * as Yup from 'yup'

const PhoneNumberSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Please enter a phone number')
    .test(
      'is-valid-phone',
      'Please enter a valid phone number',
      function (value: string) {
        try {
          const phoneNumber = getPhoneNumber(value, {
            // @ts-expect-error - this has no type
            defaultCountry: this?.parent?.phoneCountryCode
          })
          if (isEmpty(phoneNumber)) {
            return false
          }
          return true
        } catch (error) {
          return false
        }
      }
    ),
  phoneCountryCode: Yup.string().required(
    'Please enter your phone country code'
  )
})

type PhoneNumberFields = {
  phone: string
  phoneCountryCode: string
}

const fieldValues: PhoneNumberFields =
  __DEV__ && TEST_PHONE
    ? {
        phone: TEST_PHONE || '',
        phoneCountryCode: ''
      }
    : {
        phone: '',
        phoneCountryCode: ''
      }

export function EnterPhoneNumber({
  navigation
}: AuthStackScreenProps<'EnterPhoneNumber'>) {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false)

  const { setSavedOnboardingProps, setIsOnboarding } = useSettingsActions()
  // const registerPhoneNumberMutation = useRegisterPhoneNumber()
  // const checkPhoneNumberVerificationMutation = useCheckPhoneNumberVerification()
  const validateSignUp = useValidateSignUp()

  const { displayError } = useDisplayMessage()
  const formikRef = React.useRef<FormikProps<PhoneNumberFields>>(null)

  const returnInputStyles = (
    inputError: FormikErrors<PhoneNumberFields>,
    fieldName: keyof PhoneNumberFields
  ) => {
    return inputError[fieldName]
      ? {
          borderColor: 'red',
          borderWidth: 1,
          marginTop: 20
        }
      : { marginTop: 20 }
  }

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  const sendCode = (values: PhoneNumberFields) => {
    const phoneNumber = getPhoneNumber(
      values.phone,
      values.phoneCountryCode as CountryCode
    )
    if (!phoneNumber || !phoneNumber.country) {
      displayError('Invalid phone number', 'Please change your phone number')
      return
    }

    validateSignUp.mutate(
      {
        identifier: phoneNumber.phone,
        identityType: 'phone_number'
      },
      {
        onSuccess: () => {
          const props = {
            country: String(phoneNumber.country),
            phoneCountryCode: phoneNumber.countryCallingCode,
            phoneNumber: phoneNumber.phone
          } as const
          setSavedOnboardingProps(props)
          navigation.navigate('MoreInformation')
        }
      }
    )

    // checkPhoneNumberVerificationMutation.mutate(phoneNumber.phone, {
    //   onError: () => Keyboard.dismiss(),
    //   onSuccess: (data) => {
    //     if (data?.should_reverify) {
    //       registerPhoneNumberMutation.mutate(
    //         {
    //           country: String(phoneNumber.country),
    //           phone: phoneNumber.phone
    //         },
    //         {
    //           onSuccess: (resp) => {
    //             const props = {
    //               authorizationToken: resp?.token,
    //               country: String(phoneNumber.country),
    //               phoneCountryCode: phoneNumber.countryCallingCode,
    //               phoneNumber: phoneNumber.phone,
    //               reference:
    //                 resp?.identity?.verification_metadata?.provider_reference
    //             } as const
    //             setSavedOnboardingProps(props)
    //             navigation.navigate('VerifyPhoneNumber')
    //           }
    //         }
    //       )
    //     } else {
    //       const props = {
    //         country: String(phoneNumber.country),
    //         phoneNumber: phoneNumber.phone
    //       } as const
    //       setSavedOnboardingProps(props)
    //       navigation.navigate('MoreInformation')
    //     }
    //   }
    // })
  }

  const getPhoneErrorMessage = React.useCallback(
    (errors: FormikErrors<PhoneNumberFields>, phoneNumberTouched?: boolean) => {
      let errorMessage = ''
      if (phoneNumberTouched && errors.phone && errors.phoneCountryCode) {
        errorMessage = errors.phone + ' and country code'
      } else if (phoneNumberTouched && errors.phone) {
        errorMessage = errors.phone
      } else if (phoneNumberTouched && errors.phoneCountryCode) {
        errorMessage = 'Please enter your phone country code'
      }

      return errorMessage
    },
    []
  )

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      setIsOnboarding(false)
    })

    return listener
  }, [navigation, setIsOnboarding])

  useEffect(() => {
    requestTrackingTransparency()
  }, [])

  return (
    <Box
      as={Screen}
      footer={isKeyboardVisible ? null : <Footer />}
      header={
        <Header
          leftItem="back-icon"
          onLeftPress={() => {
            navigation?.goBack()
          }}
        />
      }
      keyboardShouldPersistTaps="handled"
      paddingHorizontal="m"
      preset="scroll"
    >
      <Box flex={1} justifyContent="space-between">
        <Box marginTop={20}>
          <Box>
            <Text color="neutral-dark-mode" variant="header-h2-20-medium">
              Enter your phone number
            </Text>
          </Box>

          <Formik
            initialValues={fieldValues}
            innerRef={formikRef}
            onSubmit={sendCode}
            validationSchema={PhoneNumberSchema}
          >
            {({
              errors,
              values,
              setFieldTouched,
              touched,
              handleSubmit,
              handleChange,
              setFieldValue,
              isValid
            }) => {
              return (
                <>
                  <SpringBox delayFactor={3} entering={FadeInDown}>
                    <TextField
                      errorText={getPhoneErrorMessage(errors, touched?.phone)}
                      getCountry={(country) => {
                        setFieldValue('phoneCountryCode', country?.countryCode)
                      }}
                      keyboardType="phone-pad"
                      label="Phone Number"
                      onBlur={() => {
                        setFieldTouched('phone', touched?.phone)
                        setFieldTouched(
                          'phoneCountryCode',
                          touched?.phoneCountryCode
                        )
                      }}
                      onChangeText={handleChange('phone')}
                      placeholder="Phone Number"
                      preset="phone-number"
                      style={
                        touched?.phone
                          ? returnInputStyles(errors, 'phone')
                          : MARGIN
                      }
                      value={values.phone}
                    />
                  </SpringBox>

                  <SpringBox delayFactor={2} mt="m">
                    <Box marginTop={16}>
                      <Button
                        disabled={
                          !values.phone ||
                          !isValid ||
                          errors.phone ||
                          errors.phoneCountryCode
                            ? true
                            : false
                        }
                        isLoading={validateSignUp.isLoading}
                        // isLoading={
                        //   checkPhoneNumberVerificationMutation.isLoading ||
                        //   registerPhoneNumberMutation.isLoading
                        // }
                        onPress={() => handleSubmit()}
                        text="Continue"
                        // text="Send code"
                      />
                    </Box>
                  </SpringBox>
                </>
              )
            }}
          </Formik>
        </Box>
      </Box>
      {isKeyboardVisible ? (
        <Footer entering={FadeInDown} exiting={FadeOutUp} />
      ) : null}
    </Box>
  )
}

const MARGIN: ViewStyle = {
  marginTop: 20
}
