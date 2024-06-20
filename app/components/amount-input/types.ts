import { Currency, RequestType } from 'app/domains/wallet'

export interface AmountInputProps {
  currency?: Currency
  currencySymbol?: string
  defaultEditingCurrency?: 'dollar' | 'local'
  defaultValue?: { dollarAmount: number; localAmount: number }
  disableSwap?: boolean
  error?: string
  onChange: (value: { dollarAmount: number; localAmount: number }) => void
  rate?: { buyRate?: number; sellRate?: number }
  transactionType: RequestType
  useOnlyUSD?: boolean
}
