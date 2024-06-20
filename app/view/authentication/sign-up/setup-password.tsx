import { TEST_PASSWORD } from '@env'
import { Box, Text } from '@risemaxi/sarcelle'
import {
  NewButton as Button,
  NewHeader as Header,
  Screen,
  TextField
} from 'app/components'
import { useSignUp } from 'app/domains/auth/hooks'
import { useSavedOnboardingProps, useSettingsActions } from 'app/store/settings'
import { checkPassword } from 'app/utils/validator'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import { TextInput, ViewStyle } from 'react-native'
import * as Yup from 'yup'

import { Checkbox } from './component/checkbox'

const PasswordSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required('Confirm password is a required field')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
  password: Yup.string()
    .required()
    .min(8)
    .matches(/[A-Z]/, 'Password must contain an Uppercase letter')
    .matches(/[^\w\s]/, 'Password must contain a special character')
})

const initialValues = __DEV__
  ? {
      confirmPassword: TEST_PASSWORD || '',
      password: TEST_PASSWORD || ''
    }
  : {
      confirmPassword: '',
      password: ''
    }

export function SetupPassword({
  navigation
}: AuthStackScreenProps<'SetupPassword'>) {
  const savedProps = useSavedOnboardingProps()
  const { setSavedOnboardingProps } = useSettingsActions()
  const confirmPasswordRef = useRef<TextInput>(null)

  const signUpMutation = useSignUp()

  const navigateToCreatePIN = (password: string) => {
    const props = { ...savedProps, password } as const
    setSavedOnboardingProps(props)
    navigation.navigate('CreatePIN')
  }

  return (
    <Box
      as={Screen}
      header={
        <Header leftItem="back-icon" onLeftPress={() => navigation.goBack()} />
      }
      paddingHorizontal="m"
    >
      <Text color="neutral-dark-mode" variant="header-h2-20-medium">
        Setup your password
      </Text>

      <Formik
        initialValues={{ ...initialValues, ...savedProps }}
        onSubmit={(values) => navigateToCreatePIN(values.password)}
        validationSchema={PasswordSchema}
      >
        {({
          values,
          errors,
          handleChange,
          touched,
          setFieldTouched,
          handleSubmit,
          //   setFieldValue,
          handleBlur
        }) => {
          const isLongerThan8 = checkPassword(values.password).isLongerThan8
          const hasUpperCaseCharacter = checkPassword(
            values.password
          ).hasUpperCaseCharacter
          const hasSpecialCharacters = checkPassword(
            values.password
          ).hasSpecialCharacters

          return (
            <>
              <TextField
                autoCapitalize="none"
                blurOnSubmit={false}
                errorText={errors?.password}
                label="Password"
                onBlur={() => {
                  handleBlur('password')
                  setFieldTouched('password', touched?.password)
                }}
                onChangeText={(text) => {
                  setSavedOnboardingProps({
                    password: text
                  })
                  handleChange('password')(text)
                }}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                preset="password"
                returnKeyType="next"
                sensitiveField
                style={{
                  ...INPUT_STYLE
                }}
                textContentType="newPassword"
                touched={touched?.password}
                value={values?.password}
              />

              <TextField
                autoCapitalize="none"
                errorText={errors?.confirmPassword}
                label="Confirm password"
                onBlur={() => {
                  handleBlur('confirmPassword')
                  setFieldTouched('confirmPassword', touched?.confirmPassword)
                }}
                onChangeText={handleChange('confirmPassword')}
                preset="password"
                ref={confirmPasswordRef}
                returnKeyType="done"
                sensitiveField
                style={{
                  ...INPUT_STYLE
                }}
                touched={touched?.confirmPassword}
                value={values.confirmPassword}
              />

              <Box marginBottom={22} marginTop={10}>
                <Checkbox
                  checked={isLongerThan8}
                  label="Minimum of 8 characters"
                />
                <Checkbox
                  checked={hasUpperCaseCharacter}
                  label="at least one UPPERCASE letter"
                />
                <Checkbox
                  checked={hasSpecialCharacters}
                  label="One special character (e.g: !@#$%^&*?)"
                />
              </Box>

              <Button
                disabled={
                  !isLongerThan8 ||
                  Boolean(errors?.password || errors?.confirmPassword)
                }
                isLoading={signUpMutation.isLoading}
                onPress={() => handleSubmit()}
                text="Continue"
              />
            </>
          )
        }}
      </Formik>
    </Box>
  )
}

const INPUT_STYLE: ViewStyle = {
  marginTop: 18
}
