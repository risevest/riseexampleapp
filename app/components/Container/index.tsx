import constants from 'app/config/constants'
import React from 'react'
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Animation } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'

import { UseTheme, useTheme } from '../../design/theme'

interface IContainer {
  animation?: Animation
  backgroundColor?: string
  children: any
  statusBarColor?: string
}

const Container = ({
  children,
  backgroundColor,
  animation = 'fadeIn',
  statusBarColor
}: IContainer) => {
  const { theme } = useTheme() as UseTheme

  const CONTAINER_2: ViewStyle = {
    backgroundColor: backgroundColor ? backgroundColor : theme.primarySurface,
    flex: 1
  }

  return (
    <Animatable.View
      animation={animation}
      duration={900}
      style={CONTAINER_1}
      useNativeDriver
    >
      <SafeAreaView style={CONTAINER_2}>
        <StatusBar
          backgroundColor={
            statusBarColor ? statusBarColor : theme.primarySurface
          }
          barStyle="dark-content"
        />
        {constants.IS_TEST_MODE && (
          <View style={TEXT_MODE_CONTAINER}>
            <Text style={TEXT_MODE_TEXT}>
              TEST MODE (v{constants.APP_VERSION})
            </Text>
          </View>
        )}

        <KeyboardAvoidingView enabled style={KEYBOARD_AVOIDING_VIEW_CONTAINER}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animatable.View>
  )
}

const CONTAINER_1: ViewStyle = { flex: 1 }

const TEXT_MODE_TEXT: TextStyle = {
  color: 'white',
  paddingVertical: 2,
  textAlign: 'center'
}

const TEXT_MODE_CONTAINER: ViewStyle = {
  backgroundColor: 'red',
  left: 0,
  position: 'relative',
  right: 0,
  top: 0
}

const KEYBOARD_AVOIDING_VIEW_CONTAINER: ViewStyle = { height: '102%' }

export default Container
