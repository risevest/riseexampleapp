export const VIRTUAL_ACCOUNT_QUERY_KEYS = {
  createVirtualAccount: (currency: string) => [
    'create-virtual-account',
    currency
  ],
  recentVirtualAccountRequest: ['recent_virtual_account_request'],
  virtualAccount: (currency: string, walletCurrency?: string) => [
    'virtual_account',
    currency,
    walletCurrency
  ]
} as const
