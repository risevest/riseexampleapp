export const TRANSACTION_REQUEST_QUERY_KEYS = {
  cancelTransaction: (id: string) => ['cancel-transaction', String(id)],
  confirmTransaction: 'confirm-transaction',
  fundingMethods: 'funding-methods',
  initializeTransaction: 'initialize-transaction',
  withdrawalMethods: 'withdrawal-methods'
} as const
