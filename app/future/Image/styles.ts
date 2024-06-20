import { StyleSheet } from 'react-native'

import { StylesProp } from './types'

const useImageStyles = ({
  containerStyle,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius
}: StylesProp) => {
  const styles = StyleSheet.create({
    image: {
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      height: '100%',
      width: '100%'
    },
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      ...StyleSheet.flatten(containerStyle as object)
    }
  })

  return { styles }
}

export default useImageStyles
