import { useQuery } from 'react-query'

import { getQuotes } from './api'
import { Quote } from './types'

export function useQuote() {
  const { data: quotes, ...query } = useQuery<Quote>('quotes', {
    queryFn: getQuotes
  })

  const data = {
    author: quotes?.author,
    quote: quotes?.quote.replace('\n', '')
  }

  return {
    data,
    ...query
  }
}
