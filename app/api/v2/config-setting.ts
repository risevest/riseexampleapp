import instance from './base'

export type Entity = 'currency' | 'country' | 'withdrawal_method'

interface CurrencyEntityFilter {
  blockchain: string
  currency_type: 'fiat' | 'crypto'
  name: string
  rate: string
  symbol: string
}

interface CountryEntityFilter {
  code: string
  currency: string
  name: string
}

interface WithdrawalMethodEntityFilter {
  fee_type: string
  fee_value: number
  name: 'bank_account' | 'crypto_wallet'
}

export type Setting = CurrencyEntityFilter &
  CountryEntityFilter &
  WithdrawalMethodEntityFilter

export async function getConfigSetting<T, K extends keyof Setting>(
  entity: Entity,
  filterKey: K,
  filterValue: Setting[K]
): Promise<T> {
  const res = await instance.get('/config', {
    params: {
      entity: entity,
      filter_key: filterKey,
      filter_value: filterValue
    }
  })
  return res.data
}
