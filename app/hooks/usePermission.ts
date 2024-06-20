import React from 'react'
import { AppState, Linking } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {
  check as checkForPermissions,
  Permission,
  PERMISSIONS,
  request as requestPermission,
  RESULTS
} from 'react-native-permissions'

import { waitFor } from '../utils/waitFor'

// simulate react-query status enum
const Status = {
  // ready to go
  Idle: 'idle',

  // ready to move
  Success: 'success',

  // we should ask user for permission
  Unauthorized: 'unauthorized',
  // app doesn't support permission, eg if phone doesn't have camera
  Unavailable: 'unavailable'
}

/**
 * @desc Promise that will resolve after the ms interval
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function usePermission(permission?: Permission) {
  if (
    permission === PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE &&
    DeviceInfo.getApiLevelSync() >= 33 // Android 13 == API LEVEl 33
  ) {
    permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
  }

  const [status, setStatus] = React.useState(Status.Idle)

  // we call this function to ask for permission, we use this in a useEffect
  // we also call it when we get a response from the user
  const askForPermission = React.useCallback(async () => {
    if (!permission) {
      return
    }

    const res = await checkForPermissions(permission)
    let currentStatus = Status.Idle

    // we should ask permission natively with the native alert thing
    if (res === RESULTS.DENIED || res === RESULTS.BLOCKED) {
      const askResult = await requestPermission(permission)

      if (askResult !== RESULTS.GRANTED) {
        currentStatus = Status.Unauthorized
      } else {
        setStatus(Status.Success)
        currentStatus = Status.Success
      }
    }
    // we should ask for permission through the UI
    if (res === RESULTS.BLOCKED || res === RESULTS.UNAVAILABLE) {
      currentStatus = Status.Unauthorized
    }
    // initialize the camera and celebrate
    else if (res === RESULTS.GRANTED || res === RESULTS.LIMITED) {
      currentStatus = Status.Success
    }
    setStatus(currentStatus)
    return currentStatus
  }, [permission])

  const handlePressSettings = React.useCallback(async () => {
    Linking.openSettings()

    await delay(1000)

    await waitFor(async () => (await AppState.currentState) === 'active')

    askForPermission()
  }, [askForPermission])

  return {
    askForPermission,
    handlePressSettings,
    isIdle: status === Status.Idle,
    isSuccessful: status === Status.Success,
    isUnauthorized: status === Status.Unauthorized,
    isUnavailable: status === Status.Unavailable,
    status
  }
}
