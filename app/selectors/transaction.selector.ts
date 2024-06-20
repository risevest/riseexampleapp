import { AppState } from 'app/redux/types'
import { createSelector } from 'reselect'

export const selectTransaction = (state: AppState) => state.transaction

export const selectRates = createSelector(
  selectTransaction,
  (transactionSlice) => (transactionSlice?.rates ?? {}) as Rates
)

export const selectTransactionRequestStatus = createSelector(
  selectTransaction,
  (transactionSlice) => transactionSlice?.requestStatus ?? 'idle'
)
