import { Box, Text } from '@risemaxi/sarcelle'
import { ErrorIcon } from 'app/assets/future/icons/ErrorIcon'
import { NewButton as Button } from 'app/components'
import { extractErrorMessage } from 'app/utils/utilFunctions'
import React from 'react'
import { TextStyle, ViewStyle } from 'react-native'

import { RetryProps } from './types'

export const Retry = ({
  text,
  error,
  onRetry,
  containerStyle,
  buttonText
}: RetryProps) => {
  if (error && !text) {
    text = extractErrorMessage(error)
  }

  return (
    <Box style={[WRAPPER, containerStyle]}>
      <ErrorIcon height={52} width={50} />
      <Text color="soft-tect" style={ERROR_TEXT} variant="body-13-regular">
        {text}
      </Text>
      <Button
        onPress={onRetry}
        preset="secondary"
        style={BUTTON_CONTAINER}
        text={buttonText ?? 'Tap to retry'}
      />
    </Box>
  )
}

const BUTTON_CONTAINER: ViewStyle = {
  marginTop: 9
}
const ERROR_TEXT: TextStyle = {
  marginTop: 5
}

const WRAPPER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
}
