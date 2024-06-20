import { useIsFocused } from '@react-navigation/native'
import { selectAppUser } from 'app/redux/user/selector'
import { useIsOnboarding, useUserHasSeenIntroScreen } from 'app/store/settings'
import { AuthStackScreenProps } from 'app/view/navigator/types/auth-stack'
import React from 'react'
import { Animated, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'

import { fetchItemFromStorage } from '../../../utils/asyncstorage'
import InitialRoute from './View'

export const InitialAuthRouteContainer = ({
  navigation
}: AuthStackScreenProps<'InitialRoute'>) => {
  const visibility = new Animated.Value(1)
  const user = useSelector(selectAppUser)
  const hasSeenIntroScreen = useUserHasSeenIntroScreen()
  const userIsStillOnboarding = useIsOnboarding()
  const isFocused = useIsFocused()

  React.useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      const loginOption = await fetchItemFromStorage('loginOption', 'password')
      if (hasSeenIntroScreen) {
        if (loginOption === 'pin' && user?.firstName) {
          navigation.navigate('PinLogin')
        } else {
          navigation.navigate('Login')
        }
      } else {
        navigation.navigate('IntroScreens')
      }
    })()
  }, [
    navigation,
    user?.firstName,
    hasSeenIntroScreen,
    userIsStillOnboarding,
    isFocused
  ])

  return (
    <Animated.View style={[FLEX, { opacity: visibility }]}>
      <InitialRoute />
    </Animated.View>
  )
}

export default InitialAuthRouteContainer

const FLEX: ViewStyle = { flex: 1 }
