import { Box } from '@risemaxi/sarcelle'
import React from 'react'
import { Animated, ViewStyle } from 'react-native'

import { useAnimatedProgress } from './animated-progress-bar.hooks'
import { AnimatedProgressProps } from './animated-progress-bar.props'

const AnimatedProgressBar = ({
  progressEndPoint,
  progressStartPoint,
  containerWidth
}: AnimatedProgressProps) => {
  const { progressPercent } = useAnimatedProgress(
    progressStartPoint,
    progressEndPoint
  )

  return (
    <Box
      backgroundColor="offWhite0003"
      borderRadius={20}
      height={10}
      marginBottom={35}
      width={containerWidth}
    >
      <Animated.View style={[ACTIVE_PROGRESS, { width: progressPercent }]} />
    </Box>
  )
}

const ACTIVE_PROGRESS: ViewStyle = {
  backgroundColor: '#0898A0',
  borderRadius: 20,
  height: '100%'
}

export default AnimatedProgressBar
