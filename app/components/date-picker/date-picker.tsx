import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { getComputedWidth as gw } from 'app/design'
import { useToggle } from 'app/hooks'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import DateInput from 'react-native-modal-datetime-picker'

import { DateInputProps } from './date.props'

export function DatePicker(props: DateInputProps) {
  // component props
  const {
    defaultDate,
    label,
    labelStyle,
    icon,
    errorText,
    style,
    minimumDate,
    maximumDate,
    onDateChange,
    ...restOfProps
  } = props

  const [canShowDate, { on, off }] = useToggle(false)
  const [date, setDate] = useState(defaultDate ?? new Date())

  // pass the selected date to the parent component
  const handleDate = (value: Date) => {
    setDate(value)
    onDateChange(value)
    off()
  }

  return (
    <Pressable onPress={on} style={style}>
      <Box
        alignItems="center"
        borderColor={errorText ? 'red' : 'offWhiteLight'}
        borderRadius={gw(6)}
        borderWidth={1}
        flexDirection="row"
        {...restOfProps}
      >
        <Box flex={1} padding={gw(16)}>
          <Text color="soft-tect" style={labelStyle} variant="button-15-bold">
            {label}
          </Text>
        </Box>

        {icon ? (
          <Box paddingHorizontal={gw(12)}>{icon}</Box>
        ) : (
          <Box paddingHorizontal={gw(12)}>
            <Icon name="calendar" size={gw(24)} />
          </Box>
        )}
      </Box>

      {!!errorText && (
        <Text
          color="red"
          fontWeight="bold"
          marginLeft="s"
          marginTop="s"
          variant="reg-14-text"
        >
          {errorText}
        </Text>
      )}

      <DateInput
        date={date}
        isVisible={canShowDate}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        mode="date"
        onCancel={off}
        onConfirm={handleDate}
      />
    </Pressable>
  )
}
