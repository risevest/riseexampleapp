import { useNavigation } from '@react-navigation/native'
import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import { themeColors } from 'app/design/theme'
import { logEvent } from 'app/utils/analytics'
import moment from 'moment'
import * as React from 'react'
import { TextStyle } from 'react-native'
import { TouchableOpacity, ViewStyle } from 'react-native'
import FastImage, { ImageStyle } from 'react-native-fast-image'

export function FeedCard({ feed }: { feed: Feed }) {
  const {
    background_image,
    title,
    excerpt,
    tag,
    created_at,
    id,
    is_moneyrise,
    content
  } = feed
  const navigation = useNavigation()
  const linkOut = (type: string, uri: string) => {
    logEvent('open_article', {
      article_title: title,
      origin_screen_name: 'Feeds'
    })

    navigation.navigate('App', {
      params: {
        params: {
          canShare: !!uri,
          id,
          prevScreen: 'FeedScreen',
          title,
          type,
          uri
        },
        screen: 'ExternalLinks'
      },
      screen: 'AppStack'
    })
  }

  const formattedDate = moment(created_at).format(moment.HTML5_FMT.DATE)
  const navigateToSingleFeed = () => {
    if (is_moneyrise && !Array.isArray(content)) {
      return linkOut('Feeds', content.url)
    }
    navigation.navigate('App', {
      params: {
        params: { id },
        screen: 'SingleFeed'
      },
      screen: 'AppStack'
    })
  }

  return (
    <TouchableOpacity onPress={navigateToSingleFeed} style={CONTAINER_STYLE}>
      <Box flexDirection="row">
        <FastImage
          resizeMode="cover"
          source={{ uri: background_image }}
          style={FEED_CARD_IMAGE}
        />
        <Box flex={1} maxHeight={getComputedHeight(145)}>
          <Box
            flex={1}
            paddingBottom="s"
            paddingHorizontal="m"
            paddingTop="m"
            width={getComputedWidth(203)}
          >
            <Text
              color="black"
              fontSize={16}
              marginBottom="s"
              variant="num-reg-15"
            >
              {title}
            </Text>

            <Text
              color="soft-tect"
              ellipsizeMode="tail"
              lineHeight={21}
              numberOfLines={3}
              variant="body-13-regular"
            >
              {excerpt}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        marginTop="m"
        paddingHorizontal={{ custom: 20 }}
      >
        <Text color="primary" fontWeight="500" variant="body-13-regular">
          {tag}
        </Text>
        <Box alignItems="center" flexDirection="row">
          <Icon color="#71879C" height={20} name="feed-clock" />
          <Text color="soft-tect" style={DATE_TEXT} variant="body-13-regular">
            {moment(formattedDate).fromNow()}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

const FEED_CARD_IMAGE: ImageStyle = {
  borderTopLeftRadius: 10,
  height: getComputedHeight(140),
  width: getComputedWidth(100)
}

const CONTAINER_STYLE: ViewStyle = {
  width: '100%',
  ...shadow(0, 12, 24, '#2B394B', 0.15),
  backgroundColor: themeColors.light.primarySurface,
  borderRadius: 12,
  elevation: 10,
  paddingBottom: getComputedHeight(15)
}

const DATE_TEXT: TextStyle = {
  marginLeft: 4
}
