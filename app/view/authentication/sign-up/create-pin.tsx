import { Box, Text } from '@risemaxi/sarcelle'
import { CustomKeyboard, Screen } from 'app/components'
import { NewHeader as Header } from 'app/components/header'
import { useSavedOnboardingProps, useSettingsActions } from 'app/store/settings'
import amplitude from 'app/utils/analytics/amplitude'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import React, { useEffect, useState } from 'react'

export function CreatePIN({ navigation }: AuthStackScreenProps<'CreatePIN'>) {
  const savedProps = useSavedOnboardingProps()
  const { setSavedOnboardingProps } = useSettingsActions()

  const [pin, setPIN] = useState('')

  useEffect(() => {
    if (pin.length === 6) {
      const props = { ...savedProps, transactionPin: pin } as const
      setSavedOnboardingProps(props)
      amplitude.logEvent('Confirm Pin Initiated')
      navigation.navigate('ConfirmPIN')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin])

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
            Create a 6-digit PIN
          </Text>
          <Box marginTop={11}>
            <Text color="soft-tect" variant="body-15-regular">
              You’ll use this PIN to sign in and confirm transactions
            </Text>
          </Box>
        </Box>

        <CustomKeyboard
          marginBottom={50}
          marginTop={11}
          maxLength={6}
          onChangeText={(text) => setPIN(text)}
        />
      </Box>
    </Box>
  )
}
