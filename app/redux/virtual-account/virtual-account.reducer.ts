import {
  VIRTUAL_ACCOUNT_ACTION_TYPES as VATs,
  VirtualAccountAction,
  VirtualAccountState
} from './virtual-account.types'

const INITIAL_STATE: VirtualAccountState = {
  requestDetails: {
    accountDesignation: '',
    birthDate: '',
    city: '',
    documentNumber: '',
    employmentStatus: '',
    expiryDate: '',
    houseNumber: '',
    incomeBand: '',
    issuanceCountry: '',
    issuanceDate: '',
    nationality: '',
    occupation: '',
    sourceOfIncome: '',
    state: '',
    street: '',
    userCountry: '',
    zipCode: ''
  }
}

export default function virtualAccountReducer(
  state = INITIAL_STATE,
  action: VirtualAccountAction
): VirtualAccountState {
  const payload = action.payload

  switch (action.type) {
    case VATs.SAVE_REQUEST_DETAILS:
      return {
        ...state,
        requestDetails: payload.requestDetails
      }

    default:
      return state
  }
}
