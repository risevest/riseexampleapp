import { Text } from '@risemaxi/sarcelle'
import Gift from 'app/assets/icons/svg/gift-icon.svg'
import { defaultPlanImages } from 'app/utils'
import { getEmoji } from 'app/utils/utilFunctions'
import moment from 'moment'
import React from 'react'
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native'

import {
  getComputedHeight,
  getComputedWidth
} from '../../design/responsiveModule'
import GeneralStyles from '../../design/Styles'
import { UseTheme, useTheme } from '../../design/theme'
import { Header, P } from '../../design/typography'
import { planTag } from '../../utils/index'
import { calculatePlanPercentageInc } from '../../utils/numberformatter'
import { IGoalCard, IImageCard, IPortfolioCard } from './interface'

const planTypeObj: PlanType = {
  'fixed income plan': 'today',
  'real estate plan': 'last month',
  'stocks plan': 'today'
}

type PlanTag = 'real estate plan' | 'stocks plan' | 'fixed income plan'

type PlanType = Record<PlanTag, string>

const useCardStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    cardWrapper: {
      borderRadius: 8,
      height: 148,
      marginRight: 8,
      marginTop: 22,
      overflow: 'hidden',
      width: 150
    },
    gains: {
      backgroundColor: 'green',
      borderRadius: 8,
      bottom: 10,
      paddingHorizontal: 10,
      paddingVertical: 1,
      position: 'absolute',
      right: 10,
      textAlign: 'center'
    },
    goalText: {
      bottom: 17,
      color: theme.primarySurface,
      left: 13,
      position: 'absolute',
      right: 0,
      zIndex: 10
    },
    headerText: {
      marginBottom: 1.3
    },
    iconView: {
      alignItems: 'center',
      backgroundColor: theme.secondaryColor,
      borderRadius: 33 / 2,
      height: 33,
      justifyContent: 'center',
      left: 13,
      position: 'absolute',
      top: 13,
      width: 33
    },
    image: {
      borderRadius: 8,
      height: 101,
      resizeMode: 'cover',
      width: '100%'
    },
    imageCardWrapper: {
      marginRight: 8,
      marginTop: 19,
      width: 175
    },
    imageView: {
      marginBottom: 6
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(1, 34, 36, 0.2)',
      borderRadius: 8,
      overflow: 'hidden'
    },
    planTag: {
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      marginBottom: 20,
      marginTop: 10,
      paddingVertical: 2,
      width: 100
    },
    value: {
      color: theme.tertiaryColor,
      marginTop: 5
    },
    worth: {
      backgroundColor: theme.lightText,
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: getComputedWidth(10),
      paddingVertical: getComputedWidth(10),
      width: getComputedWidth(150)
    }
  })

  return { styles, theme }
}

const emojiTree = {
  high: 'fire',
  low: 'evergreen_tree',
  medium: 'star2'
} as any

export const PortfolioCard = ({
  value,
  heading,
  cardStyle = {},
  textStyle = {},
  cardTitleStyle = {},
  type,
  level = ''
}: IPortfolioCard) => {
  const { styles } = useCardStyles()
  const valueStyle = { ...styles.value, ...textStyle }

  const PORTFOLIO_TEXT_CONTAINER: TextStyle = {
    ...GeneralStyles.wrap,
    alignItems: 'center',
    marginTop: 6
  }

  return (
    <View
      style={[
        styles.worth,
        {
          paddingVertical: getComputedHeight(10),
          width: type === 'large' ? getComputedWidth(160) : getComputedWidth(70)
        },
        cardStyle
      ]}
    >
      <Text color="soft-tect" style={cardTitleStyle} variant="body-13-regular">
        {heading}
      </Text>
      <View style={PORTFOLIO_TEXT_CONTAINER}>
        <Text color="text-dark" style={valueStyle} variant="bold-18">
          {value}
        </Text>
        {!!level && (
          <Text color="soft-tect" style={EMOJI_TEXT} variant="body-15-regular">
            {getEmoji(emojiTree[level])}
          </Text>
        )}
      </View>
    </View>
  )
}

const EMOJI_TEXT = { marginLeft: 4, marginTop: 6 }

export const ImageCard = ({
  header,
  body,
  order,
  style = {},
  imageStyle = {},
  pictureUrl,
  planType,
  hasTag = false,
  showGains = false,
  returns,
  type,
  ...rest
}: IImageCard) => {
  const { styles, theme } = useCardStyles()
  const { isClosed, matureAt } = rest

  const renderCardBody = () => {
    return order === 'reversed' ? (
      <>
        <P fontsize={16} fontWeight="300" text={header} />
        <Header
          fontsize={14}
          style={styles.headerText}
          text={body}
          type="dark"
        />
      </>
    ) : (
      <>
        <Header
          fontsize={16}
          style={styles.headerText}
          text={header}
          type="dark"
        />
        <P fontsize={14} fontWeight="300" text={body} />
      </>
    )
  }

  const getPlanTag = () => {
    const mixedPlanTypes = [
      'business plan',
      'school plan',
      'build wealth plan',
      'savings plan',
      undefined
    ]
    const planKey: string = mixedPlanTypes.includes(planType?.toLowerCase())
      ? 'mixed'
      : planType?.toLowerCase()
    if (isClosed) {
      return planTag.closed
    }
    const planTagObject = planTag[planKey as string]

    return planTagObject
  }
  const returnsObject = calculatePlanPercentageInc(returns)

  return (
    <TouchableOpacity style={[styles.imageCardWrapper, style]} {...rest}>
      <View style={styles.imageView}>
        <Image
          source={
            pictureUrl
              ? { uri: pictureUrl }
              : defaultPlanImages[(planType as string)?.toLowerCase()]
                ? defaultPlanImages[(planType as string)?.toLowerCase()]
                : type && type === 'gift'
                  ? require('app/assets/images/gift-plan.jpg')
                  : require('app/assets/images/build-wealth.png')
          }
          style={[styles.image, imageStyle]}
        />
        <View style={styles.overlay} />
        {showGains && returns?.length > 1 && (
          <View
            style={[
              styles.gains,
              {
                backgroundColor: returnsObject.isPositive
                  ? theme.success
                  : theme.error
              }
            ]}
          >
            <P
              text={`${returnsObject.isPositive ? '+' : ''}${
                returnsObject.percentageIncrease
              }% ${planTypeObj[planType?.toLowerCase() as PlanTag] || ''}`}
            />
          </View>
        )}
        {type === 'gift' && (
          <View style={GIFT_CONTAINER}>
            <Gift height={25} width={25} />
          </View>
        )}
      </View>
      {renderCardBody()}
      {hasTag && (
        <View
          style={[
            styles.planTag,
            { backgroundColor: getPlanTag()?.tagBackground }
          ]}
        >
          <P
            fontsize={13}
            style={{ color: getPlanTag()?.tagColor }}
            text={getPlanTag()?.tag}
          />
        </View>
      )}
      {isClosed && (
        <P
          fontsize={13}
          text={`Closed on ${moment(matureAt).format('D MMMM YYYY')}`}
        />
      )}
    </TouchableOpacity>
  )
}

const GIFT_CONTAINER: TextStyle = {
  left: 5,
  position: 'absolute',
  top: 5
}

export const GoalsCard = ({
  style = {},
  planName,
  imageStyle = {},
  textStyle = {},
  planImage,
  landingPageImage,
  ...rest
}: IGoalCard) => {
  const { styles } = useCardStyles()
  const textSty = { ...textStyle, ...styles.goalText }

  return (
    <TouchableOpacity style={[styles.cardWrapper, style]} {...rest}>
      <Image source={{ uri: planImage }} style={imageStyle} />
      <View style={styles.overlay} />
      <View style={styles.iconView}>
        <Image source={{ uri: landingPageImage }} style={GOAL_IMAGE} />
      </View>
      <P fontsize={13} style={textSty} text={planName.toUpperCase()} />
    </TouchableOpacity>
  )
}

const GOAL_IMAGE: ImageStyle = { height: 33, width: 33 }
