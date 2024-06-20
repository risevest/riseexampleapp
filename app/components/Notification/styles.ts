import Styles from 'app/design/Styles'
import { Platform, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  alertTitle: { color: '#000', marginLeft: 7, marginTop: 2 },
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 10,
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            marginTop: 44
          },
          {
            marginTop: 30
          }
        )
      }
    }),
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 17,
    ...Styles.shadow
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30
  },
  text: {
    color: '#fff',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 12.5
  },
  tinyLogo: { borderRadius: 5, overflow: 'hidden' },
  wrapper: {
    flexDirection: 'row'
  }
})
