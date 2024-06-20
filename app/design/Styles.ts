import { StyleSheet, ViewStyle } from 'react-native'

interface IBorderStyle {
  borderColor: string
  borderStyle: ViewStyle['borderStyle']
  borderWidth: number
}

export const border = (
  width: number = 1,
  style: ViewStyle['borderStyle'] = 'solid',
  color: string = '#000000'
): IBorderStyle => {
  return {
    borderColor: color,
    borderStyle: style,
    borderWidth: width
  }
}

interface IShadowStyle {
  shadowColor: string
  shadowOffset: {
    height: number
    width: number
  }
  shadowOpacity: number
  shadowRadius: number
}

export const shadow = (
  width = 2.5,
  height = 5,
  radius = 5,
  color = '#000000',
  opacity = 0.2
): IShadowStyle => {
  return {
    shadowColor: color,
    shadowOffset: { height, width },
    shadowOpacity: opacity,
    shadowRadius: radius
  }
}

export default StyleSheet.create({
  body: {
    paddingHorizontal: 20
  },
  borderRadius: {
    borderRadius: 8
  },
  bottomSpacing: {
    marginBottom: 20
  },
  colCenter: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  contain: {
    flex: 1
  },
  fillCenter: {
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'center'
  },
  horizontalMargin: {
    marginHorizontal: 20
  },
  horizontalPadding: {
    paddingHorizontal: 20
  },
  marginSpacing: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  paddingSpacing: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  row: {
    flexDirection: 'row'
  },
  shadow: {
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.7,
    shadowRadius: 10
  },
  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  spacing: {
    marginLeft: 8
  },
  topRow: {
    flexDirection: 'row',
    marginTop: 15
  },
  topSpacing: {
    marginTop: 20
  },
  verticalMargin: {
    marginVertical: 25
  },
  verticalPadding: {
    paddingVertical: 20
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
