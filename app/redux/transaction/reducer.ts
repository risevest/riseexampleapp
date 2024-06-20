import {
  DeleteBankSuccess,
  FetchTransactionsSuccess,
  FetchTransactionSuccess,
  InitiateTransactionSuccess,
  SetBankAccountSuccess,
  SetBanksSuccess,
  SetExchangeRate,
  SetProcessingFees,
  SetTransactionDataSuccess,
  SetUserBankAccountsSuccess,
  TRANSACTION_ACTION_TYPES as TATs,
  TransactionActions,
  TransactionState
} from './types'

export const initialState: TransactionState = {
  bankAccountData: {
    accountName: '',
    accountNumber: '',
    bank: {
      code: '',
      country: '',
      id: 0,
      name: '',
      rubiesCode: ''
    },
    bankId: 0,
    bankName: '',
    createdAt: '',
    id: 0
  },
  bankAccounts: [],
  banks: [],
  paymentTransaction: {
    amount: '',
    amountLocalCurr: '',
    amountUsd: '',
    id: 0,
    key: '',
    paymentOption: '',
    paymentType: '',
    provider: '',
    reference: ''
  },
  processingFees: {
    amountLocalCurr: 0,
    amountUsd: 0,
    maxFeeLocalCurr: 0,
    maxFeeUsd: 0,
    maxPayableLocalCurr: 0,
    maxPayableUsd: 0
  },
  rates: {},
  requestStatus: 'idle',
  transaction: {} as ITransactionObj,
  transactionData: {
    dollarValue: '',
    nairaValue: ''
  },
  transactions: {
    meta: {
      limit: 0,
      offset: 0,
      total: 0
    },
    transactions: []
  }
}

const ACTIONS: any = {
  [TATs.FETCH_EXCHANGE_RATE_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FETCH_EXCHANGE_RATE_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FETCH_EXCHANGE_RATE_SUCCESS]: (
    state: TransactionState,
    { rates }: SetExchangeRate
  ) => ({
    ...state,
    rates,
    requestStatus: 'success'
  }),
  [TATs.FETCH_PROCESSING_FEE_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FETCH_PROCESSING_FEE_SUCCESS]: (
    state: TransactionState,
    { processingFees }: SetProcessingFees
  ) => ({
    ...state,
    processingFees,
    requestStatus: 'success'
  }),
  [TATs.FETCH_PROCESSING_FEE_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.SET_TRANSACTION_DATA]: (
    state: TransactionState,
    { transactionData }: SetTransactionDataSuccess
  ) => ({
    ...state,
    transactionData: {
      ...state.transactionData,
      ...transactionData
    }
  }),
  [TATs.FETCH_BANKS_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FETCH_BANKS_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FETCH_BANKS_SUCCESS]: (
    state: TransactionState,
    { banks }: SetBanksSuccess
  ) => ({
    ...state,
    banks,
    requestStatus: 'success'
  }),
  [TATs.RESOLVE_BANK_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.RESOLVE_BANK_SUCCESS]: (
    state: TransactionState,
    { bankAccountData }: SetBankAccountSuccess
  ) => {
    const findBankAccount = state.bankAccounts.find(
      (bankAcct) =>
        bankAcct.bankId === bankAccountData.bankId &&
        bankAcct.accountNumber === bankAccountData.accountNumber
    )

    return {
      ...state,
      bankAccounts: findBankAccount
        ? state.bankAccounts
        : state.bankAccounts.concat(bankAccountData),
      requestStatus: 'success'
    }
  },
  [TATs.SET_EXISTING_BANK_DATA]: (
    state: TransactionState,
    { bankAccountData }: SetBankAccountSuccess
  ) => ({
    ...state,
    bankAccountData,
    requestStatus: 'success'
  }),
  [TATs.RESOLVE_BANK_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'idle'
  }),
  [TATs.TRANSFER_TO_BANK_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.TRANSFER_TO_BANK_SUCCESS]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [TATs.TRANSFER_TO_BANK_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FETCH_BANK_ACCOUNTS_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FETCH_BANK_ACCOUNTS_SUCCESS]: (
    state: TransactionState,
    { bankAccounts }: SetUserBankAccountsSuccess
  ) => ({
    ...state,
    bankAccounts,
    requestStatus: 'success'
  }),
  [TATs.FETCH_BANK_ACCOUNTS_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.INITIATE_PAYMENT_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.INITIATE_PAYMENT_SUCCESS]: (
    state: TransactionState,
    { paymentTransaction }: InitiateTransactionSuccess
  ) => ({
    ...state,
    paymentTransaction,
    requestStatus: 'success'
  }),
  [TATs.INITIATE_PAYMENT_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.DELETE_BANK_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.DELETE_BANK_SUCCESS]: (
    state: TransactionState,
    { bankId }: DeleteBankSuccess
  ) => ({
    ...state,
    bankAccounts: state.bankAccounts.filter(
      (bank) => bank.id !== Number(bankId)
    ),
    requestStatus: 'success'
  }),
  [TATs.DELETE_BANK_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FETCH_TRANSACTIONS_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FETCH_TRANSACTIONS_SUCCESS]: (
    state: TransactionState,
    { transactions }: FetchTransactionsSuccess
  ) => {
    let paginatedTransactions = []
    if (state.transactions?.meta?.offset === 0) {
      paginatedTransactions = transactions?.transactions
    } else {
      paginatedTransactions = [
        ...(state.transactions?.transactions || []),
        ...(transactions?.transactions || [])
      ]
    }

    return {
      ...state,
      requestStatus: 'success',
      transactions: {
        ...state.transactions,
        meta: transactions?.meta || {},
        transactions: paginatedTransactions
      }
    }
  },
  [TATs.FETCH_TRANSACTIONS_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.CANCEL_TRANSACTION_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.CANCEL_TRANSACTION_SUCCESS]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'success',
    transaction: {
      ...state.transaction,
      status: 'canceled'
    }
  }),
  [TATs.CANCEL_TRANSACTION_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FETCH_TRANSACTION_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FETCH_TRANSACTION_SUCCESS]: (
    state: TransactionState,
    { transaction }: FetchTransactionSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    transaction
  }),
  [TATs.FETCH_TRANSACTION_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FIND_USER_BANK_ACCOUNT_REQUEST]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [TATs.FIND_USER_BANK_ACCOUNT_ERROR]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [TATs.FIND_USER_BANK_ACCOUNT_SUCCESS]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [TATs.RESET_TRANSACTION_STATE]: (state: TransactionState) => ({
    ...state,
    requestStatus: 'idle'
  })
}

export const transactionReducer = (
  state = initialState,
  action: TransactionActions
) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
