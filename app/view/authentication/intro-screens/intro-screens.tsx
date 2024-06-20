import { Box, Text } from '@risemaxi/sarcelle'
import { Paginator } from 'app/components/paginator'
import { useSettingsActions } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import CustomerIO from 'app/utils/analytics/customer-io'
import { AuthStackScreenProps } from 'app/view/navigator/types/auth-stack'
import React from 'react'
import { StatusBar, TouchableOpacity, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Carousel } from './components'
import { onboardingData } from './constant'
import { useCarouselAnimation } from './hooks'

const flex1: ViewStyle = {
  flex: 1
}

export function IntroScreens({
  navigation
}: AuthStackScreenProps<'IntroScreens'>) {
  const { setIsOnboarding, setHasSeenIntroScreen } = useSettingsActions()
  const carouselAnimation = useCarouselAnimation()
  const setIntroScreenState = async (route: 'Login' | 'EnterPhoneNumber') => {
    setIsOnboarding(route === 'EnterPhoneNumber')
    setHasSeenIntroScreen(true)
    navigation.navigate(route)
  }

  const signUp = () => {
    setIntroScreenState('EnterPhoneNumber')
    logEvent('open_phone_no_verification')
    CustomerIO.logEvent('phone_verification_initiated')
  }

  return (
    <LinearGradient
      colors={['#8EAFB1', '#D1E1DF']}
      locations={[0.1, 0.45]}
      style={flex1}
    >
      <StatusBar animated barStyle="dark-content" showHideTransition="fade" />
      <SafeAreaView style={flex1}>
        <Box flex={1} justifyContent="space-between" my="xl">
          <Carousel
            currentPage={carouselAnimation.currentPage}
            data={onboardingData}
            onScroll={carouselAnimation.onScroll}
          />
          <Paginator
            isScrollingBack={carouselAnimation.isScrollingBack}
            pageSize={onboardingData.length}
            sliderTranslateX={carouselAnimation.sliderTranslateX}
          />
          <Box paddingHorizontal="l">
            <Box flexDirection="row">
              <TouchableOpacity
                onPress={() => setIntroScreenState('Login')}
                style={SIGN_IN_BUTTON_CONTAINER}
              >
                <Box
                  backgroundColor={{ custom: '#DBE7E6' }}
                  borderColor={{ custom: 'rgba(8, 152, 160, 0.20)' }}
                  borderRadius={40}
                  borderWidth={1}
                  elevation={16}
                  height={54}
                  justifyContent="center"
                  shadowOffset={{
                    height: 0,
                    width: 0
                  }}
                  shadowOpacity={1}
                  shadowRadius={16}
                  style={SHADOW_COLOR}
                  width="100%"
                >
                  <Text
                    color="primary"
                    textAlign="center"
                    variant="button-15-bold"
                  >
                    Sign in
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={signUp}
                style={SIGN_UP_BUTTON_CONTAINER}
              >
                <Box
                  backgroundColor="primary"
                  borderRadius={40}
                  elevation={16}
                  height={54}
                  justifyContent="center"
                  shadowOffset={{
                    height: 0,
                    width: 0
                  }}
                  shadowOpacity={1}
                  shadowRadius={16}
                  style={SHADOW_COLOR}
                  width="100%"
                >
                  <Text
                    color="white"
                    textAlign="center"
                    variant="button-15-bold"
                  >
                    Create an account
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    </LinearGradient>
  )
}

const SIGN_IN_BUTTON_CONTAINER: ViewStyle = { marginRight: 16, width: '35%' }
const SIGN_UP_BUTTON_CONTAINER: ViewStyle = { width: '60%' }
const SHADOW_COLOR: ViewStyle = { shadowColor: 'rgba(8, 152, 160, 0.25)' }
