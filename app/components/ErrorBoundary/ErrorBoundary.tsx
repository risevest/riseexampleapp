import { errorLogger } from 'app/utils/error/logger'
import React, { Component, ErrorInfo } from 'react'

import { DefaultFallBack, DevFallback } from './FallBack'

type State = {
  errorMessage: string
  hasError: boolean
  info: ErrorInfo
  retryCount: number
}

type Props = {
  Fallback?: (
    props: Pick<State, 'errorMessage' | 'info'> & {
      handleRetry: Noop
      retryCount: number
    }
  ) => JSX.Element
  children: React.ReactNode
}

const initialState = {
  errorMessage: '',
  hasError: false,
  info: { componentStack: '' },
  retryCount: 0
}

/**
 * ErrorBoundary component to catch errors in its children and display a Fallback Screen.
 * We can get the information about which part in our component tree threw the error by using
 * the `getDerivedStateFromError` method and `componentDidCatch` lifecycle method.
 * This information can be forwarded to a logging service
 *
 * We use the component to wrap our entire application.
 * @example
 * ```tsx
 * const App = () => (
 *    <ErrorBoundary>
 *      <MyApp />
 *    </ErrorBoundary>
 * );
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = initialState
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    errorLogger.captureError(error)
    this.setState({ errorMessage: error.message, hasError: true, info })
  }

  retry = () => {
    this.setState((previous) => ({
      ...initialState,
      retryCount: previous.retryCount + 1
    }))
  }

  render() {
    if (this.state.hasError) {
      switch (true) {
        case __DEV__:
          return (
            <DevFallback
              errorInfo={this.state.info.componentStack}
              errorMessage={this.state.errorMessage}
              handleRetry={this.retry}
            />
          )

        case !!this.props.Fallback:
          return (
            <this.props.Fallback
              errorMessage={this.state.errorMessage}
              handleRetry={this.retry}
              info={this.state.info}
              retryCount={this.state.retryCount}
            />
          )

        default:
          return (
            <DefaultFallBack
              handleRetry={this.retry}
              retryCount={this.state.retryCount}
            />
          )
      }
    }

    return this.props.children
  }
}
