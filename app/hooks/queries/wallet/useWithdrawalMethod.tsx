import { getConfigSetting } from 'app/api/v2'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from '@tanstack/react-query'

export interface WithdrawalMethod {
  fee_type: string
  fee_value: string
  is_enabled: boolean
}

/**
 * Get the withdrawal fee of a withdrawal method
 * @param withdrawalMethod
 **/
export function useWithdrawalMethod(
  withdrawalMethod: 'bank_account' | 'crypto_wallet'
) {
  const { status, data, ...query } = useQuery('withdrawalFee', () =>
    getConfigSetting<WithdrawalMethod, 'name'>(
      'withdrawal_method',
      'name',
      withdrawalMethod
    )
  )

  const fee_value = data?.fee_value
  const fee_type = data?.fee_type
  const is_enabled = data?.is_enabled

  function getWithdrawalFee(value: number) {
    let riseFee: string = ''
    let withdrawableAmount

    if (fee_type === 'percentage' && value) {
      riseFee = Number((value * Number(fee_value)) / 100).toFixed(2)
      withdrawableAmount = (value - Number(riseFee)).toFixed(2)
    }

    if (fee_type === 'none' && value) {
      riseFee = 'free'
      withdrawableAmount = value
    }
    return { riseFee, withdrawableAmount }
  }

  return {
    ...query,
    data,
    fee_value,
    getWithdrawalFee,
    is_enabled,
    requestStatus: transformQueryStatusToRiseStatus(status),
    status
  }
}
