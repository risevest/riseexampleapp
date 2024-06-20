import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import type { ToolTipProp } from './tooltip.props'

export const ToolTip = ({ hideToolTip, text, ...rest }: ToolTipProp) => (
  <Box
    alignItems="center"
    backgroundColor={{
      custom: 'rgba(241, 243, 245, 1)'
    }}
    borderColor="offWhite0003"
    borderRadius="s"
    borderWidth={1}
    flexDirection="row"
    justifyContent="space-around"
    paddingHorizontal={12}
    py="s"
    {...rest}
  >
    <Box flexShrink={1} marginRight={12}>
      <Text color="soft-tect" variant="body-12-regular">
        {text}
      </Text>
    </Box>
    <TouchableOpacity activeOpacity={0.5} onPress={hideToolTip}>
      <Icon color="rgba(148, 161, 173, 1)" name="x" size={12} />
    </TouchableOpacity>
  </Box>
)
