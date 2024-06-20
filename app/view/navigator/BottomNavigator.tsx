import {
  NavigationProp,
  useLinkTo,
  useNavigation
} from '@react-navigation/native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack'
import {
  useAppsFlyerLinkState,
  useFcmInitialNotificationState,
  useSettingsActions
} from 'app/store/settings'
import { pageMap } from 'app/utils'
import React from 'react'

import BottomTabs from './bottom-tabs'
import { NestedStackStackParamsList } from './types'

const Stack = createStackNavigator<NestedStackStackParamsList>()

const NestedStack = () => {
  const navigation = useNavigation<NavigationProp<NestedStackStackParamsList>>()
  const { link: appsFlyerLink, count } = useAppsFlyerLinkState()
  const fcmInitialNotificationState = useFcmInitialNotificationState()
  const { setFcmInitialNotificationState } = useSettingsActions()
  const linkTo = useLinkTo()

  React.useEffect(() => {
    if (appsFlyerLink) {
      try {
        linkTo(appsFlyerLink)
      } catch (error) {
        // fail silently incase deep_link_value was passed incorrectly
      }
    }
    // Need to add count incase we get the same appsFlyer link multiple times
  }, [appsFlyerLink, linkTo, count])

  React.useEffect(() => {
    const handleNavigation = async (
      target: string,
      targetId: number | null,
      targetUrl: string | null
    ) => {
      const pageObject = pageMap[target]
      if (target === 'Feed' && !targetUrl) {
        navigation?.navigate('SingleFeed', { id: String(targetId) })
      } else if (target === 'Feed' && targetUrl) {
        navigation?.navigate('ExternalLinks', {
          canShare: true,
          id: String(targetId),
          prevScreen: 'Notifications',
          type: 'feed',
          uri: targetUrl
        })
      } else if (target === 'ExchangeRate') {
        ;(navigation as any)?.navigate('WalletStack', {
          params: {
            params: {
              screen: 'WalletScreen'
            },
            screen: 'FutureWalletStack'
          },
          screen: 'Home'
        })
      } else if (target === 'verifications') {
        navigation?.navigate('IDStack', {
          screen: 'IDVerification'
        })
      } else if (pageObject) {
        navigation?.navigate(
          pageObject.stack,
          targetId ? { [pageObject.paramName]: targetId } : {}
        )
      }
    }
    if (fcmInitialNotificationState && fcmInitialNotificationState.targetType) {
      handleNavigation(
        fcmInitialNotificationState.targetType,
        fcmInitialNotificationState.targetId || null,
        fcmInitialNotificationState.targetUrl || null
      )
      // clear out handled notification
      setFcmInitialNotificationState(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcmInitialNotificationState])
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name="Home" />
     
    </Stack.Navigator>
  )
}

export default NestedStack
