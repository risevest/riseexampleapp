import { getUserByUsername } from 'app/api'
import { useDisplayMessage } from 'app/hooks/useDisplayMessage'
import {
  removeAtSign,
  transformQueryStatusToRiseStatus
} from 'app/utils/utilFunctions'
import { AxiosError } from 'axios'
import _ from 'lodash'
import { useMutation, useQuery } from '@tanstack/react-query'

interface VerifyPayload {
  taken: boolean
  user?: RiseUser
}

const verifyUsername = async (username: string): Promise<VerifyPayload> => {
  try {
    const user = await getUserByUsername(username)
    return { taken: true, user }
  } catch (error) {
    const err = error as AxiosError<any>
    if (err.isAxiosError && err.response?.status === 404) {
      return { taken: false }
    } else {
      throw error
    }
  }
}

export const useValidateUsername = (
  username: string,
  options: { enabled: boolean }
) => {
  const tag = removeAtSign(username)
  const { status, data, ...query } = useQuery(['validateUsername', tag], {
    enabled: options?.enabled && !_.isEmpty(tag),
    queryFn: () => verifyUsername(tag),
    retry: false
  })

  return {
    ...query,
    data,
    requestStatus: transformQueryStatusToRiseStatus(status),
    status,
    taken: data?.taken
  }
}

export const useValidateUsernameMutation = () => {
  const { displayServerError } = useDisplayMessage()
  return useMutation(
    (query: string) => {
      const tag = removeAtSign(query)
      return verifyUsername(tag)
    },
    {
      mutationKey: 'validateUsernameMutation',
      onError: (error) => {
        displayServerError(error)
      }
    }
  )
}
