import constants from 'app/config/constants'
import { Platform } from 'react-native'
import { getDeviceId, getSystemVersion } from 'react-native-device-info'

//TODO: Add device brand
export const platform = {
  app_version: constants.APP_VERSION,
  device_id: getDeviceId(),
  mobile_platform: Platform.OS,
  os_version: getSystemVersion(),
  platform: 'mobile'
}
