import { Box, Text } from '@risemaxi/sarcelle'
import { Screen, TextField } from 'app/components'
import { Button } from 'app/components/button/new-button'
import { Header } from 'app/components/header/new-header'
import { useVerifyPasswordMutation } from 'app/domains/auth/hooks'
import { useUser } from 'app/hooks'
import { RootStackScreenProps } from 'app/view/navigator/types'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface IResetPin extends RootStackScreenProps<'ResetPin'> {}

const ResetPin = ({ navigation }: IResetPin) => {
  const { user } = useUser()
  const [password, setPassword] = useState('')

  const handleSetPassword = (value: string) => {
    setPassword(value)
  }

  const verifyPasswordMutation = useVerifyPasswordMutation()

  const handleSubmit = () => {
    verifyPasswordMutation.mutate(
      {
        password,
        userID: user?.id!
      },
      {
        onSuccess: () => {
          navigation.navigate('CreatePin', {
            params: { firstName: '', prevRoute: 'ResetPin' },
            screen: 'CreatePinScreen'
          })
        }
      }
    )
  }

  return (
    <Box
      as={Screen}
      header={
        <Header
          headerText="Reset Pin"
          leftItem="back-icon"
          onLeftPress={() => navigation.goBack()}
        />
      }
      paddingHorizontal="m"
      preset="scroll"
    >
      <Box marginBottom={20}>
        <Text color="soft-tect" variant="body-15-regular">
          Enter your password to reset your Rise PIN.
        </Text>
      </Box>
      <TextField
        label="Password"
        onChangeText={handleSetPassword}
        preset="password"
        value={password}
      />
      <Box my="m">
        <Button
          disabled={
            password.length < 8 || verifyPasswordMutation.status === 'loading'
          }
          isLoading={verifyPasswordMutation.status === 'loading'}
          onPress={handleSubmit}
          preset="primary"
          text="Reset PIN"
        />
      </Box>
      <Box alignSelf="center" py="m">
        <TouchableOpacity onPress={() => navigation?.navigate('ResetPassword')}>
          <Text color="teal001" textAlign="center" variant="button-15-bold">
            I forgot my password
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}

export default ResetPin
