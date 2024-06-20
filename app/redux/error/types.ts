// TODO create error interface

export enum ERROR_ACTION_TYPES {
  CLEAR_ERROR = 'error/CLEAR_ERROR',
  SET_ERROR = 'error/SET_ERROR'
}

export interface IErrorType {
  message?: string
  response?: {
    data?: {
      errors?: {
        message: string
      }
      message: string
    }
  }
}

export interface ErrorState {
  error: IErrorType
  title: string
}

export type SetErrorRequest = {
  error: IErrorType
  title: string
  type: ERROR_ACTION_TYPES.SET_ERROR
}

export type ErrorActions = SetErrorRequest
