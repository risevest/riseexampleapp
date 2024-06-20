import { CUSTOMER_IO_API_KEY, CUSTOMER_IO_SITE_ID } from '@env'
import {
  CustomerIO,
  CustomerioConfig,
  CustomerIOEnv,
  PushClickBehaviorAndroid,
  Region
} from 'customerio-reactnative'

import { errorLogger } from '../error/logger'
import amplitude from './amplitude'
import {
  EventLogData,
  EventName,
  RequireAtLeastOne,
  UserProperties
} from './types'

function identifyUser(id?: string, email?: string) {
  try {
    CustomerIO.identify(String(id), { email })
  } catch (error) {
    errorLogger.logAnalyticsError('customer-io identify user', error)
  }
}

function setUserProperties(data: RequireAtLeastOne<UserProperties>) {
  const validatedData: Record<string, string | number | boolean> = {}

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key as keyof UserProperties]
      if (value !== undefined && value !== null) {
        validatedData[key] = value as string | number | boolean
      }
    }
  }

  try {
    CustomerIO.setProfileAttributes(validatedData)
  } catch (error) {
    errorLogger.logAnalyticsError('customer-io set user properties', error)
  }
}

function stopTrackingUser() {
  CustomerIO.clearIdentify()
}

function logEvent(event: EventName, data: EventLogData[typeof event] = {}) {
  try {
    CustomerIO.track(event, data)
  } catch (error) {
    errorLogger.logAnalyticsError('customer-io log event', error)
  }
}

function tagScreen(screenName: string) {
  CustomerIO.screen(screenName)
}

function init() {
  const env = new CustomerIOEnv()
  env.siteId = CUSTOMER_IO_SITE_ID
  env.apiKey = CUSTOMER_IO_API_KEY
  env.region = Region.US

  const data = new CustomerioConfig()
  data.pushClickBehaviorAndroid =
    PushClickBehaviorAndroid.ActivityPreventRestart
  data.autoTrackDeviceAttributes = true
  data.enableInApp = true

  CustomerIO.initialize(env)
}

function requestPermissionForNotification() {
  const logPushNotificationEvent = (status: 'allow' | 'disallow') => {
    const ampStatus = status === 'allow' ? 'yes' : 'no'

    logEvent('toggle_push_preference', {
      notification_preference_selected: status
    })
    amplitude.logEvent('Push Preference Toggled', {
      'Notification Preference Selected': ampStatus
    })

    setUserProperties({ push_notification_preference: status })
    amplitude.setUserProperties({
      'Push Notification Preference': ampStatus
    })
  }

  CustomerIO.getPushPermissionStatus().then((status) => {
    switch (status) {
      case 'NotDetermined':
        {
          const options = { ios: { badge: true, sound: true } }
          CustomerIO.showPromptForPushNotifications(options).then((res) => {
            if (res === 'Granted') {
              logPushNotificationEvent('allow')
            } else if (res === 'Denied') {
              logPushNotificationEvent('disallow')
            }
          })
        }
        break

      case 'Granted':
        setUserProperties({ push_notification_preference: 'allow' })
        break

      default:
        setUserProperties({ push_notification_preference: 'disallow' })
    }
  })
}

export default {
  identifyUser,
  init,
  logEvent,
  requestPermissionForNotification,
  setUserProperties,
  stopTrackingUser,
  tagScreen
}
