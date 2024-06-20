import type { ConvertSnakeToCamelCase } from 'app/utils/utilTypes'

import type {
  FeeValue,
  ServerFeeType,
  ServerFeeValue
} from '../transaction-request'
import type { Currency, RequestType, ServerCurrency } from '../types'

type MigrationStatus = 'pending' | 'processing' | 'successful' | 'failed'
type DeletedBy = 'user' | 'provider'
type CardBrand = 'visa' | 'mastercard'

export interface ServerVirtualCard {
  address: {
    billing_address: string
    billing_city: string
    billing_country: string
    billing_zip_code: string
    country_code: string
  }
  auto_fund_enabled: boolean
  auto_fund_settings: {
    amount: number
    auto_fund_enabled: boolean
    card_id: string
    config: {
      hour: number
      month_day: number
      week_day?: number
    }
    created_at: string
    frequency: string
    owner_id: string
    updated_at: string
  }
  available_balance: number
  balance: number
  brand: CardBrand
  created_at: string
  currency: ServerCurrency
  declined_transactions_count: number
  deleted_at: string
  id: string
  is_fundable: boolean
  is_locked: boolean
  is_unlockable: boolean
  migration_status: MigrationStatus
  security: {
    card_name: string
    card_number: string
    cvv: string
    expiry_month: string
    expiry_year: string
    last_4: string
  }
  total_funded: number
  type: string
}

export interface VirtualCard {
  address: Address
  autoFundEnabled: boolean
  autoFundSettings: AutoFundSettings
  availableBalance: number
  balance: number
  brand: CardBrand
  createdAt: string
  currency: Currency
  declinedTransactionsCount: number
  deletedAt: string
  id: string
  isFundable: boolean
  isLocked: boolean
  isUnLockable: boolean
  migrationStatus: MigrationStatus
  security: Security
  totalFunded: number
  type: string
}

interface Address {
  billingAddress: string
  billingCity: string
  billingCountry: string
  billingZipCode: string
  countryCode: string
}

interface AutoFundSettings {
  amount: number
  autoFundEnabled: boolean
  cardID: string
  config: Config
  createdAt: string
  frequency: string
  ownerID: string
  updatedAt: string
}

export interface Config {
  hour?: number
  monthDay?: number
  weekDay?: number
}

interface Security {
  cardName: string
  cardNumber: string
  cvv: string
  expiryMonth: string
  expiryYear: string
  last4: string
}

export type ServerVirtualCardFees = {
  currency: ServerCurrency
  currency_name: string
  funding_limit: number
  funding_timeline: string
  is_enabled: boolean
  maximum_balance: number
  monthly_limit: number
  provider_fees: {
    creation_fee_type: ServerFeeType
    creation_fee_value: ServerFeeValue
    funding_fee_type: ServerFeeType
    funding_fee_value: ServerFeeValue
    mastercard_creation_fee_type: ServerFeeType
    mastercard_creation_fee_value: number
    transaction_fee_type: ServerFeeType
    transaction_fee_value: ServerFeeValue
  }
  rise_fees: {
    creation_fee_type: ServerFeeType
    creation_fee_value: ServerFeeValue
    funding_fee_type: ServerFeeType
    funding_fee_value: ServerFeeValue
    monthly_maintenance_fee_type: ServerFeeType
    monthly_maintenance_fee_value: ServerFeeValue
    transaction_fee_type: ServerFeeType
    transaction_fee_value: ServerFeeValue
  }
  spend_limit: number
  type: string
  withdrawal_limit: number
}

export interface VirtualCardFees {
  currency: Currency
  currencyName: string
  fundingLimit: number
  isEnabled: boolean
  maximumBalance: number
  monthlyLimit: number
  providerFees: {
    creationFeeType: ServerFeeType
    creationFeeValue: FeeValue
    fundingFeeType: ServerFeeType
    fundingFeeValue: FeeValue
    mastercardCreationFeeType: ServerFeeType
    mastercardCreationFeeValue: FeeValue
    transactionFeeType: ServerFeeType
    transactionFeeValue: FeeValue
  }
  riseFees: {
    creationFeeType: ServerFeeType
    creationFeeValue: FeeValue
    fundingFeeType: ServerFeeType
    fundingFeeValue: FeeValue
    monthlyMaintenanceFeeType: ServerFeeType
    monthlyMaintenanceFeeValue: FeeValue
    transactionFeeType: ServerFeeType
    transactionFeeValue: FeeValue
  }
  spendLimit: number
  withdrawalLimit: number
}

export interface InitiateVirtualCardTransaction {
  amount: number
  cardId: string
  requestType: RequestType
}
export interface ActionPayload {
  action: 'lock' | 'unlock' | 'deactivate'
  credential: string
  id: string
}

export interface AutoFundDTOServer {
  details: {
    amount: number
    config: {
      hour?: number
      month_day?: number
      week_day?: number
    }
    frequency: string
  }
  value: boolean
}

export interface AutoFundDTO {
  details: {
    amount: number
    config: {
      hour?: number
      monthDay?: number
      weekDay?: number
    }
    frequency: string
  }
  value: boolean
}

export const requestStatuses = <const>[
  'pending',
  'successful',
  'failed',
  'processing'
]

export type VirtualCardStatus = (typeof requestStatuses)[number]

export interface ServerVirtualCardState {
  created_at: string
  id: string
  metadata: {
    cardholder_id: string
  }
  owner_id: string
  request_status: VirtualCardStatus
  updated_at: string
}

export interface VirtualCardState {
  createdAt: string
  id: string
  metadata: Metadata
  ownerID: string
  status: VirtualCardStatus
  updatedAt: string
}

interface Metadata {
  cardholderID: string
}

export type VirtualCardTransactionType = 'CREDIT' | 'DEBIT'

export interface ServerVirtualCardTransaction {
  amount: string
  charged_by: string
  currency: ServerCurrency
  description: string
  fee_charged: string
  is_recurring: boolean
  merchant_logo: string
  refunded_fee: string
  transaction_date: string
  transaction_reference: string
  transaction_type: VirtualCardTransactionType
}

export interface VirtualCardTransaction
  extends ConvertSnakeToCamelCase<ServerVirtualCardTransaction> {
  date: string
  type: VirtualCardTransactionType
}

export interface MigrateVirtualCardPayload {
  cardId: string
  pin: string
}

export interface ServerVirtualCardMultiple {
  brand: CardBrand
  created_at: string
  deleted_at: string | null
  deleted_by: DeletedBy
  id: string
  is_fundable: boolean
  is_unlockable: boolean
  last_active_at: string
  locked_at: null
  locked_by: null
  migration_status: VirtualCardStatus
  owner_id: string
  provider: string
  provider_reference: string
  updated_at: string
}

export interface VirtualCardMultiple {
  brand: CardBrand
  deletedAt: string | null
  deletedBy: string
}
