import {
  fetchPendingWithdrawals,
  fetchTransaction,
  fetchTransactions
} from 'app/api'
import { useScroller } from 'app/hooks'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from 'react-query'

export const useTransactions = () => {
  const { data, ...query } = useScroller<ITransactionObj>(
    fetchTransactions,
    'infiniteTransactions'
  )
  const transactions = (data || []) as ITransactionObj[]
  return {
    ...query,
    transactions
  }
}

export const usePendingWithdrawals = () => {
  const { data, ...query } = useQuery(
    'pendingwithdrawals',
    fetchPendingWithdrawals
  )
  const withdrawals = data || {}
  const hasPendingWithdrawal = (withdrawals?.total ?? 0) > 0
  return {
    ...query,
    hasPendingWithdrawal,
    withdrawals
  }
}

export const useTransaction = (transactionId: number) => {
  const { status, data, ...query } = useQuery<ITransactionObj>(
    ['transactionDetails', transactionId],
    {
      queryFn: () => fetchTransaction(transactionId)
    }
  )

  const transactionDetails = (data ?? {}) as ITransactionObj

  return {
    ...query,
    requestStatus: transformQueryStatusToRiseStatus(status),
    transactionDetails
  }
}
