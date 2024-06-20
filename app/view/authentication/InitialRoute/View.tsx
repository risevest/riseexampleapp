import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { UseTheme, useTheme } from '../../../design/theme'
import { useInitialRouteStyles } from './styles'

const InitialAuthRoute = () => {
  const { theme } = useTheme() as UseTheme
  const styles = useInitialRouteStyles()
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.primaryColor} size="large" />
    </View>
  )
}

export default InitialAuthRoute
