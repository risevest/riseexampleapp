export interface PINInputProps {
  /**
   * to show pin in error state
   */
  error?: boolean

  /**
   * actual pin .
   */
  pin: string

  /**
   * to show pin .
   */
  showPIN?: boolean

  /**
   * to indicate when input is entered through the ui
   */
  validateOnInput?: boolean
}
