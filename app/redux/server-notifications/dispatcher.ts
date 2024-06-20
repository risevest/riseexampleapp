import { fetchUserNotification } from 'app/api'
import instance from 'app/utils/axios'

import {
  fetchUserNotificationsActionsSuccess,
  readUserNotificationsActionSuccess
} from './actionCreators'
import { ServerNotificationsTypes as SNTs } from './types'

export const fetchUserNotificationsDispatcher = (offset: number) => {
  return (dispatch: any) => {
    dispatch({ type: SNTs.FETCH_USER_NOTIFICATIONS_REQUEST })
    return fetchUserNotification(offset)
      .then((data) => {
        dispatch(fetchUserNotificationsActionsSuccess(data))
        return {
          data: data,
          requestStatus: 'success'
        }
      })
      .catch(() => {
        // dispatch(setError('Notification error', error));
        dispatch({ type: SNTs.FETCH_USER_NOTIFICATIONS_ERROR })
      })
  }
}

export const readUserNotificationsDispatcher = (id: number) => {
  return (dispatch: any) => {
    dispatch({ type: SNTs.READ_USER_NOTIFICATIONS_REQUEST })
    return instance
      .put('/notifications', { ids: `${id}` })
      .then((response) => {
        if (response.status === 200) {
          dispatch(readUserNotificationsActionSuccess(id))
          dispatch(fetchUserNotificationsDispatcher(0))
        }
      })
      .catch(() => {
        dispatch({ type: SNTs.READ_USER_NOTIFICATIONS_ERROR })
      })
  }
}
