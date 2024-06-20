import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'

import { BackIcon } from '../../assets/future/icons'
import { Text } from '../Text'
import { useHeaderStyles } from './styles'
import { ComponentShape, HeaderProps } from './types'

export const Header = ({
  type,
  LeftComponent,
  RightComponent,
  CenterComponent,
  containerStyle,
  space,
  onBackPress
}: HeaderProps) => {
  const { styles } = useHeaderStyles()

  const navigation = useNavigation()

  const handleNavigation = () =>
    onBackPress ? onBackPress() : navigation.goBack?.()

  const getLeftComponent = () => {
    if (LeftComponent && type === 'no-icon') {
      return getComponent(LeftComponent)
    }

    if (LeftComponent && type === 'other-icon') {
      return (
        <TouchableOpacity onPress={handleNavigation}>
          {getComponent(LeftComponent)}
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity onPress={handleNavigation}>
        <BackIcon height={36} width={36} />
      </TouchableOpacity>
    )
  }

  const getRightComponent = () => {
    if (RightComponent) {
      return getComponent(RightComponent)
    }

    return <View style={RIGHT_COMPONENT} />
  }

  const getCenterComponent = () => {
    if (CenterComponent) {
      return getComponent(CenterComponent)
    }
  }

  const getComponent = (Component: React.ComponentType | ComponentShape) => {
    if (typeof Component === 'function') {
      return <Component />
    }

    return (
      <Text textStyle={Component?.style} type="head-1" variant="dark">
        {Component?.text}
      </Text>
    )
  }

  return (
    <View style={[styles.wrapper, containerStyle, space && styles.space]}>
      {getLeftComponent()}
      {getCenterComponent()}
      {getRightComponent()}
    </View>
  )
}

const RIGHT_COMPONENT: ViewStyle = { width: 20 }
