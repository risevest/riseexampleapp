import { Box } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { Container, CustomKeyboard } from 'app/components'
import { Header, Loader, Text } from 'app/future'
import { useBiometricSensorType } from 'app/hooks/use-biometrics-sensor-type'
import { useUserHasPin } from 'app/store/settings'
import React from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'

import { useGenericPinScreenStyles } from './style'
interface IGenericPinScreen {
  goBack?: Noop
  hasFaceId?: boolean
  makeApiRequest: (PIN: string) => void
  onBiometricIconPress?: () => void
  requestStatus: RequestStatus | 'idle' | 'success' | 'error' | 'loading'
}

const GenericPinScreen = ({
  goBack,
  makeApiRequest,
  requestStatus,
  onBiometricIconPress
}: IGenericPinScreen) => {
  const sensorType = useBiometricSensorType()
  const { styles } = useGenericPinScreenStyles()

  const hasPin = useUserHasPin()

  const handleRequest = async (enteredPin: string) => {
    makeApiRequest(enteredPin)
  }

  const onInputComplete = (pin: string) => {
    handleRequest(pin)
  }

  return (
    <Container>
      <Header
        containerStyle={HEADER}
        goBack={goBack}
        type="with-back-icon-only"
      />
      <View style={styles.wrapper}>
        <Box>
          <Text textStyle={HEADER_TEXT} type="head-2" variant="black">
            Enter your Rise PIN
          </Text>
          <Text type="reg-17-main" variant="soft-tect">
            Confirm your transaction
          </Text>
        </Box>
        <CustomKeyboard
          description={
            (requestStatus === 'pending' || requestStatus === 'loading') && (
              <Box mt="l">
                <Loader isLoading={true} />
              </Box>
            )
          }
          iconBottomLeft={
            hasPin &&
            sensorType && (
              <Icon
                name={
                  sensorType === 'Face ID' ? 'faceid-dark' : 'fingerprint-dark'
                }
                size={42}
              />
            )
          }
          marginBottom="xl"
          marginTop="l"
          onIconBottomLeftPress={onBiometricIconPress}
          onInputComplete={onInputComplete}
        />
      </View>
    </Container>
  )
}

const HEADER: ViewStyle = { marginHorizontal: 20 }

const HEADER_TEXT: TextStyle = { fontSize: 20, marginBottom: 8 }

export default GenericPinScreen
