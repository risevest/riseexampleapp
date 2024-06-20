import { useMutation } from 'react-query'

import { editUser } from '../../../api'
import { useDisplayMessage } from '../../useDisplayMessage'

export function useEditUserMutation() {
  const { displayServerError } = useDisplayMessage()
  return useMutation((data: Partial<RiseUser>) => editUser(data), {
    mutationKey: 'editUserMutation',
    onError: (error) => {
      displayServerError(error)
    }
  })
}
