import {
  countriesData,
  CountryData,
  countryDataMap
} from 'app/components/phone-input/constants/countriesData'
import {
  CountryCode as RiseCountryCode,
  Currency,
  supportedCountries
} from 'app/domains/wallet'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import numbro from 'numbro'
import shortid from 'shortid'

import { round } from './numbers'

export function formatPhoneNumber(
  phoneNumber: string,
  countryCode: CountryCode
) {
  const phoneNumberFormatter = parsePhoneNumberFromString(
    phoneNumber,
    countryCode
  )
  return phoneNumberFormatter?.number as string
}

export function getPhoneNumber(
  phoneNumber: string,
  defaultCountry?:
    | CountryCode
    | {
        defaultCallingCode?: string
        defaultCountry?: CountryCode
        extract?: boolean
      }
) {
  const phoneNumberFormatter = parsePhoneNumberFromString(
    phoneNumber,
    defaultCountry
  )

  if (!phoneNumberFormatter?.isValid()) {
    return undefined
  }

  return {
    country: phoneNumberFormatter.country,
    countryCallingCode: phoneNumberFormatter.countryCallingCode,
    nationalNumber: phoneNumberFormatter.nationalNumber,
    phone: phoneNumberFormatter.number
  }
}

export function formatInputAmount(number: string) {
  if (number.slice(-1) === '.') {
    return new Intl.NumberFormat().format(Number(number)) + '.'
  }

  return new Intl.NumberFormat().format(Number(number))
}

export function formatAmount(
  number: number,
  currencySymbol = '',
  withDecimals = false
) {
  return number === 0
    ? currencySymbol + '0.00'
    : currencySymbol +
        new Intl.NumberFormat(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: withDecimals ? 2 : 0
        }).format(Number(number))
}

const CURRENCY_CODE_MAP: Record<string, string> = {
  USD: 'US'
}

export const CURRENCY_SYMBOL_MAP: Record<
  Currency,
  { position: 'prefix' | 'postfix'; symbol: string }
> = {
  BUSD: { position: 'prefix', symbol: '' },
  DAI: { position: 'prefix', symbol: '' },
  EUR: { position: 'prefix', symbol: '€' },
  GBP: { position: 'prefix', symbol: '£' },
  GHS: { position: 'prefix', symbol: 'GH₵' },
  KES: { position: 'prefix', symbol: 'Ksh' },
  NGN: { position: 'prefix', symbol: '₦' },
  UGX: { position: 'prefix', symbol: 'USh' },
  USD: { position: 'prefix', symbol: '$' },
  USDC: { position: 'prefix', symbol: '' },
  USDT: { position: 'prefix', symbol: '' }
}

export function formatCurrency(
  currency: Currency,
  number: number,
  minimumFractionDigits = 0
) {
  const countryInfo = countriesData.find(
    (country) => country.currencyCode === currency
  )

  const code =
    (CURRENCY_CODE_MAP[currency.toUpperCase()] || countryInfo?.currencyCode) ??
    'US'

  return new Intl.NumberFormat('en-' + code, {
    currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits,
    style: 'currency'
  }).format(number)
}

export function formatCurrencyAverage(currency: Currency, number: number) {
  const currencySymbol = CURRENCY_SYMBOL_MAP[currency]

  return numbro(round(number)).formatCurrency({
    average: number > 9999,
    currencyPosition: currencySymbol?.position,
    currencySymbol: currencySymbol?.symbol,
    mantissa: 3,
    trimMantissa: true
  })
}

export function parseAmount(amount: string) {
  const formattedAmount = removeDuplicateDecimal(amount.split('')).join('')

  // return the formatted amount without the comma separator
  return formattedAmount.replace(/([\s,-])/g, '')
}

/**
 * This ensures the user can't enter more than one decimal in the input.
 * Returns a new array containing only one decimal
 * @param array array containing characters in the split amount
 */
// export function removeDuplicateDecimal(amount: string) {
//   var n = amount.split('')
//   return n.reduce((a, b) => {
//     if (b === '.' && a.includes('.')) {
//       return a
//     } else {
//       return a + b
//     }
//   })
// }

export function removeDuplicateDecimal(arr: string[]) {
  let target = null
  const newArray = []

  for (const str of arr) {
    if (str === '.') {
      if (!!target) {
        continue
      } else {
        target = str
        newArray.push(str)
      }
    } else {
      newArray.push(str)
    }
  }
  return newArray
}

export function formatCryptoCurrency(currency: Currency, number: number) {
  const amount = formatAmount(number)
  return `${amount} ${currency}`
}

const ESCAPE_CURRENCY_CODE_MAP: Record<string, string> = {
  USD: 'US'
}

export function convertCurrencyToCountryAlphaCode2(currency: Currency) {
  const escapedCurrency = ESCAPE_CURRENCY_CODE_MAP[currency.toUpperCase()]
  if (escapedCurrency) {
    return escapedCurrency
  }
  return countriesData.find((country) => country.currencyCode === currency)
    ?.code
}

export const getUserCountry = (userCountry?: string): CountryData | null => {
  if (!userCountry) {
    return null
  }
  const isSupported = supportedCountries.includes(
    userCountry as RiseCountryCode
  )
  if (!isSupported) {
    return null
  }

  return countryDataMap[userCountry.toLowerCase()]
}

export const getUserDefaultCurrency = (
  country?: string,
  defaultCurrency: Currency = 'USD'
): Currency => {
  return (
    (getUserCountry(country)?.currencyCode as Currency | null | undefined) ||
    defaultCurrency
  )
}

export const getUserDefaultCountry = (phoneCountryCode?: string) => {
  return countriesData.find(
    (cd) =>
      cd.callingCode === phoneCountryCode?.slice(1, phoneCountryCode.length)
  )
}

export function generateID() {
  return shortid.generate()
}

export function formatPhoneNumberBeforeSending(
  rawPhoneNumber: string,
  countryCode: string
) {
  const phoneNumber = rawPhoneNumber.replace(countryCode, '')

  if (phoneNumber.length > 10) {
    return countryCode + phoneNumber.slice(1)
  } else {
    return countryCode + phoneNumber
  }
}

export function formatCount(value: number) {
  return numbro(value || 0).format({ thousandSeparated: true })
}

export function formatUserNameConjugate(name: string) {
  const last = name[name.length - 1]
  if (last === 's') {
    return name + 'es'
  }
  return name + "'s"
}

export function maskEmail(email: string) {
  if (!email || !email.includes('@')) {
    return ''
  }

  const maskStr = '*'
  const strArr = email.split('@')
  return `${strArr[0].slice(0, 2)}${maskStr.repeat(5)}@${strArr[1][0]}${maskStr.repeat(4)}`
}
