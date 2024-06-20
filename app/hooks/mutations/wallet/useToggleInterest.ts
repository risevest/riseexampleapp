import { toggleWalletInterest } from 'app/api'
import { useDisplayMessage, useInvalidateCache } from 'app/hooks'
import { useMutation } from 'react-query'

export function useToggleWalletInterest() {
  const { invalidateWallet } = useInvalidateCache()
  const { displayServerError } = useDisplayMessage()

  return useMutation(toggleWalletInterest, {
    mutationKey: 'toggleWalletInterest',
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: invalidateWallet
  })
}
