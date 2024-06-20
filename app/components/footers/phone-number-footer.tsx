import { Box, Text } from '@risemaxi/sarcelle'
import React from 'react'

export function PhoneNumberFooter() {
  return (
    <Box
      alignSelf="center"
      borderColor="offWhite0003"
      borderTopWidth={1}
      marginBottom={20}
      paddingVertical={16}
      width="90%"
    >
      <Text color="soft-tect" textAlign="center" variant="body-13-regular">
        We verify your phone number in order to tailor your Rise experience to
        the right country or region.
      </Text>
    </Box>
  )
}
