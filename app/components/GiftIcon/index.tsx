import DarkGreenGift from 'app/assets/icons/svg/dark-green-gift.svg'
import LightGreenGift from 'app/assets/icons/svg/light-green-gift.svg'
import RedGift from 'app/assets/icons/svg/red-gift.svg'
import { screenWidth } from 'app/design/responsiveModule'
import { UseTheme, useTheme } from 'app/design/theme'
import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'

type IGiftIcon = {
  leftRightOffset: number
}

const useGiftIconStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    absoluteIcons: {
      opacity: 0.8,
      position: 'absolute',
      right: screenWidth / 2 - 35,
      shadowOffset: {
        height: 8,
        width: 5
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      top: 5
      // elevation: 3
    },
    redIcon: {
      alignSelf: 'center',
      shadowColor: 'rgba(188, 16, 88, 0.25)',
      shadowOffset: {
        height: 8,
        width: 5
      },
      shadowOpacity: 1,
      shadowRadius: 10
      // elevation: 3
    }
  })

  return { styles, theme }
}

const GiftIcon = ({ leftRightOffset }: IGiftIcon) => {
  const { styles } = useGiftIconStyles()

  const ICON: ViewStyle = {
    right: screenWidth / 2 - leftRightOffset,
    shadowColor: 'rgba(124, 178, 133, 0.25)'
  }

  const ICON_2: ViewStyle = {
    left: screenWidth / 2 - leftRightOffset,
    shadowColor: 'rgba(8, 152, 160, 0.25)'
  }

  return (
    <Animatable.View animation="zoomInUp" style={CONTAINER}>
      <View style={CONTAINER_2}>
        <LightGreenGift style={[styles.absoluteIcons, ICON]} />
        <DarkGreenGift style={[styles.absoluteIcons, ICON_2]} />
      </View>
      <RedGift style={styles.redIcon} />
    </Animatable.View>
  )
}

const CONTAINER: ViewStyle = { marginTop: 35 }

const CONTAINER_2: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center'
}

export default GiftIcon
