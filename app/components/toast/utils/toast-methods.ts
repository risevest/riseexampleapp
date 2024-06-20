import Toast from 'react-native-toast-message'

import { type ToastNames, toastPositions } from '../config'
import type { ToastShow } from './types'

export const toastMethods = {
  hide: () => {
    Toast.hide()
  },
  show: <T extends ToastNames>(params: ToastShow<T>) => {
    Toast.show({
      ...params,
      position: params.position ?? toastPositions[params.type],
      text1: params.title,
      text2: params.body
    })
  }
}
