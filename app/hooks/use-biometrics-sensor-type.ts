import { useEffect, useState } from 'react'
import FingerprintScanner, {
  Biometrics
} from 'react-native-fingerprint-scanner'

export function useBiometricSensorType() {
  const [biometricSensorType, setBiometricSensorType] = useState<
    Biometrics | undefined
  >(undefined)

  useEffect(() => {
    const getSensorType = async () => {
      try {
        const deviceBiometricsType =
          await FingerprintScanner.isSensorAvailable()
        setBiometricSensorType(deviceBiometricsType)
      } catch (error) {
        // fail silently
      }
    }

    getSensorType()
  }, [])

  return biometricSensorType
}
