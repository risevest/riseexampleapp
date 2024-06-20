import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React from 'react'
import { Platform, StyleSheet, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

interface IGraphHeader {
  date: Animated.SharedValue<string>
  investments: Animated.SharedValue<string>
  price: Animated.SharedValue<string>
  returns: Animated.SharedValue<string>
}
const useGraphHeaderStyle = () => {
  const theme = useTheme() as UseTheme
  const styles = StyleSheet.create({
    body: {
      fontFamily: 'DMSans-Medium'
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20
    },
    dot: {
      borderRadius: 5,
      height: 10,
      marginBottom: 2,
      marginHorizontal: 6,
      width: 10
    },
    dot2: {
      borderRadius: 3 / 2,
      height: 3,
      marginHorizontal: 3,
      width: 3
    },
    hero: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 5
    },
    label: {
      color: '#fff',
      fontSize: getComputedHeight(13),
      fontWeight: '300',
      lineHeight: 13,
      padding: 0,
      width: 53,
      ...(Platform.OS === 'ios' && {
        fontSize: 11
      })
    },
    performance: {
      color: '#fff',
      fontSize: getComputedWidth(25),
      marginTop: 10,
      padding: 0,
      textAlign: 'center',
      width: '100%'
    },
    text: {
      fontFamily: 'TomatoGrotesk-Regular'
    },
    time: {
      color: '#fff',
      fontSize: 13,
      lineHeight: 18,
      padding: 0,
      textAlign: 'center',
      width: '100%'
    },
    title: {
      lineHeight: 15,
      marginBottom: 3,
      ...(Platform.OS === 'ios' && { fontSize: 11 })
    }
  })
  return { styles, theme }
}

export default function GraphHeader({
  date,
  price,
  investments,
  returns
}: IGraphHeader) {
  const { styles } = useGraphHeaderStyle()
  return (
    <View>
      <View style={styles.content}>
        <ReText style={[styles.body, styles.performance]} text={price} />
        <ReText style={[styles.body, styles.time]} text={date} />

        <View style={styles.hero}>
          <View style={HERO_CONTAINER}>
            <View style={[styles.dot, createDotColorStyle('#fff')]} />
            <P
              fontsize={13}
              fontWeight="300"
              style={styles.title}
              text="Investments"
              type="white"
            />
            <View style={[styles.dot2, createDotColorStyle('#fff')]} />
            <ReText style={[styles.text, styles.label]} text={investments} />
          </View>

          <View style={RETURNS_TEXT_CONTAINER}>
            <View style={[styles.dot, createDotColorStyle('#22D8E2')]} />

            <P
              fontsize={13}
              fontWeight="300"
              style={styles.title}
              text="Returns"
              type="white"
            />
            <View style={[styles.dot2, createDotColorStyle('#fff')]} />
            <ReText style={[styles.text, styles.label, {}]} text={returns} />
          </View>
        </View>
      </View>
    </View>
  )
}

function createDotColorStyle(color: string): ViewStyle {
  return {
    backgroundColor: color
  }
}

const HERO_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  marginRight: 5
}

const RETURNS_TEXT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row'
}
