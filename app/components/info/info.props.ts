import { BoxProps } from '@risemaxi/sarcelle/dist/components/box/types'
import { TextStyle } from 'react-native'

export interface InfoProps extends BoxProps {
  iconColor?: string
  linkText?: string
  onPress?: () => void
  text: string | React.JSX.Element
  textStyle?: TextStyle
}
