import { Footer, IconButton } from 'app/components'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Button, Text } from 'app/future'
import * as React from 'react'
import {
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'

interface IExchangeRateModal extends INavigationProps {
  closeModal: () => void
  disabled?: boolean
  handleAcceptPress?: () => void
  isLoading?: boolean
  isModalVisible: boolean
  message?: string
  params?: any
  rates?: Rates
  showButton?: boolean
}

const useExchangeRateModalStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    button: {
      marginHorizontal: getComputedWidth(20),
      marginVertical: getComputedHeight(15)
    },
    disclaimer: {
      fontSize: getComputedWidth(12),
      fontWeight: '400',
      lineHeight: 17,
      marginTop: 20,
      textAlign: 'center',
      width: '100%'
    },
    header: {
      ...Styles.row,
      ...Styles.spaceBetween,
      marginBottom: 33
    },
    heading: {
      textAlign: 'center'
    },
    modal: {
      margin: 0
    },
    modalView: {
      backgroundColor: theme.primarySurface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      bottom: 0,
      left: 0,
      paddingHorizontal: 16,
      paddingVertical: 25,
      position: 'absolute',
      right: 0
    },
    normal: { fontStyle: 'normal' },
    row: {
      ...Styles.row,
      ...Styles.spaceBetween,
      marginBottom: 3
    },
    rowWrapper: {
      borderBottomColor: theme.lightGrey,
      borderBottomWidth: 1,
      borderTopColor: theme.lightGrey,
      borderTopWidth: 1,
      paddingVertical: 11
    }
  })

  return { styles, theme }
}

const DEAFULT_MSG =
  'Funding your Rise in Naira is not an FX purchase. We are simply showing the current value of your investment amount based on prevailing market rates.'

const ExchangeRateModal = ({
  isModalVisible,
  closeModal,
  handleAcceptPress,
  isLoading = false,
  message = DEAFULT_MSG,
  params,
  showButton = true,
  rates
}: IExchangeRateModal) => {
  const { theme, styles } = useExchangeRateModalStyles()

  const MESSAGE: TextStyle = {
    ...styles.disclaimer,
    ...styles.normal,
    color: '#838f91'
  }

  return (
    <View>
      <Modal
        animationIn="slideInUp"
        animationInTiming={700}
        animationOut="slideOutDown"
        animationOutTiming={700}
        backdropColor={theme.darkModalBackground}
        isVisible={isModalVisible}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={styles.modal}
        useNativeDriver
      >
        <View style={styles.modalView}>
          <View style={[styles.header, HEADER]}>
            <IconButton iconName="close" onPress={closeModal} />
            <Text type="head-2-20" variant="dark">
              {params?.isCrypto
                ? 'About Crypto Funding'
                : 'About Exchange Rates'}
            </Text>
            <View style={BOX} />
          </View>
          <ScrollView>
            {!params?.isCrypto && (
              <>
                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text type="reg-17-main" variant="black">
                      USD Buy Rate
                    </Text>
                    <Text type="num-15-reg" variant="dark">
                      {`₦ ${rates?.toUsd}`}
                    </Text>
                  </View>
                  <Text
                    textStyle={{ fontSize: getComputedWidth(12) }}
                    type="reg-15-soft"
                    variant="light"
                  >
                    We buy US dollars at this rate
                  </Text>
                </View>
                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text type="reg-17-main" variant="black">
                      USD Sell Rate
                    </Text>
                    <Text type="num-15-reg" variant="dark">
                      {`₦ ${rates && rates.toNgn}`}
                    </Text>
                  </View>
                  <Text
                    textStyle={{ fontSize: getComputedWidth(12) }}
                    type="reg-15-soft"
                    variant="light"
                  >
                    The current value of your investments in Naira
                  </Text>
                </View>
              </>
            )}
            <Text textStyle={MESSAGE} type="label-12-reg" variant="light">
              {message}
            </Text>
            {showButton && (
              <View style={styles.button}>
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  onPress={handleAcceptPress}
                  variant="primary"
                >
                  Accept & Continue
                </Button>
              </View>
            )}
            {!showButton && <Footer />}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const HEADER: ViewStyle = { alignItems: 'center' }
const BOX: ViewStyle = { width: 32 }

export default ExchangeRateModal
