import { StyleProp, ViewStyle } from 'react-native'

export interface RetryProps {
  buttonText?: string
  containerStyle?: StyleProp<ViewStyle>
  error?: any
  onRetry: () => void
  text?: string
}
