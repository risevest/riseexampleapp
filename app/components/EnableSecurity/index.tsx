import Lock from 'app/assets/icons/svg/lock.svg'
import { Button, RadioButton } from 'app/components'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import { useToggle } from 'app/hooks'
import { getIsNewSignUp, useSettingsActions } from 'app/store/settings'
import { VerifyNumberModal } from 'app/view/App/Dashboard/sections/verify-number'
import { WelcomeLetterModal } from 'app/view/App/Dashboard/welcome-letter'
import * as React from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'

import {
  fetchItemFromStorage,
  setItemToStorage
} from '../../utils/asyncstorage'
import { DynamicModal } from '../dynamic-modal/dynamic-modal'
import { toastMethods } from '../toast'

interface EnableSecurityProps {
  phoneNumberVerified: boolean
}

const EnableSecurity = ({ phoneNumberVerified }: EnableSecurityProps) => {
  const { theme } = useTheme() as UseTheme
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [isVisible, { on, off }] = useToggle()
  const { setIsNewSignUp } = useSettingsActions()
  const isNewSignUp = getIsNewSignUp()
  const [newSignUpModal, { off: offNewSignUp, on: onNewSignUpModal }] =
    useToggle()

  const close = async () => {
    setIsNewSignUp(false)
    offNewSignUp()
    const loginOption = await fetchItemFromStorage('loginOption', 'password')
    const securityModalClosed = await fetchItemFromStorage(
      'securityModalClosed'
    )
    const isSecurityModalClosed = JSON.parse(securityModalClosed ?? 'false')
    if (loginOption === 'password' && !isSecurityModalClosed) {
      setTimeout(() => {
        setModalOpen(true)
      }, 1000)
    }
  }

  const hasRanEffect = React.useRef(false)

  const [option, setOption] = React.useState('')

  const notifyAction = async () => {
    await setItemToStorage('securityModalClosed', 'true')
    setTimeout(() => {
      toastMethods.show({
        autoHide: false,
        props: {
          contentProps: {
            description:
              "You'll have to sign in with your email and password every time \n\nTo turn on your Rise PIN, go to More > Security",
            icon: 'alert-announcement',
            title: 'Manual sign in'
          }
        },
        type: 'alert'
      })
    }, 500)
  }

  const pickOption = (opt: 'pin' | 'pin-bio') => {
    setOption(opt)
  }

  const setSecurityOption = async () => {
    if (option === 'pin') {
      await setItemToStorage('loginOption', 'pin')
    } else if (option === 'pin-bio') {
      await setItemToStorage('loginOption', 'biometrics')
    }

    await setItemToStorage('securityModalClosed', 'true')
    setModalOpen(false)
  }

  React.useEffect(() => {
    const securityModal = async () => {
      try {
        const loginOption = await fetchItemFromStorage(
          'loginOption',
          'password'
        )

        const securityModalClosed = await fetchItemFromStorage(
          'securityModalClosed'
        )

        const isSecurityModalClosed = JSON.parse(securityModalClosed ?? 'false')

        if (isNewSignUp) {
          onNewSignUpModal()
        } else if (loginOption === 'password' && !isSecurityModalClosed) {
          setModalOpen(true)
        } else {
          if (!phoneNumberVerified) {
            on()
          }
        }
      } catch (error) {}
    }
    if (hasRanEffect.current) {
      return
    }

    securityModal()
    hasRanEffect.current = true
  }, [isNewSignUp, on, onNewSignUpModal, phoneNumberVerified])

  return (
    <>
      <WelcomeLetterModal close={close} isVisible={newSignUpModal} />
      <VerifyNumberModal close={off} isVisible={isVisible} />
      <DynamicModal
        headerText="Enable Security"
        height={420}
        isModalOpen={isModalOpen}
        toggleModalVisibility={() => {
          setModalOpen(false)
          notifyAction()
        }}
        type="fixedHeight"
      >
        <View>
          <Lock height={71} style={LOCK} width={71} />
          <P
            fontsize={15}
            fontWeight="300"
            style={HELPER_TEXT}
            text="Sign in and confirm transactions with your phone's fingerprint/facial recognition and Rise PIN"
          />
          <View style={[RADIO_BUTTON_CONTAINER, RADIO_BUTTON_CONTAINER_2]}>
            <RadioButton
              checked={option === 'pin-bio'}
              onPress={() => pickOption('pin-bio')}
              text="Rise PIN & Biometrics"
              textStyle={RADIO_BUTTON_TEXT}
            />
          </View>
          <View style={RADIO_BUTTON_CONTAINER}>
            <RadioButton
              checked={option === 'pin'}
              onPress={() => pickOption('pin')}
              text="Rise PIN only"
              textStyle={RADIO_BUTTON_TEXT}
            />
          </View>
          <Button
            buttonStyle={BUTTON_STYLE}
            buttonText={`Enable ${
              option === 'pin-bio'
                ? 'PIN & Biometrics'
                : option === 'pin'
                  ? 'PIN'
                  : ''
            }`}
            disabled={option === ''}
            onPress={setSecurityOption}
            textColor={theme.primarySurface}
            variant="primary"
          />
        </View>
      </DynamicModal>
    </>
  )
}

const LOCK: ViewStyle = { alignSelf: 'center', marginVertical: 20 }

const HELPER_TEXT: TextStyle = { marginBottom: 15, textAlign: 'center' }

const RADIO_BUTTON_CONTAINER = { marginHorizontal: 20 }

const RADIO_BUTTON_CONTAINER_2 = { marginBottom: 10 }

const RADIO_BUTTON_TEXT: TextStyle = {
  fontSize: 15,
  marginLeft: 15,
  marginTop: -2
}

const BUTTON_STYLE: ViewStyle = { marginTop: 30 }

export default EnableSecurity
