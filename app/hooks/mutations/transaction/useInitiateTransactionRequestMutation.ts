import { initiateTransactionRequest } from 'app/api/v2'
import { useMutation } from '@tanstack/react-query'

import { TransactionRequestPayload } from '../../../api/v2/transaction-requests'
import { useInvalidateCache } from '../../queries/useInvalidateCache'
import { useDisplayMessage } from '../../useDisplayMessage'

export interface TransactionRequestResponse {
  amount: string
  id: string
  provider: string
  provider_amount: string | null
  provider_currency: string
  request_type: 'funding' | 'withdrawal'
  source_wallet?: string
  status: string
  total_amount?: number
  user_id: string
}

export const useInitiateTransactionRequestMutation = () => {
  const { invalidateTransactionRelatedCache } = useInvalidateCache()
  const { displayServerError } = useDisplayMessage()
  return useMutation(
    (data: TransactionRequestPayload) =>
      initiateTransactionRequest<TransactionRequestResponse>(data),
    {
      mutationKey: 'initiateTransactionRequest',
      onError: (error) => {
        displayServerError(error)
      },
      onSuccess: () => {
        return invalidateTransactionRelatedCache()
      }
    }
  )
}
