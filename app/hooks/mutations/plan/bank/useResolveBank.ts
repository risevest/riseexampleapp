import { resolveBank } from 'app/api'
import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { useMutation } from 'react-query'

export const useResolveBankAccount = () => {
  const { invalidateUserBankAccounts } = useInvalidateCache()
  const { displayServerError } = useDisplayMessage()
  return useMutation(resolveBank, {
    mutationKey: ['resolvebank'],
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: async (data) => {
      invalidateUserBankAccounts()
      return data
    }
  })
}
