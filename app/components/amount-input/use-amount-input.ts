import { round } from 'app/internals/numbers'
import {
  formatAmount,
  formatInputAmount,
  parseAmount
} from 'app/internals/strings'
import { useState } from 'react'

import { AmountInputProps } from './types'

export function useAmountInput({
  defaultValue,
  transactionType,
  rate,
  useOnlyUSD,
  onChange,
  currencySymbol,
  defaultEditingCurrency = 'local'
}: AmountInputProps) {
  const defaultAmount = {
    dollarAmount: String(defaultValue?.dollarAmount || ''),
    localAmount: String(defaultValue?.localAmount || '')
  }

  const rateUsed =
    transactionType === 'funding' ? rate?.buyRate : rate?.sellRate

  const [amount, setAmount] = useState(defaultAmount)
  const [currentEditingAmount, setCurrentEditingAmount] = useState<
    'local' | 'dollar'
  >(useOnlyUSD ? 'dollar' : defaultEditingCurrency)

  const swapEditingAmount = () => {
    if (currentEditingAmount === 'local') {
      setCurrentEditingAmount('dollar')
    } else {
      setCurrentEditingAmount('local')
    }
  }

  const onChangeAmount = (value: string) => {
    if (/[a-zA-Z&_-]/.test(value)) {
      return
    }

    if (value === '') {
      setAmount({
        dollarAmount: '',
        localAmount: ''
      })
      onChange({
        dollarAmount: 0,
        localAmount: 0
      })
      return
    }
    if (currentEditingAmount === 'local') {
      const raw = Number(parseAmount(value))

      const usdRaw = round(raw / Number(rateUsed))

      if (raw >= Number.MAX_SAFE_INTEGER || usdRaw >= Number.MAX_SAFE_INTEGER) {
        return
      }

      setAmount({
        dollarAmount: formatAmount(usdRaw),
        localAmount: formatInputAmount(parseAmount(value))
      })

      onChange({
        dollarAmount: usdRaw,
        localAmount: raw
      })
    } else {
      const raw = Number(parseAmount(value))
      const localRaw = round(raw * Number(rateUsed))

      if (
        raw >= Number.MAX_SAFE_INTEGER ||
        localRaw >= Number.MAX_SAFE_INTEGER
      ) {
        return
      }

      setAmount({
        dollarAmount: formatInputAmount(parseAmount(value)),
        localAmount: formatAmount(localRaw)
      })
      onChange({
        dollarAmount: raw,
        localAmount: localRaw
      })
    }
  }

  const currencySymbolToShow =
    currentEditingAmount === 'local' ? '$' : currencySymbol

  const getNonEditingAmount = () => {
    if (currentEditingAmount === 'dollar' && amount.localAmount) {
      return amount.localAmount
    } else if (currentEditingAmount === 'local' && amount.dollarAmount) {
      return amount.dollarAmount
    } else {
      return '0.00'
    }
  }

  return {
    amount,
    currencySymbolToShow,
    currentEditingAmount,
    nonEditingAmount: getNonEditingAmount(),
    onChangeAmount,
    swapEditingAmount
  }
}
