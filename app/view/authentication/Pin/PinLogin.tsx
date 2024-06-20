/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { Container } from 'app/components'
import CustomKeyboard from 'app/components/custom-keyboard/custom-keyboard'
import { getPIN, savePIN } from 'app/internals/pin.keychain'
import { selectAppUser } from 'app/redux/user/selector'
import { useSettingsActions } from 'app/store/settings'
import { handleAnalyticsAuthentication, logEvent } from 'app/utils/analytics'
import { getEmoji } from 'app/utils/utilFunctions'
import { AuthStackScreenProps } from 'app/view/navigator/types/auth-stack'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { usePinLoginMutation } from '../../../hooks/mutations/auth'
import { setToken } from '../../../redux/user/actionCreators'

const PinLogin = ({ navigation }: AuthStackScreenProps<'PinLogin'>) => {
  const user = useSelector(selectAppUser)
  const { setHasPin } = useSettingsActions()

  const handleSuccessfulLogin = (session: {
    hasCompletedSignup: boolean
    token: string
  }) => {
    // this is what actually logs the user in
    dispatch(setToken({ token: session.token }))
  }

  const pinMutation = usePinLoginMutation()
  const dispatch = useDispatch()
  const handlePinLogin = React.useCallback(
    async (userPin: string) => {
      const pinCredentials = await getPIN()
      if (!pinCredentials) {
        await savePIN(userPin)
        setHasPin(true)
      }
      pinMutation.mutate(
        { email: user?.email, pin: userPin },
        {
          onSuccess: (session) => {
            handleSuccessfulLogin(session)
            handleAnalyticsAuthentication(session?.uuid, user?.email)
            logEvent('login', {
              login_method: 'pin',
              origin_screen_name: 'pin login'
            })
          }
        }
      )
    },
    [dispatch, navigation]
  )

  const onInputComplete = (pin: string) => {
    handlePinLogin(pin)
  }

  return (
    <Container>
      <Box
        flex={1}
        justifyContent="space-between"
        paddingBottom={20}
        paddingHorizontal={20}
      >
        <Box mt="l">
          <Icon
            name="back-icon"
            onPress={() => navigation?.navigate('Login')}
            size={36}
          />
          <Text mt="l" variant="header-h2-20-medium">{`Welcome back, ${
            user?.username || user?.firstName
          } ${getEmoji('bow')}`}</Text>
          <Box marginTop={11}>
            <Text color="soft-tect" variant="body-15-regular">
              Enter your PIN to sign in
            </Text>
          </Box>
        </Box>
        <CustomKeyboard
          description={
            <Box alignSelf="flex-start" marginTop={61}>
              <Text
                color="teal001"
                onPress={() => navigation?.navigate('ResetPin')}
                variant="button-15-bold"
              >
                Forgot PIN?
              </Text>
            </Box>
          }
          disabled={pinMutation.isLoading}
          marginBottom="xl"
          marginTop="l"
          onInputComplete={onInputComplete}
        />
      </Box>
    </Container>
  )
}

export default PinLogin
