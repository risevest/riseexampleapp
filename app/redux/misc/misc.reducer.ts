import { MiscAction, MiscStore } from '../types'
import { MISC_ACTION_TYPES } from './misc.type'

const INITIAL_STATE: MiscStore = {
  lastPlayedVideo: null
}

export default function miscReducer(
  state = INITIAL_STATE,
  action: MiscAction
): MiscStore {
  const payload = action.payload

  switch (action.type) {
    case MISC_ACTION_TYPES.SAVE_VIDEO:
      return {
        ...state,
        lastPlayedVideo: payload.lastPlayedVideo
      }

    default:
      return state
  }
}
