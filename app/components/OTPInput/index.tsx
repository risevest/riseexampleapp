/* eslint-disable react-hooks/exhaustive-deps */
import Styles from 'app/design/Styles'
import * as React from 'react'
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View
} from 'react-native'

import { useOTPInputStyles } from './styles'

type IOtpInput = {
  error: string | boolean
  getOtpValues: (otpValues: any) => void
}

export default function OTPInput({ error, getOtpValues }: IOtpInput) {
  const refOne = React.createRef<TextInput>()
  const refTwo = React.createRef<TextInput>()
  const refThree = React.createRef<TextInput>()
  const refFour = React.createRef<TextInput>()
  const refFive = React.createRef<TextInput>()
  const refSix = React.createRef<TextInput>()

  const [otpState, setOtpState] = React.useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: ''
  })

  const { styles } = useOTPInputStyles()

  function onKeyReallyPressed(
    value: string,
    otpKey: string,
    prevRef: React.RefObject<TextInput>,
    nextRef: React.RefObject<TextInput>
  ) {
    // do the actual action of focusing next input
    if (nextRef === refTwo) {
      // This is the first input field
      if (
        value === 'Backspace' ||
        value.trim() === '' ||
        isNaN(Number(value))
      ) {
        setOtpState({ ...otpState, otp1: '' })
      } else {
        setOtpState({ ...otpState, otp1: value })
        refTwo.current?.focus()
      }
    } else if (otpKey === 'otp6') {
      // this is the 6th input field
      if (
        value === 'Backspace' ||
        value.trim() === '' ||
        isNaN(Number(value))
      ) {
        setOtpState({ ...otpState, otp6: '' })
        refFive.current?.focus()
      } else {
        setOtpState({ ...otpState, otp6: value })
      }
    } else {
      if (
        value === 'Backspace' ||
        value.trim() === '' ||
        isNaN(Number(value))
      ) {
        setOtpState({ ...otpState, [otpKey]: '' })
        prevRef.current?.focus()
      } else {
        setOtpState({ ...otpState, [otpKey]: value })
        nextRef.current?.focus()
      }
    }
  }

  function onChangeText(
    value: string,
    otpKey: string,
    prevRef: React.RefObject<TextInput>,
    nextRef: React.RefObject<TextInput>
  ) {
    // get the value
    onKeyReallyPressed(value, otpKey, prevRef, nextRef)
  }

  function onKeyPressInput(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    otpKey: string,
    prevRef: React.RefObject<TextInput>,
    nextRef: React.RefObject<TextInput>
  ) {
    const {
      nativeEvent: { key }
    } = event
    onKeyReallyPressed(key, otpKey, prevRef, nextRef)
  }

  function returnInputStyles() {
    return {
      ...styles.input,
      borderColor: error ? '#C81C1C' : 'rgba(8, 152, 160, 0.3)'
    }
  }

  React.useEffect(() => {
    getOtpValues(otpState)
  }, [otpState])

  const { otp1, otp2, otp3, otp4, otp5, otp6 } = otpState
  return (
    <View style={{ ...Styles.row }}>
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(value) => onChangeText(value, 'otp1', refOne, refTwo)}
        onKeyPress={(event) => onKeyPressInput(event, 'otp1', refOne, refTwo)}
        ref={refOne}
        style={returnInputStyles()}
        value={otp1}
      />
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(value) => onChangeText(value, 'otp2', refOne, refThree)}
        onKeyPress={(event) => onKeyPressInput(event, 'otp2', refOne, refThree)}
        ref={refTwo}
        style={returnInputStyles()}
        value={otp2}
      />
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(value) => onChangeText(value, 'otp3', refTwo, refFour)}
        onKeyPress={(event) => onKeyPressInput(event, 'otp3', refTwo, refFour)}
        ref={refThree}
        style={returnInputStyles()}
        value={otp3}
      />
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(value) => onChangeText(value, 'otp4', refThree, refFive)}
        onKeyPress={(event) =>
          onKeyPressInput(event, 'otp4', refThree, refFive)
        }
        ref={refFour}
        style={returnInputStyles()}
        value={otp4}
      />
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(value) => onChangeText(value, 'otp5', refFour, refSix)}
        onKeyPress={(event) => onKeyPressInput(event, 'otp5', refFour, refSix)}
        ref={refFive}
        style={returnInputStyles()}
        value={otp5}
      />
      <TextInput
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(value) => onChangeText(value, 'otp6', refFive, refSix)}
        onKeyPress={(event) => onKeyPressInput(event, 'otp6', refFive, refSix)}
        ref={refSix}
        style={returnInputStyles()}
        value={otp6}
      />
    </View>
  )
}
