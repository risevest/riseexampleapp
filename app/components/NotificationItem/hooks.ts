import { defaultPlanImages } from 'app/utils'
import { useMemo } from 'react'

const BUILD_WEALTH_IMG = require('app/assets/future/images/build-wealth.jpg')

export function useGetNotificationImage(
  targetType: string,
  title: string,
  image: string | null
) {
  const isMaturedPlanNotification = useMemo(() => {
    return targetType === 'UserPlan' && title.toLowerCase().includes('matured')
  }, [targetType, title])

  const maturedPlanDefaultImage = useMemo(() => {
    const titleLowerCase = title.toLowerCase()

    if (isMaturedPlanNotification) {
      if (titleLowerCase.includes('real estate')) {
        return defaultPlanImages['real estate plan']
      } else if (titleLowerCase.includes('wedding')) {
        return defaultPlanImages['wedding plan']
      } else if (titleLowerCase.includes('school')) {
        return defaultPlanImages['school plan']
      } else if (titleLowerCase.includes('fixed income')) {
        return defaultPlanImages['fixed income plan']
      } else if (titleLowerCase.includes('business')) {
        return defaultPlanImages['business plan']
      } else {
        return defaultPlanImages['stocks plan']
      }
    } else {
      return
    }
  }, [isMaturedPlanNotification, title])

  const notificationImage = useMemo(() => {
    if (image) {
      return { uri: image }
    } else if (isMaturedPlanNotification) {
      return maturedPlanDefaultImage
    } else {
      return BUILD_WEALTH_IMG
    }
  }, [image, isMaturedPlanNotification, maturedPlanDefaultImage])

  return notificationImage
}
