import { Box, Circle, Text } from '@risemaxi/sarcelle'
import React from 'react'

import { PINInputProps } from './pin-input.props'

export default function PINInput({
  pin,
  showPIN = false,
  error,
  validateOnInput
}: PINInputProps) {
  const borderColor = (input: string) => {
    if (error) {
      return 'red'
    } else if ((showPIN || validateOnInput) && input) {
      return 'teal001'
    } else {
      return 'lightStroke'
    }
  }

  return (
    <Box flexDirection="row">
      {[1, 2, 3, 4, 5, 6].map((item: number, index) => (
        <Box
          alignItems="center"
          borderColor={borderColor(pin?.[index])}
          borderRadius={5}
          borderWidth={1}
          height={42}
          justifyContent="center"
          key={item}
          marginRight={13}
          width={42}
        >
          {showPIN ? (
            <>
              {pin?.[index] && (
                <Text fontSize={18} textAlign="center" variant="num-reg-18">
                  {pin?.[index]}
                </Text>
              )}
            </>
          ) : (
            <>
              {pin?.[index] && (
                <Circle backgroundColor="neutral-dark-mode" size={5} />
              )}
            </>
          )}
        </Box>
      ))}
    </Box>
  )
}
