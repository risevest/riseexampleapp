import analytics from '@react-native-firebase/analytics'

import { platform } from './constant'
import {
  EventLogData,
  EventName,
  RequireAtLeastOne,
  UserProperties
} from './types'

export const logUserProperty = (name: string, value: string) => {
  analytics().setUserProperty(name, value)
}

export function setUserProperties(data: RequireAtLeastOne<UserProperties>) {
  data = { ...data, ...platform }

  const convertedData: Record<string, string | null> = {}

  for (const property in data) {
    const value = data[property as keyof UserProperties]

    if (value === undefined) {
      return
    }
    convertedData[property] = JSON.stringify(value)
  }

  analytics().setUserProperties(convertedData)
}

export function setUserId(id: string) {
  analytics().setUserId(id)
}

export function logEvent(event: EventName, data?: EventLogData[typeof event]) {
  data = { ...(typeof data !== 'string' && data), ...platform }

  analytics().logEvent(event, data as Record<string, unknown>)
}

export function tagScreenName(screenName: string) {
  analytics().logScreenView({
    screen_class: screenName,
    screen_name: screenName
  })
}

export default {
  logEvent,
  logUserProperty,
  setUserId,
  setUserProperties,
  tagScreenName
}
