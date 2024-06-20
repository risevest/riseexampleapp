import React from 'react'
import { Text } from 'react-native'

import styles from './styles'
import { Props } from './types'

export const FeedUnorderedList = ({ children }: Props) => {
  if (Array.isArray(children)) {
    return (
      <Text style={styles.text}>
        {children.map((child, index) => {
          return (
            <Text key={index}>
              <>
                {'\u2022  '}
                {child}
                {index !== children.length - 1 && '\n'}
              </>
            </Text>
          )
        })}
      </Text>
    )
  }

  return (
    <Text style={styles.text}>
      {'\u2022'}
      {children}
    </Text>
  )
}

export const OrderedList = ({ children }: Props) => {
  if (Array.isArray(children)) {
    return (
      <Text style={styles.text}>
        {children.map((child, index) => {
          return (
            <Text key={index}>
              <>
                {index + 1 + '.  '}
                {child}
                {/* specially handle last item */}
                {index !== children.length - 1 && '\n'}
              </>
            </Text>
          )
        })}
      </Text>
    )
  }

  return (
    <Text style={styles.text}>
      {'\u2022'}
      {children}
    </Text>
  )
}
