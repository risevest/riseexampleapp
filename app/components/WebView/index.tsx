import { UseTheme, useTheme } from 'app/design/theme'
import * as React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

import { screenHeight } from '../../design/responsiveModule'

interface WebviewProps {
  onLoadEnd?: () => void
  uri: string
}

const useWebviewStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    spinner: {
      height: 30,
      left: 0,
      position: 'absolute',
      right: 0,
      top: screenHeight / 2 - 30,
      zIndex: 1
    }
  })

  return { styles, theme }
}
let INTERVAL_ID: any = 0

const Webview = ({ uri, onLoadEnd }: WebviewProps) => {
  const [isLoading, setLoading] = React.useState(true)
  const { theme, styles } = useWebviewStyles()

  React.useEffect(() => {
    INTERVAL_ID = setTimeout(() => {
      setLoading(false)
    }, 90000)

    return () => {
      clearTimeout(INTERVAL_ID)
    }
  }, [])

  return (
    <React.Fragment>
      {isLoading && (
        <ActivityIndicator
          color={theme.primaryColor}
          size="large"
          style={styles.spinner}
        />
      )}
      <WebView
        onLoadEnd={() => {
          setLoading(false)
          onLoadEnd && onLoadEnd()
        }}
        source={{ uri }}
        style={styles.container}
      />
    </React.Fragment>
  )
}

export default Webview
