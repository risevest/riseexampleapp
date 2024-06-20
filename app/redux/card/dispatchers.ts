import instance from 'app/utils/axios'

import { setError } from '../error/actionCreators'
import { fetchCardsSuccess } from './actionCreators'
import { CARD_ACTION_TYPES } from './types'

export const fetchUserCardsDispatcher = () => {
  return (dispatch: any) => {
    dispatch({ type: CARD_ACTION_TYPES.GET_USER_CARDS_REQUEST })
    return instance
      .get('/cards/user-cards')
      .then((response) => {
        dispatch(fetchCardsSuccess(response.data.data))
      })
      .catch(() => {
        // dispatch(setError(''))
        dispatch({ type: CARD_ACTION_TYPES.GET_USER_CARDS_ERROR })
      })
  }
}

export const linkCardToWalletDispatcher = (cardId: number) => {
  return (dispatch: any) => {
    dispatch({ type: CARD_ACTION_TYPES.LINK_CARD_TO_WALLET_REQUEST })
    return instance
      .patch(`/cards/${cardId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            cardId,
            type: CARD_ACTION_TYPES.LINK_CARD_TO_WALLET_SUCCESS
          })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch({ type: CARD_ACTION_TYPES.LINK_CARD_TO_WALLET_ERROR })
        dispatch(setError('Link Card Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}

export const deleteCardDispatcher = (cardId: number) => {
  return (dispatch: any) => {
    dispatch({ type: CARD_ACTION_TYPES.DELETE_USER_CARD_REQUEST })
    return instance
      .delete(`/cards/${cardId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            cardId,
            type: CARD_ACTION_TYPES.DELETE_USER_CARD_SUCCESS
          })
          return {
            requestStatus: 'success'
          }
        }
      })
      .catch((error) => {
        dispatch({ type: CARD_ACTION_TYPES.DELETE_USER_CARD_ERROR })
        dispatch(setError('Deletion Error', error))
        return {
          requestStatus: 'failed'
        }
      })
  }
}
