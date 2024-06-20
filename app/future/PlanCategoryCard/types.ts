import { StyleProp, ViewStyle } from 'react-native'
export interface IPlanCategoryCard {
  containerStyle?: StyleProp<ViewStyle>
  isAssetClass: boolean
  onPress: () => void
  plan: IAssetClass & GoalPlanData
}
