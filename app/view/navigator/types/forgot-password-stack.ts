import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamsList } from './root-stack'
import { MessageParams } from './types'

export type ForgotPasswordParamsList = {
  ConfirmEmail: { loggedIn?: boolean; userEmail: string }
  ConfirmPasswordReset: {
    name: string
  }
  CreateNewPassword: {
    email: string
    name: string
    token: string
  }
  MessageScreen: MessageParams
  ResetPasswordHome: {
    email?: string
  }
}

export type ForgotPasswordScreenProps<
  Screen extends keyof ForgotPasswordParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<ForgotPasswordParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
