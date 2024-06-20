import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../root-stack'

export type DeleteAccountStackParamsList = {
  DeleteAccount: undefined
  DeleteAccountPassword: undefined
  DeleteAccountSuccess: undefined
}

export type DeleteAccountStackScreenName = keyof DeleteAccountStackParamsList

export type DeleteAccountStackScreenProps<
  Screen extends keyof DeleteAccountStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<DeleteAccountStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
