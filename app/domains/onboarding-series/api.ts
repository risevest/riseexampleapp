import instance from 'app/api/v2/base'

import { OnboardingVideoServer } from './types'

export async function getOnboardingSeries(): Promise<OnboardingVideoServer[]> {
  const resp = await instance.get('/config', {
    params: {
      entity: 'intro',
      filter_key: 'platform',
      filter_value: 'mobile'
    }
  })
  return resp.data
}
