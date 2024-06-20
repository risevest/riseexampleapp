import { CloseIcon } from 'app/assets/future/icons'
import Styles from 'app/design/Styles'
import * as React from 'react'
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import RNModal from 'react-native-modal'

import { Text } from '../Text'
import { ModalT } from './types'

export const Modal = ({
  children,
  isModalVisible,
  onModalClose,
  headerText,
  height
}: ModalT) => {
  const CONTAINER: TextStyle = {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    height,
    left: 0,
    paddingHorizontal: 16,
    paddingVertical: 25,
    position: 'absolute',
    right: 0
  }

  const BUTTON_CONTAINER: ViewStyle = {
    ...Styles.spaceBetween,
    alignItems: 'center',
    marginTop: 10
  }

  const HEADER_TEXT: TextStyle = { marginRight: 30 }

  return (
    <View>
      <RNModal
        isVisible={isModalVisible}
        onBackButtonPress={onModalClose}
        onBackdropPress={onModalClose}
        style={MODAL_CONTAINER}
      >
        <View style={CONTAINER}>
          <View style={BUTTON_CONTAINER}>
            <TouchableOpacity onPress={onModalClose}>
              <CloseIcon height={37} width={37} />
            </TouchableOpacity>
            <Text textStyle={HEADER_TEXT} type="head-2-20" variant="dark">
              {headerText}
            </Text>
            <View />
          </View>
          {children}
        </View>
      </RNModal>
    </View>
  )
}

const MODAL_CONTAINER: ViewStyle = { margin: 0 }
