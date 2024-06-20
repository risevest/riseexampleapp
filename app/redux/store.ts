import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore
} from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import { cardsReducer } from './card/reducer'
import { challengeReducer } from './challenge/reducer'
import { errorReducer } from './error/reducer'
import { feedsReducer } from './feeds/reducer'
import miscReducer from './misc/misc.reducer'
import { notificationReducer } from './notification/reducer'
import { planReducer } from './plan/reducer'
import { portfolioReducer } from './portfolio/reducer'
import { serverNotificationsReducer } from './server-notifications/reducer'
import { transactionReducer } from './transaction/reducer'
import { AppState } from './types'
import { userReducer } from './user/reducer'
import { USER_ACTION_TYPES } from './user/types'
import virtualAccountReducer from './virtual-account/virtual-account.reducer'
import { walletReducer } from './wallet/reducer'

const persistConfig = {
  blacklist: ['error', 'notification'],
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'misc', 'virtualAccount']
}

const appReducer = combineReducers<AppState | { user: AppState['user'] }>({
  card: cardsReducer,
  challenge: challengeReducer,
  error: errorReducer,
  feeds: feedsReducer,
  misc: miscReducer,
  notification: notificationReducer,
  plan: planReducer,
  portfolio: portfolioReducer,
  serverNotifications: serverNotificationsReducer,
  transaction: transactionReducer,
  user: userReducer,
  virtualAccount: virtualAccountReducer,
  wallet: walletReducer
})

const rootReducer = (
  state: CombinedState<AppState | { user: AppState['user'] }> | undefined,
  action: AnyAction
) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === USER_ACTION_TYPES.CLEAR_REDUX_STORE) {
    AsyncStorage.removeItem('persist:root')
    const { user, misc, virtualAccount } = state as AppState

    state = { misc, user, virtualAccount }
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)

export { persistor, store }
