import { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Animation } from 'react-native-animatable'

import { ButtonProps } from '../button/button.props'

export type ModalType =
  | 'fullScreen'
  | 'halfScreen'
  | 'bottomSheet'
  | 'partialFull'
  | 'fixedHeight'
  | 'partialHalf'
  | 'content'

export interface DynamicModalProps {
  /**
   * optional customizable animation on modal open
   */
  animationIn?: Animation

  /**
   * optional animation duration length on modal open
   */
  animationInDuration?: number

  /**
   * optional customizable animation on modal close
   */
  animationOut?: Animation

  /**
   * optional animation duration length on modal close
   */
  animationOutDuration?: number

  /**
   * optional prop for keyboard avoiding view
   */
  avoidKeyboard?: boolean

  /**
   * optional button style
   */
  buttonStyle?: StyleProp<ViewStyle>

  /**
   * optional buttons
   */
  buttons?: ButtonProps[]

  /**
   * children elements in modal
   */
  children: React.ReactNode

  customHeader?: ReactNode

  /**
   * disable modal close when tapped outside the modal component
   */
  disableBackDropPress?: boolean

  /**
   * optional header style
   */
  headerStyle?: TextStyle

  /**
   * optional header text
   */
  headerText?: string

  /**
   * style for the header text
   */
  headerTextStyle?: TextStyle

  /**
   * modal height
   */
  height?: number | string

  /**
   * hide the header in the modal
   */
  hideHeader?: boolean

  /**
   * to denote if modal is open
   */
  isModalOpen: boolean

  /**
   * action to happen after dismissing modal
   */
  onDismiss?: () => void

  paddingHorizontal?: number

  paddingVertical?: number

  /**
   * Wether to wrap the children of the modal with a scroll view
   */
  renderScrollView?: boolean
  /**
   * enable scrolling behaviour on modal
   */
  scrollEnabled?: boolean

  /**
   * applicable for scrollable content in modals
   */
  showVerticalScrollIndicator?: boolean

  /**
   * function to toggle modal
   */
  toggleModalVisibility: () => void

  /**
   * modal type to determine the height
   */
  type: ModalType
}
