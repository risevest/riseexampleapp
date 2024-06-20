import { Dispatch } from 'redux'

import { MiscAction } from '../types'
import { MISC_ACTION_TYPES } from './misc.type'

export const saveVideo = (video: string) => (dispatch: Dispatch<MiscAction>) =>
  dispatch({
    payload: { lastPlayedVideo: video },
    type: MISC_ACTION_TYPES.SAVE_VIDEO
  })
