import { setLastRatingDate, useGetLastRatingDate } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import { errorLogger } from 'app/utils/error/logger'
import { intervalToDuration, parseISO } from 'date-fns'
import InAppReview from 'react-native-in-app-review'

import { useUser } from './queries'

const isWithinPeriod = (lastRatingDate: string | null, numOfDays: number) => {
  if (!lastRatingDate) {
    return true
  }

  const interval = intervalToDuration({
    end: new Date(),
    start: parseISO(lastRatingDate)
  })

  if (Number(interval?.days) > numOfDays) {
    return true
  }

  return false
}

export function useRating() {
  const isReviewSupported = InAppReview.isAvailable()
  const lastRatingDate = useGetLastRatingDate()
  const { user } = useUser()

  const showRating = (runAfterFlow?: () => void) => {
    if (
      isReviewSupported &&
      isWithinPeriod(lastRatingDate, 7) &&
      isWithinPeriod(String(user?.createdAt), 30)
    ) {
      InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
          if (hasFlowFinishedSuccessfully) {
            setLastRatingDate(new Date().toString())

            if (runAfterFlow) {
              runAfterFlow()
            }
            logEvent('rating_popup')
          }
        })
        .catch((error) => {
          errorLogger.captureError(error)
        })
    }
  }

  return { showRating }
}
