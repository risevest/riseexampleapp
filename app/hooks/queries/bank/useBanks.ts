import { fetchBanks } from 'app/api'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from '@tanstack/react-query'

export const useBanks = () => {
  const { status, data, ...query } = useQuery<IBank[]>('banks', () =>
    fetchBanks()
  )
  const banks = (data || []) as IBank[]
  return {
    banks,
    requestStatus: transformQueryStatusToRiseStatus(status),
    ...query
  }
}
