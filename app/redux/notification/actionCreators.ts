import { NotificationTypes } from './types'

export const showNotification = (
  alertTitle: string,
  message: string,
  notifType: 'error' | 'success' | 'warning'
) => ({
  alertTitle,
  message,
  notifType,
  type: NotificationTypes.SHOW_NOTIFICATION
})

export const hideNotification = () => ({
  type: NotificationTypes.HIDE_NOTIFICATION
})
