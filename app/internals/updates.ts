import { errorLogger } from 'app/utils/error/logger'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppState, Linking } from 'react-native'
import CodePush from 'react-native-code-push'
import RNRestart from 'react-native-restart'
import VersionCheck from 'react-native-version-check'

export function useOTAUpdates() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [isUptToDate, setIsUpToDate] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const checkAndSync = useCallback(
    () =>
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.ON_NEXT_RESTART,
          mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE
        },
        (status) => {
          if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
            setIsUpdateAvailable(true)
          }
          if (status === CodePush.SyncStatus.UP_TO_DATE) {
            setIsUpToDate(true)
          }
        },
        (progress) =>
          setDownloadProgress(progress.receivedBytes / progress.totalBytes)
      ),
    []
  )

  const reloadApp = async () => {
    try {
      await CodePush.restartApp()
    } catch (err) {
      errorLogger.captureError(err)
      RNRestart.Restart()
    }
  }

  useEffect(() => {
    checkAndSync()
  }, [checkAndSync])

  useEffect(() => {
    const listener = AppState.addEventListener('change', (newState) => {
      if (newState === 'active') {
        checkAndSync()
      }
    })

    return listener.remove
  }, [checkAndSync])

  return {
    downloadProgress,
    isUpdateAvailable,
    isUptToDate,
    reloadApp
  }
}
export function useStoreUpdates() {
  const [updateInfo, setUpdateInfo] = useState({
    isNeeded: false,
    storeUrl: ''
  })

  const isStoreUpdate = useMemo(() => updateInfo?.isNeeded, [updateInfo])

  const checkForUpdate = async () => {
    if (__DEV__) {
      return
    }
    try {
      const needUpdate = await VersionCheck.needUpdate()
      setUpdateInfo(needUpdate)
    } catch (error) {
      // fail silently
    }
  }

  const closeUpdateModal = () => {
    setUpdateInfo({ ...updateInfo, isNeeded: false })
  }

  const linkToStore = () => {
    try {
      Linking.openURL(updateInfo.storeUrl)
    } catch (error) {
      errorLogger.captureError(error)
    }
  }

  return {
    checkForUpdate,
    closeUpdateModal,
    isStoreUpdate,
    linkToStore
  }
}
