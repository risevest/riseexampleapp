import { ERROR_ACTION_TYPES } from './types'

export const clearErrorDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: ERROR_ACTION_TYPES.CLEAR_ERROR })
  }
}
