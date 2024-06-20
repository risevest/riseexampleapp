import { TouchableOpacityProps, ViewStyle } from 'react-native'

export interface IImageCard extends TouchableOpacityProps {
  body: string
  hasTag?: boolean
  header: string
  imageStyle?: any
  isClosed?: boolean
  matureAt?: Date
  order: 'reversed' | 'regular'
  pictureUrl?: string
  planType: string
  returns: IReturns[]
  showGains?: boolean
  style?: ViewStyle
  type?: string
}

export interface IPortfolioCard extends TouchableOpacityProps {
  cardStyle?: any
  cardTitleStyle?: any
  heading: string
  level?: 'low' | 'high' | 'medium' | ''
  textStyle?: any
  type?: 'large' | 'small'
  value: string
}

export interface IGoalCard extends TouchableOpacityProps {
  imageStyle?: any
  landingPageImage: string
  planDescription?: string
  planImage: string
  planName: string
  style?: any
  textStyle?: any
  type: string
}
