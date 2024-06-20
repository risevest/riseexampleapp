import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import * as React from 'react'
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { screenWidth } from '../../design/responsiveModule'

interface ISliderComp extends INavigationProps {
  data: {
    icon?: React.ReactNode
    illustration: any
    onClick: () => void
    subtitle: string
    title: string
  }[]
  hasIcon: boolean
  imageSource: 'require' | 'uri'
}

export const cardSpec = {
  FULL_SIZE: screenWidth * 0.68 + 12 * 2,
  ITEM_HEIGHT: screenWidth - 50 * 0.68 * 1.5,
  ITEM_WIDTH: screenWidth * 0.63,
  SPACING: 12
}

const useSliderCompStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    detailsWrapper: {
      backgroundColor: theme.primaryColor,
      bottom: 0,
      left: 0,
      paddingHorizontal: 10,
      paddingVertical: 20,
      position: 'absolute',
      right: 0
    },
    imageStyle: {
      ...StyleSheet.absoluteFillObject,
      height: cardSpec.ITEM_HEIGHT,
      resizeMode: 'cover',
      width: cardSpec.ITEM_WIDTH
    },
    itemContainer: {
      borderRadius: 8,
      height: cardSpec.ITEM_HEIGHT,
      margin: cardSpec.SPACING,
      overflow: 'hidden',
      width: cardSpec.ITEM_WIDTH
    },
    leftIcon: {
      marginLeft: 15,
      marginTop: 15
    },
    title: {
      marginBottom: 10
    },
    wrapper: {
      marginLeft: 10
    }
  })

  return { styles, theme }
}

const SliderComp = ({ data, hasIcon, imageSource }: ISliderComp) => {
  const { styles } = useSliderCompStyles()
  const [sliderPage, setSliderPage] = React.useState(0)
  const scrollX = React.useRef(new Animated.Value(0)).current

  // TODO: Implement pagination
  const listenForSliderChange = (event: NativeSyntheticEvent<any>) => {
    const { x } = event.nativeEvent.contentOffset
    const indexOfNextScreen = Math.round(x / screenWidth)
    if (indexOfNextScreen !== sliderPage) {
      setSliderPage(indexOfNextScreen)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        data={data}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => item.title}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ],
          {
            listener: (event) => listenForSliderChange(event),
            useNativeDriver: true
          }
        )}
        pagingEnabled
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * cardSpec.FULL_SIZE,
            index * cardSpec.FULL_SIZE,
            (index + 1) * cardSpec.FULL_SIZE
          ]
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.2, 1]
          })

          return (
            <TouchableOpacity
              onPress={() => item.onClick()}
              style={styles.itemContainer}
            >
              <View>
                <Animated.Image
                  source={
                    imageSource === 'uri'
                      ? { uri: item.illustration }
                      : item.illustration
                  }
                  style={[styles.imageStyle, { transform: [{ scale }] }]}
                />
              </View>
              {hasIcon && <View style={styles.leftIcon}>{item.icon}</View>}
              <View style={styles.detailsWrapper}>
                <P
                  fontsize={17}
                  style={styles.title}
                  text={item.title}
                  type="white"
                />
                <P
                  fontsize={14}
                  fontWeight="400"
                  text={item.subtitle}
                  type="white"
                />
              </View>
            </TouchableOpacity>
          )
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardSpec.FULL_SIZE}
      />
    </View>
  )
}

export default SliderComp
