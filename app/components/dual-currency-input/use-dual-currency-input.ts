import { round } from 'app/internals/numbers'
import {
  formatAmount,
  formatInputAmount,
  parseAmount
} from 'app/internals/strings'
import { useState } from 'react'

import { Amount } from './types'

export function useDualCurrencyInput(
  buyRate: number,
  onChange: ({ localAmount, dollarAmount }: Amount) => void
) {
  const defaultValues = {
    dollar: '',
    local: ''
  }

  const [values, setValues] = useState(defaultValues)

  const exportAmount = (local: number, usd: number) => {
    onChange({
      dollarAmount: usd,
      localAmount: local
    })
  }

  const setToDefaultValues = () => {
    setValues(defaultValues)
    exportAmount(0, 0)
  }

  const onChangeLocalValue = (value: string) => {
    if (value === '') {
      setToDefaultValues()
      return
    }

    const raw = Number(parseAmount(value))

    const usdRaw = round(raw / buyRate)

    if (raw >= Number.MAX_SAFE_INTEGER || usdRaw >= Number.MAX_SAFE_INTEGER) {
      return
    }

    setValues({
      dollar: formatAmount(usdRaw),
      local: formatInputAmount(parseAmount(value))
    })

    exportAmount(raw, usdRaw)
  }

  const onChangeDollarValue = (value: string) => {
    if (value === '') {
      setToDefaultValues()
      return
    }

    const raw = Number(parseAmount(value))
    const localRaw = round(raw * buyRate)

    if (raw >= Number.MAX_SAFE_INTEGER || localRaw >= Number.MAX_SAFE_INTEGER) {
      return
    }

    setValues({
      dollar: formatInputAmount(parseAmount(value)),
      local: formatAmount(localRaw)
    })

    exportAmount(localRaw, raw)
  }

  return {
    onChangeDollarValue,
    onChangeLocalValue,
    values
  }
}
