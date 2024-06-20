import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import constants from 'app/config/constants'
import { getComputedHeight, getComputedWidth } from 'app/design'
import { queryClient } from 'app/rq'
import React from 'react'
import { ScrollView, ViewStyle } from 'react-native'
import RNRestart from 'react-native-restart'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '../button/new-button'

/**
 * Restarts the app on press
 */
const handleRestart = () => {
  queryClient.clear()
  RNRestart.Restart()
}

/**
 * Fallback Screen for ErrorBoundary, this screen is displayed when the app crashes
 * due to an error in our component tree.
 */
export function DefaultFallBack(props: {
  handleRetry: Noop
  retryCount: number
}) {
  const insets = useSafeAreaInsets()
  const shouldRetry = props.retryCount <= constants.ERROR_RETRY_COUNT

  return (
    <Box bg="background" flex={1} px="l">
      <Box>
        <Box
          alignItems="center"
          marginBottom={27}
          marginTop={getComputedHeight(120) + insets.top}
        >
          <Icon name="rise-logo-error" size={getComputedWidth(80)} />
        </Box>
        <Box marginBottom={10}>
          <Text textAlign="center" variant="header-h3-18-reg">
            {`Oops! That's Odd`}
          </Text>
        </Box>
        <Text color="soft-tect" textAlign="center" variant="body-15-regular">
          {`We Encountered an unexpected error 🫣 \nPlease ${shouldRetry ? 'retry' : 'restart the app'} to continue.`}
        </Text>
      </Box>
      <Box
        as={Button}
        marginTop={getComputedHeight(34)}
        onPress={() => {
          if (shouldRetry) {
            props.handleRetry()
            return
          }

          handleRestart()
        }}
        text={shouldRetry ? 'Retry' : 'Restart the app'}
      />
    </Box>
  )
}

export function DevFallback({
  errorInfo,
  errorMessage,
  handleRetry
}: {
  errorInfo?: string | null
  errorMessage: string
  handleRetry: Noop
}) {
  return (
    <ScrollView contentContainerStyle={CONTAINER}>
      <Box rg="m">
        <Text variant="header-h3-18-reg">{errorMessage}</Text>
        <Button onPress={handleRetry} text="Retry" />
      </Box>
      <Text color="soft-tect" variant="body-15-regular">
        {errorInfo}
      </Text>
    </ScrollView>
  )
}

const CONTAINER = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  paddingVertical: 50
} satisfies ViewStyle
