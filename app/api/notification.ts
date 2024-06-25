import instance from 'app/utils/axios'

export const fetchUserNotification = (
  offset: number
): Promise<NotificationRes> =>
  instance
    .get('/notifications', { params: { $offset: offset } })
    .then((res) => res.data)
