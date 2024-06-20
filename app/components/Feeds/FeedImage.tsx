import React from 'react'
import FastImage from 'react-native-fast-image'

import styles from './styles'
import { Props } from './types'

export const FeedImage = ({ node, children }: Partial<Props>) => {
  return (
    <>
      {/* make this behave like medium, allow the image be clickable and open a zoomable panel */}
      <FastImage
        resizeMode="stretch"
        source={{ uri: node?.url }}
        style={styles.image}
      />
      {children}
    </>
  )
}
