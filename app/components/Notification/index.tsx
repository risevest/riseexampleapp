/* eslint-disable react-hooks/exhaustive-deps */
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging'
import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { screenHeight } from 'app/design'
import { clearErrorDispatcher } from 'app/redux/error/dispatchers'
import { pageMap } from 'app/utils'
import { navigationRef } from 'app/view/navigator'
import React, { useEffect } from 'react'
import { ImageBackground, ViewStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'

import { hideNotificationDispatcher } from '../../redux/notification/dispatcher'
import { AppState } from '../../redux/types'
import { toastMethods } from '../toast'
import ErrorNotification from './error-notification'
import { styles } from './styles'

interface INotificationObject {
  message: string
  notifType?: 'error' | 'warning' | 'success'
  showNotif?: boolean
  title: string
}

const OVER_DRAG = 40

export interface INotificationProps {
  clearError: () => void
  hideNotificationDispatcher: () => any
  notification: INotificationObject
}

export function Notification() {
  const dispatch = useDispatch()
  const {
    showNotif,
    title,
    message,
    notifType: notificationType
  } = useSelector((state: AppState) => state.notification)
  const offsetY = useSharedValue(0)

  useEffect(() => {
    const onMessage = async (
      remoteMessage: FirebaseMessagingTypes.RemoteMessage
    ) => {
      const handleNavigation = async (
        target: string | object,
        targetId: number | null,
        targetUrl: string | null
      ) => {
        const navigation = navigationRef?.current
        if (!navigation || typeof target !== 'string') {
          return
        }
        const pageObject = pageMap[target]
        if (target === 'Feed' && !targetUrl) {
          navigation?.navigate('App', {
            params: {
              params: { id: String(targetId) },
              screen: 'SingleFeed'
            },
            screen: 'AppStack'
          })
        } else if (target === 'Feed' && targetUrl) {
          navigation?.navigate('App', {
            params: {
              params: {
                canShare: true,
                id: String(targetId),
                prevScreen: 'Notifications',
                type: 'feed',
                uri: targetUrl
              },
              screen: 'ExternalLinks'
            },
            screen: 'AppStack'
          })
        } else if (target === 'verifications') {
          navigation?.navigate('App', {
            params: {
              params: {
                screen: 'IDVerification'
              },
              screen: 'IDStack'
            },
            screen: 'AppStack'
          })
        } else if (pageObject) {
          navigation?.navigate('App', {
            params: {
              params: (targetId
                ? { [pageObject.paramName]: targetId }
                : { screen: pageObject.screen || 'Dashboard' }) as any,
              screen: pageObject?.stack || 'Home'
            },
            screen: 'AppStack'
          })
        }
      }
      // TODO: Handle notification individually
      const { title: notificationTitle, body } =
        remoteMessage?.notification || {}

      if (notificationTitle && body) {
        toastMethods.show({
          onPress() {
            if (remoteMessage?.data && remoteMessage.data?.target_type) {
              handleNavigation(
                remoteMessage.data?.targetType ||
                  remoteMessage.data?.target_type,
                (remoteMessage.data?.targetId ||
                  remoteMessage.data?.target_id) as any,
                (remoteMessage?.data?.targetUrl ||
                  remoteMessage.data?.target_url) as any
              )
            }
          },
          props: {
            contentProps: {
              description: body,
              icon: 'alert-feed',
              title: notificationTitle
            }
          },
          type: 'alert'
        })
      }
    }
    const unsubscribeMessaging = messaging().onMessage(onMessage)

    return () => {
      if (unsubscribeMessaging) {
        unsubscribeMessaging()
      }
    }
  }, [])
  const hideNotif = () => {
    dispatch(hideNotificationDispatcher())
  }
  const clearError = () => {
    dispatch(clearErrorDispatcher())
  }

  const handleCloseNotification = () => {
    clearError()
    hideNotif()
  }

  useEffect(() => {
    const closeNotif = setTimeout(() => {
      handleCloseNotification()
    }, 3000)

    return () => {
      clearInterval(closeNotif)
    }
  }, [showNotif])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }]
    }
  })

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = offsetY.value + event.changeY
      const clamped = Math.min(OVER_DRAG, offsetDelta)
      offsetY.value = offsetDelta > 0 ? withSpring(clamped) : offsetDelta
    })
    .onFinalize(() => {
      if (offsetY.value > -OVER_DRAG / 2) {
        offsetY.value = withSpring(0)
      } else {
        offsetY.value = withSpring(-screenHeight - OVER_DRAG, undefined, () => {
          runOnJS(handleCloseNotification)()
          offsetY.value = 0
        })
      }
    })

  if (showNotif && notificationType === 'error') {
    return (
      <ErrorNotification message={message} onPress={handleCloseNotification} />
    )
  }

  return showNotif ? (
    <Animatable.View
      animation="slideInDown"
      duration={1000}
      style={CONTAINER}
      useNativeDriver
    >
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <ImageBackground
            source={require('app/assets/images/toast-background.png')}
            style={IMAGE_BACKGROUND}
          >
            <Box flexDirection="row" marginBottom={10}>
              <Icon name="mic" size={16} />
              <Box marginLeft={8}>
                <Text color="neutral-dark-mode" variant="button-15-bold">
                  {title}
                </Text>
              </Box>
            </Box>

            <Text color="neutral-dark-mode" variant="body-13-regular">
              {message}
            </Text>
          </ImageBackground>
        </Animated.View>
      </GestureDetector>
    </Animatable.View>
  ) : null
}

const CONTAINER: ViewStyle = {
  flex: 1,
  left: 0,
  position: 'absolute',
  right: 0
}

const IMAGE_BACKGROUND: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
  paddingVertical: 11
}

export default Notification
