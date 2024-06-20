import { ServerNotificationsTypes as SNTs } from './types'

export const fetchUserNotificationsActionsSuccess = (
  userNotifications: IServerNotificationData
) => ({
  type: SNTs.FETCH_USER_NOTIFICATIONS_SUCCESS,
  userNotifications
})

export const readUserNotificationsActionSuccess = (id: number) => ({
  id,
  type: SNTs.READ_USER_NOTIFICATIONS_SUCCESS
})
