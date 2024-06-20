import { RequestDetails } from 'app/view/App/Wallet/funding/virtual-accounts/types'

import { ReduxActionType } from '../types'

export enum VIRTUAL_ACCOUNT_ACTION_TYPES {
  SAVE_REQUEST_DETAILS = 'virtual_account/SAVE_REQUEST_DETAILS'
}

export type VirtualAccountState = {
  requestDetails: RequestDetails
}

export type VirtualAccountAction = ReduxActionType<
  VIRTUAL_ACCOUNT_ACTION_TYPES,
  VirtualAccountState
>
