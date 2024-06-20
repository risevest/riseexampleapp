import { TEST_EMAIL, TEST_PASSWORD } from '@env'
import { Box, Text } from '@risemaxi/sarcelle'
import { TextField } from 'app/components'
import { SpringBox } from 'app/components/animated/spring-box'
import { Button } from 'app/components/button/new-button'
import constants from 'app/config/constants'
import amplitude from 'app/utils/analytics/amplitude'
import firebaseUtils from 'app/utils/analytics/firebaseUtils'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { FadeInDown } from 'react-native-reanimated'
import * as Yup from 'yup'

export interface FormFieldProps
  extends Omit<AuthStackScreenProps<'Login'>, 'route'> {
  isLoading: boolean
  onSubmit: (
    email: string,
    password: string,
    loginMethod: 'email-password' | 'biometrics'
  ) => void
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email')
    .required('Please provide an email'),
  password: Yup.string().required('Please enter your password')
})

const initialValues = constants.IS_TEST_MODE
  ? { email: TEST_EMAIL, password: TEST_PASSWORD }
  : { email: '', password: '' }

const marginTop0 = {
  marginTop: 0
}

export function FormFields({
  isLoading,
  navigation,
  onSubmit
}: FormFieldProps) {
  const passwordRef = useRef<TextInput>(null)

  const {
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    setFieldTouched
  } = useFormik({
    initialValues,
    onSubmit: (data) => {
      onSubmit(data.email, data.password, 'email-password')
    },
    validationSchema
  })

  return (
    <Box mt="xl">
      <SpringBox entering={FadeInDown} mb="m">
        <TextField
          accessibilityLabel="emailInput"
          autoCapitalize="none"
          autoComplete="email"
          blurOnSubmit={false}
          errorText={errors.email}
          keyboardType="email-address"
          label="Email Address"
          onBlur={() => {
            setFieldTouched('email')
            setFieldValue('email', values.email.trim())
          }}
          onChangeText={handleChange('email')}
          onEndEditing={() => setFieldTouched('email')}
          onSubmitEditing={() => passwordRef.current?.focus()}
          preset="default"
          returnKeyType="next"
          style={marginTop0}
          testID="email"
          textContentType="emailAddress"
          touched={touched.email}
          value={values.email}
        />
      </SpringBox>
      <SpringBox delayFactor={3} entering={FadeInDown}>
        <TextField
          errorText={errors.password}
          label="Password"
          onBlur={() => setFieldTouched('password')}
          onChangeText={handleChange('password')}
          onEndEditing={() => setFieldTouched('password')}
          preset="password"
          ref={passwordRef}
          returnKeyType="done"
          sensitiveField
          style={marginTop0}
          testID="password"
          textContentType="password"
          touched={touched.password}
          value={values.password}
        />
      </SpringBox>
      <SpringBox delayFactor={2} mt="m">
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          onPress={() => handleSubmit()}
          testID="sign_in"
          text="Sign In"
        />
      </SpringBox>
      <SpringBox alignSelf="center" delayFactor={1} my="m" py="m">
        <TouchableOpacity
          onPress={() => {
            firebaseUtils.logEvent('forgot_password')
            amplitude.logEvent('Forgot Password Initiated')
            navigation?.navigate('ResetPassword', {
              params: {
                email: values.email
              },
              screen: 'ResetPasswordHome'
            })
          }}
        >
          <Text color="teal001" textAlign="center" variant="button-15-bold">
            I forgot my password
          </Text>
        </TouchableOpacity>
      </SpringBox>
    </Box>
  )
}
