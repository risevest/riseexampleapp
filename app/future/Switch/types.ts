import { StyleProp, ViewStyle } from 'react-native'

export type SwitchT = {
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onValueChange: () => void
  value: boolean
}
