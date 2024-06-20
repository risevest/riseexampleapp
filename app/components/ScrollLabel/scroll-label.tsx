import DownArrow from 'app/assets/icons/svg/down-arrow.svg'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { ScrollLabelProps } from './types'

const useLabelStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.primaryColor,
      borderRadius: 20,
      bottom: 40,
      elevation: 3,
      flexDirection: 'row',
      height: 30,
      position: 'absolute',
      shadowColor: 'rgba(8, 152, 160, 0.5)',
      shadowOffset: {
        height: 5,
        width: 3
      },
      shadowOpacity: 0.7,
      shadowRadius: 10,
      zIndex: 30
    }
  })

  return { styles, theme }
}

export const ScrollLabel = ({ scrollRef }: ScrollLabelProps) => {
  const { styles } = useLabelStyles()
  return (
    <TouchableOpacity
      onPress={() => {
        scrollRef.current?.scrollToEnd({
          animated: true
        })
      }}
      style={styles.wrapper}
    >
      <Animatable.View
        animation="zoomIn"
        style={PAGINATION_HIGHLIGHTER}
        useNativeDriver
      >
        <DownArrow style={ARROW_ICON} />
        <P fontsize={13} fontWeight="400" text="Scroll For More" type="white" />
      </Animatable.View>
    </TouchableOpacity>
  )
}

const PAGINATION_HIGHLIGHTER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: 15
}

const ARROW_ICON: ViewStyle = { marginRight: 10 }
