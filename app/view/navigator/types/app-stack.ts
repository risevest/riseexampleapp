import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { AuthStackParamsList } from './auth-stack'
import { NestedStackStackParamsList } from './nested-stack'

export type AppStackParamsList = {
  AppStack: NavigatorScreenParams<NestedStackStackParamsList>
  AuthStack: NavigatorScreenParams<AuthStackParamsList>
}

export type AppStackScreenProps<T extends keyof AppStackParamsList> =
  NativeStackScreenProps<AppStackParamsList, T>
