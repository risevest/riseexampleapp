import instance from 'app/api/v2/base'

import {
  CreateVaultPayload,
  EditVaultPayload,
  FundVaultPayload,
  VaultCurrency,
  VaultInterestConfigServer,
  VaultInterestServer,
  VaultServer
} from './types'

export async function createVault(
  payload: CreateVaultPayload
): Promise<VaultServer> {
  const resp = await instance.post('wallets/vaults', payload)

  return resp.data
}

export async function getVaults(
  currency: VaultCurrency
): Promise<VaultServer[]> {
  const resp = await instance.get('wallets/vaults', {
    params: {
      currency
    }
  })

  return resp.data
}

export async function getVaultInterest(
  wallet_id: string
): Promise<VaultInterestServer> {
  const resp = await instance.get('wallets/vaults/total', {
    params: {
      wallet_id
    }
  })

  return resp.data
}

export async function getVaultInterestConfig(): Promise<
  VaultInterestConfigServer[]
> {
  const resp = await instance.get(
    'config?entity=portfolio_returns&filter_key=identifier&filter_value=vault'
  )
  return resp?.data
}

export async function fundVault({
  vaultId,
  ...data
}: FundVaultPayload): Promise<VaultServer> {
  const resp = await instance.post(`wallets/vaults/${vaultId}/fund`, data)

  return resp.data
}

export async function getVault(vaultId: string): Promise<VaultServer> {
  const resp = await instance.get(`wallets/vaults/${vaultId}`)

  return resp.data
}

export async function editVault(
  vaultId: string,
  payload: Omit<EditVaultPayload, 'id'>
) {
  const resp = await instance.patch(`wallets/vaults/${vaultId}`, payload)
  return resp?.data
}
