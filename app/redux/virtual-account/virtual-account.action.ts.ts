import { RequestDetails } from 'app/view/App/Wallet/funding/virtual-accounts/types'
import { Dispatch } from 'redux'

import {
  VIRTUAL_ACCOUNT_ACTION_TYPES as VATs,
  VirtualAccountAction
} from './virtual-account.types'

export const saveRequestDetails =
  (requestDetails: RequestDetails) =>
  (dispatch: Dispatch<VirtualAccountAction>) =>
    dispatch({
      payload: { requestDetails },
      type: VATs.SAVE_REQUEST_DETAILS
    })
