import { StyleSheet } from 'react-native'

export const colors = {
  background1: '#B721FF',
  background2: '#21D4FD',
  black: '#1a1917',
  gray: '#888888',
  lightText: 'rgba(131, 143, 145, 0.1)',
  offTeal: 'rgba(8, 152, 160, 0.3)'
}

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background1,
    flex: 1
  },
  exampleContainer: {
    paddingVertical: 30
  },
  exampleContainerDark: {
    backgroundColor: colors.black
  },
  exampleContainerLight: {
    backgroundColor: 'white'
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    borderRadius: 10 / 2,
    height: 10,
    marginHorizontal: -2,
    width: 10
  },
  safeArea: {
    backgroundColor: colors.black,
    flex: 1
  },
  scrollview: {
    flex: 1
  },
  slider: {
    marginTop: 0,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    marginLeft: -40,
    paddingVertical: 10 // for custom animation
  },
  subtitle: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 5,
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  titleDark: {
    color: colors.black
  }
})
