import { findBank } from 'app/api'
import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { useMutation } from 'react-query'

export const useFindBankAccount = () => {
  const { invalidateUserBankAccounts } = useInvalidateCache()
  const { displayServerError } = useDisplayMessage()
  return useMutation(findBank, {
    mutationKey: ['findBank'],
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: async (data) => {
      invalidateUserBankAccounts()
      return data
    }
  })
}
