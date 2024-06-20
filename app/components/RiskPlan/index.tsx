import FI from 'app/assets/icons/svg/fi.svg'
import RE from 'app/assets/icons/svg/re.svg'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import { getEmoji } from 'app/utils/utilFunctions'
import React from 'react'
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native'

const useRiskPlanStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    plan: {
      backgroundColor: theme.lightText,
      borderRadius: 8,
      height: 148,
      marginRight: 8,
      marginTop: 22,
      padding: 16,
      width: 150
    },
    planRisk: {
      borderBottomColor: theme.lightText,
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginBottom: 6,
      paddingBottom: 8
    }
  })

  return { styles, theme }
}

interface IRiskPlans {
  name: string
  onPress?: () => void
  riskLevel: RiskLevel
  style?: any
}

const RiskPlans = ({ style, onPress, name, riskLevel }: IRiskPlans) => {
  const { styles, theme } = useRiskPlanStyles()

  const riskAttribute = {
    high: {
      color: theme.error,
      emoji: 'fire',
      icon: null,
      image: require('app/assets/images/stockss.png'),
      type: 'High'
    },
    low: {
      color: theme.primaryColor,
      emoji: 'evergreen_tree',
      icon: <FI height={33} width={132} />,
      image: null,
      type: 'Low'
    },
    medium: {
      color: theme.warning,
      emoji: 'star',
      icon: <RE height={33} width={132} />,
      image: null,
      type: 'Medium'
    }
  }

  const RISK_PLAN_TEXT: TextStyle = {
    color: riskAttribute[riskLevel]?.color,
    // marginTop: 1,
    marginRight: 5
  }

  const NAME: TextStyle = {
    // lineHeight: 13,
    marginBottom: 20,
    marginTop: 8,
    textTransform: 'uppercase'
  }

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[styles.plan, style]}
    >
      <View style={styles.planRisk}>
        <P
          fontsize={14}
          fontWeight="200"
          style={RISK_PLAN_TEXT}
          text={`${riskAttribute[riskLevel]?.type} Risk`}
        />

        <P fontsize={11} text={getEmoji(riskAttribute[riskLevel]?.emoji)} />
      </View>
      <View>
        <P fontsize={14} style={NAME} text={name} type="dark" />
      </View>
      {riskAttribute[riskLevel]?.icon && riskAttribute[riskLevel]?.icon}
      {riskAttribute[riskLevel]?.image && (
        <Image source={riskAttribute[riskLevel]?.image} style={IMAGE} />
      )}
    </TouchableOpacity>
  )
}

const IMAGE: ImageStyle = { height: 35, width: 132 }

export default RiskPlans
