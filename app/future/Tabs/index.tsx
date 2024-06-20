import { getComputedWidth } from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import * as React from 'react'
import { useWindowDimensions, ViewStyle } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'

import { RouteComponent, TabT } from './types'

function renderTabBar(props: any, disableTabPress?: boolean) {
  const leftWidth = Number(
    Number(props.layout.width / props.navigationState.routes.length).toFixed(0)
  )

  const INDICATOR_STYLE: ViewStyle = {
    backgroundColor: '#0898A0',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    height: 3,
    left: leftWidth / 2 - 41 / 2,
    width: 41
  }

  return (
    <TabBar
      {...props}
      activeColor="#0898A0"
      inactiveColor="#71879c"
      indicatorStyle={INDICATOR_STYLE}
      labelStyle={LABEL_STYLE}
      onTabPress={({ preventDefault }) => {
        disableTabPress && preventDefault()
      }}
      style={TAB_BAR_STYLE}
    />
  )
}

const TAB_BAR_STYLE: ViewStyle = {
  backgroundColor: '#fff',
  ...shadow(0, 2, 20, 'rgba(53, 71, 89, 0.15)', 1)
}

const LABEL_STYLE = {
  fontFamily: 'TomatoGrotesk-Medium',
  fontSize: getComputedWidth(15),
  fontWeight: '700',
  textAlign: 'center',
  textTransform: 'capitalize'
}

export function Tab({
  routes,
  components,
  getCurrentIndex,
  customIndex = 0,
  swipeEnabled,
  disableTabPress
}: TabT) {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(customIndex)
  const [tabRoutes] = React.useState(routes)

  const renderScene = ({ route, jumpTo }: any) => {
    switch (route.key) {
      case route.key: {
        const Component: RouteComponent | undefined = components.find(
          (component) => component.key === route.key
        )
        return React.cloneElement((Component as RouteComponent)?.component, {
          jumpTo
        })
      }
      default:
        return null
    }
  }

  React.useEffect(() => {
    getCurrentIndex(index)
  }, [getCurrentIndex, index])

  return (
    <TabView
      initialLayout={{ width: layout.width }}
      navigationState={{ index, routes: tabRoutes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderTabBar={(props) => renderTabBar(props, disableTabPress)}
      swipeEnabled={swipeEnabled}
    />
  )
}
