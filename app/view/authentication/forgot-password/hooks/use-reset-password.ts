import { useGenerateOtpMutation } from 'app/domains/auth/hooks'
import { validateEmail } from 'app/utils/validator'
import { useState } from 'react'
import validator from 'validate.js'

import { ResetPasswordProps } from '../reset-password'

export function useResetPassword({
  navigation,
  route: { params }
}: ResetPasswordProps) {
  const [userEmailState, setUserEmail] = useState({
    email: params?.email ?? '',
    error: ''
  })

  const generateOtp = useGenerateOtpMutation()

  const handleBackPress = () => navigation?.goBack()

  const handleSetUserEmail = (email: string) => {
    const errors = validator({ email }, validateEmail)

    setUserEmail({
      email,
      error: errors
    })
  }

  const handleVerifyUserEmail = async () => {
    const { email } = userEmailState
    generateOtp.mutate(
      {
        email,
        path: 'reset-password'
      },
      {
        onSuccess: () => {
          navigation?.navigate('ConfirmEmail', { userEmail: email })
        }
      }
    )
  }

  return {
    handleBackPress,
    handleSetUserEmail,
    handleVerifyUserEmail,
    isLoading: generateOtp.isLoading,
    userEmailState
  }
}
