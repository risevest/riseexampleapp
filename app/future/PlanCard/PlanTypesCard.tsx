import { useNavigation } from '@react-navigation/native'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { Text } from 'app/future'
import {
  getRealEstatePortfolio,
  getStocksPortfolio
} from 'app/redux/portfolio/selectors'
import { AppState } from 'app/redux/types'
import React from 'react'
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'

import Image from '../Image'

interface IPlanTypesCard {
  isAssetClass: boolean
  isPayDayChallenge?: boolean
  onPress?: () => void
  plan?: any
}

export function PlanTypesCard({
  plan,
  isAssetClass,
  isPayDayChallenge = false,
  onPress
}: IPlanTypesCard) {
  const risePortfolioAssets = useSelector(
    (state: AppState) => state.plan.portfolioAssets
  )
  const navigation = useNavigation()

  const realEstatePortfolio = useSelector(getRealEstatePortfolio)

  const stocksPortfolio = useSelector(getStocksPortfolio)

  const handleNavigation = (item: any) => {
    if (!isAssetClass) {
      navigation?.navigate('GoalClass', {
        params: {
          fromDashboard: false,
          item
        },
        screen: 'CreateGoal'
      })
    } else if (isAssetClass) {
      navigation?.navigate('AssetClassStack', {
        params: {
          ...item,
          planImage: item?.iconUrl,
          planType: `${item?.name} Plan`,
          portfolio: item?.isStock
            ? risePortfolioAssets?.stocks
            : risePortfolioAssets.properties,
          portfolioPerformance: item?.isStock
            ? stocksPortfolio?.historicalPerformance
            : realEstatePortfolio?.historicalPerformance
        },
        screen: 'AssetClass'
      })
    }
  }

  const getPlanImage = () => {
    if (isPayDayChallenge) {
      return require('app/assets/future/images/payday.jpg')
    } else if (isAssetClass) {
      return { uri: plan?.iconUrl }
    } else {
      return { uri: plan?.planImage }
    }
  }

  const getPlanName = () => {
    if (isPayDayChallenge) {
      return 'PayDay Challenge'
    } else if (isAssetClass) {
      return plan?.name
    } else if (!isAssetClass) {
      return plan?.planName
    } else {
      return plan?.name
    }
  }

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : handleNavigation(plan))}
    >
      <Image containerStyle={CONTAINER} imageUri={getPlanImage()} isBackground>
        <View style={DETAILS}>
          <Text textStyle={PLAN_NAME_TEXT} type="bold-18" variant="white">
            {getPlanName()}
          </Text>
          <Text type="reg-17-main" variant="white">
            {plan?.description}
          </Text>
          <Text textStyle={INVESTING_TEXT} type="r-16-main" variant="white">
            Start investing
          </Text>
        </View>
      </Image>
    </TouchableOpacity>
  )
}

const CONTAINER: ViewStyle = {
  borderRadius: 15,
  height: getComputedHeight(335),
  width: '100%'
}

const DETAILS: ViewStyle = {
  marginTop: 'auto',
  paddingBottom: getComputedHeight(30),
  paddingLeft: getComputedWidth(20),
  paddingRight: getComputedWidth(30)
}

const INVESTING_TEXT: TextStyle = {
  fontWeight: '700',
  textDecorationLine: 'underline'
}

const PLAN_NAME_TEXT: TextStyle = { fontWeight: '700' }
