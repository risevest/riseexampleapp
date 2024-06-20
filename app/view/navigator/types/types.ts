import { IconName } from 'app/assets/icons/types'
import { Currency, WalletType } from 'app/domains/wallet'
import { NamedImage } from 'app/view/App/More/id-verification/hooks/use-image-capture'

export type PlanDetailsParams = {
  canGoBack?: boolean
  fromDashboard?: boolean
  planId: number
}

export type CameraScreenParams = {
  onDone: (image?: NamedImage) => void
}

export type TransferPageParams = {
  beneficiary: string
  buttonText?: string
  collectionProvider?: string
  currency: Currency
  currencySymbol: string
  direction: 'withdrawal' | 'funding' | 'withdrawal-fund'
  fromHomeScreen?: boolean
  fundingMethod?: string
  headerText: string
  maxAmount?: number
  network?: string
  onNext: (
    amount: number,
    localAmount: number,
    extraPayload?: {
      authenticationUrl?: string
      merchantPaymentId: string
      metaData: {
        buyRate: number
        reference: string
      }
    }
  ) => void
  useOnlyBaseCurrency?: boolean
  wallet?: Currency
  walletType: WalletType
  withdrawalMethod?: string
}

export type MessagePreset = 'success' | 'error' | 'custom'

export type MessageParams = {
  /**
   * press handler for the first button
   */
  action: () => void
  /**
   * press handler for the alternate button
   */
  action2?: () => void

  /**
   * The label of the first button
   */
  buttonLabel: string

  /**
   * label of an alternate button to the first
   */
  buttonLabel2?: string

  /**
   * Use a custom message icon
   */
  messageIcon?: IconName

  /**
   * Size of the icon component
   */
  messageIconSize?: number

  /**
   * The type of message to be displayed
   */
  preset: MessagePreset

  /**
   * The message subtitle
   */
  subtitle?: string
  /**
   * The message title
   */
  title: string
}

export type OnDoneFn = { onDone?: Noop }
