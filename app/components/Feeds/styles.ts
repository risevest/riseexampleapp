import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('screen')

export default StyleSheet.create({
  alignCenter: { alignSelf: 'center', textAlign: 'center' },
  alignLeft: { textAlign: 'left' },
  alignRight: { textAlign: 'right' },
  blockquote: {
    fontFamily: 'TomatoGrotesk-Regular',
    fontSize: getComputedWidth(18),
    paddingLeft: 20
  },
  bold: { fontWeight: 'bold' },
  image: { alignSelf: 'center', height: 200, width: width - 40 },
  italic: { fontStyle: 'italic' },
  link: {
    color: '#0898A0',
    textDecorationStyle: 'solid'
  },
  quote: {
    color: '#9FDCE1',
    fontFamily: 'TomatoGrotesk-SemiBold',
    fontSize: getComputedWidth(48),
    paddingLeft: 20
  },
  quoteContainer: {
    flexDirection: 'row',
    paddingLeft: 20
  },
  strikethrough: { textDecorationLine: 'line-through' },
  text: {
    fontFamily: 'DMSans-Regular',
    lineHeight: getComputedHeight(22)
    // setting fontSize will cap the subsequent fontSize for the children text
  },
  underline: { textDecorationLine: 'underline' }
})
