import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from '@tanstack/react-query'

import { getConfigSetting } from '../api/v2'

export interface TokenResponse {
  currency_type: string
  name: string
  rate: string
  symbol: string
}

export const useCryptoTokens = () => {
  const { status, data, ...query } = useQuery<TokenResponse>(
    'cryptoTokens',
    () =>
      getConfigSetting<TokenResponse, 'currency_type'>(
        'currency',
        'currency_type',
        'crypto'
      )
  )

  const tokens = (data || []) as any[]

  return {
    ...query,
    requestStatus: transformQueryStatusToRiseStatus(status),
    tokens
  }
}
