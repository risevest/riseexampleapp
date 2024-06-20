import { Box, Grid, Row, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { spacing } from 'app/design'
import React from 'react'
import { TextStyle } from 'react-native'

import { NewButton as Button } from '../button'
import { HeaderProps, RenderItem } from './header.props'

interface RenderIconProps extends HeaderProps {
  icon?: RenderItem
  position: 'left' | 'right'
}

interface RenderHeaderProps {
  style?: TextStyle
  title: string
  titleProps: HeaderProps['titleProps']
}

const RenderIcon = ({
  icon,
  position,
  leftIconProps,
  onLeftPress,
  onRightPress,
  rightIconProps
}: RenderIconProps) => {
  if (typeof icon === 'string') {
    return (
      <Button
        onPress={position === 'left' ? onLeftPress : onRightPress}
        preset="link"
      >
        <Icon
          name={icon}
          size={spacing.larger + spacing.tiny}
          {...(position === 'left' ? leftIconProps : rightIconProps)}
        />
      </Button>
    )
  }

  if (React.isValidElement(icon)) {
    return icon as React.ReactElement
  }

  return <Box height={spacing.larger} width={spacing.larger} />
}
const RenderHeader = ({ title, titleProps, style }: RenderHeaderProps) => {
  if (React.isValidElement(title)) {
    return title as React.ReactElement
  }

  return (
    <Text
      color="neutral-dark-mode"
      style={style}
      textAlign="center"
      variant="header-h1-24-bold"
      {...titleProps}
    >
      {title}
    </Text>
  )
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightItem,
    leftItem,
    headerText,
    style,
    titleProps,
    leftIconProps,
    leftProps,
    rightIconProps,
    rightProps,
    headerTextStyle
  } = props
  const header = headerText || ''

  return (
    <Grid
      alignItems="center"
      flexDirection="row"
      justifyContent="flex-start"
      paddingHorizontal="m"
      paddingVertical={{ custom: 20 }}
      style={style}
    >
      <Row width="content" {...leftProps}>
        <RenderIcon
          icon={leftItem}
          leftIconProps={leftIconProps}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          position="left"
          rightIconProps={rightIconProps}
        />
      </Row>

      <Row flex={1} justifyContent="center">
        <RenderHeader
          style={headerTextStyle}
          title={header}
          titleProps={titleProps}
        />
      </Row>

      <Row width="content" {...rightProps}>
        <RenderIcon
          icon={rightItem}
          onRightPress={onRightPress}
          position="right"
          rightIconProps={rightIconProps}
        />
      </Row>
    </Grid>
  )
}
