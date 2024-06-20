import { useLinkTo } from '@react-navigation/native'
import { handleDeepLink, useLoginMutation } from 'app/hooks/mutations/auth'
import { setToken } from 'app/redux/user/actionCreators'
import {
  handleAnalyticsAuthentication,
  logEvent,
  setUserProperties
} from 'app/utils/analytics'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export function useSignIn() {
  const linkTo = useLinkTo()
  const loginMutation = useLoginMutation()
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    async (
      email: string,
      password: string,
      method: 'biometrics' | 'email-password'
    ) => {
      loginMutation.mutate(
        { email, password, type: 'email' },
        {
          onSuccess: (session) => {
            handleAnalyticsAuthentication(session?.uuid, email)
            setUserProperties({ user_id: String(session.uuid) })
            dispatch(setToken({ token: session.token }))
            logEvent('login', {
              login_method: method,
              origin_screen_name: 'login'
            })
            handleDeepLink(linkTo)
          }
        }
      )
    },
    [dispatch, linkTo, loginMutation]
  )

  return {
    isLoading: loginMutation.isLoading,
    onSubmit
  }
}
