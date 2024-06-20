import { fetchItemFromStorage } from 'app/utils/asyncstorage'
import { AxiosRequestConfig } from 'axios'
import { Platform } from 'react-native'
import appsFlyer from 'react-native-appsflyer'
import {
  getBrand,
  getDeviceId,
  getSystemVersion
} from 'react-native-device-info'

import constants from '../config/constants'

export async function useAuthentication(config: AxiosRequestConfig) {
  const token = await fetchItemFromStorage('sessionToken')

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
}

const getAppsFlyerUID = (): Promise<string> =>
  new Promise((resolve, reject) => {
    appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
      if (err) reject(err)
      resolve(appsFlyerUID)
    })
  })

export async function useDeviceInfo(config: AxiosRequestConfig) {
  const deviceBrand = getBrand()
  const appsFlyerId = await getAppsFlyerUID()

  config.headers = {
    ...config.headers,
    appVersion: constants.APP_VERSION,
    device: `${deviceBrand}(${getDeviceId()})`,
    osVersion: getSystemVersion(),
    'rise-platform': 'mobile',
    'rise-platform-os': Platform.OS,
    'x-appsflyer-id': appsFlyerId
  }
  return config
}
