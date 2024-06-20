import { getComputedHeight } from 'app/design/responsiveModule'
import React from 'react'
import { View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const Footer = ({ height: propHeight }: { height?: number }) => {
  const deviceHasNotch = DeviceInfo.hasNotch()
  let height = 0
  if (propHeight) {
    height = getComputedHeight(propHeight)
  } else if (deviceHasNotch) {
    height = getComputedHeight(20)
  } else {
    height = getComputedHeight(90)
  }

  return (
    <View
      style={{
        height
      }}
    />
  )
}

export default Footer
