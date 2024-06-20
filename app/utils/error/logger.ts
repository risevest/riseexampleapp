import crashlytics from '@react-native-firebase/crashlytics'
import * as Sentry from '@sentry/react-native'

export const errorLogger = {
  captureError(error: unknown) {
    const capturedError = (() => {
      switch (true) {
        case error instanceof Error:
          return error

        case typeof error === 'string':
        case typeof error === 'number':
          return new Error(String(error))

        default: {
          const unexpectedError = new Error()
          unexpectedError.message = 'An unexpected error occurred'
          unexpectedError.stack = JSON.stringify(error)

          return unexpectedError
        }
      }
    })()

    Sentry.captureException(capturedError)
    crashlytics().recordError(capturedError)
  },
  logAnalyticsError(tag: string, error: any) {
    if (typeof error !== 'string') {
      error = JSON.stringify(error)
    }

    this.captureError(`${tag}: ${error}`)
  }
}
