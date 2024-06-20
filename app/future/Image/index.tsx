import React from 'react'
import {
  Image as RNImage,
  ImageBackground as RNImageBackground,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'

import useImageStyles from './styles'
import { ImageProps } from './types'

const Image = ({
  height,
  width,
  imageUri,
  containerStyle,
  isBackground = false,
  children,
  resizeMode = FastImage.resizeMode.cover,
  borderRadius = 15,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius
}: ImageProps) => {
  const { styles } = useImageStyles({
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    containerStyle,
    height,
    width
  })
  return (
    <View style={styles.wrapper}>
      {!!imageUri?.uri &&
        (isBackground ? (
          <FastImage
            resizeMode={resizeMode}
            source={{
              priority: FastImage.priority.high,
              uri: imageUri.uri
            }}
            style={styles.image}
          >
            {children}
          </FastImage>
        ) : (
          <FastImage
            resizeMode={resizeMode}
            source={{
              priority: FastImage.priority.high,
              uri: imageUri.uri
            }}
            style={styles.image}
          />
        ))}
      {!imageUri?.uri &&
        (isBackground ? (
          <RNImageBackground
            imageStyle={{ borderRadius }}
            source={imageUri}
            style={styles.image}
          >
            {children}
          </RNImageBackground>
        ) : (
          <RNImage source={imageUri} style={styles.image} />
        ))}
    </View>
  )
}

export default Image
