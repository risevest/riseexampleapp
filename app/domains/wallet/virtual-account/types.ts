import { BaseAsset } from 'app/domains/verification'
import { RisePhotoAsset } from 'app/utils/camera'

import { Currency, ServerCurrency, WalletType } from '../types'

export interface NGNBankAccount {
  accountName?: string
  accountNo: string
  accountType?: string
  bankAddress?: string
  bankName: string
  currency: Currency
  wireRouting?: string
}

export interface USDBankAccount {
  accountName: string
  accountNo: string
  accountType: string
  bankAddress: string
  bankName: string
  currency: Currency
  swiftCode: string
  wireRouting: string
}

export type ExternalWalletInfo = USDBankAccount | NGNBankAccount

export interface VirtualAccountDetails {
  account_name: string
  account_number: string
  account_type?: string
  bank_address?: string
  bank_code?: string
  bank_name: string
  currency: ServerCurrency
  provider: string
  provider_reference: string
  // usd extra types
  routing_number?: string
  swift_code?: string
}

export interface RequestVirtualAccountPayload {
  bank_statement: BaseAsset
  details: RequestVirtualAccountDetails
  id_back?: RisePhotoAsset
  id_front: RisePhotoAsset
  wallet_type: 'virtual_account'
}

interface RequestVirtualAccountDetails {
  account_designation: string
  address: Address
  dob: string
  document: Document
  employment_status: string
  income_band: string
  occupation: string
  source_of_income: string
}

interface Address {
  city: string
  country: string
  number: string
  state: string
  street: string
  zip: string
}

interface Document {
  expiry_date: string
  issued_by: string
  issued_country_code: string
  issued_date: string
  number: string
  type: string
}

// virtual_account request

const requestStatus = <const>[
  'pending',
  'approved',
  'declined',
  'rejected',
  'processing'
]
type RequestStatus = (typeof requestStatus)[number]

interface RequestExternalWallet<T> {
  details: T
  id: string
  status: RequestStatus
  walletType: WalletType
}
interface ServerRequestExternalWallet<T> {
  details: T
  id: string
  owner_id: string
  request_status: RequestStatus
  status: RequestStatus

  wallet_type: WalletType
}

export interface ServerVirtualAccountRequest
  extends ServerRequestExternalWallet<ServerVirtualAccountRequestsDetails> {}
export interface VirtualAccountRequest
  extends RequestExternalWallet<ServerVirtualAccountRequestsDetails> {}

export interface ServerVirtualAccountRequestsDetails {
  KYCInformation: {
    accountDesignation: string
    address: {
      city: string
      countryOfResidence: string
      number: string
      state: string
      street: string
      zip: string
    }
    birthDate: string
    document: {
      expirationDate: string
      issuedBy: string
      issuedCountryCode: string
      issuedDate: string
      number: string
      type: string
    }
    email: string
    employmentStatus: string
    firstName: string
    incomeBand: string
    lastName: string
    nationality: string
    occupation: string
    phone: string
    sourceOfIncome: string
  }
  accountType: string
  bankStatement: string
  currency: string
  meansOfId: string[]
  utilityBill: string
}

export interface RequestVirtualAccount {
  created_at: string
  deleted_at: string
  details: {
    account_name: string
    account_number: string
    bank_name: string
    currency: string
    provider: string
    provider_reference: string
  }
  id: string
  is_visible: boolean
  owner_id: string
  status: string
  wallet_type: string
}
