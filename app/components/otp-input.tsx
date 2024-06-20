import Clipboard from '@react-native-clipboard/clipboard'
import { Box, useTheme } from '@risemaxi/sarcelle'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardType,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'

interface OTPInputProps {
  Error?: ReactElement
  autoFocusOnLoad?: boolean
  clearInputs?: boolean
  code?: string
  codeInputFieldStyle?: TextStyle
  codeInputHighlightStyle?: TextStyle
  containerProps?: React.ComponentProps<typeof Box>
  defaultInputBorderColor?: string
  editable?: boolean
  error?: string
  hasError?: boolean
  keyboardAppearance?: 'default' | 'dark' | 'light'
  keyboardType?: KeyboardType
  onCodeChanged?: (code: string) => void
  onCodeFilled?: (code: string) => void
  pinCount: number
  placeholderCharacter?: string
  placeholderTextColor?: string
  secureTextEntry?: boolean
  selectionColor?: string
  spaceBetweenInput?: number
}

const pressableStyle: ViewStyle = {
  width: '100%'
}
const osVersion = parseInt(String(Platform.Version), 10)
const isAutoFillSupported = Platform.OS === 'ios' && osVersion >= 12

export default function OTPInput(props: OTPInputProps) {
  const theme = useTheme()

  const {
    autoFocusOnLoad = true,
    clearInputs = false,
    code = '',
    codeInputFieldStyle,
    codeInputHighlightStyle,
    containerProps,
    editable = true,
    hasError,
    keyboardAppearance = 'default',
    keyboardType = 'number-pad',
    onCodeChanged,
    onCodeFilled,
    pinCount = 6,
    placeholderCharacter = '',
    placeholderTextColor,
    secureTextEntry = false,
    selectionColor,
    spaceBetweenInput,
    defaultInputBorderColor = theme.colors.primary,
    Error
  } = props

  const fields = useRef<TextInput[] | null[]>([])
  const timer = useRef<NodeJS.Timeout>()
  const hasCheckedClipBoard = useRef<boolean>()
  const clipBoardCode = useRef<string>()
  const [digits, setDigits] = useState([...code])
  const [selectedIndex, setSelectedIndex] = useState(autoFocusOnLoad ? 0 : -1)

  const getDigits = () => (!code ? digits : [...code])
  const notifyCodeChanged = () => {
    const code_ = digits.join('')
    if (onCodeChanged) {
      onCodeChanged(code_)
    }
  }
  const handleChangeText = (index: number, text: string) => {
    const digits_ = getDigits()
    let newDigits = [...digits_]
    const oldTextLength = newDigits[index] ? newDigits[index].length : 0
    const newTextLength = text.length
    if (newTextLength - oldTextLength === pinCount) {
      newDigits = [...text].slice(oldTextLength, newTextLength)
      setDigits(newDigits)
      notifyCodeChanged()
    } else {
      if (text.length === 0) {
        if (newDigits.length > 0) {
          newDigits = newDigits.slice(0, -1)
        }
      } else {
        for (const value of text) {
          if (index < pinCount) {
            newDigits[index] = value
            index += 1
          }
        }
        index -= 1
      }
      setDigits(newDigits)
      notifyCodeChanged()
    }

    const result = newDigits.join('')
    if (result.length >= pinCount) {
      onCodeFilled?.(result)
      focusField(pinCount - 1)
      blurAllFields()
    } else if (text.length > 0 && index < pinCount - 1) {
      focusField(index + 1)
    }
  }
  const handleKeyPressTextInput = (index: number, key: string) => {
    const digits_ = getDigits()

    if (key !== 'Backspace') return
    if (!digits_[index] && index > 0) {
      handleChangeText(index - 1, '')
      focusField(index - 1)
    }
  }
  const focusField = (index: number) => {
    if (index < fields.current.length) {
      const field = fields.current?.[index]
      field?.focus()
      setSelectedIndex(index)
    }
  }
  const blurAllFields = () => {
    fields.current.forEach((field) => field?.blur())
    setSelectedIndex(-1)
  }
  const clearAllFields = () => {
    if (clearInputs && code === '') {
      setDigits([])
      setSelectedIndex(0)
    }
  }
  const onInputPress = () => {
    const digits_ = getDigits()
    if (clearInputs) {
      clearAllFields()
      focusField(0)
    } else {
      const filledPinCount = digits_.filter(
        (digit) => digit !== null && digit !== undefined
      ).length
      focusField(Math.min(filledPinCount, pinCount - 1))
    }
  }

  const getBorderColor = (index: number) => {
    switch (true) {
      case hasError && digits.length >= pinCount:
        return theme.colors.red
      case digits.length >= index:
        return theme.colors.primary
      default:
        return defaultInputBorderColor
    }
  }

  const getInputStyle = (index: number) => {
    const defaultStyle: TextStyle = {
      borderColor: getBorderColor(index),
      borderRadius: 5,
      borderWidth: 1,
      color: theme.colors.black,
      height: 42,
      textAlign: 'center',
      width: 42
    }
    const style =
      selectedIndex === index
        ? [defaultStyle, codeInputFieldStyle, codeInputHighlightStyle]
        : [defaultStyle, codeInputFieldStyle]

    return StyleSheet.flatten(style)
  }
  const selectIndex = (index: number) => {
    if (index >= 0) {
      fields.current[index]?.focus()
      setSelectedIndex(index)
    }
  }
  const fillInCode = (otpCode: string) => {
    setDigits([...otpCode])
    selectIndex(pinCount - 1)
    notifyCodeChanged()
    onCodeFilled?.(otpCode)
  }
  const checkPinCodeFromClipBoard = async () => {
    const regexp = new RegExp(`^\\d{${pinCount}}$`)
    try {
      const code_ = await Clipboard.getString()
      if (
        hasCheckedClipBoard.current &&
        regexp.test(code_) &&
        clipBoardCode.current !== code_
      ) {
        fillInCode(code_)
      }
      clipBoardCode.current = code_
      hasCheckedClipBoard.current = true
    } catch {}
  }
  const copyCodeFromClipBoardOnAndroid = () => {
    if (Platform.OS === 'android') {
      checkPinCodeFromClipBoard()
      timer.current = setInterval(checkPinCodeFromClipBoard, 400)
    }
  }
  const bringUpKeyBoardIfNeeded = () => {
    const digits_ = getDigits()
    const focusIndex = digits_.length > 0 ? digits_.length - 1 : 0
    if (focusIndex < pinCount && autoFocusOnLoad) {
      focusField(focusIndex)
    }
  }

  const tryPaste = async () => {
    const regexp = new RegExp(`^\\d{${pinCount}}$`)
    try {
      let clipboardString = await Clipboard.getString()
      if (clipboardString) {
        const code_ = clipboardString.trim()
        if (regexp.test(code_)) {
          Alert.alert('Paste code', `Paste OTP ${code_} from clipboard`, [
            {
              text: 'Cancel'
            },
            {
              onPress: () => {
                fillInCode(code_)
              },
              text: 'Paste'
            }
          ])
        }
      }
    } catch (err) {
      // fail silently
    }
  }

  useEffect(() => {
    copyCodeFromClipBoardOnAndroid()
    bringUpKeyBoardIfNeeded()

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setDigits([...code])
  }, [code])

  useEffect(() => {
    const kListener = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'android') {
        Keyboard.dismiss()
      }
    })

    return () => {
      kListener.remove()
    }
  }, [])

  return (
    <Pressable onPress={onInputPress} style={pressableStyle}>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        {...containerProps}
      >
        {Array.from({ length: pinCount }).map((_, index) => (
          <TouchableOpacity
            key={`${index}view`}
            onLongPress={tryPaste}
            onPress={() => {
              if (digits.length >= index) {
                selectIndex(index)
              }
            }}
          >
            <Box
              pointerEvents="none"
              style={{ marginRight: spaceBetweenInput }}
            >
              <TextInput
                autoFocus={index === 0 ? true : false}
                editable={editable}
                key={index}
                keyboardAppearance={keyboardAppearance}
                keyboardType={keyboardType}
                onChangeText={(text) => {
                  handleChangeText(index, text)
                }}
                onKeyPress={({ nativeEvent: { key } }) => {
                  handleKeyPressTextInput(index, key)
                }}
                placeholder={placeholderCharacter}
                placeholderTextColor={
                  placeholderTextColor || codeInputFieldStyle?.color
                }
                ref={(ref) => {
                  fields.current[index] = ref
                }}
                secureTextEntry={secureTextEntry}
                selectionColor={selectionColor || theme.colors.primary}
                style={getInputStyle(index)}
                textContentType={isAutoFillSupported ? 'oneTimeCode' : 'none'}
                value={clearInputs ? '' : digits[index]}
              />
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
      {hasError && Error && <Box marginTop={10}>{Error}</Box>}
    </Pressable>
  )
}
