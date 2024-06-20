import { Text } from '@risemaxi/sarcelle'
import { SpringBox } from 'app/components/animated/spring-box'
import React from 'react'
import { ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ZoomIn } from 'react-native-reanimated'

const row: ViewStyle = {
  flexDirection: 'row'
}

interface Props {
  onPress: () => void
}

export function Footer({ onPress }: Props) {
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
      <TouchableOpacity onPress={onPress} style={row}>
        <Text color="soft-tect" variant="button-15-bold">
          Don&apos;t have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SpringBox>
  )
}
