import { transferToBankAccount, WithdrawTransactionPayload } from 'app/api'
import { useInvalidateCache } from 'app/hooks'
import { useMutation } from '@tanstack/react-query'

export const useTransferToBankAccountMutation = (walletId: string) => {
  const { invalidateTransactionRelatedCache } = useInvalidateCache()

  const mutation = useMutation(
    (payload: WithdrawTransactionPayload) =>
      transferToBankAccount({ payload, walletId }),
    {
      mutationKey: ['transferToBank', walletId],
      onSuccess: async (data) => {
        invalidateTransactionRelatedCache()
        return data
      }
    }
  )

  return { ...mutation }
}
