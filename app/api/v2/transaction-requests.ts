import instance from './base'

export interface TransactionRequestPayload {
  amount?: number
  currency: string
  destination?: string
  provider: string
  request_type: 'funding' | 'withdrawal'
}

export function initiateTransactionRequest<T>(
  payload: TransactionRequestPayload
): Promise<T> {
  return instance.post('/transaction-requests', payload).then((res) => res.data)
}
