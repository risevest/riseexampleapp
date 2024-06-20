import { Box, Text } from '@risemaxi/sarcelle'
import React from 'react'

interface ProcessingFeeProps {
  processingFee: string
}

export default function ProcessingFee({
  processingFee = '0.00'
}: ProcessingFeeProps) {
  return (
    <Box
      alignItems="center"
      backgroundColor="offWhite0003"
      borderRadius={16}
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={16}
      paddingVertical={12.5}
    >
      <Box>
        <Text color="neutral-dark-mode" fontSize={12} variant="num-reg-15">
          Processing fee
        </Text>
      </Box>
      <Box>
        <Text color="neutral-dark-mode" variant="num-reg-15">
          {processingFee}
        </Text>
      </Box>
    </Box>
  )
}
