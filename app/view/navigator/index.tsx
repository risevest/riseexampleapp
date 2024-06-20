import firebase from '@react-native-firebase/app'
import remoteConfig from '@react-native-firebase/remote-config'
import {
  createNavigationContainerRef,
  InitialState,
  LinkingOptions,
  NavigationContainer,
  PathConfigMap
} from '@react-navigation/native'
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack'
import { logoutUser } from 'app/redux/user/dispatchers'
import { useIsOnboarding } from 'app/store/settings'
import { tagScreenName } from 'app/utils/analytics'
import CustomerIO from 'app/utils/analytics/customer-io'
import React, { useEffect } from 'react'
import { Linking } from 'react-native'
import { SheetProvider } from 'react-native-actions-sheet'
import { MMKV } from 'react-native-mmkv'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'

import CreatePlan from '../App/Dashboard/create-plan'
import BVNStack from '../App/More/BVN/stack'
import BuildWealthStack from '../App/Plans/BuildWealth/stack'
import ViewAll from '../App/Plans/Future/AllPlans/View'
import PlanDetails from '../App/Plans/Future/PlanDetail/View'
import AssetClassStack from '../App/Plans/Future/PlanPortfolioTab/AssetClass/stack'
import GoalsPlanStack from '../App/Plans/Future/PlanPortfolioTab/goal-class/stack'
import AcceptDecline from '../App/Plans/GiftPlan/AcceptDecline'
import ForgotPasswordStack from '../authentication/forgot-password/stack'
import ResetPin from '../authentication/Pin/reset-pin'
import PinStack from '../authentication/Pin/stack'
import AppStack from './AppStack'
import { deepLinkingPrefixes } from './constants'
import { RootStackParamsList } from './types/root-stack'

const PERSISTENCE_KEY = 'NAVIGATION_STATE'
const Stack = createStackNavigator<RootStackParamsList>()
const mmkv = new MMKV({
  id: 'navigation-state'
})
export const navigationRef = createNavigationContainerRef<RootStackParamsList>()

const App = () => {
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled'
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then((_fetchedRemotely) => {
        /*
        if fetchedRemotely === true  then Configs were retrieved from the backend and activated.
        if  fetchedRemotely === false then 'No configs were fetched from the backend, and the local configs were already activated'
        */
        return
      })
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'card' }}
    >
      <Stack.Screen
        component={AppStack}
        name="App"
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}

export const pathConfigMap: PathConfigMap<RootStackParamsList> = {
  App: {
    // initialRouteName: 'AuthStack',
    screens: {
      AppStack: {
        screens: {
          AccountsAndCardsStack: {
            initialRouteName: ' AccountsAndCardsStack',
            screens: {
              SelectOption: 'account/banks-and-cards'
            }
          },
          AffiliateProgramStack: {
            initialRouteName: 'AffiliateProgramStack',
            screens: {
              AffiliateProgram: 'account/affiliates-and-referrals'
            }
          },
          DeleteAccount: 'delete-account',
          Home: {
            initialRouteName: 'Dashboard',
            screens: {
              Dashboard: 'dashboard',
              Feed: {
                initialRouteName: 'Feed',
                screens: {
                  Feed: 'feed',
                  SingleFeed: {
                    path: 'feed/:id'
                  }
                }
              },
              FutureWalletStack: {
                initialRouteName: 'Wallet',
                screens: {
                  WalletScreen: {
                    parse: {
                      virtual: (virtual: string) => Boolean(virtual)
                    },
                    path: 'wallet/:virtualCard'
                  },
                  wallet: 'wallet'
                }
              },
              PlansStack: {
                initialRouteName: 'Plans',
                screens: {
                  plans: 'plans'
                }
              }
            }
          },
          IDStack: {
            initialRouteName: 'IDStack',
            screens: {
              IDVerification: 'account/verification',
              ReSubmitFailedId: 'account/verification/:reference'
            }
          },
          Notifications: 'account/notifications',
          OnboardingSeries: 'onboarding-series',
          ProfileStack: {
            initialRouteName: 'ProfileStack',
            screens: {
              MoreInformation: 'account',
              Profile: 'account/profile/additional-information'
            }
          },
          WalletStack: {
            initialRouteName: 'AddMoney',
            screens: {
              AddMoney: 'wallet/fund-wallet'
            }
          }
        }
      },
      AuthStack: {
        screens: {
          EnterPhoneNumber: 'signup',
          Login: 'login'
        }
      }
    }
  }
}

const RootNavigator = () => {
  const homeLinking: LinkingOptions<RootStackParamsList> = {
    config: {
      /* configuration for matching screens with paths */
      screens: pathConfigMap
    },
    prefixes: deepLinkingPrefixes,
    subscribe: (listener) => {
      const onReceiveURL = ({ url }: { url: string }) => {
        listener(url)
      }

      // Listen to incoming links from deep linking
      const subscription = Linking.addEventListener('url', onReceiveURL)
      return () => {
        // Clean up the event listeners
        subscription.remove()
      }
    }
  }

  const routeNameRef = React.useRef<string | undefined>()

  const setCurrentRoute = () => {
    routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name
    dispatch(logoutUser())
    SplashScreen.hide()
  }

  const isUserStillOnboarding = useIsOnboarding()

  const [isReady, setIsReady] = React.useState(false)
  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >(undefined)

  const onStateChange: React.ComponentProps<
    typeof NavigationContainer
  >['onStateChange'] = async (state) => {
    if (isUserStillOnboarding) {
      mmkv.set(PERSISTENCE_KEY, JSON.stringify(state))
    }

    const previousRouteName = routeNameRef?.current
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name

    if (previousRouteName !== currentRouteName) {
      if (currentRouteName) {
        CustomerIO.tagScreen(currentRouteName)
      }
      if (firebase.app().utils().isRunningInTestLab) {
        firebase.analytics().setAnalyticsCollectionEnabled(false)
        return
      }

      tagScreenName(currentRouteName || '')
    }

    routeNameRef.current = currentRouteName
  }

  const dispatch = useDispatch()

  React.useEffect(() => {
    const restoreState = async () => {
      if (!isUserStillOnboarding) {
        setIsReady(true)
        return
      }

      try {
        const savedStateString = mmkv.getString(PERSISTENCE_KEY)
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined

        if (state !== undefined) {
          setInitialState(state)
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady, isUserStillOnboarding])

  if (!isReady) {
    return null
  }

  return (
    <NavigationContainer
      initialState={initialState}
      linking={homeLinking}
      onReady={setCurrentRoute}
      onStateChange={onStateChange}
      ref={navigationRef}
    >
      <SheetProvider>
        <App />
      </SheetProvider>
    </NavigationContainer>
  )
}

export default RootNavigator
