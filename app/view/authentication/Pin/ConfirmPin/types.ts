export interface IConfirmPin extends INavigationProps {
  handlePinCreation: (pin: string) => void
  loading: boolean
}
