import { selectUserId } from 'app/redux/user/selector'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { deleteUser } from '../../../api'
import { clearAllData } from '../../../utils/asyncstorage'
import { useDisplayMessage } from '../../useDisplayMessage'

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()
  const userId = useSelector(selectUserId)
  const { displayServerError } = useDisplayMessage()
  return useMutation(
    (password: string) => deleteUser(password, Number(userId).toString()),
    {
      mutationKey: 'deleteAccount',
      onError: (error) => {
        displayServerError(error)
      },
      onSuccess: async () => {
        queryClient.clear()
        await clearAllData()
      }
    }
  )
}
