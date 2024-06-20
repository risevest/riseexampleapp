import { getComputedHeight } from 'app/design/responsiveModule'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { StyleSheet } from 'react-native'

export const useNotificationItemStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    action: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'rgba(230, 245, 246, 1)',
      borderRadius: 8,
      flexDirection: 'row',
      height: getComputedHeight(31),
      justifyContent: 'center',
      marginBottom: 5,
      paddingHorizontal: 25
    },
    container: {
      backgroundColor: theme.grey05,
      borderRadius: 8,
      marginBottom: 20,
      maxWidth: 600,
      padding: 20,
      width: '100%'
    },
    date: {
      opacity: 0.5,
      paddingVertical: 5
      // width: 80,
    },
    dot: {
      backgroundColor: theme.black900,
      borderRadius: 3,
      height: 6,
      width: 6
    },
    iconImage: {
      borderRadius: 33 / 2,
      height: 33,
      overflow: 'hidden',
      width: 33
    },
    iconView: {
      alignItems: 'center',

      // backgroundColor: statusStyles.iconBGColor,
      borderRadius: 33 / 2,

      height: 33,
      justifyContent: 'center',
      marginRight: 15,
      width: 33
    },
    image: {
      alignItems: 'center',
      borderRadius: 10,
      display: 'flex',
      height: 'auto',
      justifyContent: 'center',
      marginTop: 20,
      minHeight: 60
    },
    imageContent: {
      // resizeMode: 'contain',
      borderRadius: 10,
      height: undefined,
      marginTop: 25,
      width: undefined
    },
    postContent: {
      lineHeight: 20,
      marginVertical: 20
    },
    postTitle: {
      // fontSize: 17,
      fontWeight: '600'
    },
    title: {
      marginRight: 10,
      paddingVertical: 5
    },
    titleContent: {
      alignItems: 'center',

      display: 'flex',

      flexDirection: 'row',
      // width: '90%',
      flexWrap: 'wrap'
    },
    titleDivider: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      marginRight: 10
    },
    titleIcon: {
      marginRight: 5
    },
    titleWrapper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    unread: {
      backgroundColor: theme.warning,
      borderRadius: 8 / 2,
      height: 8,
      marginLeft: 'auto',
      position: 'absolute',
      right: 15,
      top: 15,
      width: 8
    },
    unreadCard: {
      backgroundColor: theme.primarySurface,
      borderRadius: 8,
      elevation: 3,
      marginBottom: 20,
      maxWidth: 600,
      padding: 20,
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: {
        height: 3,
        width: 3
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      width: '100%'
    },
    wrapper: {
      ...Styles.body
    }
  })

  return { styles, theme }
}
