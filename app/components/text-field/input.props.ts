import { ICountriesData } from 'app/utils/countriesData'
import React from 'react'
import { TextInput, TextStyle } from 'react-native'

export interface TextFieldProps extends React.ComponentProps<typeof TextInput> {
  /**
   * A warning text useful when validating input
   */
  errorText?: string

  getCountry?: (country?: ICountriesData) => void

  /**
   * A component displayed in the input field. useful when a desired icon is not available the icon library
   */
  icon?: React.ReactNode

  /**
   * The name of the an icon available in the icon library
   */
  iconName?: string

  /**
   * An animated placeholder that transitions to the border on focus
   */
  label?: string

  /**
   * An optional style for `label`
   */
  labelStyle?: TextStyle

  /**
   * The input field type
   */
  preset: 'default' | 'password' | 'phone-number'

  /**
   * A reference to the input field. useful for toggling field focus
   */
  refs?: React.RefObject<TextInput>

  /**
   * Remove it from uxcam view
   */
  sensitiveField?: boolean

  touched?: boolean
}
