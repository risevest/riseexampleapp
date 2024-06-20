import { fetchUserNotification } from 'app/api'
import { useScroller } from 'app/hooks'

export const useNotifications = () => {
  const { status, ...query } = useScroller<IServerNotifications>(
    fetchUserNotification,
    'infiniteNotifications'
  )
  return { ...query, status }
}
