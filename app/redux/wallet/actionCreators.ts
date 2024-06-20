import { WALLET_ACTION_TYPES as WAT } from './types'

export const fetchWalletSuccess = (wallet: IRiseWallet) => ({
  type: WAT.GET_USER_WALLET_SUCCESS,
  wallet
})

export const fetchWalletError = () => ({
  type: WAT.GET_USER_WALLET_ERROR
})

export const toggleWalletBalanceVisibility = (isVisible: boolean) => ({
  isVisible,
  type: WAT.TOGGLE_WALLET_BALANCE_VISIBILITY
})

export const toggleTotalBalanceVisibility = (isVisible: boolean) => ({
  isVisible,
  type: WAT.TOGGLE_TOTAL_BALANCE_VISIBILITY
})
