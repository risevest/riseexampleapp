import { useDisplayMessage } from 'app/hooks'
import { convertKeysToCamelCase } from 'app/utils/utilFunctions'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { WALLET_QUERY_KEYS } from '../constants'
import {
  createVault,
  editVault,
  fundVault,
  getVault,
  getVaultInterest,
  getVaultInterestConfig,
  getVaults
} from './api'
import { DEFAULT_INTEREST_CONFIG, VAULT_QUERY_KEYS } from './constants'
import {
  CreateVaultPayload,
  EditVaultPayload,
  FundVaultPayload,
  Vault,
  VaultCurrency,
  VaultInterestConfig,
  VaultInterestConfigServer,
  VaultServer
} from './types'

function extractVault(data: VaultServer): Vault {
  return convertKeysToCamelCase(data)
}
function extractVaults(data: VaultServer[]): Vault[] {
  return data?.map(extractVault)
}
function extractVaultsInterestConfig(
  data: VaultInterestConfigServer[]
): VaultInterestConfig {
  return data?.map(convertKeysToCamelCase)?.[0]
}

export function useCreateVault() {
  const queryClient = useQueryClient()
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: async (payload: CreateVaultPayload) => {
      const res = await createVault(payload)

      return extractVault(res)
    },
    onError: (error) => {
      displayServerError(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
    }
  })
}

export function useGetVaults(currency: VaultCurrency) {
  const query = useQuery({
    enabled: currency === 'ngn',
    queryFn: () => getVaults(currency),
    queryKey: VAULT_QUERY_KEYS.getVaults(currency)
  })
  const vaults = extractVaults(query.data ?? [])

  return Object.assign(query, {
    vaults
  })
}

export function useGetVaultInterest(walletId: string) {
  const query = useQuery({
    queryFn: () => getVaultInterest(walletId),
    queryKey: VAULT_QUERY_KEYS.getVaultInterest(walletId)
  })
  const vaultInterest = query.data?.vault_interest ?? 0
  const vaultCapital = query.data?.vault_capital ?? 0

  return Object.assign(query, {
    vaultCapital,
    vaultInterest
  })
}

export function useGetVaultInterestConfig() {
  const query = useQuery({
    initialData: DEFAULT_INTEREST_CONFIG,
    queryFn: getVaultInterestConfig,
    queryKey: VAULT_QUERY_KEYS.getVaultInterestConfig
  })
  const vaultInterestConfig = extractVaultsInterestConfig(query.data ?? [])

  return Object.assign(query, {
    vaultInterestConfig
  })
}

export function useFundVault() {
  const queryClient = useQueryClient()
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: async (payload: FundVaultPayload) => {
      const res = await fundVault(payload)

      return extractVault(res)
    },
    onError: (error) => {
      displayServerError(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
      queryClient.invalidateQueries(VAULT_QUERY_KEYS.getVaults('ngn'))
    }
  })
}

export function useGetVault(vaultId: string) {
  const query = useQuery({
    queryFn: () => getVault(vaultId),
    queryKey: VAULT_QUERY_KEYS.getVault(vaultId)
  })

  const vault = query.data ? extractVault(query.data) : undefined

  return Object.assign(query, {
    vault
  })
}

export function useEditVault() {
  const queryClient = useQueryClient()
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: EditVaultPayload) =>
      editVault(payload?.id, {
        duration: payload?.duration,
        name: payload?.name
      }),
    mutationKey: VAULT_QUERY_KEYS.editVault,
    onError: (error) => {
      displayServerError(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
      queryClient.invalidateQueries(VAULT_QUERY_KEYS.getVaults('ngn'))
    }
  })
}
