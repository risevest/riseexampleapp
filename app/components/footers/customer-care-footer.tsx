import { CONTACT_EMAIL } from '@env'
import { Box, Text } from '@risemaxi/sarcelle'
import React from 'react'
import { Linking } from 'react-native'

export function CustomerCareFooter() {
  const openEmail = () => Linking.openURL(`mailto:${CONTACT_EMAIL}`)

  return (
    <Box
      borderColor="offWhite0003"
      borderTopWidth={1}
      paddingVertical={16}
      width="90%"
    >
      <Text color="black" textAlign="center" variant="body-13-regular">
        If you encounter any problems during this process, please email us at{' '}
        <Text
          color="primary"
          onPress={openEmail}
          textDecorationLine="underline"
          variant="body-13-regular"
        >
          {CONTACT_EMAIL}
        </Text>
      </Text>
    </Box>
  )
}
