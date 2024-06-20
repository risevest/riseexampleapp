import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface Checkbox2 {
  checked: boolean
  label: string
  onPress: () => void
}

export function Checkbox2({ checked, onPress, label }: Checkbox2) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box alignItems="center" flexDirection="row">
        <Box
          alignItems="center"
          backgroundColor={checked ? 'primary' : 'white'}
          borderColor="primary"
          borderRadius={2}
          borderWidth={1}
          height={18}
          justifyContent="center"
          marginRight={10}
          width={18}
        >
          {checked && <Icon color="red" name="check-white" size={8} />}
        </Box>

        <Box flex={1} flexDirection="row" flexGrow={1} width={0}>
          <Text color="neutral-dark-mode" variant="body-15-regular">
            {label}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
