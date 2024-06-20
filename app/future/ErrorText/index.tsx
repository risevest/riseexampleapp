import { useTheme } from 'app/design/theme'
import React from 'react'

import { Text } from '../Text'

export interface ErrorTextProps {
  text?: string
  touched?: boolean
}

export function ErrorText({ text, touched }: ErrorTextProps) {
  const { theme } = useTheme()

  const TEXT = { color: theme.error, marginTop: 5 }

  return (
    <>
      {text && touched && (
        <Text textStyle={TEXT} type="button-14-medium" variant="danger">
          {text}
        </Text>
      )}
    </>
  )
}
