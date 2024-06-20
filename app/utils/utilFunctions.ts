import Clipboard from '@react-native-clipboard/clipboard'
import constants from 'app/config/constants'
import { getPIN } from 'app/internals/pin.keychain'
import Emoji from 'node-emoji'
import { Alert, Platform } from 'react-native'
import FingerPrintScanner from 'react-native-fingerprint-scanner'
import { URL } from 'react-native-url-polyfill'
import { QueryStatus } from 'react-query'

import haptics from './haptics'
import {
  ConvertCamelToSnakeCase,
  ConvertSnakeToCamelCase,
  SnakeToCamelCase
} from './utilTypes'

export const removeAtSign = (str: string) => (str ? str.replace(/^@/g, '') : '')

export const completeTransactionWithBiometrics = async (fn: Function) => {
  try {
    const biometryType = await FingerPrintScanner.isSensorAvailable()
    const credentials = await getPIN()

    const userPin = credentials ? credentials.password : ''
    if (!userPin) {
      if (Platform.OS === 'android') {
        FingerPrintScanner.release()
      }
      return
    }

    await FingerPrintScanner.authenticate({
      description: `Authorize this transaction with ${biometryType}`
    })
    fn(userPin)
  } catch (error) {
    // @ts-ignore
    Alert.alert('Authentication Failure', error.message)
  } finally {
    FingerPrintScanner.release()
  }
}

export const getEmoji = (emojiName: string | undefined) => {
  if (emojiName) {
    return Emoji.get(emojiName)
  }
  return Emoji.get('snowflake')
}

export const calculateQuestions = (arg: GoalQuestion) => {
  const { page = 0, total = 1 } = arg || {}
  const title = `Question ${page} of ${total}`
  const progress = Math.floor((page / total) * 100)
  return { progress, title }
}

export const getPlanTitle = (
  plan: GoalPlanData | IAssetClass,
  isAssetClass = false
) => {
  return isAssetClass ? plan?.name : (plan as GoalPlanData)?.planName
}

export function truncateString(string = '', maxLen = 25) {
  return string.length > maxLen
    ? string.substring(0, maxLen - 3) + '...'
    : string
}

export const transformQueryStatusToRiseStatus = (
  status: QueryStatus
): RequestStatus => {
  switch (status) {
    case 'loading':
      return 'pending'
    case 'error':
      return 'failed'
    case 'success':
      return 'success'
    case 'idle':
      return 'idle'
    default:
      return 'pending'
  }
}

export const extractErrorMessage = (error: any): string | undefined => {
  if (typeof error === 'string') return error
  const message = error?.response?.message
  if (message && typeof message === 'string') {
    return message
  }
  return error?.response?.data?.message
}

export const urlWithUTM = (url: string) => {
  try {
    const urlObject = new URL(url)
    urlObject.searchParams.set('utm_source', 'mobileapp')
    urlObject.searchParams.set(
      'utm_medium',
      `risevest@${constants.APP_VERSION}`
    )
    urlObject.searchParams.set('utm_campaign', 'mobileapp-views')
    return urlObject.toString()
  } catch (error) {
    Alert.alert('Invalid URL', 'Cannot open link.')
    return ''
  }
}

/**
 * validatePlanName
 * @param planName string This is the plan name you want to validate
 * @returns boolean This represents if the plan name is validI
 */
export function validatePlanName(planName: string) {
  return (
    !!planName &&
    planName.length > 0 &&
    planName.length <= constants.MAX_PLAN_NAME_LENGTH
  )
}

export function copyToClipboard(text: string) {
  Clipboard.setString(text)
  return haptics.notificationSuccess()
}

export async function getFromClipboard() {
  const text = await Clipboard.getString()
  return text
}

export const getShadowStyle = (radius = 0, opacity = 0.1) => ({
  elevation: constants.SHADOW_ELEVATION_TO_RADIUS_RATIO * radius,
  shadowOpacity: constants.SHADOW_COLOR_RATIO * opacity,
  shadowRadius: radius
})
export function parseURL(url: string) {
  let result: {
    pathname: string
    searchParams: Record<string, string>
  } = {
    pathname: '',
    searchParams: {}
  }

  const pathnameMatch = url.match(/https?:\/\/[^/]+(\/[^?#]*)?/)
  if (pathnameMatch && pathnameMatch[1]) {
    result.pathname = pathnameMatch[1]
  }

  const searchParamsMatch = url.match(/\?([^#]+)/)
  if (searchParamsMatch && searchParamsMatch[1]) {
    const searchParamsArray = searchParamsMatch[1].split('&')
    searchParamsArray.forEach((param) => {
      const [key, value] = param.split('=')
      result.searchParams[decodeURIComponent(key)] = decodeURIComponent(value)
    })
  }

  return result
}

export function spreadValues(min: number, max: number, count: number) {
  const step = (max - min) / (count - 1)
  const spread = []

  for (let i = 0; i < count; i++) {
    spread.push(min + step * i)
  }

  return spread
}

export function clamp(value: number, minimum: number, maximum: number) {
  'worklet'

  return Math.max(minimum, Math.min(value, maximum))
}

export function findNearestSnapPoint(
  currentValue: number,
  snapPoints: number[],
  threshold = 10
) {
  'worklet'

  for (let point of snapPoints) {
    if (Math.abs(point - currentValue) <= threshold) {
      return point
    }
  }
  return null
}

export function toCamelCase<T extends string>(str: T) {
  return str.replace(/([-_]\w)/g, (match) =>
    match[1].toUpperCase()
  ) as SnakeToCamelCase<T>
}

export function toSnakeCase<S extends string>(str: S): SnakeToCamelCase<S> {
  return str.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  ) as SnakeToCamelCase<S>
}

export function convertKeysToCamelCase<T extends Record<string, any>>(
  obj: T
): ConvertSnakeToCamelCase<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(
      convertKeysToCamelCase
    ) as unknown as ConvertSnakeToCamelCase<T>
  }

  const result: any = {}
  for (const key in obj) {
    const camelCaseKey = toCamelCase(key)
    result[camelCaseKey] = convertKeysToCamelCase(obj[key])
  }

  return result
}

export function convertKeysToSnakeCase<T extends Record<string, any>>(
  obj: T
): ConvertCamelToSnakeCase<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(
      convertKeysToSnakeCase
    ) as unknown as ConvertCamelToSnakeCase<T>
  }

  const result: any = {}
  for (const key in obj) {
    const snakeCaseKey = toSnakeCase(key)
    result[snakeCaseKey] = convertKeysToSnakeCase(obj[key])
  }

  return result
}

export function isSameName(reference: string, fullName: string) {
  const [a, b] = [reference, fullName].map((x) =>
    x.split(/\s+|,|-/g).map((y) => y.toLowerCase().trim())
  )
  let match = 0

  for (let i = 0; i < a.length; i++) {
    if (b.includes(a[i])) {
      const matchIndex = b.indexOf(a[i])
      b.splice(matchIndex, 1)
      match++
    }
  }

  return match >= 2
}
