import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { Button, Modal, Text } from 'app/future'
import { Variant } from 'app/future/Button/types'
import React from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'

export interface Warning {
  buttons: WarningButton[]
  header: string
  subText?: string
  title: string
}

interface WarningButton {
  text: string
  type: string
  variant: Variant
}

function PlanCreationWarningModal({
  isModalVisible,
  onModalClose,
  onContinue,
  onCancel,
  warning,
  modalHeight
}: {
  isModalVisible: boolean
  modalHeight?: number
  onCancel: () => void
  onContinue: () => void
  onModalClose: () => void
  warning: Warning
}) {
  const handleButtonPress = (button: WarningButton) => {
    switch (button.type) {
      case 'continue':
        onContinue()
        break
      case 'cancel':
        onCancel()
        break
      default:
        onCancel()
    }
  }

  return (
    <View>
      <Modal
        headerText={warning.header}
        height={modalHeight ? modalHeight : getComputedHeight(354)}
        isModalVisible={isModalVisible}
        onModalClose={onModalClose}
      >
        <>
          <Text
            textStyle={WARNING_TITLE}
            type="reg-17-main"
            variant="soft-tect"
          >
            {warning.title}
          </Text>
          {warning?.subText && (
            <Text
              textStyle={WARNING_SUBTEXT}
              type="reg-17-main"
              variant="soft-tect"
            >
              {warning?.subText}
            </Text>
          )}
          <View style={styles.modalButtonsWrapper}>
            {warning.buttons.map((button, index) => (
              <View key={index} style={styles.modalButton}>
                <Button
                  onPress={() => handleButtonPress(button)}
                  variant={button.variant}
                >
                  {button.text}
                </Button>
              </View>
            ))}
          </View>
        </>
      </Modal>
    </View>
  )
}

const WARNING_TITLE: TextStyle = {
  marginTop: getComputedHeight(29),
  textAlign: 'center'
}

const WARNING_SUBTEXT: TextStyle = {
  marginTop: getComputedHeight(10),
  textAlign: 'center'
}

const styles = StyleSheet.create({
  modalButton: {
    marginHorizontal: getComputedWidth(20),
    marginVertical: getComputedHeight(5)
  },
  modalButtonsWrapper: {
    marginTop: getComputedHeight(24)
  }
})

export default PlanCreationWarningModal
