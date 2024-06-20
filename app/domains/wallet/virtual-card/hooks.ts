import {
  useDisplayMessage,
  useUser,
  WALLET_QUERY_KEYS as LEGACY_WALLET_QUERY_KEYS
} from 'app/hooks'
import { useScroller } from 'app/hooks/queries/useScroller/v2/useScroller'
import { queryClient } from 'app/rq'
import { convertKeysToCamelCase } from 'app/utils/utilFunctions'
import type { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'

import { WALLET_QUERY_KEYS } from '../constants'
import { toUICurrency } from '../hooks'
import type { ServerFeeValue, ServerGrade } from '../transaction-request'
import {
  autoFund,
  changeCardPIN,
  generateVirtualCardOTP,
  getCardFundingFee,
  getCardTransaction,
  getUserVirtualCardStatus,
  getVirtualCard,
  getVirtualCardState,
  initiateVirtualCardTransaction,
  migrateVirtualCard,
  requestCard,
  takeActionOnCard,
  verifyVirtualCardOTP
} from './api'
import { VIRTUAL_CARD_QUERY_KEYS } from './constants'
import type {
  AutoFundDTO,
  InitiateVirtualCardTransaction,
  ServerVirtualCard,
  ServerVirtualCardFees,
  ServerVirtualCardMultiple,
  ServerVirtualCardState,
  ServerVirtualCardTransaction,
  VirtualCard,
  VirtualCardFees,
  VirtualCardMultiple,
  VirtualCardState,
  VirtualCardTransaction
} from './types'

function transformVirtualCard(data?: ServerVirtualCard): VirtualCard | null {
  if (!data) return null
  return {
    address: {
      billingAddress: data.address.billing_address,
      billingCity: data.address.billing_city,
      billingCountry: data.address.billing_country,
      billingZipCode: data.address.billing_zip_code,
      countryCode: data.address.country_code
    },
    autoFundEnabled: data.auto_fund_enabled,
    autoFundSettings: {
      amount: data.auto_fund_settings?.amount,
      autoFundEnabled: data.auto_fund_settings?.auto_fund_enabled,
      cardID: data.auto_fund_settings?.card_id,
      config: {
        hour: data.auto_fund_settings?.config.hour,
        monthDay: data.auto_fund_settings?.config.month_day,
        weekDay: data.auto_fund_settings?.config.week_day
      },
      createdAt: data.auto_fund_settings?.created_at,
      frequency: data.auto_fund_settings?.frequency,
      ownerID: data.auto_fund_settings?.owner_id,
      updatedAt: data.auto_fund_settings?.updated_at
    },
    availableBalance: data?.available_balance,
    balance: data?.balance,
    brand: data.brand,
    createdAt: data?.created_at,
    currency: toUICurrency(data.currency),
    declinedTransactionsCount: data.declined_transactions_count,
    deletedAt: data?.deleted_at,
    id: data.id,
    isFundable: data.is_fundable,
    isLocked: data.is_locked,
    isUnLockable: data.is_unlockable,
    migrationStatus: data?.migration_status,
    security: {
      cardName: data.security.card_name,
      cardNumber: data.security.card_number,
      cvv: data.security.cvv,
      expiryMonth: data.security.expiry_month,
      expiryYear: data.security.expiry_year,
      last4: data.security.last_4
    },
    totalFunded: data.total_funded,
    type: data.type
  }
}

function extractTransactions(
  transaction?: ServerVirtualCardTransaction
): VirtualCardTransaction | null {
  if (!transaction) return null
  return {
    ...convertKeysToCamelCase(transaction),
    currency: toUICurrency(transaction.currency),
    date: transaction.transaction_date,
    type: transaction.transaction_type
  }
}

function convertServerFeeToUIValue(serverFeeValue: ServerFeeValue) {
  if (typeof serverFeeValue === 'number') {
    return serverFeeValue
  }

  return serverFeeValue?.map((sv: ServerGrade) => {
    return {
      feeType: sv.fee_type,
      feeValue: sv.fee_value,
      threshold: sv.threshold
    }
  })
}

function extractCardFundingFee(
  serverVirtualCardFundingFee: ServerVirtualCardFees
): VirtualCardFees | null {
  if (!serverVirtualCardFundingFee) return null

  return {
    currency: toUICurrency(serverVirtualCardFundingFee?.currency),
    currencyName: serverVirtualCardFundingFee?.currency_name,
    fundingLimit: serverVirtualCardFundingFee?.funding_limit,
    isEnabled: serverVirtualCardFundingFee?.is_enabled,

    maximumBalance: serverVirtualCardFundingFee?.maximum_balance,
    monthlyLimit: serverVirtualCardFundingFee?.monthly_limit,
    providerFees: {
      creationFeeType:
        serverVirtualCardFundingFee?.provider_fees?.creation_fee_type,
      creationFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.provider_fees?.creation_fee_value
      ),
      fundingFeeType:
        serverVirtualCardFundingFee?.provider_fees?.funding_fee_type,
      fundingFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.provider_fees?.funding_fee_value
      ),
      mastercardCreationFeeType:
        serverVirtualCardFundingFee?.provider_fees
          ?.mastercard_creation_fee_type,
      mastercardCreationFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.provider_fees.mastercard_creation_fee_value
      ),
      transactionFeeType:
        serverVirtualCardFundingFee?.provider_fees?.transaction_fee_type,
      transactionFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.provider_fees?.transaction_fee_value
      )
    },
    riseFees: {
      creationFeeType:
        serverVirtualCardFundingFee?.rise_fees?.creation_fee_type,
      creationFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.rise_fees?.creation_fee_value
      ),
      fundingFeeType: serverVirtualCardFundingFee?.rise_fees?.funding_fee_type,
      fundingFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.rise_fees?.funding_fee_value
      ),
      monthlyMaintenanceFeeType:
        serverVirtualCardFundingFee?.rise_fees?.monthly_maintenance_fee_type,
      monthlyMaintenanceFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.rise_fees?.monthly_maintenance_fee_value
      ),
      transactionFeeType:
        serverVirtualCardFundingFee?.rise_fees?.transaction_fee_type,
      transactionFeeValue: convertServerFeeToUIValue(
        serverVirtualCardFundingFee?.rise_fees?.transaction_fee_value
      )
    },
    spendLimit: serverVirtualCardFundingFee?.spend_limit,
    withdrawalLimit: serverVirtualCardFundingFee?.withdrawal_limit
  }
}

export function transformVirtualCardState(
  data?: ServerVirtualCardState
): VirtualCardState | null {
  if (!data) return null
  return {
    createdAt: data.created_at,
    id: data.id,
    metadata: {
      cardholderID: data?.metadata?.cardholder_id
    },
    ownerID: data.owner_id,
    status: data.request_status,
    updatedAt: data.updated_at
  }
}

export function transformVirtualCards(
  data: ServerVirtualCardMultiple[]
): VirtualCardMultiple[] {
  if (!data) return []

  return data.map((virtualCard) => ({
    brand: virtualCard?.brand,
    deletedAt: virtualCard?.deleted_at,
    deletedBy: virtualCard?.deleted_by
  }))
}

export function useVirtualCard() {
  const { user } = useUser()
  return useQuery<ServerVirtualCard, AxiosError, VirtualCard | null>({
    enabled: !!user?.account?.uuid,
    queryFn: () => getVirtualCard(String(user?.account?.uuid)),
    queryKey: VIRTUAL_CARD_QUERY_KEYS.virtualCard,
    retry(_, error) {
      if (error?.response?.status === 404 || error?.response?.status === 422) {
        return false
      }
      return true
    },
    select: transformVirtualCard
  })
}

export function useVirtualCardRequest() {
  return useQuery({
    queryFn: getVirtualCardState,
    queryKey: VIRTUAL_CARD_QUERY_KEYS.virtualCardRequest,
    select: transformVirtualCardState
  })
}

export function useGetVirtualCardFees() {
  const { data, ...query } = useQuery<
    ServerVirtualCardFees[],
    AxiosError,
    ServerVirtualCardFees[]
  >({
    queryFn: getCardFundingFee,
    queryKey: VIRTUAL_CARD_QUERY_KEYS.virtualCardFundingFee,
    retry(_, error) {
      if (error?.response?.status === 404) {
        return false
      }
      return true
    }
  })

  return {
    ...query,
    virtualCardFees: extractCardFundingFee(data?.[0] as ServerVirtualCardFees)
  }
}

export function useInitiateVirtualCardTransaction() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: ({
      cardId,
      requestType,
      amount
    }: InitiateVirtualCardTransaction) =>
      initiateVirtualCardTransaction({ amount, cardId, requestType }),
    mutationKey: VIRTUAL_CARD_QUERY_KEYS.virtualCardFundingFee,
    onError: (e) => {
      displayServerError(e)
    },
    onSuccess: async (_data, variables) => {
      queryClient.invalidateQueries(VIRTUAL_CARD_QUERY_KEYS.virtualCard)
      queryClient.invalidateQueries(
        VIRTUAL_CARD_QUERY_KEYS.transactions(variables.cardId)
      )
      queryClient.invalidateQueries(WALLET_QUERY_KEYS.getWallets)
      queryClient.invalidateQueries(LEGACY_WALLET_QUERY_KEYS.walletStats)
    }
  })
}

export function useRequestVirtualCard() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: requestCard,
    mutationKey: VIRTUAL_CARD_QUERY_KEYS.virtualCardFundingFee,
    onError: displayServerError,
    onSuccess: async () => {
      await queryClient.invalidateQueries(VIRTUAL_CARD_QUERY_KEYS.virtualCard)
      await queryClient.invalidateQueries(
        VIRTUAL_CARD_QUERY_KEYS.virtualCardRequest
      )
    }
  })
}

export function useManageCard() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: takeActionOnCard,
    onError: (err) => displayServerError(err),
    onSuccess: () => {
      queryClient.invalidateQueries(VIRTUAL_CARD_QUERY_KEYS.virtualCard)
    }
  })
}

export function useAutoFund() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: ({
      cardId,
      autoFundConfig
    }: {
      autoFundConfig: AutoFundDTO
      cardId: string
    }) =>
      autoFund(cardId, {
        ...autoFundConfig,
        details: {
          ...autoFundConfig?.details,
          config: {
            hour: autoFundConfig.details.config.hour,
            month_day: autoFundConfig.details.config.monthDay,
            week_day: autoFundConfig.details.config.weekDay
          }
        }
      }),
    onError: (e) => {
      displayServerError(e)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(VIRTUAL_CARD_QUERY_KEYS.virtualCard)
    }
  })
}

export const useVirtualCardTransactions = (id: string) => {
  const { data, ...query } = useScroller<ServerVirtualCardTransaction>(
    (offset: number) => getCardTransaction({ id, offset }),
    VIRTUAL_CARD_QUERY_KEYS.transactions(id),
    {
      baseOffset: 0,
      limit: 10
    }
  )

  const transactions = (data ?? [])
    ?.map(extractTransactions)
    ?.filter((item) => item !== null) as unknown as VirtualCardTransaction[]

  return {
    ...query,
    data: transactions
  }
}

export function useGetUserVirtualCardStatus() {
  const { data, ...query } = useQuery({
    queryFn: getUserVirtualCardStatus,
    queryKey: VIRTUAL_CARD_QUERY_KEYS.userVirtualCardStatus,
    select: transformVirtualCards
  })

  return {
    ...query,
    virtualCards: data || []
  }
}

export function useMigrateVirtualCard() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: migrateVirtualCard,
    onError: (e: Error) => {
      displayServerError(e)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(VIRTUAL_CARD_QUERY_KEYS.virtualCard)
    }
  })
}

export function useGenerateVirtualCardOTP() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: generateVirtualCardOTP,
    onError: (e: Error) => {
      displayServerError(e)
    }
  })
}

export function useVerifyVirtualCardOTP() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: verifyVirtualCardOTP,
    onError: (e: Error) => {
      displayServerError(e)
    }
  })
}

export function useChangeCardPIN() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: changeCardPIN,
    onError: (e: Error) => {
      displayServerError(e)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(VIRTUAL_CARD_QUERY_KEYS.virtualCard)
    }
  })
}
