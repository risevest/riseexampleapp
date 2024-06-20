import type { ConvertSnakeToCamelCase } from 'app/utils/utilTypes'

export type VaultCurrency = 'ngn'

export interface CreateVaultPayload {
  currency: VaultCurrency
  duration: number
  initial_capital: number
  name: string
}

export interface FundVaultPayload {
  amount: number
  duration?: number
  vaultId: string
}

export interface VaultServer {
  capital: number
  created_at: string
  currency: string
  deleted_at?: string | null
  duration: number
  id: string
  interest: number
  maturity_date: string
  name: string
  owner_id: string
  wallet_id: string
}

export interface Vault extends ConvertSnakeToCamelCase<VaultServer> {}

export interface VaultInterestServer {
  vault_capital: number
  vault_interest: number
}

export interface ReturnsValue {
  maximumCapital?: number
  minimumCapital: number
  percentageReturns: number
}

export interface VaultInterestConfigServer {
  assetClass: string
  currency: string
  identifier: string
  isEnabled: boolean
  minimumCurrency: number
  returnsType: string
  returnsValue: ReturnsValue[]
}

export interface VaultInterestConfig
  extends ConvertSnakeToCamelCase<VaultInterestConfigServer> {}
export interface EditVaultPayload {
  duration: number
  id: string
  name: string
}
