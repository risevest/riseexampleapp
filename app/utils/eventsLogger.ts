import appsFlyer from 'react-native-appsflyer'

import { EventLogData, EventName } from './analytics/types'

export const logAppsFlyerEvent = async ({
  eventName,
  eventValues
}: {
  eventName: EventName
  eventValues: EventLogData[typeof eventName]
}) => {
  try {
    appsFlyer.logEvent(eventName, eventValues as Record<string, unknown>)
  } catch (error) {
    // fail silently
  }
}

export const getPortfolioAssets = (assets: any[]) => {
  return assets.reduce((prev: any, next: any) => {
    prev[`portfolio_mix_${next.assetClass?.replace(/\s/g, '')}`] =
      next.percentage > 0 ? next.percentage / 100 : 0
    return prev
  }, {})
}
