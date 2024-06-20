export const VIRTUAL_CARD_QUERY_KEYS = {
  transactions: (id: string) => ['virtual-card', id],
  userVirtualCardStatus: 'user-virtual-card-status',
  virtualCard: 'virtual-card',
  virtualCardFundingFee: 'virtual-card-funding-fees',
  virtualCardRequest: 'virtual-card-request'
} as const
