import { TransactionStatus } from '../wallet/transactions/types'

export interface EditUserPayload extends Partial<RiseUser> {
  userId: number
}

export interface SocialSurveyPayloadServer {
  information_source: string
  referral_code: string
}

export interface SocialSurveyPayload {
  informationSource: string
  referralCode: string
}

export interface AffiliateDetails {
  lifetimeEarnings: number
  maturedLockedBalance: string
  name: string
  rate: string
  referralCode: string
  totalInvestedReferrals: number
  totalLockedBalance: string
  totalReferrals: number
  walletBalance: string
}

export interface AffiliateTransaction {
  amountFunded: string
  commission: string
  createdAt: string
  maturityDate: string
  paidAt: string
  referredUserEmail: string
  referredUserName: string
  status: TransactionStatus
}
