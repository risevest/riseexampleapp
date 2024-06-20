import Loading from 'lottie-react-native'
import React from 'react'
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'

import { getComputedHeight } from '../../design/responsiveModule'
import { UseTheme, useTheme } from '../../design/theme'
import { P } from '../../design/typography'

interface ILoader {
  isLoading: boolean
  loaderText?: string
  loaderType?: 'default' | 'custom'
  type?: string
}

const CardURL = require('../../assets/icons/json/card-loading.json')
const CustomLoading = require('../../assets/icons/json/custom-loading.json')

const useLoaderStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    card: {
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderRadius: 3,
      height: getComputedHeight(200),
      justifyContent: 'center',
      paddingBottom: 50,
      width: '90%'
    },
    modalView: {
      alignItems: 'center',
      backgroundColor: theme.primarySurface,
      borderRadius: 8,
      height: 150,
      justifyContent: 'center'
    },
    text: {
      color: theme.primaryColor
    },
    wrapper: {
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      flex: 1,
      justifyContent: 'center'
    }
  })

  return { styles, theme }
}

const Loader = ({
  type,
  isLoading,
  loaderText = 'Hold on while we process your request',
  loaderType = 'custom'
}: ILoader) => {
  const { styles, theme } = useLoaderStyles()
  return (
    <View>
      <Modal transparent={true} visible={isLoading}>
        {loaderType === 'custom' && (
          <View style={styles.wrapper}>
            <View style={styles.card}>
              <Loading
                autoPlay
                loop
                source={type === 'card' ? CardURL : CustomLoading}
                style={LOADER_STYLE}
              />
              <P
                fontsize={15}
                fontWeight="300"
                style={styles.text}
                text={loaderText}
              />
            </View>
          </View>
        )}
        {loaderType === 'default' && (
          <View style={styles.modalView}>
            <P
              fontsize={17}
              fontWeight="400"
              style={LOADER_TEXT}
              text="Please wait"
            />
            <ActivityIndicator color={theme.primaryColor} size="small" />
          </View>
        )}
      </Modal>
    </View>
  )
}

const LOADER_STYLE: ViewStyle = { height: 200, marginTop: -10, width: 200 }
const LOADER_TEXT: TextStyle = { marginBottom: 10 }

export default Loader
