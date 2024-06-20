import {
  useBalanceVisibility,
  useInactiveTimestamp,
  useSettingsActions
} from 'app/store/settings'

export function useSettings() {
  const userBalanceVisibility = useBalanceVisibility()
  const inactiveTimestamp = useInactiveTimestamp()
  const { toggleWalletBalanceDisplay, setInactiveTimestamp } =
    useSettingsActions()

  return {
    inactiveTimestamp,
    isWalletBalanceVisible: userBalanceVisibility,
    setInactiveTimestamp,
    toggleWalletBalanceDisplay
  }
}
