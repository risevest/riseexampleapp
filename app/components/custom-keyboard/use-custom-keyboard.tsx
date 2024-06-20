import Icon from 'app/assets/icons'
import { hapticFeedback } from 'app/utils'
import React, { useMemo, useState } from 'react'

import { CustomKeyboardProps } from './custom-keyboard.props'

const data = Array.from({ length: 12 }, (_, index) => {
  if (index === 9) {
    return {
      hide: true,
      value: '.'
    }
  }
  if (index === 11) {
    return {
      hide: false,
      icon: <Icon name="delete-dark" size={30} />,
      value: '<'
    } as const
  }
  return { hide: false, value: index === 10 ? `0` : `${index + 1}` }
})

export function useCustomKeyboard(props: Partial<CustomKeyboardProps>) {
  const {
    error,
    maxLength = 6,
    onChangeText,
    onInputComplete,
    showPIN = false,
    validateOnInput = true,
    iconBottomLeft,
    onIconBottomLeftPress,
    onIconBottomRightPress,
    iconBottomRight
  } = props
  const [value, setValue] = useState<string[]>([])
  const hasError = error && value.length >= maxLength
  const keypadData = useMemo(
    () =>
      data.map((item) => {
        if (item.value === '<' && iconBottomRight)
          return { ...item, icon: iconBottomRight }
        if (item.value === '.' && iconBottomLeft)
          return { ...item, hide: false, icon: iconBottomLeft }

        return item
      }),
    [iconBottomLeft, iconBottomRight]
  )

  const handleKeyPress = (action: string) => {
    hapticFeedback()

    if (action === '<') {
      if (onIconBottomRightPress) {
        onIconBottomRightPress()

        return
      }
      if (value.length === 0) return
      setValue((value_) => {
        const newValue = value_.slice(0, -1)
        if (onChangeText) {
          onChangeText(newValue.join(''))
        }
        return newValue
      })
      return
    }

    if (action === '.' && onIconBottomLeftPress) {
      onIconBottomLeftPress()
      return
    }

    setValue((value_) => {
      const newValue = value_.length < maxLength ? [...value_, action] : value_
      const valueString = newValue.join('')
      if (onChangeText && value_.length < maxLength) onChangeText(valueString)

      if (newValue.length === maxLength) {
        if (!hasError) onInputComplete?.(valueString)
      }

      return newValue
    })
  }

  const borderColor = (input: string) => {
    if (hasError) {
      return 'red'
    } else if ((showPIN || validateOnInput) && input) {
      return 'teal001'
    } else {
      return 'lightStroke'
    }
  }

  const isFilled = (index: number) => value.length >= index + 1

  return { borderColor, handleKeyPress, hasError, isFilled, keypadData, value }
}
