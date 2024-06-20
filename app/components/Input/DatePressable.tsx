import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import RNDatePicker from 'react-native-modal-datetime-picker'

interface Props extends TouchableOpacityProps {
  Icon: any
  getDate: (date: Date) => void
  hasIcon: boolean
  inputStyle?: any
  minimumDate: Date
  placeHolderText: string
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'DMSans-Medium',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 18,
    opacity: 0.8
  },
  leftContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  numericInputLabel: {
    paddingLeft: 10,
    paddingRight: 14,
    position: 'absolute',
    top: -13
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(230, 245, 246, 0.2)',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between',
    marginTop: 35,
    paddingHorizontal: 15
  }
})

export const DatePressable = ({
  inputStyle = {},
  getDate,
  hasIcon,
  Icon,
  placeHolderText,
  minimumDate,
  ...rest
}: Props) => {
  const { theme } = useTheme() as UseTheme
  const [date, setDate] = React.useState(minimumDate)
  const [datePickerVisible, setDatepickerVisibility] = React.useState(false)

  const toggleDatePicker = () => {
    setDatepickerVisibility(!datePickerVisible)
  }

  const exposeDate = React.useCallback(() => {
    getDate(date)
  }, [date, getDate])

  React.useEffect(() => {
    exposeDate()
  }, [date, exposeDate])
  const hideDatePicker = () => {
    setDatepickerVisibility(false)
  }

  return (
    <>
      <TouchableOpacity
        onPress={toggleDatePicker}
        style={[
          styles.wrapper,
          { borderColor: theme.primaryColor, ...inputStyle }
        ]}
        {...rest}
      >
        <P
          style={{ color: theme.tertiaryColor }}
          text={placeHolderText || ''}
        />
        {hasIcon && Icon(toggleDatePicker)}
      </TouchableOpacity>
      <RNDatePicker
        date={date}
        isVisible={datePickerVisible}
        minimumDate={minimumDate}
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={(selectedDate: Date) => {
          setDate(selectedDate)
          hideDatePicker()
        }}
      />
    </>
  )
}
