import { ERROR_ACTION_TYPES as actionTypes, IErrorType } from './types'

export const setError = (title: string, error: IErrorType) => ({
  error,
  title,
  type: actionTypes.SET_ERROR
})
