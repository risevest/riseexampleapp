import { useNavigation } from '@react-navigation/core'
import { Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

export function CreatePlanCard() {
  const navigation = useNavigation()

  const navigateToCreatePlan = () => {
    navigation.navigate('CreatePlan')
  }

  return (
    <TouchableOpacity onPress={navigateToCreatePlan} style={CREATE_PLAN_CARD}>
      <Icon name="plus-circle" size={getComputedWidth(40)} />

      <Text
        marginHorizontal="l"
        marginTop="s"
        textAlign="center"
        variant="button-15-bold"
      >
        Create an investment plan
      </Text>
    </TouchableOpacity>
  )
}

const CREATE_PLAN_CARD: ViewStyle = {
  alignItems: 'center',
  backgroundColor: 'rgba(113, 135, 156, 0.1)',
  borderRadius: 12,
  height: getComputedHeight(243),
  justifyContent: 'center',
  marginRight: 20,
  width: getComputedWidth(188)
}
