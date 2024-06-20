import { ExchangeRateModalProps } from './../ExchangeRateModal/new-exchange-rate-modal.props'

export interface TransferSectionProps extends ExchangeRateModalProps {
  /**
   * amount to be funded/withdrawed .
   */
  amount: string

  /**
   * Currency symbol to be displayed .
   */
  currencySymbol: string

  dollarValue: string

  /**
   * boolean value to indicate use for fund plan .
   */
  fundPlan?: boolean

  /**
   * type of funding method .
   */
  fundingMethod?: string

  /**
   * Currency rate .
   */
  rate: number

  /**
   * to display wallet balance.
   */
  walletBalance: string

  /**
   * WithdrawalMethod .
   */
  withdrawalMethod?: string
}

export interface WalletBalanceTextProps {
  transactionType: 'funding' | 'withdrawal'
  walletBalance: string
}
