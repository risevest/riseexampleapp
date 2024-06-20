import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { DynamicModal, NewButton as Button } from 'app/components'
import React from 'react'
import { ViewStyle } from 'react-native'

interface BiometricModalProps {
  isOpen: boolean
  onPress: () => void
  toggle: () => void
}

export function BiometricModal({
  isOpen,
  onPress,
  toggle
}: BiometricModalProps) {
  const later = () => {
    toggle()
    onPress()
  }
  return (
    <DynamicModal
      headerText="Turn on Biometrics"
      height="50%"
      isModalOpen={isOpen}
      toggleModalVisibility={toggle}
      type="fixedHeight"
    >
      <Box alignSelf="center" style={ICON_CONTAINER}>
        <Icon height={70} name="biometrics" width={138} />
      </Box>

      <Box marginVertical={24}>
        <Text color="soft-tect" textAlign="center" variant="body-15-regular">
          Sign in and confirm transactions with your phone’s fingerprint or
          facial recognition.
        </Text>
      </Box>

      <Box>
        <Button onPress={onPress} text="Turn on biometrics" />
        <Box marginVertical={5} />
        <Button onPress={later} preset="secondary" text="Maybe later" />
      </Box>
    </DynamicModal>
  )
}

const ICON_CONTAINER: ViewStyle = {
  elevation: 13,
  shadowColor: '#000',
  shadowOffset: {
    height: 6,
    width: 0
  },
  shadowOpacity: 0.39,

  shadowRadius: 8.3
}
