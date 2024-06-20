import { PIN_SERVICE } from '@env'
import {
  fetchKeychainValues,
  removeKeychainValues,
  setKeychainValues
} from 'app/utils/keychain'

const PIN_KEY = 'pin'

export function savePIN(pin: string) {
  return setKeychainValues(PIN_KEY, pin, PIN_SERVICE)
}

export function getPIN() {
  return fetchKeychainValues(PIN_SERVICE)
}

export function removePIN() {
  return removeKeychainValues(PIN_SERVICE)
}
