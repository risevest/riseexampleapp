import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { IconName } from 'app/assets/icons/types'
import React from 'react'
import { ViewStyle } from 'react-native'
import { ToastConfigParams } from 'react-native-toast-message'

type Props = {
  icon?: IconName
  text: string
}
export type SimpleToastProps = ToastConfigParams<Props>

export function SimpleToast({ props }: SimpleToastProps) {
  const { text, icon = 'alert-feed' } = props

  return (
    <Box
      alignItems="center"
      bg="background"
      borderRadius="l"
      cg="s"
      flexDirection="row"
      px="l"
      py="s"
      style={SHADOW_STYLE}
    >
      <Icon name={icon} size={16} />
      <Text numberOfLines={4} variant="body-13-regular">
        {text}
      </Text>
    </Box>
  )
}

const SHADOW_STYLE = {
  elevation: 6,
  shadowColor: 'rgba(43, 57, 75, 0.15)',
  shadowOffset: {
    height: 3,
    width: 0
  },
  shadowOpacity: 1,
  shadowRadius: 4.65
} satisfies ViewStyle
