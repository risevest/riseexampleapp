/* eslint-disable react-hooks/rules-of-hooks */
import GiftIcon from 'app/assets/icons/svg/gift-icon.svg'
import { UseTheme, useTheme } from 'app/design/theme'
import moment from 'moment'
import React from 'react'
import { Image, ImageStyle } from 'react-native'

import { DataProps } from './interface'

interface IGiftPlanBannerText {
  body: string
  title: string
}

export const carouselData = (navigation: any): DataProps[] => {
  const { theme } = useTheme() as UseTheme
  const isXmasPeriod = moment().isBetween(
    moment('01-12', 'DD-MM'),
    moment('26-12', 'DD-MM')
  )
  const isValPeriod = moment().isBetween(
    moment('15-01', 'DD-MM'),
    moment('15-02', 'DD-MM')
  )
  const defaultText: IGiftPlanBannerText = {
    body: 'Make someone happy today. Send them an investment plan from $10!',
    title: 'Gift a Plan'
  }
  const xmasMessage: IGiftPlanBannerText = {
    ...defaultText,
    body: 'This Christmas, gift your favourite person the future. Send them an investment plan from $10!'
  }
  const valMessage: IGiftPlanBannerText = {
    body: 'Share the love with Rise Gift Plans, starting from $10',
    title: 'A Gift from the Heart'
  }

  let cardText = isXmasPeriod
    ? xmasMessage
    : isValPeriod
      ? valMessage
      : defaultText

  return [
    {
      Icon: (
        <Image
          source={require('../../assets/images/medal.png')}
          style={PAYDAY_CHALLENGE_IMAGE}
        />
      ),
      body: 'Save $780 by December. Start now with $10.',
      name: 'Pay Day',
      onPress: () => {
        navigation.navigate('PayDayStack', { screen: 'PayDayLanding' })
      },
      position: 'absolute',
      style: {
        backgroundColor: theme.purple,
        shadowColor: theme.purple
      },
      title: 'PayDay Challenge',
      type: 'challenge'
    },
    {
      ...cardText,
      Icon: <GiftIcon height={48} width={40} />,
      onPress: () => {
        navigation.navigate('GiftPlanStack', { screen: 'GiftPlan' })
      },
      position: 'relative',
      type: 'regular'
    }
  ]
}

const PAYDAY_CHALLENGE_IMAGE: ImageStyle = {
  height: 54,
  position: 'absolute',
  top: -25,
  width: 22
}
