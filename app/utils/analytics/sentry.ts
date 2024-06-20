import * as sentry from '@sentry/react-native'

export function tagScreenName(screenName: string) {
  sentry.addBreadcrumb({
    category: 'screen name',
    level: 'info',
    message: screenName
  })
}

export default { tagScreenName }
