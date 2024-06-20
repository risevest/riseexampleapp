import appsFlyer from 'react-native-appsflyer'

import { EventLogData } from './types'

interface AppsFlyerLogData extends EventLogData {
  sign_up: {}
}

type AppsFlyerEventName = keyof AppsFlyerLogData

export async function logEvent(
  event: AppsFlyerEventName,
  data?: AppsFlyerLogData[typeof event]
) {
  try {
    let eventValues = data
    if (eventValues === undefined) {
      eventValues = {}
    }
    await appsFlyer.logEvent(event, eventValues as object)
  } catch (err) {
    // fail silently
  }
}

export function setUserId(id: string) {
  appsFlyer.setCustomerUserId(id)
}

export default {
  logEvent,
  setUserId
}
