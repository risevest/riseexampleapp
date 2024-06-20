import { useNavigation } from '@react-navigation/native'
import { Retry } from 'app/components'
import { UseTheme, useTheme } from 'app/design/theme'
import { Header, P } from 'app/design/typography'
import { fetchFeedsDispatcher } from 'app/redux/feeds/dispatchers'
import { AppState } from 'app/redux/types'
import moment from 'moment'
import * as React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { connect } from 'react-redux'

import SliderComp from '../Slider'

type INewsAndUpdatesProps = {
  feeds: IFeedsData[]
  fetchFeeds: () => void
  requestStatus: RequestStatus
}

const useNewsStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    date: {
      bottom: 18,
      color: theme.primarySurface,
      fontSize: 13,
      position: 'absolute',
      right: 18
    },
    explorePlans: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'rgba(131, 143, 145, 0.05)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 31,
      justifyContent: 'center',
      marginTop: 33,
      width: 154
    },
    headline: {
      bottom: 18,
      color: theme.primarySurface,
      fontSize: 13,
      left: 18,
      position: 'absolute',
      width: 155
    },
    loadingStyles: {
      borderRadius: 8,
      height: 148,
      marginRight: 11,
      marginTop: 22,
      width: 320
    },
    searchIcon: {
      color: theme.primaryColor,
      marginRight: 10,
      marginTop: 3
    },
    wrapper: {
      borderRadius: 8,
      height: 320,
      marginRight: 11,
      marginTop: 22,
      overflow: 'hidden',
      width: 320
    }
  })

  return { styles, theme }
}

const NewsAndUpdates = ({
  fetchFeeds,
  feeds,
  requestStatus
}: INewsAndUpdatesProps) => {
  const navigation = useNavigation()
  const { theme } = useNewsStyles()

  React.useEffect(() => {
    fetchFeeds()
  }, [fetchFeeds])

  const transformArray = () => {
    const newArray = feeds?.slice()?.map((feed) => {
      return {
        feedId: feed.id,
        illustration: feed.v2Thumbnail || feed.thumbnail,
        onClick: () => {
          navigation.navigate('App', {
            params: {
              params: {
                canShare: true,
                prevScreen: '',
                title: feed.title,
                type: 'feed',
                uri: feed.url
              },
              screen: 'ExternalLinks'
            },
            screen: 'AppStack'
          })
        },
        subtitle: moment(feed.createdAt).format('ll').toUpperCase(),
        title: feed.title,
        url: feed.url
      }
    })

    return newArray
  }

  const HEADER: TextStyle = {
    color: theme.tertiaryColor,
    marginBottom: -20,
    marginTop: 37,
    paddingHorizontal: 20
  }

  return (
    <View>
      <Header fontsize={17} style={HEADER} text="News & Updates" />
      {requestStatus === 'pending' && (
        <ActivityIndicator
          color={theme.primaryColor}
          size="small"
          style={ACTIVITY_INDICATOR}
        />
      )}
      {requestStatus === 'failed' ? (
        <Retry onRetry={fetchFeeds} text="Failed to fetch News" />
      ) : requestStatus === 'success' && feeds?.length === 0 ? (
        <P
          fontWeight="400"
          style={COMING_SOON_TEXT}
          text="News & Updates coming soon.."
        />
      ) : (
        <View style={SLIDER_COMP_CONTAINER}>
          <SliderComp
            data={transformArray()}
            hasIcon={false}
            imageSource="uri"
          />
        </View>
      )}
    </View>
  )
}

const ACTIVITY_INDICATOR: ViewStyle = { marginTop: 50 }
const COMING_SOON_TEXT: TextStyle = { marginTop: 50, textAlign: 'center' }
const SLIDER_COMP_CONTAINER: ViewStyle = { marginTop: 25 }

const mapStateToProps = (state: AppState) => ({
  feeds: state.feeds.feeds.data,
  requestStatus: state.feeds.requestStatus
})

export default connect(mapStateToProps, { fetchFeeds: fetchFeedsDispatcher })(
  NewsAndUpdates
)
