import {
  useGenerateOtpMutation,
  useVerifyUserMutation
} from 'app/domains/auth/hooks'
import { useEffect, useRef, useState } from 'react'

import { ConfirmEmailProps } from '../confirm-email'

export function useConfirmEmail({ navigation, route }: ConfirmEmailProps) {
  const intervalId = useRef<NodeJS.Timer>()
  const [error, setError] = useState('')
  const [countDown, setCountDown] = useState(60)
  const [disableResend, setDisableResend] = useState(false)

  const verifyOtp = useVerifyUserMutation()
  const generateOtp = useGenerateOtpMutation()

  const emailSentTo = route?.params?.userEmail?.replace(
    /(?!^).(?=[^@]+@)/g,
    '*'
  )

  const handleBackPress = () => navigation?.goBack()

  const handleEmailVerification = async (otp: string) => {
    const userEmail = route?.params.userEmail
    verifyOtp.mutate(
      {
        email: userEmail,
        token: otp,
        type: 'reset'
      },
      {
        onError: () => {
          setError('Invalid token provided')
        },
        onSuccess: (response) => {
          setError('')
          navigation?.navigate('CreateNewPassword', {
            email: route?.params.userEmail,
            name: response?.name,
            token: otp
          })
        }
      }
    )
  }

  const handleOtpGeneration = () => {
    generateOtp.mutate({
      email: route?.params.userEmail,
      path: 'reset-password',
      phone: ''
    })
  }

  const resendCode = () => {
    handleOtpGeneration()
    intervalId.current = setInterval(() => {
      setDisableResend(true)
      setCountDown((previous) => {
        if (previous === 0) {
          setDisableResend(false)
          clearInterval(Number(intervalId.current))
          return 60
        }

        return previous - 1
      })
    }, 1000)
  }

  useEffect(() => {
    const initialize = () => {
      const loggedIn = route?.params?.loggedIn

      if (loggedIn) {
        handleOtpGeneration()
      }
    }

    initialize()

    return () => clearInterval(Number(intervalId.current))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    countDown,
    disableResend,
    emailSentTo,
    error,
    handleBackPress,
    handleEmailVerification,
    isLoading: verifyOtp.isLoading || generateOtp.isLoading,
    resendCode
  }
}
