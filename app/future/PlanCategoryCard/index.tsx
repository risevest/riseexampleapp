import ArrowRightIcon from 'app/assets/future/icons/ArrowRight'
import { getComputedWidth } from 'app/design/responsiveModule'
import { getPlanTitle } from 'app/utils/utilFunctions'
import * as React from 'react'
import { TextStyle, TouchableOpacity, View } from 'react-native'

import Image from '../Image'
import { Text } from '../Text'
import { usePlanCategoryCardStyle } from './styles'
import { IPlanCategoryCard } from './types'

export function PlanCategoryCard({
  plan,
  onPress,
  isAssetClass,
  containerStyle = {}
}: IPlanCategoryCard) {
  const { styles } = usePlanCategoryCardStyle()

  const getPlanImage = (item: IAssetClass & GoalPlanData) => {
    if (isAssetClass) return item?.iconUrl
    return item?.planImage
  }

  return (
    <TouchableOpacity
      key={plan?.id}
      onPress={onPress}
      style={[styles.planCategoryCard, containerStyle]}
    >
      <Image
        borderRadius={15}
        containerStyle={styles.assetClassImage}
        imageUri={{ uri: getPlanImage(plan) }}
        isBackground
      >
        <View style={styles.opaqueView}>
          <View>
            <Text textStyle={PLAN_TITLE} type="head-1" variant="white">
              {getPlanTitle(plan, isAssetClass)}
            </Text>
            {isAssetClass && !!plan?.riskLevel && (
              <Text
                textStyle={{ fontSize: getComputedWidth(15) }}
                type="reg-17-main"
                variant="white"
              >
                {plan?.riskLevel}
              </Text>
            )}
          </View>
          <ArrowRightIcon height={15} width={15} />
        </View>
      </Image>
    </TouchableOpacity>
  )
}

const PLAN_TITLE: TextStyle = {
  fontSize: getComputedWidth(20),
  fontWeight: '500'
}
