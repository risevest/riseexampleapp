import { fetchBanks, fetchRates } from 'app/api'
import instance from 'app/utils/axios'

import { setError } from '../error/actionCreators'
import {
  deleteBankSuccessAction,
  fetchTransactionsSuccessAction,
  handleTransactionActionCreators,
  initiateTransactionSuccess,
  setBankAccountsData,
  setBanksData,
  setExchangeRateAction,
  setProcessingFeesAction,
  setTransactionData
} from './actionCreators'
import { TRANSACTION_ACTION_TYPES as TATs } from './types'

export const fetchRatesDispatcher = () => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.FETCH_EXCHANGE_RATE_REQUEST))
    return fetchRates()
      .then((rates) => {
        dispatch(setExchangeRateAction(rates))
      })
      .catch(() => {
        // fail silently
      })
  }
}

export const setTransactionDataDispatcher = (transactionData: any) => {
  return (dispatch: any) => {
    dispatch(setTransactionData(transactionData))
  }
}

export const fetchBanksDispatcher = () => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.FETCH_BANKS_REQUEST))
    return fetchBanks()
      .then((banks) => {
        dispatch(setBanksData(banks))
      })
      .catch((error) => {
        dispatch(handleTransactionActionCreators(TATs.FETCH_BANKS_ERROR))
        dispatch(setError('Fetch Banks Error', error))
      })
  }
}

export const fetchProcessingFeeDispatcher = (amount: string) => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.FETCH_PROCESSING_FEE_REQUEST))
    return instance
      .get(`/transactions/processing-fee?amount=${amount}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setProcessingFeesAction(response.data.data))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Processing Fee Error', error))
        dispatch(
          handleTransactionActionCreators(TATs.FETCH_PROCESSING_FEE_ERROR)
        )
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const getUserBankAccounts = () => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.FETCH_BANK_ACCOUNTS_REQUEST))
    return instance
      .get('/bank-accounts/user-accounts')
      .then((response) => {
        if (response.status === 200) {
          dispatch(setBankAccountsData(response.data.accounts))
        }
      })
      .catch((error) => {
        dispatch(
          handleTransactionActionCreators(TATs.FETCH_BANK_ACCOUNTS_ERROR)
        )
        dispatch(setError('Fetch Banks Error', error))
      })
  }
}

export const initiateTransactionDispatcher = (
  payload: Partial<IInitiatePayment>
) => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.INITIATE_PAYMENT_REQUEST))
    return instance
      .post('/transactions/initiate', payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch(initiateTransactionSuccess(response.data.data))
          return {
            requestStatus: 'success',
            response: response.data.data
          }
        }
      })
      .catch((error) => {
        dispatch(handleTransactionActionCreators(TATs.INITIATE_PAYMENT_ERROR))
        dispatch(setError('Payment Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const savePaymentDispatcher = (
  payload: Partial<IPaymentTransaction>
) => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.SAVE_PAYMENT_REQUEST))
    return instance
      .post(`/transactions/${payload.id}/save`, {
        paymentRef: payload.reference
      })
      .then(() => {
        dispatch(handleTransactionActionCreators(TATs.SAVE_PAYMENT_SUCCESS))
        return {
          requestStatus: 'success'
        }
      })
      .catch((error) => {
        dispatch(handleTransactionActionCreators(TATs.SAVE_PAYMENT_ERROR))
        dispatch(setError('Payment Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const deleteBankDispatcher = (bankId: number) => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.DELETE_BANK_REQUEST))
    return instance
      .delete(`/bank-accounts/bank-account/${bankId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(deleteBankSuccessAction(bankId))
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(handleTransactionActionCreators(TATs.DELETE_BANK_ERROR))
        dispatch(setError('Delete Bank Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const fetchTransactionsDispatcher = (offset: number) => {
  return (dispatch: any) => {
    dispatch(handleTransactionActionCreators(TATs.FETCH_TRANSACTIONS_REQUEST))
    return instance
      .get(`/transactions?offset=${offset}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchTransactionsSuccessAction(response.data))
          return {
            requestStatus: 'success',
            transactionsResponse: response.data
          }
        }
      })
      .catch((error) => {
        dispatch(handleTransactionActionCreators(TATs.FETCH_TRANSACTIONS_ERROR))
        dispatch(setError('Fetch Transactions Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}
