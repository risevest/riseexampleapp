import { Box, Circle, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface CheckboxProps {
  checked: boolean
  fontSize?: number
  label: string
  onPress?: () => void
}

export function Checkbox({ checked, label, onPress, fontSize }: CheckboxProps) {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Box alignItems="center" flexDirection="row" marginTop={12}>
        <Circle
          alignItems="center"
          backgroundColor={checked ? 'primary' : 'transparent'}
          borderColor="primary"
          borderWidth={1}
          justifyContent="center"
          marginRight={8}
          size={16}
        >
          {checked ? <Icon name="check-white" size={6} /> : null}
        </Circle>

        <Text
          color="neutral-dark-mode"
          fontSize={fontSize}
          variant="body-13-regular"
        >
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
