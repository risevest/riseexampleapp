import { BellIcon } from 'app/assets/future/icons'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Text } from 'app/future'
import React from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import { AppState } from '../../redux/types'

interface INotificationBell {
  color?: string
  onNavigate: Noop
  userNotifications: IServerNotifications[]
}

const useNotificationBellStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    alert: {
      alignItems: 'center',
      backgroundColor: '#EB5757',
      borderRadius: 20 / 2,
      flexDirection: 'row',
      height: 20,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 20
    },
    bell: {
      alignItems: 'center',
      borderRadius: 42 / 2,
      height: 42,
      justifyContent: 'center',
      width: 42
    },
    wrapper: {
      ...Styles.body
    }
  })

  return { styles, theme }
}

const NotificationBell = ({
  onNavigate,
  userNotifications,
  color
}: INotificationBell) => {
  const { styles } = useNotificationBellStyles()

  const checkForUnreadNotifications = (): number => {
    const numberOfUnreadNotifications = userNotifications?.reduce(
      (acc, currValue) => Number(acc) + Number(currValue?.status === 'unread'),
      0
    )

    return numberOfUnreadNotifications
  }

  const numberOfUnreadNotifications = checkForUnreadNotifications()
  return (
    <TouchableOpacity onPress={onNavigate} style={styles.bell}>
      <BellIcon height={22} iconColor={color} width={20} />
      {numberOfUnreadNotifications > 0 && (
        <View style={styles.alert}>
          <Text
            textStyle={NOTIFICATION_LABEL}
            type="label-12-reg"
            variant="white"
          >
            {numberOfUnreadNotifications > 9 ? 9 : numberOfUnreadNotifications}
          </Text>
          {numberOfUnreadNotifications > 9 && (
            <Text
              textStyle={NOTIFICATION_LABEL}
              type="label-12-reg"
              variant="white"
            >
              +
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

const NOTIFICATION_LABEL: TextStyle = { lineHeight: 15 }

const mapStateToProps = (state: AppState) => ({
  userNotifications: state.serverNotifications.userNotifications.data
})

export default connect(mapStateToProps)(NotificationBell)
