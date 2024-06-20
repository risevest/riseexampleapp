import { Box, Text } from '@risemaxi/sarcelle'
import { Container, IconButton } from 'app/components'
import CustomKeyboard from 'app/components/custom-keyboard/custom-keyboard'
import { UseTheme, useTheme } from 'app/design/theme'
import { PinStackScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { View } from 'react-native'

import { useCreatePinStyles } from './styles'

const CreatePin = ({
  route,
  navigation
}: PinStackScreenProps<'CreatePinScreen'>) => {
  const { goBack, navigate } = navigation
  const { theme } = useTheme() as UseTheme
  const styles = useCreatePinStyles()

  const onInputComplete = (pinState: string) => {
    const prevRoute = route?.params?.prevRoute
    navigate('ConfirmPin', {
      firstName: route?.params?.firstName,
      pinState,
      prevRoute
    })
  }

  return (
    <Container
      animation="fadeIn"
      backgroundColor={theme.primarySurface}
      statusBarColor={theme.primarySurface}
    >
      <View style={styles.wrapper}>
        <Box>
          <IconButton iconName="arrow-back-sharp" onPress={() => goBack()} />
          <Box marginBottom={20} mt="l">
            <Text variant="header-h2-20-medium">Create a 6-digit PIN</Text>
            <Text color="soft-tect" mt="s" variant="body-15-regular">
              You’ll use this PIN to sign in and confirm transactions
            </Text>
          </Box>
        </Box>
        <CustomKeyboard marginBottom="xl" onInputComplete={onInputComplete} />
      </View>
    </Container>
  )
}

export default CreatePin
