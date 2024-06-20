import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import { InfoProps } from './info.props'

function Info({
  text,
  textStyle,
  onPress,
  linkText,
  iconColor = '#0898A0',
  ...props
}: InfoProps) {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Box
        alignItems="center"
        backgroundColor="neutral-grey"
        borderRadius="s"
        flexDirection="row"
        marginVertical="m"
        px="s"
        py="m"
        {...props}
      >
        <Icon color={iconColor} name="info" size={16} />
        <Box flexShrink={1} marginLeft={12}>
          <Text
            color="neutral-dark-mode"
            style={textStyle}
            variant="body-13-regular"
          >
            {text}
          </Text>
          {linkText && (
            <Text color="primary" variant="body-12-regular">
              {linkText}
            </Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

export default Info
