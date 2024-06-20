import React from 'react'
import { Text as RNText } from 'react-native'

import { useTextStyles } from './styles'
import { Props } from './types'

export const Text = ({
  children,
  type,
  textStyle,
  variant,
  ...rest
}: Props) => {
  const { styles } = useTextStyles({ type, variant })

  return (
    <RNText style={[styles.text, { ...(textStyle as object) }]} {...rest}>
      {children}
    </RNText>
  )
}
