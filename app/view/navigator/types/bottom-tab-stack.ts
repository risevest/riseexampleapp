import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type BottomTabStackParamsList = {}

export type BottomTabStackScreenProps<
  T extends keyof BottomTabStackParamsList
> = BottomTabScreenProps<BottomTabStackParamsList, T>
