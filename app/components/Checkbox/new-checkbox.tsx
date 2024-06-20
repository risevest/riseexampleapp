import { Box, Circle, Text } from '@risemaxi/sarcelle'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface NewCheckBoxProps extends TouchableOpacityProps {
  checked?: boolean
  label: string
}

export function NewCheckbox({ label, checked, ...props }: NewCheckBoxProps) {
  return (
    <TouchableOpacity {...props}>
      <Box alignItems="center" flexDirection="row" marginBottom={22}>
        <Box
          alignItems="center"
          borderColor="primary"
          borderRadius={15}
          borderWidth={1}
          height={20}
          justifyContent="center"
          marginRight={13}
          width={20}
        >
          {checked && <Circle backgroundColor="primary" size={10} />}
        </Box>

        <Text color="neutral-dark-mode" variant="body-15-regular">
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
