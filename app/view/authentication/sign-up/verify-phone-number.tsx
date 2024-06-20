import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import {
  NewButton as Button,
  NewHeader as Header,
  Screen
} from 'app/components'
import { SpringBox } from 'app/components/animated/spring-box'
import { Footer } from 'app/components/footers'
import OTPInput from 'app/components/otp-input'
import {
  usePhoneNumberVerification,
  useRegisterPhoneNumber
} from 'app/domains/auth/hooks'
import { useCountDown } from 'app/hooks/useCountDown'
import { useSavedOnboardingProps, useSettingsActions } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import CustomerIO from 'app/utils/analytics/customer-io'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import React, { useState } from 'react'
import { ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native'
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'

export function VerifyPhoneNumber({
  navigation
}: AuthStackScreenProps<'VerifyPhoneNumber'>) {
  const savedProps = useSavedOnboardingProps() as NonNullable<
    Required<ReturnType<typeof useSavedOnboardingProps>>
  >
  const { authorizationToken, country, phoneNumber } = savedProps
  const { setSavedOnboardingProps } = useSettingsActions()
  const registerPhoneNumberMutation = useRegisterPhoneNumber()
  const verifyPhoneNumberMutation = usePhoneNumberVerification()
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false)

  const [otp, setOTP] = useState('')
  const [reference, setReference] = useState(savedProps?.reference ?? '')
  const [hasError, setHasError] = useState(false)

  const { countDown, reset, isRunning } = useCountDown(60)

  const { colors } = useTheme()

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  const verifyPhoneNumber = () => {
    if (!otp) {
      return
    }

    verifyPhoneNumberMutation.mutate(
      {
        authorizationToken,
        reference,
        token: otp
      },
      {
        onSuccess: () => {
          const props = {
            ...savedProps
          } as const
          setSavedOnboardingProps(props)
          logEvent('open_personal_info')
          amplitude.logEvent('Phone Verified')
          amplitude.logEvent('Personal Info Initiated')
          CustomerIO.logEvent('phone_verified')
          CustomerIO.logEvent('personal_info_initiated')
          navigation.navigate('MoreInformation')
        }
      }
    )
  }

  const resendCode = async () => {
    registerPhoneNumberMutation.mutate(
      { country, phone: phoneNumber },
      {
        onSuccess: (data) => {
          setReference(
            data?.identity?.verification_metadata?.provider_reference
          )
          reset()
        }
      }
    )
  }

  return (
    <Box
      as={Screen}
      footer={isKeyboardVisible ? null : <Footer />}
      header={<Header leftItem="back-icon" onLeftPress={navigation.goBack} />}
      paddingHorizontal="m"
      preset="scroll"
    >
      <Box marginTop={39.83}>
        <Box>
          <Box marginBottom={8}>
            <Text color="neutral-dark-mode" variant="header-h2-20-medium">
              Enter your phone number
            </Text>
          </Box>

          <Text color="soft-tect" variant="body-15-regular">
            We’ll send you a 6-digit verification code. Enter this code to
            verify your number.
          </Text>

          <Box
            alignItems="center"
            flexDirection="row"
            flexWrap="wrap"
            marginTop={15}
          >
            <Text color="soft-tect" variant="body-15-regular">
              Code has been sent to{' '}
            </Text>
            <Box backgroundColor="offWhite0003" padding={2}>
              <Text
                color="neutral-dark-mode"
                textAlign="center"
                variant="body-15-regular"
              >
                {phoneNumber}
              </Text>
            </Box>
          </Box>

          <Box
            borderColor={{ custom: 'rgba(113, 135, 156, 0.1)' }}
            borderTopWidth={1}
            marginTop={24}
            paddingTop={16}
          >
            <Text color="neutral-dark-mode" variant="header-h2-20-medium">
              Enter Confirmation Code
            </Text>
            <SpringBox delayFactor={3} entering={FadeInDown}>
              <Box my="l" width="80%">
                <OTPInput
                  hasError={hasError}
                  onCodeChanged={(code) => {
                    if (code.length < 6) setHasError(false)
                  }}
                  onCodeFilled={setOTP}
                  pinCount={6}
                />
              </Box>
            </SpringBox>

            <SpringBox delayFactor={2} mt="m">
              <Box marginTop={16}>
                <Button
                  isLoading={verifyPhoneNumberMutation.isLoading}
                  onPress={verifyPhoneNumber}
                  text="Continue"
                />
              </Box>
            </SpringBox>

            <SpringBox delayFactor={1} mt="m">
              <Box marginTop={15}>
                {registerPhoneNumberMutation?.isLoading ? (
                  <ActivityIndicator color={colors['soft-tect']} />
                ) : (
                  <TouchableOpacity
                    disabled={
                      isRunning && registerPhoneNumberMutation.isLoading
                    }
                    onPress={resendCode}
                  >
                    <Text
                      color="soft-tect"
                      textAlign="center"
                      variant="button-15-bold"
                    >
                      {isRunning
                        ? `Resend code in ${countDown}`
                        : 'Resend code'}
                    </Text>
                  </TouchableOpacity>
                )}
              </Box>
            </SpringBox>
          </Box>
        </Box>
      </Box>
      {isKeyboardVisible ? (
        <Footer entering={FadeInDown} exiting={FadeOutUp} />
      ) : null}
    </Box>
  )
}
