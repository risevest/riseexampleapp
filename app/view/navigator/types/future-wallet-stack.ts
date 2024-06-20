import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DeactivatedCardProps } from 'app/view/App/Wallet/virtual-card-tab/deactivated-card'

import { RootStackParamsList } from './root-stack'

export type FutureWalletStackParamsList = {
  WalletScreen:
    | {
        deactivatedCard?: DeactivatedCardProps
        showNGNCard?: boolean
        showUSDCard?: boolean
        virtualCard?: boolean
      }
    | undefined
}

export type FutureWalletStackScreenProps<
  Screen extends keyof FutureWalletStackParamsList
> = CompositeScreenProps<
  NativeStackScreenProps<FutureWalletStackParamsList, Screen>,
  NativeStackScreenProps<RootStackParamsList>
>
