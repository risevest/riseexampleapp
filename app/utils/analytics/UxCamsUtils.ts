// // UxCamsUtils.ts
// import { View } from 'react-native'
// // import RNUxcam from 'react-native-ux-cam'

// import {
//   EventLogData,
//   EventName,
//   RequireAtLeastOne,
//   UserProperties
// } from './types'
// import { objectKeys } from './helper'
// import { platform } from './constant'

// export const logUserProperty = (name: string, value: string | number) => {
//   // RNUxcam.setUserProperty(name, value)
// }

// export function setUserProperties(user: RequireAtLeastOne<UserProperties>) {
//   objectKeys(user).forEach(function (key) {
//     const value = user[key]
//     if (value === undefined) {
//       return
//     } else if (typeof value === 'object') {
//       logUserProperty(key, JSON.stringify(value))
//     } else if (typeof value === 'number') {
//       logUserProperty(key, JSON.stringify(value))
//     } else {
//       logUserProperty(key, String(value))
//     }
//   })
// }

// export function setUserId(id: string) {
//   // RNUxcam.setUserIdentity(id)
// }

// export function logEvent(event: EventName, data?: EventLogData[typeof event]) {
//   data = { ...data, ...platform }

//   // RNUxcam.logEvent(event, data)
// }

// export function tagScreenName(screenName: string) {
//   // RNUxcam.tagScreenName(screenName)
// }

// export function hideView(view: View) {
//   // RNUxcam.occludeSensitiveView(view)
// }
// export default {
//   logUserProperty,
//   setUserProperties,
//   setUserId,
//   logEvent,
//   tagScreenName,
//   hideView
// }
