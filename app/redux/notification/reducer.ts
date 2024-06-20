import {
  INotification,
  NotificationActions,
  NotificationTypes,
  SetNotification
} from './types'

export const initialState: INotification = {
  message: '',
  notifType: '',
  showNotif: false,
  title: ''
}

const ACTIONS: any = {
  [NotificationTypes.SHOW_NOTIFICATION]: (
    state: INotification,
    { message, notifType, alertTitle }: SetNotification
  ) => ({
    ...state,
    message,
    notifType,
    showNotif: true,
    title: alertTitle
  }),
  [NotificationTypes.HIDE_NOTIFICATION]: (state: INotification) => ({
    ...state,
    message: '',
    showNotif: false,
    title: ''
  })
}

export const notificationReducer = (
  state = initialState,
  action: NotificationActions
) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
