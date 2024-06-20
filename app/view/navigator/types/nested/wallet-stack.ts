import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BaseAsset, IdentityType } from 'app/domains/verification'
import {
  BankAccountDetails,
  Config,
  Currency,
  FundingMethod,
  RequestType,
  SavedBankAccount,
  VerifiedBankAccount,
  VirtualCardTransaction,
  WalletType
} from 'app/domains/wallet'
import { Vault } from 'app/domains/wallet/vault'
import { NamedImage } from 'app/view/App/More/id-verification/hooks/use-image-capture'
import { CountryInfo } from 'app/view/App/More/id-verification/types'
import Wallet from 'app/view/App/Wallet'
import {
  BankStatementParams,
  IDDetailsParams,
  UserAddressParams,
  UserDetailsParams
} from 'app/view/App/Wallet/funding/virtual-accounts/types'
import { DeactivatedCardProps } from 'app/view/App/Wallet/virtual-card-tab/deactivated-card'

import { RootStackParamsList } from '../root-stack'
import { CameraScreenParams, MessageParams, TransferPageParams } from '../types'

type CurrencyParams = {
  currency: Currency
  currencySymbol: string
}

type ConfirmWithdrawalParams = {
  address: string
  fee_value: string | undefined
  riseFee: string
  token: string
  tokenAmount: number
  tokenIcon: JSX.Element
  usdAmount: number
  withdrawableAmount: string | number | undefined
}

type SavePhoneNumberMomoParams = CurrencyParams & {
  amount?: number
  localAmount?: number
  network: string
  networkName: string
  number: string
  wallet?: Currency
}

type GBPEUROriginDetails = {
  currency: Currency
  from?: 'profile' | 'wallets'
}

type GBPEURDetails = {
  accountDetail: VerifiedBankAccount<
    Omit<BankAccountDetails, 'bankId'> & {
      bankId: string
      countryName: string
      currency: Currency
      routingNumber: string
      swiftCode: string
    }
  >
  from?: GBPEUROriginDetails['from']
}

interface FundWithdrawVirtualCard {
  autoFund?: boolean
  autoFundParams?: AutoFundParams
  transactionType: RequestType
}

interface ConfirmAmountVirtualCard {
  amount: number
  id: string
  processingFee: number
}

interface VirtualCardMessageScreen {
  errorMessage?: string
  fundingAmount: number
  status: 'success' | 'error'
  transactionType: RequestType
}

export interface AutoFundParams {
  amount?: number
  cardId?: string
  config?: Config
  frequency?: string
  isEnabled?: boolean
}

export interface Wallet {
  wallet: Currency
}

interface PINAction {
  changePIN?: boolean
  migration?: boolean
}

interface CardId {
  cardId?: string
}

export type WalletStackParamsList = {
  AddMoney: Wallet
  AddNumberMOMO: CurrencyParams & {
    name: string
    network: string
    number: string
  }
  AuthenticatePayment: {
    amount: number
    authenticationUrl: string
    fundingMethod: FundingMethod
    reference?: string
  }
  AutoFundFrequency: AutoFundParams
  AutoFundVirtualCardDetails: AutoFundParams
  CameraScreen: CameraScreenParams
  ChooseCard: CurrencyParams & {
    fundingAmount: {
      amount: number
      dollarValue: number
      originalAmount: number
    }
    totalAmount: number
  } & Wallet
  CompleteVerification: {
    currency: Currency
  }
  ConfirmAmount: {
    dollarValue: string
    isNairaPage: boolean
    nairaValue: string
    prevPage: string
  }
  ConfirmAmountMOMO: CurrencyParams & {
    amount: number
    localAmount: number
    network: string
    networkName: string
    number: string
  }
  ConfirmAmountMomo: CurrencyParams & {
    amount: number
    id?: string
    localAmount: number
    network?: string
    number: string
  }
  ConfirmAmountVirtualCard: ConfirmAmountVirtualCard
  ConfirmBankAccount: {
    amount: number
    bank: SavedBankAccount
    currency: Currency
    localAmount: number
  } & Wallet
  ConfirmBankDetails: {
    accountDetail: VerifiedBankAccount
  }
  ConfirmNumberMOMO: CurrencyParams & {
    network: string
    networkName: string
    number: string
  }
  ConfirmPaymentMOMO: undefined
  ConfirmVirtualCardPIN: { pin: string } & PINAction & CardId
  ConfirmWithdrawal: ConfirmWithdrawalParams
  CreateVirtualCardPIN: PINAction & CardId
  DeactivateCard: { deactivatedCard?: DeactivatedCardProps } | undefined
  DepositCrypto: { method: FundingMethod; transactionFee: string }
  DollarBankAccount: undefined
  DynamicConfirmAmount: CurrencyParams & {
    amount: number
    authenticationUrl?: string
    collectionProvider?: string
    localAmount: number
    merchantPaymentId?: string
    metaData?: {
      buyRate: number
      reference: string
    }
    walletType: WalletType
  } & Wallet
  EditVault: { vault: Vault }
  EnterAccountNumber: { currency: Currency }
  EnterNumberMOMOFunding: CurrencyParams
  EnterPhoneNumberMomo: CurrencyParams
  EnterVaultAmount: Partial<Vault> & Pick<Vault, 'name'>
  FormsOfID: CountryInfo
  FrequencyTabs: { autoFundParams: AutoFundParams; index: number }
  FundWithdrawVirtualCard: FundWithdrawVirtualCard
  FundingOptions: CurrencyParams & Wallet & { fromHomeScreen?: boolean }
  GBPEURConfirmAccountDetails: GBPEURDetails
  GBPEUREnterAccountDetails: GBPEUROriginDetails
  GBPEUREnterAddressDetails: GBPEURDetails
  GBPEURSelectBankAccount: CurrencyParams & Wallet
  IDDetails: IDDetailsParams
  KesInformation: undefined
  LockCard: undefined
  MessageScreen: MessageParams
  NairaBankAccount: undefined
  NairaBankAccountForNairaWallet: undefined
  NameVault: undefined
  OfacBlackListed: undefined
  PinConfirmationBankAccount: {
    amount: number
    bank: SavedBankAccount
    currency: Currency
    currencySymbol: string
    reason: string
  } & Wallet
  PinConfirmationMomoWithdrawal: CurrencyParams & {
    amount: number
    id?: string

    network: string
    number: string
    reason: string
  }
  RequestVirtualAccount: {
    currency: Currency
  }
  RequestVirtualAccountError: undefined
  RequestVirtualAccountForNairaWallet: undefined
  RequestVirtualAccountPending: undefined
  RequestVirtualAccountSuccess: undefined
  RequestVirtualCardError: { errorMessage?: string }
  RequestVirtualCardPending: undefined
  ReviewDetails: BankStatementParams & { bankStatement: BaseAsset }
  SavePhoneNumberMomo: SavePhoneNumberMomoParams
  SearchUser: { isEditable: boolean }
  SelectBank: {
    accountNumber: string
    currency: Currency
  }
  SelectBankAccount: CurrencyParams & Wallet
  SelectCountry: undefined
  SelectNumberMOMOFunding: CurrencyParams & { wallet?: Currency }
  SelectNumberMomo: CurrencyParams & { wallet?: Currency }
  SelectPlan: { amount?: string; isEditable: boolean }
  SelectToken: {
    isFundCrypto: boolean
  }
  SelectTokenNetwork: undefined
  SelectWithdrawalCurrency: undefined
  SelectWithdrawalType: CurrencyParams & Wallet
  SelectWithdrawalWalletType: CurrencyParams
  SendAmount: {
    address: string
    save: boolean
    token: string
    tokenIcon: JSX.Element
  }
  SendCrypto: {
    qrCode?: string
    token: {
      icon: JSX.Element
      name: string
      symbol: string
    }
  }
  SendToCryptoWalletPin: ConfirmWithdrawalParams & {
    address: string
    amount: string
  }
  SendToCryptoWalletSuccess: {
    address: string
    amount: string | number
  }
  SendToPlan: {
    amount: number
    fundingPeriods?: BreakdownData[]
    isEditable?: boolean
    plan: IPlan
  }
  SendToRiseUserPin: {
    amount: string
    recipient: RiseUser
  }
  ToPlanSuccess: {
    planData: { amount: string; isClosed: boolean; planName: string }
  }
  ToRiseUser: {
    recipient: RiseUser
  }
  TransferOptions: Wallet
  TransferPage: TransferPageParams
  TransferScreen: TransferPageParams
  TransferToUserSuccess: {
    amount: string | number
    recipient: RiseUser
  }
  UnLockCard: undefined
  UploadBankStatement: BankStatementParams
  UploadID: IdentityType & {
    image: NamedImage
  }
  UserAddress: UserAddressParams
  UserDetails: UserDetailsParams
  VerifyBVNIntroForNairaWallet: undefined
  ViewSavedNumberMomo: SavePhoneNumberMomoParams & { name: string }
  VirtualAccountInformation: undefined
  VirtualAccountTermsAndCondition: undefined
  VirtualCardInformation?: PINAction &
    CardId & { firstVirtualCard?: boolean; newCard?: boolean }
  VirtualCardInsufficientFunds: undefined
  VirtualCardLoadingScreen: ConfirmAmountVirtualCard & {
    virtualCardBalance: number
    walletBalance: number
  }
  VirtualCardMessageScreen: VirtualCardMessageScreen
  VirtualCardOTPScreen: { cardId: string }
  VirtualCardTransaction: { transaction: VirtualCardTransaction }
  VirtualCardTransactions: { id: string }
  VirtualCardVerifyBvn: undefined
  WalletToWallet: {
    transactionType: 'withdrawal' | 'funding'
    wallet: Currency
    walletType: string
  }
  WalletToWalletConfirmAmount: {
    amount: {
      dollarAmount: number
      localAmount: number
    }
    amountUsed: number
    currencySymbol: string
    wallet: Currency
    walletType: string
  }
  WithdrawalReason: {
    onNext: (reason: string) => void
  }
}

export type WalletStackScreenName = keyof WalletStackParamsList

export type WalletStackScreenProps<Screen extends keyof WalletStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<WalletStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >
