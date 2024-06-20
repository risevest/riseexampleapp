import { useResetPasswordMutation } from 'app/domains/auth/hooks'
import { useDisplayMessage } from 'app/hooks'
import { AppState } from 'app/redux/types'
import firebaseUtils from 'app/utils/analytics/firebaseUtils'
import { fetchKeychainValues, setKeychainValues } from 'app/utils/keychain'
import { checkPassword } from 'app/utils/validator'
import { useState } from 'react'
import { UserCredentials } from 'react-native-keychain'
import { useSelector } from 'react-redux'

import { CreateNewPasswordProps } from '../create-new-password'

export function useCreateNewPassword({
  navigation,
  route
}: CreateNewPasswordProps) {
  const [passwordState, setPasswordState] = useState({
    confirmPassword: '',
    password: '',
    secureText: true
  })

  const user = useSelector((state: AppState) => state.user.user)
  const token = useSelector((state: AppState) => state.user.token)

  const { displayError } = useDisplayMessage()

  const resetPassword = useResetPasswordMutation()

  const handleBackPress = () => navigation?.goBack()

  const handleSubmit = async () => {
    const { password, confirmPassword } = passwordState
    const errors = checkPassword(password)
    const passwordHasErrors = Object.values(errors).includes(false)
    const keychainValues: UserCredentials | false | undefined =
      await fetchKeychainValues()

    if (password !== confirmPassword) {
      displayError(
        'Password mismatch',
        "Your password combination is incorrect. Make sure it's a match."
      )
    } else if (password === confirmPassword && password.length < 8) {
      displayError(
        'Password Length Error',
        'Your password needs to be at least 8 characters long'
      )
    } else if (passwordHasErrors) {
      displayError(
        'Password Requirement Error',
        'Your password needs to be at least 8 characters long, have at least one unique character and one UPPERCASE character'
      )
    } else {
      resetPassword.mutate(password, {
        onSuccess: async () => {
          if (keychainValues) {
            await setKeychainValues(keychainValues.username, password)
          }

          firebaseUtils.logEvent('set_password', {
            origin_screen_name: 'Change password'
          })
          navigation?.reset({
            index: 0,
            routes: [
              {
                // TODO: [navigation] fix this
                // @ts-ignore
                name: 'MessageScreen',
                params: {
                  action: () => {
                    if (!!token) {
                      navigation.navigate('App', {
                        params: {
                          params: {
                            params: { screen: 'More' },
                            screen: 'MoreStack'
                          },
                          screen: 'Home'
                        },
                        screen: 'AppStack'
                      })
                    } else {
                      navigation.navigate('App', {
                        params: { screen: 'Login' },
                        screen: 'AuthStack'
                      })
                    }
                  },
                  buttonLabel: 'Okay',
                  preset: 'success',
                  subtitle: `Well done, ${
                    route?.params?.name ? route?.params?.name : user?.firstName
                  }`,
                  title: 'You’ve reset your password.'
                }
              }
            ]
          })
        }
      })
    }
  }

  const setConfirmPassword = (value: string) => {
    setPasswordState({ ...passwordState, confirmPassword: value })
  }

  const setPassword = (value: string) => {
    setPasswordState({ ...passwordState, password: value })
  }

  const toggleSecureText = () =>
    setPasswordState({
      ...passwordState,
      secureText: !passwordState.secureText
    })

  return {
    handleBackPress,
    handleSubmit,
    isLoading: resetPassword.isLoading,
    passwordState,
    setConfirmPassword,
    setPassword,
    toggleSecureText
  }
}
