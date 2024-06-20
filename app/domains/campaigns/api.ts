import instance from 'app/api/v2/base'

import { CampaignServerType } from './types'

export async function getCampaigns(): Promise<CampaignServerType[]> {
  const resp = await instance.get('/campaigns')
  return resp.data
}
