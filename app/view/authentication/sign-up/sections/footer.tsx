import { Box, Text } from '@risemaxi/sarcelle'
import { SpringBox } from 'app/components/animated/spring-box'
import React from 'react'
import { ZoomIn } from 'react-native-reanimated'

export default function footer() {
  return (
    <SpringBox
      alignItems="center"
      bottom={28}
      delayFactor={1}
      entering={ZoomIn}
      flexDirection="row"
      justifyContent="center"
      left={0}
      marginTop={10}
      position="absolute"
      right={0}
    >
      <Box
        alignSelf="center"
        borderColor="offWhite0003"
        borderTopWidth={1}
        marginBottom={20}
        paddingVertical={30}
        width="90%"
      >
        <Text color="soft-tect" textAlign="center" variant="body-13-regular">
          We verify your phone number in order to tailor your Rise experience to
          the right country or region.
        </Text>
      </Box>
    </SpringBox>
  )
}
