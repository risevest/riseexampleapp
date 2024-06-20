/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import useDashboardTabStyles from 'app/components/DashboardTabs/styles'
import { screenWidth } from 'app/design/responsiveModule'
import { P } from 'app/design/typography'
import { hapticFeedback } from 'app/utils/index'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView
} from 'react-native-tab-view'

interface TabRoute {
  key: string
  title: string
}

interface ComponentProps {
  component: any
  func: any
  key: string
}

interface TabsProps {
  getCurrentRoute?: (currentRoute: TabRoute) => void
  getIndex?: (index: number) => void
  tabComponents: ComponentProps[]
  tabRoutes: TabRoute[]
  useSceneMap?: boolean
}

type SceneObject = Record<string, any>

const Tabs = ({
  tabRoutes,
  tabComponents,
  getCurrentRoute,
  getIndex,
  useSceneMap = false
}: TabsProps) => {
  const initialLayout = { height: 20, width: screenWidth }
  const { theme, styles } = useDashboardTabStyles()

  const [index, setIndex] = useState(0)
  const [routes] = useState(tabRoutes)

  const createSceneMap = () => {
    let sceneObj: SceneObject = {}
    for (let i = 0; i < tabComponents.length; i += 1) {
      sceneObj[tabComponents[i].key] = tabComponents[i].func
    }
    return sceneObj
  }

  interface RenderSceneProps {
    route: TabRoute
  }

  const renderScene = ({ route }: RenderSceneProps) => {
    switch (route.key) {
      case route.key: {
        const FoundComponent = tabComponents.find(
          (component) => component.key === route.key
        )
        return FoundComponent?.component
      }
      default:
        return null
    }
  }

  const sceneMap = SceneMap(createSceneMap())

  const getRoute = () => {
    getCurrentRoute && getCurrentRoute(routes[index])
    getIndex && getIndex(index)
  }

  useEffect(() => {
    getRoute()
  }, [index])

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<TabRoute>
    }
  ) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: TabRoute, i: number) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              hapticFeedback()
              setIndex(i)
            }}
            style={[
              index === i ? styles.activeTabItem : styles.tabbarItem,
              index === 0 && i === 1 && styles.tabDivider,
              index === 2 && i === 0 && styles.tabDivider
            ]}
          >
            <P
              fontsize={13}
              fontWeight="400"
              style={{
                color: index === i ? theme.primaryColor : theme.tertiaryColor
              }}
              text={route.title}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <TabView
      initialLayout={initialLayout}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={useSceneMap ? sceneMap : renderScene}
      renderTabBar={renderTabBar}
    />
  )
}

export default Tabs
