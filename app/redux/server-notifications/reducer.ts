import {
  FecthUserNotificationsSuccess,
  ReadUserNotificationsSuccess,
  ServerNotificationsActions,
  ServerNotificationsTypes as SNTs
} from './types'

export type ServerNotificationsState = {
  requestStatus: RequestStatus
  userNotifications: IServerNotificationData
}

export const initialState: ServerNotificationsState = {
  requestStatus: 'idle',
  userNotifications: {
    data: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0
    }
  }
}

const ACTIONS: any = {
  [SNTs.FETCH_USER_NOTIFICATIONS_REQUEST]: (
    state: ServerNotificationsState
  ) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [SNTs.FETCH_USER_NOTIFICATIONS_SUCCESS]: (
    state: ServerNotificationsState,
    { userNotifications }: FecthUserNotificationsSuccess
  ) => {
    let paginatedNotifications = []
    if (userNotifications.meta.offset === 0) {
      paginatedNotifications = userNotifications.data
    } else {
      paginatedNotifications = [
        ...state.userNotifications.data,
        ...userNotifications.data
      ]
    }

    return {
      ...state,
      requestStatus: 'success',
      userNotifications: {
        data: paginatedNotifications,
        meta: userNotifications.meta
      }
    }
  },
  [SNTs.FETCH_USER_NOTIFICATIONS_ERROR]: (state: ServerNotificationsState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [SNTs.READ_USER_NOTIFICATIONS_SUCCESS]: (
    state: ServerNotificationsState,
    { id }: ReadUserNotificationsSuccess
  ) => {
    const notifications = state.userNotifications.data.map((notifs) => {
      if (notifs.id === id) {
        return {
          ...notifs,
          status: 'read'
        }
      }
      return notifs
    })
    return {
      ...state,
      userNotifications: {
        ...state.userNotifications,
        data: notifications
      }
    }
  }
}

export const serverNotificationsReducer = (
  state = initialState,
  action: ServerNotificationsActions
) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
