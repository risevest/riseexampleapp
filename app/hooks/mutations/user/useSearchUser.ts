import { searchUsers } from 'app/api'
import { useDisplayMessage } from 'app/hooks'
import { useScroller } from 'app/hooks/queries/useScroller/v2/useScroller'
import { useMutation } from '@tanstack/react-query'

export const useSearchUser = (identifier: string) => {
  const { status, data, ...query } = useScroller<RiseUser>(
    (offset) => searchUsers({ identifier, offset }),
    ['infiniteUsers', identifier],
    { baseOffset: 0, isAutoFetching: false, limit: 10 }
  )

  const users = (data ?? {}) as RiseUser[]

  return {
    requestStatus: status,
    users,
    ...query
  }
}

export const useSearchUserMutation = () => {
  const { displayServerError } = useDisplayMessage()
  return useMutation(
    (identifier: string) => searchUsers({ identifier, offset: 0 }),
    {
      mutationKey: ['searchUsers'],
      onError: (error) => {
        displayServerError(error)
      }
    }
  )
}
