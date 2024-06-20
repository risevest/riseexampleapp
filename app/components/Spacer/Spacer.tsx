import React from 'react'
import { View, ViewStyle } from 'react-native'

import { Spacing, spacing } from '../../design/spacing'

interface SpacerProps {
  children?: React.ReactNode
  preset?: Spacing
  space?: number
  vertical?: boolean
}

export const Spacer = ({ space, vertical, preset, children }: SpacerProps) => {
  const CONTAINER: ViewStyle = {
    marginHorizontal: vertical ? 0 : (preset && spacing[preset]) || space,
    marginVertical: vertical ? (preset && spacing[preset]) || space : 0
  }

  return <View style={CONTAINER}>{children}</View>
}
