import { CARD_ACTION_TYPES } from './types'

export const fetchCardsSuccess = (cards: ICard[]) => ({
  cards,
  type: CARD_ACTION_TYPES.GET_USER_CARDS_SUCCESS
})
