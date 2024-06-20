import crashlytics from '@react-native-firebase/crashlytics'
import * as Sentry from '@sentry/react-native'

import amplitude from './amplitude'
// import UxCamsUtils from './UxCamsUtils'
import appsFlyerUtils from './appsFlyer'
import CustomerIO from './customer-io'
import fbSDKUtils from './fbsdk'
import firebaseUtils from './firebaseUtils'
import sentry from './sentry'
import {
  EventLogData,
  EventName,
  RequireAtLeastOne,
  UserProperties
} from './types'

export const logUserProperty = (name: string, value: string) => {
  firebaseUtils.logUserProperty(name, value)
  // UxCamsUtils.logUserProperty(name, value)
}

export function setUserProperties(data: RequireAtLeastOne<UserProperties>) {
  //android crashes for null values, this will prevent it from crashing
  try {
    // UxCamsUtils.setUserProperties(data)
    firebaseUtils.setUserProperties(data)
  } catch {}
}

export function handleAnalyticsAuthentication(id?: string, email?: string) {
  if (!id) {
    return
  }
  firebaseUtils.setUserId(id)
  amplitude.setUserId(id)
  // UxCamsUtils.setUserId(id)
  fbSDKUtils.setUserId(id)
  appsFlyerUtils.setUserId(id)
  crashlytics().setUserId(id)
  Sentry.setUser({
    email,
    id
  })
  CustomerIO.identifyUser(id, email)
}

export function logEvent(event: EventName, data?: EventLogData[typeof event]) {
  try {
    firebaseUtils.logEvent(event, data)
    // UxCamsUtils.logEvent(event, data)
  } catch {}
}

export function tagScreenName(screenName: string) {
  firebaseUtils.tagScreenName(screenName)
  // UxCamsUtils.tagScreenName(screenName)
  sentry.tagScreenName(screenName)
}
