import { Box, Text } from '@risemaxi/sarcelle'
import { Container, IconButton } from 'app/components'
import CustomKeyboard from 'app/components/custom-keyboard/custom-keyboard'
import { UseTheme, useTheme } from 'app/design/theme'
import { savePIN } from 'app/internals/pin.keychain'
import { useSettingsActions } from 'app/store/settings'
import React, { useState } from 'react'
import { View } from 'react-native'

import { useConfirmPinStyles } from './styles'
import { IConfirmPin } from './types'

const ConfirmPin = ({ navigation, route, handlePinCreation }: IConfirmPin) => {
  const { setHasPin } = useSettingsActions()
  const { theme } = useTheme() as UseTheme
  const styles = useConfirmPinStyles()
  const [error, setError] = useState(false)
  const onInputComplete = (pin: string) => {
    const routePin = route?.params.pinState ?? ''

    if (pin !== routePin) {
      setError(true)
    } else {
      setError(false)
      savePIN(pin)
      setHasPin(true)

      handlePinCreation(pin)
    }
  }

  return (
    <Container
      animation="fadeIn"
      backgroundColor={theme.primarySurface}
      statusBarColor={theme.primarySurface}
    >
      <View style={styles.wrapper}>
        <Box>
          <IconButton
            iconName="arrow-back-sharp"
            onPress={() => navigation?.goBack()}
          />
          <Box marginBottom={20} mt="l">
            <Text variant="header-h2-20-medium">Confirm 6-digit PIN</Text>
            <Text color="soft-tect" mt="s" variant="body-15-regular">
              You’ll use this PIN to sign in and confirm transactions
            </Text>
          </Box>
        </Box>
        <CustomKeyboard
          error={error}
          marginBottom="xl"
          onInputComplete={onInputComplete}
        />
      </View>
    </Container>
  )
}

export default ConfirmPin
