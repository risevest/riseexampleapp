import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { UseTheme, useTheme } from 'app/design/theme'
import { Text } from 'app/future/Text'
import Loading from 'lottie-react-native'
import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'

interface ILoader {
  isLoading: boolean
  loaderText?: string
  loaderType?: 'default' | 'custom'
}

export const Loader = ({
  isLoading,
  loaderText = 'Please wait',
  loaderType = 'default'
}: ILoader) => {
  const { theme, styles } = useLoaderStyles()
  return (
    <View>
      <Modal transparent={true} visible={isLoading}>
        <View style={styles.wrapper}>
          <View style={styles.loaderCard}>
            {loaderType === 'custom' && (
              <Loading
                autoPlay
                loop
                source={require('app/assets/future/icons/loader.json')}
                style={styles.animatedLoader}
              />
            )}
            {loaderType === 'default' && (
              <ActivityIndicator color={theme.primaryColor} size="small" />
            )}
            <Text type="reg-17-main" variant="soft-tect">
              {loaderText}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const useLoaderStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    animatedLoader: {
      height: getComputedHeight(28),
      width: getComputedWidth(38)
    },
    loaderCard: {
      alignItems: 'center',
      backgroundColor: theme.primarySurface,
      borderRadius: 10,
      height: getComputedHeight(217),
      justifyContent: 'center',
      width: getComputedWidth(337)
    },
    wrapper: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      flex: 1,
      justifyContent: 'center'
    }
  })

  return { styles, theme }
}
