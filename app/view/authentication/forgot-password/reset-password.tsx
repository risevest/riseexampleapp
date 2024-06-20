import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import { Button, NewHeader as Header, Screen, TextField } from 'app/components'
import { ForgotPasswordScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { ViewStyle } from 'react-native'

import { useResetPassword } from './hooks'

export interface ResetPasswordProps
  extends ForgotPasswordScreenProps<'ResetPasswordHome'> {}

const marginTop0: ViewStyle = {
  marginTop: 0
}

export default function ResetPassword(props: ResetPasswordProps) {
  const theme = useTheme()
  const resetPassword = useResetPassword(props)

  return (
    <Box
      as={Screen}
      header={
        <Header
          leftItem="back-icon"
          onLeftPress={resetPassword.handleBackPress}
        />
      }
    >
      <Box flex={1} paddingBottom={20} paddingHorizontal={20}>
        <Box marginBottom={20}>
          <Text variant="header-h2-20-medium">Reset your password.</Text>
          <Text color="soft-tect" mt="s" variant="body-15-regular">
            Enter your email address, and we will send you a link to reset your
            password.
          </Text>
        </Box>
        <TextField
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email address"
          onChangeText={resetPassword.handleSetUserEmail}
          placeholder="Email Address"
          preset="default"
          style={marginTop0}
          value={resetPassword.userEmailState.email}
        />
        <Box my="m">
          <Button
            buttonText="Submit email"
            disabled={
              !!resetPassword.userEmailState.error || resetPassword.isLoading
            }
            isLoading={resetPassword.isLoading}
            onPress={resetPassword.handleVerifyUserEmail}
            textStyle={{
              ...theme.textVariants['button-15-bold'],
              color: theme.colors.white
            }}
            variant="primary"
          />
        </Box>
      </Box>
    </Box>
  )
}
