import { getComputedWidth as gw, spacing } from 'app/design'
import { TextStyle, ViewStyle } from 'react-native'

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  alignItems: 'center',
  borderRadius: 4,
  justifyContent: 'center',
  padding: spacing.medium
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing.small
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const VIEW_PRESETS = {
  /**
   * A button with a light red background
   */
  danger: {
    ...BASE_VIEW,
    backgroundColor: 'rgba(235, 87, 87, 0.1);'
  } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0
  } as ViewStyle,

  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: '#0898A0' } as ViewStyle,

  secondary: {
    ...BASE_VIEW,
    backgroundColor: '#71879C1A'
  } as ViewStyle,

  /**
   * A button without a transparent background but maintains the button size
   */
  transparent: {
    ...BASE_VIEW,
    backgroundColor: 'transparent'
  } as ViewStyle
} as const

export const TEXT_PRESETS: Record<ButtonPresetNames, TextStyle> = {
  danger: {
    ...BASE_TEXT,
    color: '#F34040',
    fontFamily: 'DMSans-Bold',
    fontSize: gw(16)
  } as TextStyle,

  link: {
    ...BASE_TEXT,
    color: '#1d1d1d',
    paddingHorizontal: 0,
    paddingVertical: 0
  } as TextStyle,

  primary: {
    ...BASE_TEXT,
    color: '#ffffff',
    fontFamily: 'DMSans-Bold',
    fontSize: gw(16)
  } as TextStyle,

  secondary: {
    ...BASE_TEXT,
    color: '#0898A0',
    fontFamily: 'DMSans-Bold',
    fontSize: gw(16)
  } as TextStyle,

  transparent: {
    ...BASE_TEXT,
    color: '#0898A0',
    fontFamily: 'DMSans-Bold',
    fontSize: gw(16)
  } as TextStyle
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof VIEW_PRESETS
