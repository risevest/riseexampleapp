export interface ExchangeRateModalProps {
  /**
   * Buy rate of the currency to be used in transaction .
   */
  buyRate: number

  /**
   * to indicate  currency rate.
   */
  currency: string

  /**
   * to indicate currency rate  symbol.
   */
  currencySymbol: string

  /**
   * visibilty of the modal .
   */
  isVisible: boolean

  /**
   * action to happen after dismissing the exchange rate modal
   */
  onDismiss?: () => void

  /**
   * function to be executed when button is pressed.
   */
  onPress?: () => void

  /**
   * Sell rate of the currency to be used in transaction .
   */
  sellRate: number

  /**
   * toggle visibility of the modal .
   */
  toggleVisibility: () => void
}

export interface ExchangeRateModalItemProps {
  /**
   * to indicate rate currency.
   */
  currencySymbol: string

  /**
   * rate.
   */
  rate: number

  /**
   * subtitle text.
   */
  subText: string

  /**
   * type of rate either "Buy" | "Sell".
   */
  type: 'Buy' | 'Sell'
}
