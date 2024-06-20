import instance from 'app/utils/axios'

export async function fetchFirstNotificationList(): Promise<
  IServerNotifications[]
> {
  const resp = await instance.get('/notifications', { params: { $offset: 0 } })
  return resp?.data?.data
}
