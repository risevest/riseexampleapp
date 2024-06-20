import { IconButton } from 'app/components'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'

interface ISmallModal extends INavigationProps {
  closeModal: () => void
  isModalVisible: boolean
  onModalHide?: () => void
  triggerAction: () => void
}

const useSmallModalStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    modalView: {
      backgroundColor: theme.primarySurface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      bottom: 0,
      height: 170,
      left: 0,
      padding: 20,
      position: 'absolute',
      right: 0
    },
    wrapper: {
      ...Styles.body
    }
  })

  return { styles, theme }
}

const SmallModal = ({
  closeModal,
  isModalVisible,
  triggerAction,
  onModalHide
}: ISmallModal) => {
  const { theme, styles } = useSmallModalStyles()
  return (
    <View>
      <Modal
        animationIn="slideInUp"
        animationInTiming={100}
        animationOut="slideOutDown"
        animationOutTiming={100}
        backdropColor={theme.darkModalBackground}
        isVisible={isModalVisible}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        onModalHide={onModalHide}
        style={MODAL}
      >
        <View style={styles.modalView}>
          <View style={DELETE_CARD_CONTAINER}>
            <IconButton iconName="close" onPress={closeModal} />
            <P fontsize={20} text="Delete Card?" type="dark" />
            <View />
          </View>
          <TouchableOpacity onPress={triggerAction} style={BUTTON}>
            <IconButton
              backgroundColor={theme.red10}
              iconColor={theme.error}
              iconName="trash"
              onPress={triggerAction}
            />
            <P
              fontWeight="300"
              style={BUTTON_TEXT}
              text="Delete this card"
              type="dark"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const MODAL: ViewStyle = { margin: 0 }

const DELETE_CARD_CONTAINER: ViewStyle = {
  ...Styles.spaceBetween,
  marginRight: 30
}

const BUTTON: ViewStyle = { ...Styles.row, marginTop: 20 }
const BUTTON_TEXT: TextStyle = { marginLeft: 10, marginTop: 5 }

export default SmallModal
