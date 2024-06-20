import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React, { useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Graph from './components/Graph'

interface IAnimatedGraph {
  planType: string
  returnsData: any
}

const useAnimatedGraphStyle = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    activeTabItem: {
      alignItems: 'center',
      backgroundColor: theme.primarySurface,
      borderColor: theme.tabBackground,
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    body: {
      backgroundColor: theme.primaryColor,
      borderRadius: 10,
      flexDirection: 'column',
      width: '100%'
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20
    },
    tabDivider: {
      borderRightColor: theme.lightText,
      borderRightWidth: 2
    },
    tabbarItem: {
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 5
    },
    tabs: {
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 20,
      marginTop: 30
    }
  })

  return { styles, theme }
}

type Duration = Record<string, number>

const durationSeconds: Duration = {
  '1M': 60 * 60 * 24 * 7 * 4 * 1000,
  '1W': 60 * 60 * 24 * 7 * 1000,
  '3M': 60 * 60 * 24 * 7 * 4 * 3 * 1000,
  '6M': 60 * 60 * 24 * 7 * 4 * 6 * 1000
}

const AnimatedGraph = ({ returnsData, planType }: IAnimatedGraph) => {
  const { styles } = useAnimatedGraphStyle()
  // this setState here cause the panresponder to not pick up for a while,
  // should update this with a better implementation
  const [activeTab, setActiveTab] = useState('1M')
  const firstDay = new Date(
    returnsData[returnsData.length - 1].createdAt
  ).getTime()

  interface ReturnsObject {
    balance: number
    createdAt: Date
    return: number
  }

  const transformedData: {
    date: number
    returns: number
    value: number
    value2: number
  }[] = useMemo(
    () =>
      returnsData
        .filter((returnsObject: ReturnsObject) => {
          let seconds = Math.abs(
            firstDay - new Date(returnsObject.createdAt).getTime()
          )
          if (activeTab === 'All') return true
          if (seconds <= durationSeconds[activeTab]) return true

          return false
        })
        .map((returnsObject: ReturnsObject) => ({
          date: new Date(returnsObject.createdAt).getTime(),
          returns: returnsObject.return,
          value: returnsObject.balance,
          value2: returnsObject.balance - returnsObject.return
        })),
    [activeTab, returnsData, firstDay]
  )

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {transformedData.length > 0 && (
          <Graph {...{ graphData: transformedData }} />
        )}
        <View style={styles.tabs}>
          {(planType?.toLowerCase() === 'stocks plan' ||
            planType?.toLowerCase() === 'fixed income plan') && (
            <TouchableOpacity
              onPress={() => setActiveTab('1W')}
              style={[
                activeTab === '1W' ? styles.activeTabItem : styles.tabbarItem
              ]}
            >
              <P
                fontWeight="300"
                text="1W"
                type={activeTab === '1W' ? 'primary' : 'white'}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => setActiveTab('1M')}
            style={[
              activeTab === '1M' ? styles.activeTabItem : styles.tabbarItem
            ]}
          >
            <P
              fontWeight="300"
              text="1M"
              type={activeTab === '1M' ? 'primary' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('3M')}
            style={[
              activeTab === '3M' ? styles.activeTabItem : styles.tabbarItem
            ]}
          >
            <P
              fontWeight="300"
              text="3M"
              type={activeTab === '3M' ? 'primary' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('6M')}
            style={[
              activeTab === '6M' ? styles.activeTabItem : styles.tabbarItem
            ]}
          >
            <P
              fontWeight="300"
              text="6M"
              type={activeTab === '6M' ? 'primary' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('All')}
            style={[
              activeTab === 'All' ? styles.activeTabItem : styles.tabbarItem
            ]}
          >
            <P
              fontWeight="300"
              text="All"
              type={activeTab === 'All' ? 'primary' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AnimatedGraph
