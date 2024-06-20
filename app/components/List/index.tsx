import { Box } from '@risemaxi/sarcelle'
import React, { ReactNode } from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

import Styles from '../../design/Styles'

interface ListProps extends TouchableOpacityProps {
  centerText: ReactNode
  leftIcon?: ReactNode
  leftIconStyle?: ViewStyle
  rightContent?: ReactNode
  showPlainIcon?: boolean
}

const List = ({
  leftIcon,
  centerText,
  rightContent,
  disabled,
  leftIconStyle,
  showPlainIcon,
  ...rest
}: ListProps) => {
  const CONTAINER: ViewStyle = { opacity: disabled ? 0.5 : 1 }

  const CENTER_CONTENT_CONTAINER: ViewStyle = {
    marginLeft: !leftIcon ? 0 : 15
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[ITEMLIST, CONTAINER]}
      {...rest}
    >
      <Box alignItems="center" flexDirection="row">
        {showPlainIcon ? (
          leftIcon
        ) : (
          <Box backgroundColor="offWhite0003" style={[ICONVIEW, leftIconStyle]}>
            {leftIcon}
          </Box>
        )}

        <Box style={[CENTER_CONTENT_CONTAINER]}>{centerText}</Box>
      </Box>
      <Box marginTop={{ custom: 4 }}>{rightContent}</Box>
    </TouchableOpacity>
  )
}

export default List

const ITEMLIST: ViewStyle = {
  ...Styles.spaceBetween,
  alignItems: 'center',
  borderBottomColor: 'rgba(181, 181, 181, 0.2)',
  borderBottomWidth: 1,
  paddingVertical: 15
}

const ICONVIEW: ViewStyle = {
  alignItems: 'center',
  borderRadius: 42 / 2,
  height: 42,
  justifyContent: 'center',
  width: 42
}
