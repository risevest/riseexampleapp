import { getComputedHeight } from 'app/design/responsiveModule'
import { Dimensions, Platform, StyleSheet } from 'react-native'

import { colors } from './index.styles'

const IS_IOS = Platform.OS === 'ios'
const { width: viewportWidth } = Dimensions.get('window')

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideWidth = wp(65)
const itemHorizontalMargin = wp(1)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin

const entryBorderRadius = 8

export default StyleSheet.create({
  image: {
    height: undefined,
    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: undefined
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius
  },
  imageContainer: {
    // Prevent a random Android rendering issue
    backgroundColor: 'white',

    borderRadius: entryBorderRadius,
    bottom: 0,

    flex: 1,

    left: 0,

    marginBottom: IS_IOS ? 0 : -1,

    overflow: 'hidden',
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius,
    position: 'absolute',
    right: 0,
    top: 0
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  overlay: {
    backgroundColor: '#070A0B',
    bottom: 0,
    left: 0,
    opacity: 0.1,
    position: 'absolute',
    right: 0,
    top: 0
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    backgroundColor: 'white',
    bottom: 0,
    height: entryBorderRadius,
    left: 0,
    position: 'absolute',
    right: 0
  },

  radiusMaskEven: {
    backgroundColor: colors.black
  },

  shadow: {
    borderRadius: entryBorderRadius,
    bottom: 18,
    left: itemHorizontalMargin,
    position: 'absolute',
    right: itemHorizontalMargin,
    shadowColor: colors.black,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    top: 0
  },
  slideInnerContainer: {
    borderColor: 'black',
    borderRadius: entryBorderRadius,
    borderTopLeftRadius: entryBorderRadius,
    height: getComputedHeight(330),
    overflow: 'hidden',
    paddingBottom: 18,
    paddingHorizontal: itemHorizontalMargin,
    width: itemWidth // needed for shadow
  },
  subtitle: {
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 6
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  textContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 20 - entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  }
})
