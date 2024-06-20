export type TransactionStatus =
  | 'initiated'
  | 'pending'
  | 'successful'
  | 'failed'
  | 'canceled'
  | 'pending approval'
export type TransactionRequestType = 'funding' | 'withdrawal'

export interface WalletTransactionServer {
  amount: number
  created_at: string
  currency: string
  id: string
  local_amount: number
  local_currency: string
  metadata: {
    description: string
    destination: string
    destination_id: string
    exchange_rate: number
    local_currency: string
    source: string
    source_id: string
    transaction_request_amount: number
    transaction_request_id: string
  }
  owner_id: string
  provider: string
  provider_metadata: string | null
  request_type: TransactionRequestType
  screening: null
  status: TransactionStatus
  transaction_id: string
  updated_at: string
  wallet_id: string
}

export interface WalletTransaction {
  amount: number
  createdAt: string
  currency: string
  id: string
  localAmount: number
  localCurrency: string
  metadata: {
    description: string
    destination: string
    destinationId: string
    exchangeRate: number
    localCurrency: string
    source: string
    sourceId: string
    transactionRequestAmount: number
    transactionRequestId: string
  }
  ownerId: string
  provider: string
  providerMetadata: string | null
  screening: null
  status: TransactionStatus
  transactionId: string
  type: TransactionRequestType
  updatedAt: string
  walletId: string
}

export interface WalletTransactionPayload {
  destination?: string
  destination_id?: string
  source?: string
  source_id?: string
  wallet_id: string
}
