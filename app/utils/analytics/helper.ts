import {
  getBrand,
  getDeviceId,
  getSystemVersion
} from 'react-native-device-info'

interface PlanAnalyticKeys {
  amount: string
  duration: string
  frequency: string
  isRecurring: string
  name: string
  reinvest: string
}

const AnalyticsKeys: PlanAnalyticKeys = {
  amount: 'auto_invest_amount',
  duration: 'investment_period',
  frequency: 'auto_invest_frequency',
  isRecurring: 'auto_invest',
  name: 'plan_name',
  reinvest: 'reinvest'
}
function getVerifications(user: RiseUser) {
  let strings = ''
  const keys: any = {
    bvnVerified: 'bvn',
    emailVerified: 'email',
    phoneNumberVerified: 'phone'
  }
  Object.keys(keys).forEach((item) => {
    if (user[item as keyof RiseUser]) {
      strings += `${keys[item]},`
    }
  })
  return strings
}

export async function extractUserProperties(user: RiseUser) {
  const {
    bvnVerified,
    emailVerified,
    pin,
    hasBuildWealth,
    id,
    dob,
    metadata: { idVerified },
    account: { referral, idProofUploaded }
  } = user
  const deviceBrand = getBrand()

  const userBirthYear = !!dob ? dob.split('-')[0] : ''
  const userAge = !!userBirthYear
    ? Number(new Date().getFullYear()) - Number(userBirthYear)
    : 'null'

  const userProperties = {
    age: String(userAge),
    bvn_verified: String(bvnVerified),
    email_verified: String(emailVerified),
    has_build_wealth: String(hasBuildWealth),
    has_pin: String(!!pin),
    id_uploaded: String(idProofUploaded || false),
    id_verified: String(idVerified || false),
    notification: 'all',
    user_id: String(id),
    verification: getVerifications(user),
    ...(referral
      ? {
          isAffiliate: String(referral.isAffiliate),
          referred_investors: String(referral.invested),
          referred_signups: String(referral.signups)
        }
      : {}),
    deviceBrand: `${deviceBrand} - ${getDeviceId()}`,
    deviceOsVersion: getSystemVersion()
  }
  return userProperties
}

export function extractPlanUpdateEvent(
  planId: number,
  payload: any,
  statePlan: any = {},
  origin_screen_name: string
) {
  return (Object.keys(payload) as Array<keyof typeof AnalyticsKeys>).reduce(
    (prev: any, next) => {
      const value = AnalyticsKeys[next]
      if (
        value &&
        typeof statePlan[next] !== 'undefined' &&
        payload[next] !== statePlan[next]
      ) {
        prev[value] =
          typeof payload[next] === 'string' || typeof payload[next] === 'number'
            ? payload[next]
            : String(payload[next])
      }
      return prev
    },
    {
      origin_screen_name,
      plan_id: planId,
      plan_type: statePlan.type
    }
  )
}

export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof typeof obj>
}
