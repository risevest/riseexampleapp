/* eslint-disable react/no-unstable-nested-components */
import {
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Icon from 'app/assets/icons'
import { IconName } from 'app/assets/icons/types'
import { selectUserAvatar } from 'app/redux/user/selector'
import * as React from 'react'
import { ImageStyle } from 'react-native'
import { useSelector } from 'react-redux'
import { CustomTabBar } from './custom-bottom-tabs'
import { BottomTabParamsList } from './types/bottom-stack'
import HomePage from '../home'

const Tab = createBottomTabNavigator<BottomTabParamsList>()

function TabBar(props: BottomTabBarProps) {
  return <CustomTabBar {...props} />
}
const ICON_WIDTH = 32

interface BottomTabData {
  activeIcon: IconName
  component: () => JSX.Element
  icon: IconName
  name: keyof BottomTabParamsList
  tabBarLabel: string
}

const BOTTOM_TABS: BottomTabData[] = [
  {
    activeIcon: 'home-active-icon',
    component: HomePage,
    icon: 'home-icon',
    name: 'Dashboard',
    tabBarLabel: 'Home'
  },
  {
    activeIcon: 'plans-active-icon',
    component: HomePage,
    icon: 'plans-icon',
    name: 'PlansStack',
    tabBarLabel: 'Plans'
  },
  {
    activeIcon: 'wallet-active-icon',
    component: HomePage,
    icon: 'wallet-icon',
    name: 'FutureWalletStack',
    tabBarLabel: 'Wallet'
  },
  {
    activeIcon: 'feeds-active-icon',
    component: HomePage,
    icon: 'feeds-icon',
    name: 'Feed',
    tabBarLabel: 'Feed'
  }
]

function BottomTabs() {
  const avatar = useSelector(selectUserAvatar)
  return (
    <Tab.Navigator
      initialRouteName={__DEV__ ? 'FutureWalletStack' : 'Dashboard'}
      screenOptions={{ headerShown: false }}
      tabBar={TabBar}
    >
      {BOTTOM_TABS.map((tab) => (
        <Tab.Screen
          component={tab.component}
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon
                color={color}
                name={focused ? tab.activeIcon : tab.icon}
                size={ICON_WIDTH}
              />
            ),
            tabBarLabel: tab.tabBarLabel
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomTabs

const PROFILE_IMAGE: ImageStyle = {
  borderRadius: ICON_WIDTH / 2,
  height: '100%',
  width: '100%'
}
