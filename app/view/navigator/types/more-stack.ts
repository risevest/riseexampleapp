import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'

export type MoreStackParamsList = {
  More: undefined
}

export type MoreStackScreenProps<Screen extends keyof MoreStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<MoreStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
