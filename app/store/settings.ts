import { SignUpPayload } from 'app/domains/auth/types'
import { SelectedState } from 'app/view/App/Dashboard/sections/add-money-modal'
import { CountryCallingCode } from 'libphonenumber-js'
import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

const mmkv = new MMKV({
  id: 'user-settings'
})

const persistStorage: StateStorage = {
  getItem: (name) => {
    const value = mmkv.getString(name)
    return value ?? null
  },
  removeItem: (name) => mmkv.delete(name),
  setItem: (name, value) => mmkv.set(name, value)
}

type Country = { country: string }
type SavedProps = Partial<
  Pick<
    SignUpPayload,
    | 'firstName'
    | 'lastName'
    | 'emailAddress'
    | 'phoneNumber'
    | 'dateOfBirth'
    | 'newsletterSubscribed'
    | 'password'
    | 'transactionPin'
  > &
    Country & {
      authorizationToken: string
      phoneCountryCode: CountryCallingCode
      reference: string
      token: string
    }
>

type HAPPY_ACTIONS = 'fund_plan' | 'fund_virtual_card'

interface SettingsState {
  appsFlyerLinkState: { count: number; link: string | null }
  fcmInitialNotificationState?: {
    targetId?: number
    targetType?: string
    targetUrl?: string
  }
  happyActionsCount: { fund_plan: number; fund_virtual_card: number }
  hasPin: boolean
  hasSeenIntroScreen: boolean
  hasSeenNairaWalletIntro: boolean
  hasSeenShakeToChat: boolean
  inactiveTimestamp: string | null
  isOnboarding: boolean
  lastRatingDate: string | null
  lastUsedFundingCurrency: string | null
  lastUsedFundingWallet: SelectedState
  lastWalletInterestDate: string | null
  maturedPlan: string | null
  newSignUp?: boolean
  savedOnboardingProps?: SavedProps
  userBalanceVisibility: boolean
}

interface SettingsActions {
  setAppsFlyerLinkState: (linkData: string | null) => void
  setFcmInitialNotificationState: (
    fcmInitialNotificationState: SettingsState['fcmInitialNotificationState']
  ) => void
  setHappyActionsCount: (action: HAPPY_ACTIONS, count: number) => void
  setHasPin: (hasPin: boolean) => void
  setHasSeenIntroScreen: (hasCompletedOnboarding: boolean) => void
  setHasSeenNairaWalletIntro: (hasCompletedOnboarding: boolean) => void
  setHasSeenShakeToChat: (hasSeenShakeToChat: boolean) => void
  setInactiveTimestamp: () => void
  setIsNewSignUp: (newSignUp: boolean) => void
  setIsOnboarding: (isOnboarding: boolean) => void
  setLastRatingDate: (date: string) => void
  setLastUsedFundingCurrency: (currency: string) => void
  setLastUsedFundingWallet: (wallet: SelectedState) => void
  setLastWalletInterestDate: (date: string) => void
  setMaturedPlan: (maturedPlan: string | null) => void
  setSavedOnboardingProps: (props: SavedProps | undefined) => void
  toggleWalletBalanceDisplay: () => void
}

const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set, get) => ({
      appsFlyerLinkState: { count: 0, link: null },
      happyActionsCount: { fund_plan: 0, fund_virtual_card: 0 },
      hasPin: false,
      hasSeenIntroScreen: false as boolean,
      hasSeenNairaWalletIntro: false as boolean,
      hasSeenShakeToChat: false as boolean,
      inactiveTimestamp: null,
      isOnboarding: false,
      lastRatingDate: null,
      lastUsedFundingCurrency: null,
      lastUsedFundingWallet: 'usd wallet',
      lastWalletInterestDate: null,
      maturedPlan: null,
      newSignUp: false,
      setAppsFlyerLinkState: (linkData: string | null) => {
        set((s) => ({
          appsFlyerLinkState: {
            count:
              linkData === s.appsFlyerLinkState.link
                ? s.appsFlyerLinkState.count + 1
                : 1,
            link: linkData
          }
        }))
      },
      setFcmInitialNotificationState: (
        fcmInitialNotificationState: SettingsState['fcmInitialNotificationState']
      ) => {
        set({ fcmInitialNotificationState })
      },
      setHappyActionsCount: (action: HAPPY_ACTIONS, count: number) => {
        set({
          happyActionsCount: { ...get().happyActionsCount, [action]: count }
        })
      },
      setHasPin: (hasPin: boolean) => {
        set({ hasPin })
      },
      setHasSeenIntroScreen: (hasSeenIntroScreen) => {
        set({ hasSeenIntroScreen })
      },
      setHasSeenNairaWalletIntro: (hasSeenNairaWalletIntro) => {
        set({ hasSeenNairaWalletIntro })
      },
      setHasSeenShakeToChat: (hasSeenShakeToChat) => {
        set({ hasSeenShakeToChat })
      },
      setInactiveTimestamp: () => {
        const date = new Date().toISOString()
        set({ inactiveTimestamp: date })
      },
      setIsNewSignUp: (newSignUp: boolean) => {
        set({ newSignUp })
      },
      setIsOnboarding: (isOnboarding) => {
        set({ isOnboarding })
      },
      setLastRatingDate: (date: string) => {
        set({ lastRatingDate: date })
      },
      setLastUsedFundingCurrency: (currency: string) => {
        set({ lastUsedFundingCurrency: currency })
      },
      setLastUsedFundingWallet: (wallet: SelectedState) => {
        set({ lastUsedFundingWallet: wallet })
      },
      setLastWalletInterestDate: (date: string) => {
        set({ lastWalletInterestDate: date })
      },
      setMaturedPlan: (maturedPlan: string | null) => {
        set({ maturedPlan })
      },
      setSavedOnboardingProps: (props) => {
        set({
          savedOnboardingProps: { ...get().savedOnboardingProps, ...props }
        })
      },
      toggleWalletBalanceDisplay: () => {
        set({ userBalanceVisibility: !get().userBalanceVisibility })
      },
      userBalanceVisibility: true
    }),
    {
      name: 'settings-store',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['newSignUp', 'appsFlyerLinkState'].includes(key)
          )
        ),
      storage: createJSONStorage(() => persistStorage),
      version: 1
    }
  )
)

export function useIsOnboarding() {
  return useSettingsStore((state) => state.isOnboarding)
}

export function useIsNewSignUp() {
  return useSettingsStore((state) => state.newSignUp)
}

export function useSavedOnboardingProps() {
  return useSettingsStore((state) => state.savedOnboardingProps)
}

export function useBalanceVisibility() {
  return useSettingsStore((state) => state.userBalanceVisibility)
}

export function useUserHasSeenIntroScreen() {
  return useSettingsStore((state) => state.hasSeenIntroScreen)
}

export function useUserHasSeenNairaWalletIntro() {
  return useSettingsStore((state) => state.hasSeenNairaWalletIntro)
}

export function useUserHasSeenShakeToChat() {
  return useSettingsStore((state) => state.hasSeenShakeToChat)
}

export function useUserHasPin() {
  return useSettingsStore((state) => state.hasPin)
}

export function useInactiveTimestamp() {
  return useSettingsStore((state) => state.inactiveTimestamp)
}

export function useGetLastRatingDate() {
  return useSettingsStore((state) => state.lastRatingDate)
}

export function useGetHappyActionsCount() {
  return useSettingsStore((state) => state.happyActionsCount)
}

export function useGetMaturedPlan() {
  return useSettingsStore((state) => state.maturedPlan)
}

export function useGetLastWalletInterestDate() {
  return useSettingsStore((state) => state.lastWalletInterestDate)
}
export function useLastUsedFundingCurrency() {
  return useSettingsStore((state) => state.lastUsedFundingCurrency)
}

export function useAppsFlyerLinkState() {
  return useSettingsStore((state) => state.appsFlyerLinkState)
}

export function useFcmInitialNotificationState() {
  return useSettingsStore((state) => state.fcmInitialNotificationState)
}

export function useSettingsActions() {
  return useSettingsStore((state) => {
    return {
      setAppsFlyerLinkState: state.setAppsFlyerLinkState,
      setFcmInitialNotificationState: state.setFcmInitialNotificationState,
      setHappyActionsCount: state.setHappyActionsCount,
      setHasPin: state.setHasPin,
      setHasSeenIntroScreen: state.setHasSeenIntroScreen,
      setHasSeenNairaWalletIntro: state.setHasSeenNairaWalletIntro,
      setHasSeenShakeToChat: state.setHasSeenShakeToChat,
      setInactiveTimestamp: state.setInactiveTimestamp,
      setIsNewSignUp: state.setIsNewSignUp,
      setIsOnboarding: state.setIsOnboarding,
      setLastRatingDate: state.setLastRatingDate,
      setLastUsedFundingCurrency: state.setLastUsedFundingCurrency,
      setLastUsedFundingWallet: state.setLastUsedFundingWallet,
      setLastWalletInterestDate: state.setLastWalletInterestDate,
      setSavedOnboardingProps: state.setSavedOnboardingProps,
      toggleWalletBalanceDisplay: state.toggleWalletBalanceDisplay
    }
  })
}

// raw fns, don't use unless necessary
export function getInactiveTimestamp() {
  return useSettingsStore.getState().inactiveTimestamp
}

export function toggleWalletBalanceDisplay() {
  return useSettingsStore.getState().toggleWalletBalanceDisplay()
}

export function setHasPin(hasPin: boolean) {
  return useSettingsStore.getState().setHasPin(hasPin)
}

export function getIsNewSignUp() {
  return useSettingsStore.getState().newSignUp
}

export function getHasSeenIntroScreen() {
  return useSettingsStore.getState().hasSeenIntroScreen
}

export function getHasSeenNairaWalletIntro() {
  return useSettingsStore.getState().hasSeenNairaWalletIntro
}

export function getLastUsedFundingWallet() {
  return useSettingsStore.getState().lastUsedFundingWallet
}

export function setHasSeenIntroScreen(hasCompletedOnboarding: boolean) {
  return useSettingsStore
    .getState()
    .setHasSeenIntroScreen(hasCompletedOnboarding)
}

export function setHasSeenNairaWalletIntro(hasCompletedOnboarding: boolean) {
  return useSettingsStore
    .getState()
    .setHasSeenNairaWalletIntro(hasCompletedOnboarding)
}

export function setInactiveTimestamp() {
  return useSettingsStore.getState().setInactiveTimestamp()
}

export function setLastRatingDate(date: string) {
  return useSettingsStore.getState().setLastRatingDate(date)
}

export function setHappyActionsCount(action: HAPPY_ACTIONS, count: number) {
  return useSettingsStore.getState().setHappyActionsCount(action, count)
}

export function setMaturedPlan(maturedPlan: string | null) {
  return useSettingsStore.getState().setMaturedPlan(maturedPlan)
}

export function setLastWalletInterestDate(date: string) {
  return useSettingsStore.getState().setLastWalletInterestDate(date)
}
export function setLastUsedFundingCurrency(currency: string) {
  return useSettingsStore.getState().setLastUsedFundingCurrency(currency)
}

export function setAppsFlyerLinkState(linkData: string | null) {
  return useSettingsStore.getState().setAppsFlyerLinkState(linkData)
}
export function setFcmInitialNotificationState(
  initialState: SettingsState['fcmInitialNotificationState']
) {
  return useSettingsStore
    .getState()
    .setFcmInitialNotificationState(initialState)
}

export function getAppsFlyerLinkState() {
  return useSettingsStore.getState().appsFlyerLinkState
}
export function setLastUsedFundingWallet(wallet: SelectedState) {
  return useSettingsStore.getState().setLastUsedFundingWallet(wallet)
}

// please don't use
