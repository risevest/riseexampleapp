import React from 'react'
import {
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  StatusBarProps,
  StyleProp,
  ViewStyle
} from 'react-native'

import { KeyboardOffsets, ScreenPresets } from './screen.presets'

export interface ScreenProps {
  /**
   * An optional background color
   */
  backgroundColor?: string

  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Footer component
   */
  footer?: React.ReactNode

  /**
   * Header component
   */
  header?: React.ReactNode

  /**
   * React reference to the scroll view - useful for scrolling to positions
   */
  innerRef?: React.MutableRefObject<ScrollView | null>

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never'

  /**
   * Handles scroll event when the preset is set to scroll
   */
  onScroll?: ScrollViewProps['onScroll']

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets

  /**
   * RefreshControl component for the screen
   */
  refreshControl?: React.ReactElement<RefreshControlProps>

  /**
   * This controls how often the scroll event will be fired while scrolling (as a time interval in ms).
   */
  scrollEventThrottle?: ScrollViewProps['scrollEventThrottle']

  /**
   * When true, shows a the scroll label with indication that there is more content
   */
  showScrollLabel?: boolean | undefined

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: 'light-content' | 'dark-content'

  /**
   * An optional status bar prop for over-riding status bar styles
   */
  statusBarProps?: StatusBarProps

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * this is the test id used in identifying this component
   */
  testID?: string

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean
}
