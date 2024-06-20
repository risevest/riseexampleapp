import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import { useSettingsActions } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import CustomerIO from 'app/utils/analytics/customer-io'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import React from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ViewStyle
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BiometricsAuth, Footer } from './components'
import { useBiometrics, useSignIn } from './hooks'
import { FormFields } from './sections'

const AnimatedBox = Animated.createAnimatedComponent(Box)

const flex1: ViewStyle = {
  flex: 1
}
const scrollContainer: ViewStyle = {
  paddingHorizontal: 20,
  paddingVertical: 20
}

export function SignIn({ navigation }: AuthStackScreenProps<'Login'>) {
  const { setIsOnboarding } = useSettingsActions()
  const theme = useTheme()

  const { isLoading, onSubmit } = useSignIn()
  const { handleBiometricLogin, isBiometricsEnabled } = useBiometrics({
    onSubmit
  })

  const navigateToSignup = () => {
    setIsOnboarding(true)
    amplitude.logEvent('Phone Verification Initiated')
    CustomerIO.logEvent('phone_verification_initiated')
    logEvent('open_sign_up')
    logEvent('open_phone_no_verification')

    navigation?.navigate('EnterPhoneNumber')
  }

  return (
    <AnimatedBox bg="background" entering={FadeIn.duration(800)} flex={1}>
      <SafeAreaView style={flex1}>
        <StatusBar
          backgroundColor={theme.colors.white}
          barStyle="dark-content"
        />
        <KeyboardAvoidingView enabled style={flex1}>
          <ScrollView style={scrollContainer}>
            <Text mb="s" mt="xl" variant="header-h2-20-medium">
              Welcome Back
            </Text>
            <Text color="soft-tect" variant="body-15-regular">
              Let’s get you logged in to get back to building your
              dollar-denominated investment portfolio.
            </Text>
            <FormFields
              isLoading={isLoading}
              navigation={navigation}
              onSubmit={onSubmit}
            />
            {isBiometricsEnabled && (
              <BiometricsAuth onPress={handleBiometricLogin} />
            )}
          </ScrollView>
          <Footer onPress={navigateToSignup} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AnimatedBox>
  )
}
