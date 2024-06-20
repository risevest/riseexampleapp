import { HomeScreenProps } from 'app/view/App/Dashboard/types'
import React from 'react'
import { View } from 'react-native'

import { Tabs } from '../'
import BuildWealthTab from './BuildWealthTab'
import WalletTab from './WalletTab'

const DashboardTabs = (tabProps: HomeScreenProps) => {
  return (
    <View style={CONTAINER}>
      <Tabs
        getIndex={tabProps.getIndex}
        tabComponents={[
          {
            component: <BuildWealthTab {...tabProps} />,
            func: BuildWealthTab,
            key: 'buildWealth'
          },
          {
            component: <WalletTab {...tabProps} />,
            func: WalletTab,
            key: 'wallet'
          }
          // {
          //   key: 'otherPlans',
          //   component: <OtherPlans {...tabProps} />,
          //   func: OtherPlans,
          // },
        ]}
        tabRoutes={[
          { key: 'buildWealth', title: 'Build Wealth' },
          { key: 'wallet', title: 'Wallet' }
          // { key: 'otherPlans', title: 'Other Plans' },
        ]}
      />
    </View>
  )
}

const CONTAINER = { paddingHorizontal: 20 }

export default DashboardTabs
