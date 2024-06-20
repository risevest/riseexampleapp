import { getComputedHeight } from 'app/design/responsiveModule'
import { Header, P } from 'app/design/typography'
import React, { useState } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  messageStyle: {
    marginVertical: 15
  },
  modalWrapper: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: getComputedHeight(160),
    paddingHorizontal: 20,
    paddingVertical: 15
  }
})

const AlertAndroid = (
  title: string,
  message: string,
  options: {
    onPress: () => {}
    style: 'destructive' | 'default'
    text: string
  }[],
  cancelable: boolean
) => {
  const [isModalOpen, setModalVisibility] = useState(true)

  const closeModal = () => {
    setModalVisibility(false)
  }

  return (
    <View>
      <Modal
        isVisible={isModalOpen}
        {...(cancelable && { onBackButtonPress: closeModal })}
        {...(cancelable && { onBackdropPress: closeModal })}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
      >
        <View style={styles.modalWrapper}>
          <Header fontsize={20} text={title} />
          <P
            fontWeight="400"
            style={styles.messageStyle}
            text={message}
            type="dark"
          />
          <View style={styles.buttonView}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={`${index}-${option}`}
                onPress={() => {
                  setModalVisibility(false)
                  option.onPress()
                }}
              >
                <P
                  style={MODAL_BUTTON_TEXT}
                  text={option.text}
                  type={
                    option.style === 'destructive'
                      ? 'danger'
                      : option.style === 'default'
                        ? 'light'
                        : 'primary'
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const MODAL_BUTTON_TEXT: TextStyle = { textTransform: 'uppercase' }

export const CustomAlert = {
  AlertAndroid
}
