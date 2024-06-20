import { StyleSheet } from 'react-native'

import { getComputedWidth } from '../../design/responsiveModule'
import { UseTheme, useTheme } from '../../design/theme'

const useDashboardTabsStyle = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    activeTabItem: {
      alignItems: 'center',
      backgroundColor: theme.primarySurface,
      borderColor: theme.tabBackground,
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
      padding: 10
    },
    buildWealthImage: {
      borderRadius: 10,
      height: getComputedWidth(120),
      marginBottom: 7,
      width: '100%'
    },
    buildWealthSection: {
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 12,
      marginTop: 4,
      position: 'absolute',
      right: 12
    },
    diamond: {
      marginRight: 13
    },
    emptyPlanWrapper: {
      alignItems: 'center',
      backgroundColor: theme.secondaryColor,
      borderRadius: 10,
      flexDirection: 'row',
      height: getComputedWidth(120),
      justifyContent: 'center',
      marginTop: 20
    },
    emptyPlans: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 26
    },
    explorePlans: {
      alignItems: 'center',
      backgroundColor: 'rgba(131, 143, 145, 0.05)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 31,
      justifyContent: 'center',
      marginTop: 14,
      width: 154
    },
    icon: {
      alignItems: 'center',
      backgroundColor: theme.secondaryColor,
      borderRadius: 23 / 2,
      height: 23,
      justifyContent: 'center',
      left: 13,
      position: 'absolute',
      top: 13,
      width: 23,
      zIndex: 5
    },
    imageView: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    planImageContainer: {
      backgroundColor: theme.secondaryColor,
      borderRadius: 8,
      height: 101,
      overflow: 'hidden'
    },
    planText: {
      marginBottom: 4,
      marginTop: 9
    },
    searchIcon: {
      color: theme.primaryColor,
      marginRight: 20,
      marginTop: 3
    },
    tabBar: {
      backgroundColor: theme.tabBackground,
      borderRadius: 8,
      flexDirection: 'row',
      marginTop: 23
    },
    tabDivider: {
      borderRightColor: theme.lightText,
      borderRightWidth: 2
    },
    tabbarItem: {
      alignItems: 'center',
      flex: 1,
      margin: 10
    },
    walletView: {
      alignItems: 'center',
      backgroundColor: theme.primaryColor,
      borderRadius: 10,
      flexDirection: 'row',
      height: getComputedWidth(120),
      justifyContent: 'space-between',
      marginTop: 25,
      paddingHorizontal: 15
    }
  })

  return { styles, theme }
}

export default useDashboardTabsStyle
