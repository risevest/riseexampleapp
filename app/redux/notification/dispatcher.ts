import { toastMethods } from 'app/components/toast'

import { hideNotification } from './actionCreators'
import { NotificationType } from './types'

export const hideNotificationDispatcher = () => {
  return (dispatch: any) => {
    dispatch(hideNotification())
  }
}

export const showNotificationDispatcher = (
  alertTitle: string,
  message: string,
  notifType: NotificationType
) => {
  toastMethods.show({
    props: {
      contentProps: {
        description: message,
        title: alertTitle
      },
      type: notifType === 'error' ? notifType : 'info'
    },
    type: 'alert'
  })
}
