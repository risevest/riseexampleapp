import instance from 'app/utils/axios'

import { Quote } from './types'

export async function getQuotes(): Promise<Quote> {
  const resp = await instance.get('/quotes')
  return resp.data
}
