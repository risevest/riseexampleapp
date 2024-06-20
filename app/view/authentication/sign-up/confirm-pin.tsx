import { Box, Text } from '@risemaxi/sarcelle'
import { CustomKeyboard, Screen } from 'app/components'
import { NewHeader as Header } from 'app/components/header'
import { useSignUp } from 'app/domains/auth/hooks'
import { savePIN } from 'app/internals/pin.keychain'
import { useSavedOnboardingProps, useSettingsActions } from 'app/store/settings'
import { setItemToStorage } from 'app/utils/asyncstorage'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

export function ConfirmPIN({ navigation }: AuthStackScreenProps<'ConfirmPIN'>) {
  const savedProps = useSavedOnboardingProps() as NonNullable<
    Required<ReturnType<typeof useSavedOnboardingProps>>
  >
  const { setIsNewSignUp, setSavedOnboardingProps } = useSettingsActions()
  const pin = savedProps?.transactionPin

  const [confirmPIN, setConfirmPIN] = useState('')
  // const { setHasPin } = useSettingsActions()

  const signUpMutation = useSignUp()

  useEffect(() => {
    if (confirmPIN.length === 6 && pin === confirmPIN) {
      signUp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPIN])

  const signUp = () => {
    signUpMutation.mutate(
      { ...savedProps },
      {
        onSuccess: async (data) => {
          await setItemToStorage('country', savedProps?.country)
          await savePIN(pin)
          // setHasPin(true)

          const props = { token: data.token } as const
          setSavedOnboardingProps(props)
          setIsNewSignUp(true)
          navigation?.navigate('PINSuccessScreen')
        }
      }
    )
  }

  return (
    <Box
      as={Screen}
      header={
        <Header leftItem="back-icon" onLeftPress={() => navigation.goBack()} />
      }
      paddingHorizontal="m"
      preset="fixed"
    >
      <Box flex={1} justifyContent="space-between">
        <Box>
          <Text color="neutral-dark-mode" variant="header-h2-20-medium">
            Confirm 6-digit PIN
          </Text>
          <Box marginTop={11}>
            <Text color="soft-tect" variant="body-15-regular">
              You’ll use this PIN to sign in and confirm transactions
            </Text>
          </Box>
        </Box>

        <CustomKeyboard
          description={
            confirmPIN.length === 6 && pin !== confirmPIN
              ? 'PIN must match'
              : ''
          }
          disabled={signUpMutation.isLoading}
          error={confirmPIN.length === 6 && pin !== confirmPIN}
          iconBottomLeft={
            signUpMutation.isLoading ? (
              <ActivityIndicator size="large" />
            ) : undefined
          }
          marginBottom={50}
          marginTop={11}
          maxLength={6}
          onChangeText={(text: string) => setConfirmPIN(text)}
        />
      </Box>
    </Box>
  )
}
