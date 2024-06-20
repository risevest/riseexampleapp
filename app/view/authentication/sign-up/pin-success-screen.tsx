import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { NewButton as Button, Screen } from 'app/components'
import { spacing } from 'app/design'
import { useToggle } from 'app/hooks'
import { setToken } from 'app/redux/user/actionCreators'
import { useSavedOnboardingProps } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import CustomerIO from 'app/utils/analytics/customer-io'
import { setItemToStorage } from 'app/utils/asyncstorage'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { ViewStyle } from 'react-native'
import FingerPrintScanner from 'react-native-fingerprint-scanner'
import { useDispatch } from 'react-redux'

import { BiometricModal } from './sections/biometric-modal'

export function PINSuccessScreen({
  navigation
}: AuthStackScreenProps<'PINSuccessScreen'>) {
  const savedProps = useSavedOnboardingProps()
  const token = savedProps?.token
  const [
    isBiometricModalOpen,
    { toggle: toggleBiometryModal, off: closeBiometryModal }
  ] = useToggle()
  const [checkingBiometrics, { toggle: toggleCheckingBiometrics }] = useToggle()

  const dispatch = useDispatch()

  const checkForBios = async () => {
    toggleCheckingBiometrics()
    try {
      await FingerPrintScanner.isSensorAvailable()
      toggleBiometryModal()
      toggleCheckingBiometrics()
    } catch (error) {
      toggleCheckingBiometrics()
      navigateToSocialSurvey()
    }
  }

  const setBiometrics = async () => {
    await setItemToStorage('loginOption', 'biometrics')
    navigateToSocialSurvey()
  }

  const navigateToSocialSurvey = () => {
    closeBiometryModal()
    amplitude.logEvent('Attribution Form Opened')
    logEvent('open_attribution_form')
    CustomerIO.logEvent('attribution_form_opened')
    setTimeout(() => {
      // On iOS navigating immediately would cause the app to crash because the biometric modal may
      // have not been removed from the view hierachy which triggers an error on iOS
      dispatch(setToken({ token }))
      navigation.navigate('App', {
        params: { screen: 'SocialSurvey' },
        screen: 'AppStack'
      })
    }, 1000)
  }

  return (
    <>
      <Box as={Screen} padding="m" style={CONTAINER} unsafe>
        <Box
          alignItems="center"
          marginTop={spacing.massive * 2}
          paddingHorizontal={spacing.massive}
        >
          <Box>
            <Icon
              height={spacing.massive + spacing.larger}
              name="success"
              width={spacing.massive + spacing.larger}
            />
          </Box>

          <Text mt="l" textAlign="center" variant="header-h2-20-medium">
            You’ve created your PIN
          </Text>

          <Text
            color="soft-tect"
            mt="s"
            textAlign="center"
            variant="body-15-regular"
          >
            Keep your account safe with your secret PIN. Do not share this PIN
            with anyone.
          </Text>
        </Box>

        <Box>
          <Box
            as={Button}
            isLoading={checkingBiometrics}
            marginVertical="m"
            onPress={checkForBios}
            text="Okay"
          />
        </Box>
      </Box>
      <BiometricModal
        isOpen={isBiometricModalOpen}
        onPress={setBiometrics}
        toggle={toggleCheckingBiometrics}
      />
    </>
  )
}

const CONTAINER: ViewStyle = {
  justifyContent: 'space-between'
}
