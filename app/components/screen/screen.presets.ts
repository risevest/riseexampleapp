import { ViewStyle } from 'react-native'

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    inner: {
      alignItems: 'stretch',
      flex: 1,
      height: '100%',
      justifyContent: 'flex-start',
      width: '100%'
    } as ViewStyle,
    outer: {
      flex: 1,
      height: '100%'
    } as ViewStyle
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    inner: { alignItems: 'stretch', justifyContent: 'flex-start' } as ViewStyle,
    outer: {
      flex: 1,
      height: '100%'
    } as ViewStyle
  }
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset?: ScreenPresets) {
  // any of these things will make you scroll
  return !presets[preset!] || preset === 'fixed'
}
