import { ErrorState } from './types'

export const initialState: ErrorState = {
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
}
