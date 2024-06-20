import { initialState } from './constants'
import { DeleteCardSuccess } from './types'
import {
  CARD_ACTION_TYPES,
  CardAction,
  CardState,
  FetchUserCardsSuccess,
  LinkCardSuccess
} from './types'

const ACTIONS: any = {
  [CARD_ACTION_TYPES.GET_USER_CARDS_REQUEST]: (state: CardState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CARD_ACTION_TYPES.GET_USER_CARDS_SUCCESS]: (
    state: CardState,
    { cards }: FetchUserCardsSuccess
  ) => ({
    ...state,
    cards,
    requestStatus: 'success'
  }),
  [CARD_ACTION_TYPES.GET_USER_CARDS_ERROR]: (state: CardState) => ({
    ...state,
    requestStatus: 'failed'
  }),
  [CARD_ACTION_TYPES.LINK_CARD_TO_WALLET_REQUEST]: (state: CardState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CARD_ACTION_TYPES.LINK_CARD_TO_WALLET_SUCCESS]: (
    state: CardState,
    { cardId }: LinkCardSuccess
  ) => {
    let defaultCard = state.cards.find((card) => card.isDefault === true)
    if (defaultCard) {
      defaultCard.isDefault = false
    }

    const cards = state.cards.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          isDefault: true
        }
      }
      return card
    })

    const cardIndex = defaultCard ? state.cards.indexOf(defaultCard) : -1
    if (cardIndex !== -1 && defaultCard) {
      cards[cardIndex] = defaultCard
    }

    return {
      ...state,
      cards,
      requestStatus: 'success'
    }
  },
  [CARD_ACTION_TYPES.DELETE_USER_CARD_REQUEST]: (state: CardState) => ({
    ...state,
    requestStatus: 'pending'
  }),
  [CARD_ACTION_TYPES.DELETE_USER_CARD_SUCCESS]: (
    state: CardState,
    { cardId }: DeleteCardSuccess
  ) => ({
    ...state,
    cards: state.cards.filter((card) => card.id !== Number(cardId)),
    requestStatus: 'success'
  }),
  [CARD_ACTION_TYPES.DELETE_USER_CARD_ERROR]: (state: CardState) => ({
    ...state,
    requestStatus: 'failed'
  })
}

export const cardsReducer = (state = initialState, action: CardAction) => {
  const handler = ACTIONS[action.type]
  return handler ? handler(state, action) : state
}
