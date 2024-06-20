import { TRANSACTION_ACTION_TYPES as TATs } from './types'

export const handleTransactionActionCreators = (type: TATs) => ({
  type
})

export const setExchangeRateAction = (rates: Rates) => ({
  rates,
  type: TATs.FETCH_EXCHANGE_RATE_SUCCESS
})

export const setProcessingFeesAction = (processingFees: IProcessingFee) => ({
  processingFees,
  type: TATs.FETCH_PROCESSING_FEE_SUCCESS
})

export const setTransactionData = (transactionData: any) => ({
  transactionData,
  type: TATs.SET_TRANSACTION_DATA
})

export const setBanksData = (banks: IBank[]) => ({
  banks,
  type: TATs.FETCH_BANKS_SUCCESS
})

export const setBankAccountsData = (bankAccounts: IBankAccount[]) => ({
  bankAccounts,
  type: TATs.FETCH_BANK_ACCOUNTS_SUCCESS
})

export const initiateTransactionSuccess = (
  paymentTransaction: IPaymentTransaction
) => ({
  paymentTransaction,
  type: TATs.INITIATE_PAYMENT_SUCCESS
})

export const deleteBankSuccessAction = (bankId: number) => ({
  bankId,
  type: TATs.DELETE_BANK_SUCCESS
})

export const fetchTransactionsSuccessAction = (
  transactions: ITransactionObj[]
) => ({
  transactions,
  type: TATs.FETCH_TRANSACTIONS_SUCCESS
})
