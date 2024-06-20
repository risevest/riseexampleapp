export enum ServerNotificationsTypes {
  FETCH_USER_NOTIFICATIONS_ERROR = 'server-notifications/FETCH_USER_NOTIFICATIONS_ERROR',
  FETCH_USER_NOTIFICATIONS_REQUEST = 'server-notifications/FETCH_USER_NOTIFICATIONS_REQUEST',
  FETCH_USER_NOTIFICATIONS_SUCCESS = 'server-notifications/FETCH_USER_NOTIFICATIONS_SUCCESS',

  READ_USER_NOTIFICATIONS_ERROR = 'server-notifications/READ_USER_NOTIFICATIONS_ERROR',
  READ_USER_NOTIFICATIONS_REQUEST = 'server-notifications/READ_USER_NOTIFICATIONS_REQUEST',
  READ_USER_NOTIFICATIONS_SUCCESS = 'server-notifications/READ_USER_NOTIFICATIONS_SUCCESS'
}

export type FecthUserNotificationsSuccess = {
  type: ServerNotificationsTypes.FETCH_USER_NOTIFICATIONS_SUCCESS
  userNotifications: IServerNotificationData
}

export type ReadUserNotificationsSuccess = {
  id: number
  type: ServerNotificationsTypes.READ_USER_NOTIFICATIONS_SUCCESS
}

export type ServerNotificationsActions =
  | FecthUserNotificationsSuccess
  | ReadUserNotificationsSuccess
