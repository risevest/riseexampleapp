import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'

export type VerifyEmailStackParamsList = {
  ConfirmEmail: undefined
  EnterEmail: undefined
  VerifyEmailMore: { email: string }
}

export type VerifyEmailStackScreenProps<
  Screen extends keyof VerifyEmailStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<VerifyEmailStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
