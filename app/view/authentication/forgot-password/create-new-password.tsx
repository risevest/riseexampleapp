import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import { Button, NewHeader as Header, Screen, TextField } from 'app/components'
import React from 'react'
import { ViewStyle } from 'react-native'

import { useCreateNewPassword } from './hooks'

export interface CreateNewPasswordProps extends INavigationProps {}

const marginTop0: ViewStyle = {
  marginTop: 0
}

export default function CreateNewPassword(props: CreateNewPasswordProps) {
  const theme = useTheme()
  const createPassword = useCreateNewPassword(props)

  return (
    <Box
      as={Screen}
      header={
        <Header
          leftItem="back-icon"
          onLeftPress={createPassword.handleBackPress}
        />
      }
    >
      <Box paddingHorizontal={20}>
        <Text mb="m" variant="header-h2-20-medium">
          Create a new password.
        </Text>
        <Box mb="m">
          <TextField
            label="Password"
            onChangeText={createPassword.setPassword}
            preset="password"
            secureTextEntry={createPassword.passwordState.secureText}
            style={marginTop0}
            value={createPassword.passwordState.password}
          />
        </Box>
        <TextField
          label="Confirm password"
          onChangeText={createPassword.setConfirmPassword}
          preset="password"
          secureTextEntry={createPassword.passwordState.secureText}
          style={marginTop0}
          value={createPassword.passwordState.confirmPassword}
        />
        <Box marginTop={20}>
          <Button
            buttonText="Reset Password"
            disabled={createPassword.isLoading}
            isLoading={createPassword.isLoading}
            onPress={createPassword.handleSubmit}
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
