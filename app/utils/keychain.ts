import { EMAIL_PASSWORD_SERVICE } from '@env'
import * as Keychain from 'react-native-keychain'

export const setKeychainValues = async (
  username: string,
  password: string,
  service: string = EMAIL_PASSWORD_SERVICE
) => {
  if (!username || !password) {
    return
  }
  try {
    await Keychain.setGenericPassword(username, password, {
      service
    })
  } catch (error) {
    // fail silently
  }
}

export const fetchKeychainValues = async (
  keychainService: string = EMAIL_PASSWORD_SERVICE
): Promise<false | Keychain.UserCredentials | undefined> => {
  try {
    const keychainValues = await Keychain.getGenericPassword({
      service: keychainService
    })

    // Fallback for current email-password service in use
    if (
      !keychainValues &&
      keychainService === 'risevest-email-password-service'
    ) {
      return await Keychain.getGenericPassword()
    }
    return keychainValues
  } catch (error) {
    // fails silently
  }
}

export async function removeKeychainValues(service: string) {
  try {
    await Keychain.resetGenericPassword({ service })
  } catch (error) {}
}
