import { BoxProps } from '@risemaxi/sarcelle/dist/components/box/types'

export interface CustomKeyboardProps extends BoxProps {
  /**
   * description text or element between the indicator and keypad
   */
  description?: React.ReactNode
  /**
   * disable all keys .
   */
  disabled?: boolean
  /**
   * controls
   */
  error?: boolean
  /**
   * custom react element to render on the bottom left
   */
  iconBottomLeft?: React.ReactNode
  /**
   * custom react element to render on the bottom right
   */
  iconBottomRight?: React.ReactNode
  /**
   * max length a user can input
   */
  maxLength?: number
  /**
   * fired every time the value changes
   */
  onChangeText?: (value: string) => void
  /**
   * press event for the bottom left icon
   */
  onIconBottomLeftPress?: () => void
  /**
   * press event for the bottom right icon
   */
  onIconBottomRightPress?: () => void
  /**
   * fired when a user has inputted the max allowed length
   */
  onInputComplete?: (value: string) => void
  /**
   * to show the pin text or hide it
   */
  showPIN?: boolean
  /**
   * to indicate when input is entered through the ui
   */
  validateOnInput?: boolean
}
