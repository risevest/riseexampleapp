import { Box } from '@risemaxi/sarcelle'
import { BoxProps } from '@risemaxi/sarcelle/dist/components/box/types'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface FooterProps extends BoxProps {
  children?: React.ReactNode
  paddingHorizontal?: number
}

export function Footer({ children, ...props }: FooterProps) {
  const bottom = useSafeAreaInsets().bottom || 26
  return (
    <Box paddingBottom={bottom}>
      <Box paddingHorizontal="m" paddingTop="s" {...props}>
        {children}
      </Box>
    </Box>
  )
}
