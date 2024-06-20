import { IconButton } from 'app/components'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Header, P } from 'app/design/typography'
import React, { ReactElement } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'

interface IActionSheetContainer extends INavigationProps {
  children: ReactElement
  closeModal: () => void
  headerText: string
  isModalVisible: boolean
  style?: any
  subHeading?: string
}

const useActionSheetContainerStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
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
    }
  })

  return { styles, theme }
}

const ActionSheetContainer = ({
  isModalVisible,
  closeModal,
  children,
  headerText,
  subHeading,
  style
}: IActionSheetContainer) => {
  const { theme, styles } = useActionSheetContainerStyles()
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
        style={MODAL}
        useNativeDriver
      >
        <View style={[styles.modalView, style]}>
          <View style={HEADER}>
            <IconButton iconName="close" onPress={closeModal} />
            <View style={HEADER_CONTAINER}>
              <Header
                fontsize={20}
                style={HEADING}
                text={headerText}
                type="dark"
              />
              {subHeading && (
                <P
                  fontsize={15}
                  fontWeight="300"
                  style={SUB_HEADING_TEXT}
                  text={subHeading}
                  type="dark"
                />
              )}
            </View>
            <View />
          </View>
          {children}
        </View>
      </Modal>
    </View>
  )
}

const HEADER_CONTAINER: ViewStyle = { flexDirection: 'column' }
const SUB_HEADING_TEXT: TextStyle = {
  paddingHorizontal: 20,
  textAlign: 'center'
}
const HEADER: ViewStyle = {
  ...Styles.row,
  ...Styles.spaceBetween,
  marginBottom: 5
}
const HEADING: TextStyle = {
  textAlign: 'center'
}
const MODAL: ViewStyle = {
  margin: 0
}

export default ActionSheetContainer
