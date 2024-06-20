import { ToastPosition } from 'react-native-toast-message'

import { AlertToast, SimpleToast } from './components'

export const toastConfig = {
  alert: AlertToast,
  simple: SimpleToast
} as const

export const toastPositions: Partial<Record<ToastNames, ToastPosition>> = {
  simple: 'bottom'
}

export type ToastConfig = typeof toastConfig
export type ToastNames = keyof ToastConfig
