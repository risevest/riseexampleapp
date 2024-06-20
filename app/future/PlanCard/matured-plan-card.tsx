import { Box, Circle, Divider, Text } from '@risemaxi/sarcelle'
import { selectPlanTypeImages } from 'app/redux/plan/selectors'
import { getPlanImage } from 'app/utils/getPlanImage'
import { formatPlanValue } from 'app/utils/numberformatter'
import moment from 'moment'
import * as React from 'react'
import { Image, ImageStyle, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

import { MaturedPlanCardProps } from './types'

export function MaturedPlanCard({ onNavigate, plan }: MaturedPlanCardProps) {
  const planImages = useSelector(selectPlanTypeImages(plan?.category))
  return (
    <TouchableOpacity onPress={onNavigate}>
      <Box flexDirection="row" justifyContent="space-between" py="m">
        <Box flexDirection="row" flexShrink={1}>
          <Circle size={40}>
            <Image
              source={getPlanImage(plan as IPlan, planImages)}
              style={IMAGES_STYLE}
            />
          </Circle>
          <Box marginLeft={12}>
            <Text variant="num-reg-15">{plan.name}</Text>
            <Text color="soft-tect" fontStyle="italic" variant="number-12">
              {`${plan.assetType} • Closed ${moment(plan.maturityDate).format('Do MMM , YYYY')}`}
            </Text>
          </Box>
        </Box>
        <Text fontWeight="600" variant="num-reg-15">
          {formatPlanValue(plan.currentBalance, true)}
        </Text>
      </Box>
      <Divider color="offWhite0003" />
    </TouchableOpacity>
  )
}

const IMAGES_STYLE = {
  borderRadius: 20,
  height: 40,
  width: 40
} satisfies ImageStyle
