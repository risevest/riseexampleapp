import { CardState } from './card/types'
import { ChallengeState } from './challenge/reducer'
import { ErrorState } from './error/types'
import { FeedsState } from './feeds/types'
import { MISC_ACTION_TYPES } from './misc/misc.type'
import { INotification } from './notification/types'
import { PlanState } from './plan/reducer'
import { PortfolioState } from './portfolio/reducer'
import { ServerNotificationsState } from './server-notifications/reducer'
import { TransactionState } from './transaction/types'
import { UserState } from './user/types'
import { VirtualAccountState } from './virtual-account/virtual-account.types'
import { WalletState } from './wallet/reducer'

export type MiscStore = {
  lastPlayedVideo: string | null
}

export type MiscAction = ReduxActionType<MISC_ACTION_TYPES, MiscStore>

export interface ReduxActionType<T = any, P = any> {
  payload: P
  type: T
}

export interface AppState {
  card: CardState
  challenge: ChallengeState
  error: ErrorState
  feeds: FeedsState
  misc: MiscStore
  notification: INotification
  plan: PlanState
  portfolio: PortfolioState
  serverNotifications: ServerNotificationsState
  transaction: TransactionState
  user: UserState
  virtualAccount: VirtualAccountState
  wallet: WalletState
}
