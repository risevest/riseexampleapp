import React from 'react'
export interface DataProps {
  Icon: React.ReactNode
  body: string
  name?: string
  onPress: () => void
  position: 'relative' | 'absolute'
  style?: any
  title: string
  type: 'regular' | 'challenge'
}
