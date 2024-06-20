import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'

export type RootStackRouteName = keyof RootStackParamsList

export type PinStackParamsList = {
  ConfirmPINReset: {
    prevRoute: RootStackRouteName
  }
  ConfirmPin: {
    firstName: string
    pinState: string
    prevRoute: RootStackRouteName
  }
  CreatePinScreen: {
    firstName: string
    prevRoute: RootStackRouteName
  }
}

export type PinStackScreenProps<Screen extends keyof PinStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<PinStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
