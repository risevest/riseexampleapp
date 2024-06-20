import moment, { Moment } from 'moment'
import { useEffect, useState } from 'react'

export const useArticleEvents = () => {
  const [articleOpenTime, setArticleOpenTime] = useState<Moment | string>('')

  const getEngagementTime = () => {
    return moment(articleOpenTime).from(moment(new Date()), true)
  }

  useEffect(() => {
    setArticleOpenTime(moment(new Date()))
  }, [])

  return {
    getEngagementTime
  }
}
