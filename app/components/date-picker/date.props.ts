import React from 'react'
import { TextStyle, View } from 'react-native'

export interface DateInputProps extends React.ComponentProps<typeof View> {
  /**
   * The default date.
   */
  defaultDate?: Date

  /**
   * A warning text useful when validating input
   */
  errorText?: string

  /**
   * A custom icon override
   */
  icon?: React.ReactNode

  /**
   * A placeholder for the field
   */
  label: string

  /**
   * An optional style for `label`
   */
  labelStyle?: TextStyle

  /**
   * The maximum selectable date
   */
  maximumDate?: Date

  /**
   * The minimum selectable date
   */
  minimumDate?: Date

  /**
   * A function that returns the selected date
   */
  onDateChange: (value: Date) => void
}
