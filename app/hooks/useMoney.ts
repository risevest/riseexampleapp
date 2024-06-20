// hooks for all things money

import { useBalanceVisibility } from 'app/store/settings'
import { formatPlanValue } from 'app/utils/numberformatter'
import React from 'react'

interface Options {
  currencySign?: CurrencySign
  plan?: false
}

export const HASH = '••••••'

/**
 * @description useHiddenAmount allows us show money with or without currency or hashes
 * @param amount money to format
 * @param plan tells us if to format with dollar in front or not
 * @param min tells us the minimum amount of * to display
 */
export function useHiddenAmount(amount: string | number, options?: Options) {
  const { plan = true, currencySign } = options || {}
  const hidden = useBalanceVisibility()

  return React.useMemo(() => {
    if (!hidden) {
      return HASH
    } else if (plan) {
      return formatPlanValue(amount, true, currencySign)
    } else {
      return amount
    }
  }, [amount, currencySign, hidden, plan])
}
