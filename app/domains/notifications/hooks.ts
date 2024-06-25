import { useQuery } from '@tanstack/react-query'

import { fetchFirstNotificationList } from './api'

const empty = [] as const
export function useFetchFirstNotificationList() {
  const { data: firstNotificationList, ...query } = useQuery<
    IServerNotifications[]
  >('firstNotificationList', {
    queryFn: fetchFirstNotificationList
  })

  return {
    firstNotificationList: firstNotificationList || empty,
    ...query
  }
}
