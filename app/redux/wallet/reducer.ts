import {
  FetchCryptoAddressSuccess,
  FetchNubanBankAccountsSuccess,
  FetchWalletSuccess,
  SetTotalBalanceVisibility,
  SetWalletVisibility,
  WALLET_ACTION_TYPES as WAT,
  WalletActions,
  WithdrawToWalletSuccess
} from './types'

export type WalletState = {
  cryptoAddress: string
  isTotalBalanceVisible: boolean
  isWalletBalanceVisible: boolean
  nubanAccounts: IRiseWallet[]
  requestStatus: 'idle' | 'pending' | 'success' | 'failed'
  wallet: IRiseWallet
}

export const initialState: WalletState = {
  cryptoAddress: '',
  isTotalBalanceVisible: true,
  isWalletBalanceVisible: true,
  nubanAccounts: [],
  requestStatus: 'idle',
  wallet: {} as IRiseWallet
}

const ACTIONS: any = {
  [WAT.GET_USER_WALLET_REQUEST]: (state: WalletState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [WAT.GET_USER_WALLET_ERROR]: (state: WalletState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [WAT.GET_USER_WALLET_SUCCESS]: (
    state: WalletState,
    { wallet }: FetchWalletSuccess
  ) => ({
    ...state,
    requestStatus: 'success',
    wallet
  }),

  [WAT.GET_USER_CRYPTO_ADDRESS_REQUEST]: (state: WalletState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [WAT.GET_USER_CRYPTO_ADDRESS_ERROR]: (state: WalletState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [WAT.GET_USER_CRYPTO_ADDRESS_SUCCESS]: (
    state: WalletState,
    { cryptoAddress }: FetchCryptoAddressSuccess
  ) => ({
    ...state,
    cryptoAddress,
    requestStatus: 'success'
  }),

  [WAT.SEND_MONEY_TO_USER_REQUEST]: (state: WalletState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [WAT.SEND_MONEY_TO_USER_SUCCESS]: (state: WalletState) => ({
    ...state,
    requestStatus: 'success'
  }),
  [WAT.SEND_MONEY_TO_USER_ERROR]: (state: WalletState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [WAT.WITHDRAW_TO_WALLET_FROM_PLAN_REQUEST]: (state: WalletState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [WAT.WITHDRAW_TO_WALLET_FROM_PLAN_SUCCESS]: (
    state: WalletState,
    { amount, hasMatured }: WithdrawToWalletSuccess
  ) => {
    const fivePercent = Number(amount) * (5 / 100)
    const amountAdded = hasMatured
      ? Number(amount)
      : Number(amount) - fivePercent
    const newWalletBalance = Number(
      Number(state.wallet?.balanceUsd) + Number(amountAdded)
    ).toFixed(2)

    return {
      ...state,
      requestStatus: 'success',
      wallet: {
        ...state.wallet,
        balanceUsd: newWalletBalance
      }
    }
  },
  [WAT.WITHDRAW_TO_WALLET_FROM_PLAN_ERROR]: (state: WalletState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [WAT.TOGGLE_WALLET_BALANCE_VISIBILITY]: (
    state: WalletState,
    { isVisible }: SetWalletVisibility
  ) => ({
    ...state,
    isWalletBalanceVisible: isVisible
  }),
  [WAT.TOGGLE_TOTAL_BALANCE_VISIBILITY]: (
    state: WalletState,
    { isVisible }: SetTotalBalanceVisibility
  ) => ({
    ...state,
    isTotalBalanceVisible: isVisible
  }),
  [WAT.GET_NUBAN_ACCOUNTS_REQUEST]: (state: WalletState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [WAT.GET_NUBAN_ACCOUNTS_SUCCESS]: (
    state: WalletState,
    { accounts }: FetchNubanBankAccountsSuccess
  ) => ({
    ...state,
    nubanAccounts: accounts,
    requestStatus: 'success'
  }),
  [WAT.GET_NUBAN_ACCOUNTS_ERROR]: (state: WalletState) => ({
    ...state,
    requestStatus: 'failed'
  })
}

export const walletReducer = (state = initialState, action: WalletActions) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
