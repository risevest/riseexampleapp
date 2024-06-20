export enum NotificationTypes {
  HIDE_NOTIFICATION = 'error/HIDE_NOTIFICATION',
  SHOW_NOTIFICATION = 'error/SHOW_NOTIFICATION'
}

export interface INotification {
  message: string
  notifType: 'error' | 'success' | 'warning' | ''
  showNotif?: boolean
  title: string
}

export type NotificationType = 'success' | 'error' | 'warning'

export type SetNotification = {
  alertTitle: string
  message: string
  notifType: NotificationType
  type: NotificationTypes.SHOW_NOTIFICATION
}

export type HideNotification = {
  type: NotificationTypes.HIDE_NOTIFICATION
}

export type NotificationActions = SetNotification | HideNotification
