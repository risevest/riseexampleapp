import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { NewHeader as Header, Screen } from 'app/components'
import OTPInput from 'app/components/otp-input'
import { ForgotPasswordScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'

import { useConfirmEmail } from './hooks'

export interface ConfirmEmailProps
  extends ForgotPasswordScreenProps<'ConfirmEmail'> {}

export default function ConfirmEmail(props: ConfirmEmailProps) {
  const confirmEmail = useConfirmEmail(props)

  return (
    <Box
      as={Screen}
      header={
        <Header
          leftItem="back-icon"
          onLeftPress={confirmEmail.handleBackPress}
        />
      }
      paddingHorizontal="m"
      preset="scroll"
    >
      <Box mb="l">
        <Icon height={70} name="confirm-email" width={70} />
      </Box>
      <Box mt="s">
        <Text color="neutral-dark-mode" variant="header-h2-20-medium">
          Confirm your email address.
        </Text>
        <Text color="soft-tect" mt="s" variant="body-15-regular">
          Enter the code that was sent to {confirmEmail.emailSentTo}
        </Text>
      </Box>
      <Box mt="l" width="85%">
        <OTPInput
          hasError={!!confirmEmail.error}
          onCodeFilled={confirmEmail.handleEmailVerification}
          pinCount={6}
        />
      </Box>
      {confirmEmail.isLoading && (
        <Box mt="s">
          <ActivityIndicator color="#0898A0" size={25} />
        </Box>
      )}
      {confirmEmail.error !== '' && (
        <Animated.View entering={FadeInLeft}>
          <Text color="red" fontWeight="300" mt="s">
            {confirmEmail.error}
          </Text>
        </Animated.View>
      )}
      <Box alignSelf="flex-start" marginTop={22}>
        <TouchableOpacity
          disabled={confirmEmail.disableResend}
          onPress={confirmEmail.resendCode}
        >
          <Text
            color={confirmEmail.countDown < 60 ? 'soft-tect' : 'primary'}
            textAlign="center"
            variant="button-15-bold"
          >
            {confirmEmail.countDown < 60
              ? `Resend code in ${confirmEmail.countDown}s`
              : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
