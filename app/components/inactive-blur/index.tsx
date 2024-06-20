import { BlurView } from '@react-native-community/blur'
import { useTheme } from '@risemaxi/sarcelle'
import constants from 'app/config/constants'
import { logoutUser } from 'app/redux/user/dispatchers'
import { getInactiveTimestamp, setInactiveTimestamp } from 'app/store/settings'
import chroma from 'chroma-js'
import { differenceInMinutes } from 'date-fns'
import React, { memo, useEffect, useState } from 'react'
import { AppState, NativeModules, Platform, StyleSheet } from 'react-native'
import RNRestart from 'react-native-restart'
import { useDispatch } from 'react-redux'

export const InactiveBlur = memo(() => {
  const [shouldBlur, setShouldBlur] = useState(false)
  const { colors } = useTheme()

  const dispatch = useDispatch()

  useEffect(() => {
    const onActive = (inactiveTimestamp: string | null) => {
      setShouldBlur(false)
      if (!inactiveTimestamp) return
      const diffInMinutes = differenceInMinutes(
        new Date(),
        new Date(inactiveTimestamp)
      )

      if (diffInMinutes >= constants.BACKGROUND_GRACE_PERIOD) {
        if (Platform.OS === 'ios') {
          const RiseModalWorkaroundModule =
            NativeModules.RiseModalWorkaroundModule as IRiseModalWorkaroundModule

          RiseModalWorkaroundModule.checkIfOpenModals().then((result) => {
            if (result.modalOpen) {
              RNRestart.Restart()
            } else {
              dispatch(logoutUser())
            }
          })
        } else {
          dispatch(logoutUser())
        }
      }
    }
    const onInactive = () => {
      setShouldBlur(true)
      setInactiveTimestamp()
    }

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      const inactiveTimestamp = getInactiveTimestamp()
      if (/inactive|background/.test(nextAppState)) {
        onInactive()
      } else if (nextAppState === 'active') {
        onActive(inactiveTimestamp)
      }
    })

    // if (Platform.OS === 'android') {
    //   const focus = AppState.addEventListener('focus', onActive)
    //   const blur = AppState.addEventListener('blur', onInactive)

    //   return () => {
    //     blur.remove()
    //     focus.remove()
    //     subscription?.remove?.()
    //   }
    // }

    return () => subscription?.remove?.()
  }, [dispatch])

  return shouldBlur && Platform.OS !== 'android' ? (
    <BlurView
      blurAmount={20}
      blurType="light"
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: chroma(colors.primary).alpha(0.1).hex() }
      ]}
    />
  ) : null
})

InactiveBlur.displayName = 'InactiveBlur'
