import React from 'react'
import { TouchableHighlight, View, ViewStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { Text } from '../Text'
import useDurationCardStyles from './styles'

const DurationCard = ({ tenure, activeDuration, onPress, cardIndex }: any) => {
  const { styles } = useDurationCardStyles()

  const isSelected = (_tenure: string) => _tenure === activeDuration

  const getAnimationType = () => {
    let animation: string
    switch (cardIndex) {
      case 0:
        animation = 'slideInLeft'
        break
      case 2:
        animation = 'slideInRight'
        break
      default:
        animation = 'zoomIn'
        break
    }
    return animation
  }

  return (
    <Animatable.View
      animation={getAnimationType()}
      duration={850}
      useNativeDriver
    >
      <TouchableHighlight
        onPress={onPress}
        style={[styles.container, isSelected(tenure) && styles.activeCard]}
      >
        <View style={TEXT_CONTAINER}>
          <Text
            type="head-2"
            variant={isSelected(tenure) ? 'white' : 'soft-tect'}
          >
            {tenure}
          </Text>
          <Text
            type="reg-15-soft"
            variant={isSelected(tenure) ? 'white' : 'soft-tect'}
          >
            months
          </Text>
        </View>
      </TouchableHighlight>
    </Animatable.View>
  )
}

const TEXT_CONTAINER: ViewStyle = { alignItems: 'center' }

export default DurationCard
