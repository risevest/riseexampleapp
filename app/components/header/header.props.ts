import { PolymorphicText, RowProps } from '@risemaxi/sarcelle'
import { IconName, IconProps } from 'app/assets/icons/types'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type RenderItem = IconName | React.ReactElement

export interface HeaderProps {
  /**
   * Main header
   */
  headerText?: string

  /**
   * style for header title text
   */
  headerTextStyle?: TextStyle

  /**
   * Props for the left Icon
   */
  leftIconProps?: IconProps

  /**
   * Icon that should appear on the left
   */
  leftItem?: RenderItem

  /**
   * props to pass into the left row.
   */
  leftProps?: RowProps

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Props for the right Icon
   */
  rightIconProps?: IconProps

  /**
   * Icon that should appear on the right
   */
  rightItem?: RenderItem

  /**
   * props to pass into the right row.
   */
  rightProps?: RowProps

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Title props overrides.
   */
  titleProps?: PolymorphicText['defaultProps']
}
