import { TextInputProps } from 'react-native'

import { ExchangeRateModalProps } from '../ExchangeRateModal/new-exchange-rate-modal.props'
import { Amount } from './types'

export interface DualCurrencyInputProps
  extends Partial<ExchangeRateModalProps>,
    TextInputProps {
  /**
   * currency symbol of local currency.
   */
  currencySymbol: string

  /**
   * handle change for amount
   */
  handleChange: ({ localAmount, dollarAmount }: Amount) => void

  /**
   * type of request
   */
  requestType: 'funding' | 'withdrawal'
}

export interface CurrencyInputProps extends TextInputProps {
  currencySymbol?: string
}
