import { VaultCurrency, VaultInterestConfig } from './types'

export const VAULT_QUERY_KEYS = {
  editVault: 'editVault',
  getVault: (vaultId: string) => ['getVault', vaultId],
  getVaultInterest: (walletId: string) => ['getVaultInterest', walletId],
  getVaultInterestConfig: ['getVaultInterest'],
  getVaults: (currency: VaultCurrency) => ['getVaults', currency]
} as const

export const DEFAULT_INTEREST_CONFIG: VaultInterestConfig[] = [
  {
    assetClass: 'bond',
    currency: 'ngn',
    identifier: 'vault',
    isEnabled: true,
    minimumCurrency: 1000,
    returnsType: 'tier',
    returnsValue: [
      {
        maximumCapital: 499999,
        minimumCapital: 0,
        percentageReturns: 12
      },
      {
        maximumCapital: 999999,
        minimumCapital: 500000,
        percentageReturns: 15
      },
      {
        maximumCapital: 4999999,
        minimumCapital: 1000000,
        percentageReturns: 18
      },
      {
        minimumCapital: 5000000,
        percentageReturns: 20
      }
    ]
  }
]
