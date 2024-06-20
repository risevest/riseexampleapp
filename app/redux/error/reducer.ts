// TODO: Create State interface and error interface

import { initialState } from './constants'
import {
  ERROR_ACTION_TYPES as actionTypes,
  ErrorActions,
  ErrorState,
  SetErrorRequest
} from './types'

const ACTIONS = {
  [actionTypes.SET_ERROR]: (
    state: ErrorState,
    { title, error }: SetErrorRequest
  ) => ({
    ...state,
    error,
    title
  }),
  [actionTypes.CLEAR_ERROR]: (state: ErrorState) => ({
    ...state,
    error: {
      response: {
        data: {
          errors: {
            message: ''
          },
          message: ''
        }
      }
    },
    title: ''
  })
}

export const errorReducer = (state = initialState, action: ErrorActions) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
