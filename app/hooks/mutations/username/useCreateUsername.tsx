import { createUsername } from 'app/api'
import { useInvalidateCache } from 'app/hooks'
import { removeAtSign } from 'app/utils/utilFunctions'
import { useMutation } from 'react-query'

export const useCreateUsername = () => {
  const { invalidateUserCache } = useInvalidateCache()

  const mutation = useMutation(
    (username: string) => createUsername(removeAtSign(username)),
    {
      mutationKey: ['createUsername'],
      onSuccess: () => {
        invalidateUserCache()
      }
    }
  )

  return mutation
}
