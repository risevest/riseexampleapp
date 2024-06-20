/* eslint-disable react-hooks/exhaustive-deps */
import { GreyArrow } from 'app/assets/future/icons'
import { getComputedHeight } from 'app/design/responsiveModule'
import * as React from 'react'
import {
  Animated,
  FlatList,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { Text } from '../Text/index'
import { useDropdownStyles } from './styles'
import { Props } from './types'

export const Dropdown = ({ value, label, items, getSelectedItem }: Props) => {
  const [option, setOption] = React.useState('')
  const [animatedValue] = React.useState(new Animated.Value(0))
  const [isDropdownOpen, setDropDown] = React.useState(false)
  const { styles, theme } = useDropdownStyles()

  React.useEffect(() => {
    setOption(value)
  }, [])

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 500,
      toValue: option !== '' ? 1 : 0,
      useNativeDriver: true
    }).start()
  }, [animatedValue, option])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -15]
  })

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -12]
  })

  const scaleX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 0.75]
  })

  const scaleY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 0.75]
  })

  const labelStyle: Animated.AnimatedProps<StyleProp<ViewStyle>> = {
    backgroundColor: option !== '' ? 'rgba(255,255,255, 1)' : 'transparent',
    left: 0,
    position: 'absolute',
    transform: [{ translateX }, { translateY }, { scaleY }, { scaleX }],
    zIndex: option !== '' ? 10 : 0
  }

  const LABEL_STYLE_2: TextStyle = {
    color: option ? theme.primaryColor : '#333333'
  }

  const LABEL_CONTAINER: ViewStyle = { marginVertical: 15 }

  return (
    <View style={styles.container}>
      <Animated.View style={[labelStyle]}>
        <Text textStyle={LABEL_STYLE_2} type="reg-17-main" variant="dark">
          {label}
        </Text>
      </Animated.View>
      <TouchableOpacity
        onPress={() => setDropDown(!isDropdownOpen)}
        style={styles.dropDownPicker}
      >
        <Text type="reg-17-main" variant="dark">
          {option}
        </Text>
        <GreyArrow height={15} width={15} />
      </TouchableOpacity>
      {isDropdownOpen && (
        <FlatList
          data={items}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setOption(item.value)
                getSelectedItem?.(item.value)
                setDropDown(false)
              }}
              style={LABEL_CONTAINER}
            >
              <Text type="reg-17-main" variant="dark">
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          style={[styles.dropDown, { height: getComputedHeight(200) }]}
        />
      )}
    </View>
  )
}
