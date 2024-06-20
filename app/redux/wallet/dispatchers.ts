import { fetchWallet } from 'app/api'
import instance from 'app/utils/axios'

import { setError } from '../error/actionCreators'
import {
  fetchWalletError,
  fetchWalletSuccess,
  toggleTotalBalanceVisibility,
  toggleWalletBalanceVisibility
} from './actionCreators'
import { WALLET_ACTION_TYPES } from './types'

export const toggleWalletBalanceVisibilityDispatcher = (isVisible: boolean) => {
  return (dispatch: any) => {
    dispatch(toggleWalletBalanceVisibility(isVisible))
  }
}

export const toggleTotalBalanceVisibilityDispatcher = (isVisbile: boolean) => {
  return (dispatch: any) => {
    dispatch(toggleTotalBalanceVisibility(isVisbile))
  }
}

export const getUserWalletDispatcher = (userId: number) => {
  return (dispatch: any) => {
    dispatch({ type: WALLET_ACTION_TYPES.GET_USER_WALLET_REQUEST })
    return fetchWallet(userId)
      .then((wallet) => {
        dispatch(fetchWalletSuccess(wallet))
        return {
          responseStatus: 'success'
        }
      })
      .catch(() => {
        dispatch(fetchWalletError())
        return {
          responseStatus: 'failed'
        }
      })
  }
}

export const sendMoneyToUserDispatcher = (payload: any) => {
  return (dispatch: any) => {
    dispatch({ type: WALLET_ACTION_TYPES.SEND_MONEY_TO_USER_REQUEST })
    return instance
      .post(`/wallets/transfer/${payload.recipientId}/send-to-user`, {
        amount: payload.amount,
        pin: payload.pin
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: WALLET_ACTION_TYPES.SEND_MONEY_TO_USER_SUCCESS })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch(setError('Payment Error', error))
        dispatch({ type: WALLET_ACTION_TYPES.SEND_MONEY_TO_USER_ERROR })
        return {
          requestStatus: 'failed'
        }
      })
  }
}
