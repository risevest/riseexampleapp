/* eslint-disable react-hooks/exhaustive-deps */
import { useAppState } from '@react-native-community/hooks'
import { setItemToStorage } from 'app/utils/asyncstorage'
import * as React from 'react'

const SessionMonitor = () => {
  const currentAppState = useAppState()

  const listenForAppStateChange = () => {
    if (currentAppState === 'background' || currentAppState === 'inactive') {
      setItemToStorage('autoBiometricsPrompt', 'enabled')
    }
  }

  React.useEffect(() => {
    listenForAppStateChange()

    return () => listenForAppStateChange()
  }, [])

  return null
}

export default SessionMonitor
