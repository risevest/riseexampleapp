export type CardState = {
  cards: ICard[]
  requestStatus: RequestStatus
}

export enum CARD_ACTION_TYPES {
  DELETE_USER_CARD_ERROR = 'user/DELETE_USER_CARD_ERROR',
  DELETE_USER_CARD_REQUEST = 'user/DELETE_USER_CARD_REQUEST',
  DELETE_USER_CARD_SUCCESS = 'user/DELETE_USER_CARD_SUCCESS',

  GET_USER_CARDS_ERROR = 'user/GET_USER_CARDS_ERROR',
  GET_USER_CARDS_REQUEST = 'user/GET_USER_CARDS_REQUEST',
  GET_USER_CARDS_SUCCESS = 'user/GET_USER_CARDS_SUCCESS',

  LINK_CARD_TO_WALLET_ERROR = 'user/LINK_CARD_TO_WALLET_ERROR',
  LINK_CARD_TO_WALLET_REQUEST = 'user/LINK_CARD_TO_WALLET_REQUEST',
  LINK_CARD_TO_WALLET_SUCCESS = 'user/LINK_CARD_TO_WALLET_SUCCESS'
}

export type FetchUserCardsSuccess = {
  cards: ICard[]
  type: CARD_ACTION_TYPES.GET_USER_CARDS_SUCCESS
}

export type LinkCardSuccess = {
  cardId: number
  type: CARD_ACTION_TYPES.LINK_CARD_TO_WALLET_SUCCESS
}

export type DeleteCardSuccess = {
  cardId: number
  type: CARD_ACTION_TYPES.DELETE_USER_CARD_SUCCESS
}

export type UnmatchedAction = {
  type: 'UNMATCHED_ACTION'
}

export type CardAction =
  | FetchUserCardsSuccess
  | LinkCardSuccess
  | DeleteCardSuccess
  | UnmatchedAction
