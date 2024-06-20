import { Box } from '@risemaxi/sarcelle'
import React from 'react'
import { ActivityIndicator, Dimensions, ViewStyle } from 'react-native'

const { width, height } = Dimensions.get('window')

interface SpinnerProps {
  visible: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ visible = false }) => {
  if (!visible) {
    return null
  }
  return (
    <Box style={SPINNER_CONTAINER}>
      <ActivityIndicator color="white" size="large" />
    </Box>
  )
}

const SPINNER_CONTAINER: ViewStyle = {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  elevation: 5,
  height,
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  top: 0,
  width,
  zIndex: 2000
}

export default Spinner
