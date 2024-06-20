import { formatInputAmount, parseAmount } from 'app/internals/strings'
import { useState } from 'react'

import { Amount } from './types'

export function useSingleCurrencyInput(
  onChange: ({ localAmount, dollarAmount }: Amount) => void
) {
  const [dollarValue, setDollarValue] = useState('')

  const exportAmount = (usd: number) => {
    onChange({
      dollarAmount: usd,
      localAmount: 0
    })
  }

  const setToDefaultValues = () => {
    setDollarValue('')
    exportAmount(0)
  }

  const onChangeDollarValue = (value: string) => {
    if (value === '') {
      setToDefaultValues()
      return
    }

    const raw = Number(parseAmount(value))

    setDollarValue(formatInputAmount(String(parseAmount(value))))

    exportAmount(raw)
  }

  return {
    dollarValue,
    onChangeDollarValue
  }
}
