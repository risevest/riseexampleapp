import { AxiosError } from 'axios'

export function extractAxiosErrorMessage(
  error: AxiosError,
  message: string = 'Something went wrong'
) {
  if (error.response) {
    return error.response.data.error || error.response.data.message
  } else if (error.request) {
    return message
  } else {
    return error?.message
  }
}
