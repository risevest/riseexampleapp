import ArrowRightIcon from 'app/assets/future/icons/ArrowRight'
import StarIcon from 'app/assets/future/icons/StarIcon'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { shadow } from 'app/design/Styles'
import { Text } from 'app/future/Text'
import usePlansStyles from 'app/view/App/Plans/styles'
import React from 'react'
import {
  ImageBackground,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

interface IBuildWealthCard {
  handlePress: Noop
  recommendedTag?: boolean
}

export function BuildWealthCard({
  recommendedTag = false,
  handlePress
}: IBuildWealthCard) {
  const { styles: planStyles } = usePlansStyles()

  return (
    <TouchableOpacity onPress={handlePress} style={RECOMMENDED_PLAN_VIEW}>
      <ImageBackground
        imageStyle={IMAGE_BACKGROUND}
        source={require('app/assets/future/images/build-wealth.jpg')}
        style={RECOMMENDED_PLAN_IMAGE}
      >
        {recommendedTag && (
          <View style={RECOMMENDED_TAG}>
            <StarIcon height={13} width={13} />
            <Text textStyle={RECOMMENDED_TEXT} type="head-1" variant="white">
              Recommended
            </Text>
          </View>
        )}
        <View style={planStyles.opaqueView}>
          <View>
            <Text textStyle={BUILD_WEALTH_TEXT} type="head-1" variant="white">
              Build Wealth
            </Text>
            <Text
              textStyle={BUILD_WEALTH_SUBTEXT}
              type="reg-17-main"
              variant="white"
            >
              Our Build Wealth Plan
            </Text>
            <Text
              textStyle={START_INVESTING_TEXT}
              type="reg-17-main"
              variant="white"
            >
              Start Investing
            </Text>
          </View>
          <ArrowRightIcon height={15} width={15} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const RECOMMENDED_TEXT: TextStyle = {
  fontSize: getComputedWidth(12),
  marginLeft: 6
}

const RECOMMENDED_PLAN_VIEW: ViewStyle = {
  alignSelf: 'center',
  borderRadius: 15,
  height: getComputedHeight(335),
  width: getComputedWidth(335),
  ...shadow(10, 10, 4, 'rgba(43, 57, 75, 0.15)', 0.6)
}

const RECOMMENDED_PLAN_IMAGE: ImageStyle = {
  height: '100%',
  width: '100%'
}

const RECOMMENDED_TAG: ViewStyle = {
  alignItems: 'center',
  backgroundColor: '#8978CD',
  borderRadius: 20,
  flexDirection: 'row',
  left: 11,
  paddingHorizontal: 11,
  position: 'absolute',
  top: 11,
  zIndex: 1
}

const START_INVESTING_TEXT: TextStyle = {
  fontSize: getComputedWidth(16),
  fontWeight: '600',
  marginTop: 6,
  textDecorationLine: 'underline'
}

const BUILD_WEALTH_TEXT: TextStyle = {
  fontSize: getComputedWidth(20),
  fontWeight: '700'
}

const IMAGE_BACKGROUND: ImageStyle = { borderRadius: 15 }

const BUILD_WEALTH_SUBTEXT: TextStyle = { marginTop: 6 }
