import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { useHiddenAmount } from 'app/hooks'
import { selectPlanTypeImages } from 'app/redux/plan/selectors'
import { getPlanImage } from 'app/utils/getPlanImage'
import * as React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'

import Image from '../Image'
import { usePlanCardStyles } from './styles'
import { PlanCardProps } from './types'

export function PlanCard({
  plan,
  onNavigate,
  width = getComputedWidth(188),
  height = getComputedHeight(243),
  backgroundImage,
  index
}: PlanCardProps) {
  const amount = useHiddenAmount(plan.currentBalance)

  const { styles } = usePlanCardStyles({ height, width })
  const planImages = useSelector(selectPlanTypeImages(plan?.category))

  const GRADIENT_CONTAINER: ViewStyle = {
    backgroundColor: 'rgba(1, 34, 36, 0.2)',
    borderRadius: 12,
    bottom: 0,
    height,
    position: 'absolute',
    width: '100%'
  }

  const { colors } = useTheme()

  const planTextColor = plan?.pictureUrl
    ? colors.offWhiteWhite
    : colors['neutral-dark-mode']

  const isHighRisk = plan?.planType?.toLowerCase() === 'stocks plan'

  return (
    <TouchableOpacity
      onPress={onNavigate}
      style={styles.planCardContainer}
      testID={`plan_${index + 1}`}
    >
      <Image
        containerStyle={styles.imageWrapper}
        imageUri={
          backgroundImage
            ? { uri: backgroundImage }
            : getPlanImage(plan, planImages)
        }
      />
      <View style={styles.planInfo}>
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Box>
            <Text
              fontSize={15}
              style={{ color: planTextColor }}
              variant="body-reg-18-large-text"
            >
              {plan?.name || plan?.planType}
            </Text>
            <Text style={{ color: planTextColor }} variant="header-h3-18-reg">
              {amount}
            </Text>

            {isHighRisk && (
              <Text
                fontSize={15}
                style={{ color: planTextColor }}
                variant="body-reg-18-large-text"
              >
                High risk
              </Text>
            )}
          </Box>
          <Box marginTop={isHighRisk ? getComputedHeight(25) : 15}>
            <Icon
              name={
                plan?.pictureUrl ? 'full-right-arrow-white' : 'full-arrow-right'
              }
              size={14}
            />
          </Box>
        </Box>
      </View>
      {plan?.pictureUrl ? (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.3)', 'rgba(1, 34, 36, 0.5)']}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={GRADIENT_CONTAINER}
        />
      ) : null}
    </TouchableOpacity>
  )
}
