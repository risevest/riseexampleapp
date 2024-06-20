import { P } from 'app/design/typography'
import { readUserNotificationsDispatcher } from 'app/redux/server-notifications/dispatcher'
import { useGetStatusStyles } from 'app/utils'
import { logEvent } from 'app/utils/analytics'
import { formatPlanValue } from 'app/utils/numberformatter'
import moment from 'moment'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux'

import { useGetNotificationImage } from './hooks'
import { useNotificationItemStyles } from './styles'

type INotificationItemProp = {
  handleNavigation: (
    target: string,
    targetId: number | null,
    targetUrl: string | null
  ) => Promise<any>
  item: IServerNotifications
}

const IMAGE_NOTIFICATIONS = ['plan-matured', 'plan-will-mature', 'new-feed']

const NotificationItem = ({
  item: {
    title,
    id,
    type,
    image,
    createdAt,
    content,
    buttonText,
    amount,
    targetType,
    targetId,
    targetUrl,
    status
  },
  handleNavigation
}: INotificationItemProp) => {
  const dispatch = useDispatch()
  const statusStyles = useGetStatusStyles(type)
  const { styles, theme } = useNotificationItemStyles()
  const [loading, setLoading] = React.useState(false)

  const notificationImage = useGetNotificationImage(targetType, title, image)

  useEffect(() => {
    if (status === 'unread') {
      dispatch(readUserNotificationsDispatcher(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View
      key={id}
      style={status === 'unread' ? styles.unreadCard : styles.container}
    >
      {status === 'unread' && <View style={styles.unread} />}
      <View style={styles.titleWrapper}>
        <View style={styles.titleIcon}>
          {IMAGE_NOTIFICATIONS.includes(type) ? (
            <View style={IMAGE_CONTAINER}>
              <Image source={notificationImage} style={styles.iconImage} />
            </View>
          ) : (
            <View
              style={[
                styles.iconView,
                {
                  backgroundColor:
                    statusStyles.iconBGColor || theme.primaryColor
                }
              ]}
            >
              <Ionicons
                color={statusStyles.iconColor || theme.error}
                name={statusStyles.iconName || 'remove'}
                size={25}
              />
            </View>
          )}
        </View>
        <View style={styles.titleContent}>
          <P
            fontsize={14}
            fontWeight="400"
            style={styles.title}
            text={title}
            type="dark"
          />
          <View style={styles.titleDivider}>
            <View style={styles.dot} />
          </View>
          <P
            fontsize={13}
            fontWeight="300"
            style={{
              ...styles.date
              // ...(status === 'unread' && { width: 80 })
            }}
            text={moment(createdAt).startOf('second').fromNow()}
          />
        </View>
      </View>
      {IMAGE_NOTIFICATIONS.includes(type) ? (
        <View>
          <Image
            height={100}
            source={notificationImage}
            style={[styles.imageContent, IMAGE]}
          />
        </View>
      ) : (
        <View
          style={[styles.image, { backgroundColor: statusStyles.iconBGColor }]}
        >
          <P
            fontsize={20}
            style={{ ...styles.postTitle, color: statusStyles.iconColor }}
            text={`${statusStyles.arithmeticSign} ${formatPlanValue(
              amount,
              true,
              targetType === 'ExchangeRate' ? '₦' : '$'
            )}`}
          />
        </View>
      )}
      <P
        fontsize={15}
        fontWeight="400"
        style={styles.postContent}
        text={content}
        type="dark"
      />
      <TouchableOpacity
        disabled={loading}
        onPress={async () => {
          logEvent('read_notification', {
            notification_category: type,
            origin_screen_name: 'Notiifcations'
          })
          try {
            setLoading(true)
            await handleNavigation(targetType, targetId, targetUrl)
          } finally {
            setLoading(false)
          }
        }}
        style={styles.action}
      >
        <P
          fontsize={13}
          style={{ color: theme.primaryColor }}
          text={loading ? <ActivityIndicator size="small" /> : buttonText}
        />
      </TouchableOpacity>
    </View>
  )
}

const IMAGE_CONTAINER: ViewStyle = { marginRight: 5 }
const IMAGE: ImageStyle = { width: '100%' }

export default NotificationItem
