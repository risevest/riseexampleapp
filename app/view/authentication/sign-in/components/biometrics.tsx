import { Box } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { IconProps } from 'app/assets/icons/types'
import React, { useEffect, useState } from 'react'
import FingerprintScanner, {
  Biometrics
} from 'react-native-fingerprint-scanner'
import Animated, { ZoomIn } from 'react-native-reanimated'

const AnimatedBox = Animated.createAnimatedComponent(Box)

interface Props {
  iconProps?: Omit<IconProps, 'name'>
  onPress: () => void
}

export function BiometricsAuth({ onPress, iconProps }: Props) {
  const [biometricsType, setBiometricsType] = useState<Biometrics>()
  useEffect(() => {
    const fetchBiometricsType = async () => {
      try {
        const deviceBiometricsType =
          await FingerprintScanner.isSensorAvailable()
        setBiometricsType(deviceBiometricsType)
      } catch {
        // Fail silently
      }
    }

    fetchBiometricsType()
  }, [])

  if (!biometricsType) return null

  return (
    <AnimatedBox
      alignItems="center"
      entering={ZoomIn.springify()}
      marginTop={40}
    >
      {biometricsType === 'Face ID' ? (
        <Icon name="face-id-large" onPress={onPress} size={70} {...iconProps} />
      ) : (
        <Icon
          name="fingerprint-large"
          onPress={onPress}
          size={70}
          {...iconProps}
        />
      )}
    </AnimatedBox>
  )
}
