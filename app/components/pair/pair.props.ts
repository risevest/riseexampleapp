import { ReactElement } from 'react'

export interface PairProps {
  customValueElement?: ReactElement

  /**
   * label value to display .
   */
  label: string

  /**
   * indicator to show bottom border
   */
  showBorder?: boolean

  /**
   * value to display .
   */
  value?: string
}
