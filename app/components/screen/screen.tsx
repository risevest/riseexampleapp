import { useTheme } from '@risemaxi/sarcelle'
import * as React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ErrorBoundary } from '../ErrorBoundary'
import { useScrollLabel } from '../ScrollLabel/hooks'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { ScreenProps } from './screen.props'

const isIos = Platform.OS === 'ios'

function ScreenWithoutScrolling(props: ScreenProps) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = {
    backgroundColor: props.backgroundColor || colors.background
  }
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
      style={[preset.outer, backgroundStyle]}
    >
      <StatusBar barStyle={props.statusBar || 'dark-content'} />
      <View style={insetStyle} testID={props.testID} />
      {props.header}
      <View style={[preset.inner, style]}>{props.children}</View>
      {props.footer}
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const { colors } = useTheme()
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : { backgroundColor: colors.background }
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const { handleScroll, renderIndicator } = useScrollLabel({
    scrollRef: props.innerRef as NonNullable<typeof props.innerRef>,
    showScrollLabel: props.showScrollLabel
  })

  return (
    <>
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : 'height'}
        keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
        style={[preset.outer, backgroundStyle]}
      >
        <StatusBar
          barStyle={props.statusBar || 'dark-content'}
          {...props.statusBarProps}
        />
        <View
          style={[preset.outer, backgroundStyle, insetStyle]}
          testID={props.testID}
        >
          {props.header}
          <ScrollView
            contentContainerStyle={[preset.inner, style]}
            keyboardShouldPersistTaps={
              props.keyboardShouldPersistTaps || 'handled'
            }
            onScroll={handleScroll(props.onScroll)}
            ref={props.innerRef || null}
            refreshControl={props.refreshControl}
            scrollEventThrottle={props.scrollEventThrottle ?? 16}
            showsVerticalScrollIndicator={false}
            style={[preset.outer, backgroundStyle]}
          >
            {props.children}
          </ScrollView>
          {props.footer}
        </View>
      </KeyboardAvoidingView>
      {props.showScrollLabel && renderIndicator}
    </>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  return (
    <ErrorBoundary>
      {isNonScrolling(props.preset) ? (
        <ScreenWithoutScrolling {...props} />
      ) : (
        <ScreenWithScrolling {...props} />
      )}
    </ErrorBoundary>
  )
}
