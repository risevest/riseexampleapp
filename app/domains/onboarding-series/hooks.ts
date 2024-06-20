import { useQuery } from 'react-query'

import { getOnboardingSeries } from './api'
import { OnboardingVideo, OnboardingVideoServer } from './types'

function extractOnboardingSeries(
  data: OnboardingVideoServer[]
): OnboardingVideo[] {
  return data?.map((video: OnboardingVideoServer) => {
    return {
      displayDuration: video?.display_duration,
      thumbnailUrl: video?.thumbnail_url,
      title: video?.title,
      url: video?.url
    }
  })
}

export function useGetOnboardingSeries() {
  const { data, ...query } = useQuery('onboarding-series', getOnboardingSeries)

  return {
    ...query,
    onboardingVideos: extractOnboardingSeries(data || [])
  }
}
