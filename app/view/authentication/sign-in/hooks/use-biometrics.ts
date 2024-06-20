import { fetchItemFromStorage } from 'app/utils/asyncstorage'
import { fetchKeychainValues } from 'app/utils/keychain'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import FingerPrintScanner from 'react-native-fingerprint-scanner'

import type { FormFieldProps } from '../sections'

export function useBiometrics({ onSubmit }: Pick<FormFieldProps, 'onSubmit'>) {
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false)

  const biometricLogin = async () => {
    const credentials = await fetchKeychainValues()

    if (credentials) {
      onSubmit(credentials?.username, credentials?.password, 'biometrics')
    }
  }

  const handleBiometricLogin = async () => {
    FingerPrintScanner.authenticate({
      description: 'Unlock Risevest to access your account'
    })
      .then(async () => {
        biometricLogin()
      })
      .catch((error) => {
        Alert.alert('Authentication Failure', error.message)
      })
      .finally(() => FingerPrintScanner.release())
  }

  useEffect(() => {
    const fetchBiometricsState = async () => {
      const loginOption = await fetchItemFromStorage('loginOption')

      setIsBiometricsEnabled(loginOption === 'biometrics')
    }

    fetchBiometricsState()
  }, [])

  return {
    handleBiometricLogin,
    isBiometricsEnabled
  }
}
