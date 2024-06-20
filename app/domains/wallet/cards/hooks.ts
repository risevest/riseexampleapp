import { useDisplayMessage } from 'app/hooks'
import amplitude from 'app/utils/analytics/amplitude'
import { useMutation, useQuery } from 'react-query'

import { toUICurrency } from '../hooks'
import { deleteCard, fundWithCard, getSavedCards } from './api'
import { CARDS_QUERY_KEYS } from './constants'
import { FundWithCardPayload, SavedCard, ServerCard } from './types'

// extraction function
function extractSavedCard(cards: ServerCard[]): SavedCard[] {
  return cards.map((card: ServerCard) => ({
    createdAt: card.created_at,
    currency: toUICurrency(card.details.currency),
    expiryMonth: card.details.expiry_month,
    expiryYear: card.details.expiry_year,
    id: card.id,
    last4: card.details.last_digits,
    type: card.details.brand
  }))
}

export function useCards() {
  const { data, ...query } = useQuery(
    CARDS_QUERY_KEYS.savedCards,
    getSavedCards,
    {
      onSuccess: (resp) =>
        amplitude.setUserProperties({
          'Number of Cards on Acct': resp?.length ?? 0
        })
    }
  )

  return {
    savedCards: extractSavedCard(data || []),
    ...query
  }
}

export function useDeleteCard() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (id: string) => deleteCard(id),
    mutationKey: CARDS_QUERY_KEYS.deleteCard,
    onError: (err) => displayServerError(err)
  })
}

export function useInitializeTransactionWithCard() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: FundWithCardPayload) => fundWithCard(payload),
    mutationKey: CARDS_QUERY_KEYS.fundwithCard,
    onError: (err) => displayServerError(err)
  })
}
