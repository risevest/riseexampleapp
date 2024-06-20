export enum TRANSACTION_ACTION_TYPES {
  CANCEL_TRANSACTION_ERROR = 'transaction/CANCEL_TRANSACTION_ERROR',
  CANCEL_TRANSACTION_REQUEST = 'transaction/CANCEL_TRANSACTION_REQUEST',
  CANCEL_TRANSACTION_SUCCESS = 'transaction/CANCEL_TRANSACTION_SUCCESS',

  DELETE_BANK_ERROR = 'transaction/DELETE_BANK_ERROR',
  DELETE_BANK_REQUEST = 'transaction/DELETE_BANK_REQUEST',
  DELETE_BANK_SUCCESS = 'transaction/DELETE_BANK_SUCCESS',

  FETCH_BANKS_ERROR = 'transaction/FETCH_BANKS_ERROR',
  FETCH_BANKS_REQUEST = 'transaction/FETCH_BANKS_REQUEST',
  FETCH_BANKS_SUCCESS = 'transaction/FETCH_BANKS_SUCCESS',

  FETCH_BANK_ACCOUNTS_ERROR = 'transaction/FETCH_BANK_ACCOUNTS_ERROR',
  FETCH_BANK_ACCOUNTS_REQUEST = 'transaction/FETCH_BANK_ACCOUNTS_REQUEST',
  FETCH_BANK_ACCOUNTS_SUCCESS = 'transaction/FETCH_BANK_ACCOUNTS_SUCCESS',

  FETCH_EXCHANGE_RATE_ERROR = 'transaction/FETCH_EXCHANGE_RATE_ERROR',
  FETCH_EXCHANGE_RATE_REQUEST = 'transaction/FETCH_EXCHANGE_RATE_REQUEST',
  FETCH_EXCHANGE_RATE_SUCCESS = 'transaction/FETCH_EXCHANGE_RATE_SUCCESS',

  FETCH_PROCESSING_FEE_ERROR = 'transaction/FETCH_PROCESSING_FEE_ERROR',
  FETCH_PROCESSING_FEE_REQUEST = 'transaction/FETCH_PROCESSING_FEE_REQUEST',
  FETCH_PROCESSING_FEE_SUCCESS = 'transaction/FETCH_PROCESSING_FEE_SUCCESS',

  FETCH_TRANSACTIONS_ERROR = 'transaction/FETCH_TRANSACTIONS_ERROR',
  FETCH_TRANSACTIONS_REQUEST = 'transaction/FETCH_TRANSACTIONS_REQUEST',
  FETCH_TRANSACTIONS_SUCCESS = 'transaction/FETCH_TRANSACTIONS_SUCCESS',

  FETCH_TRANSACTION_ERROR = 'transaction/FETCH_TRANSACTION_ERROR',
  FETCH_TRANSACTION_REQUEST = 'transaction/FETCH_TRANSACTION_REQUEST',
  FETCH_TRANSACTION_SUCCESS = 'transaction/FETCH_TRANSACTION_SUCCESS',

  FIND_USER_BANK_ACCOUNT_ERROR = 'transaction/FIND_USER_BANK_ACCOUNT_ERROR',
  FIND_USER_BANK_ACCOUNT_REQUEST = 'transaction/FIND_USER_BANK_ACCOUNT_REQUEST',
  FIND_USER_BANK_ACCOUNT_SUCCESS = 'transaction/FIND_USER_BANK_ACCOUNT_SUCCESS',

  INITIATE_PAYMENT_ERROR = 'transaction/INITIATE_PAYMENT_ERROR',
  INITIATE_PAYMENT_REQUEST = 'transaction/INITIATE_PAYMENT_REQUEST',
  INITIATE_PAYMENT_SUCCESS = 'transaction/INITIATE_PAYMENT_SUCCESS',

  RESET_TRANSACTION_STATE = 'transaction/RESET_TRANSACTION_STATE',
  RESOLVE_BANK_ERROR = 'transaction/RESOLVE_BANK_ERROR',
  RESOLVE_BANK_REQUEST = 'transaction/RESOLVE_BANK_REQUEST',

  RESOLVE_BANK_SUCCESS = 'transaction/RESOLVE_BANK_SUCCESS',
  SAVE_PAYMENT_ERROR = 'transaction/SAVE_PAYMENT_ERROR',
  SAVE_PAYMENT_REQUEST = 'transaction/SAVE_PAYMENT_REQUEST',

  SAVE_PAYMENT_SUCCESS = 'transaction/SAVE_PAYMENT_SUCCESS',
  SET_EXISTING_BANK_DATA = 'transaction/SET_EXISTING_BANK_DATA',
  SET_TRANSACTION_DATA = 'transaction/SET_TRANSACTION_DATA',

  TRANSFER_TO_BANK_ERROR = 'transaction/TRANSFER_TO_BANK_ERROR',
  TRANSFER_TO_BANK_REQUEST = 'transaction/TRANSFER_TO_BANK_REQUEST',
  TRANSFER_TO_BANK_SUCCESS = 'transaction/TRANSFER_TO_BANK_SUCCESS'
}

export type TransactionState = {
  bankAccountData: IBankAccount
  bankAccounts: IBankAccount[]
  banks: IBank[]
  paymentTransaction: IPaymentTransaction
  processingFees: IProcessingFee
  rates: Rates | {}
  requestStatus: RequestStatus
  transaction: ITransactionObj
  transactionData: ITransactionData
  transactions: {
    meta: {
      limit: number
      offset: number
      total: number
    }
    transactions: ITransactionObj[]
  }
}

export type SetExchangeRate = {
  rates: Rates
  type: TRANSACTION_ACTION_TYPES.FETCH_EXCHANGE_RATE_SUCCESS
}

export type SetProcessingFees = {
  processingFees: IProcessingFee
  type: TRANSACTION_ACTION_TYPES.FETCH_PROCESSING_FEE_SUCCESS
}

export type SetTransactionDataSuccess = {
  transactionData: any
  type: TRANSACTION_ACTION_TYPES.SET_TRANSACTION_DATA
}

export type SetBanksSuccess = {
  banks: IBank[]
  type: TRANSACTION_ACTION_TYPES.FETCH_BANKS_SUCCESS
}

export type SetBankAccountSuccess = {
  bankAccountData: any
  type: TRANSACTION_ACTION_TYPES.RESOLVE_BANK_SUCCESS
}

export type SetUserBankAccountsSuccess = {
  bankAccounts: IBankAccount[]
  type: TRANSACTION_ACTION_TYPES.FETCH_BANK_ACCOUNTS_SUCCESS
}

export type InitiateTransactionSuccess = {
  paymentTransaction: IPaymentTransaction
  type: TRANSACTION_ACTION_TYPES.INITIATE_PAYMENT_SUCCESS
}

export type DeleteBankSuccess = {
  bankId: number
  type: TRANSACTION_ACTION_TYPES.DELETE_BANK_SUCCESS
}

export type FetchTransactionsSuccess = {
  transactions: {
    meta: {
      limit: number
      offset: number
      total: number
    }
    transactions: ITransactionObj[]
  }
  type: TRANSACTION_ACTION_TYPES.FETCH_TRANSACTIONS_SUCCESS
}

export type CancelTransactionSuccess = {
  transactionId: number
  type: TRANSACTION_ACTION_TYPES.CANCEL_TRANSACTION_SUCCESS
}

export type FetchTransactionSuccess = {
  transaction: ITransactionObj
  type: TRANSACTION_ACTION_TYPES.FETCH_TRANSACTION_SUCCESS
}

export type TransactionActions =
  | SetExchangeRate
  | SetProcessingFees
  | SetTransactionDataSuccess
  | SetBanksSuccess
  | SetUserBankAccountsSuccess
  | DeleteBankSuccess
  | FetchTransactionsSuccess
  | CancelTransactionSuccess
  | FetchTransactionSuccess
  | InitiateTransactionSuccess
