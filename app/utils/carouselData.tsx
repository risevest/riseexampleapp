import React from 'react'
import { Image, ImageStyle } from 'react-native'

import { planRestriction } from './index'

interface IGoalsProp extends INavigationProps {
  goalPlans: GoalPlanData[]
  originScreenName: string
  user: RiseUser
  userPlans: IPlan[]
}

type SelectGoalParam = {
  hasAddMoneyScreen: boolean
  navigation: any
  planDescription: string
  planName: string
  planType: string
}

export const GOALS = ({
  userPlans,
  user,
  navigation,
  goalPlans,
  originScreenName
}: IGoalsProp) => {
  const handleGoalSelect = ({
    planName,
    planType,
    ...rest
  }: SelectGoalParam) => {
    const isRestricted = planRestriction(
      userPlans,
      user?.emailVerified,
      navigation
    )
    if (!isRestricted) {
      navigation?.navigate('GoalsStack', {
        params: { originScreenName, planName, planType, ...rest },
        screen: 'GoalRootView'
      })
    }
  }

  const LANDING_PAGE_IMAGE: ImageStyle = { height: 33, width: 33 }

  const newGoalPlans = goalPlans.map((goal) => {
    return {
      ...goal,
      icon: (
        <Image
          source={{ uri: goal.landingPageImage }}
          style={LANDING_PAGE_IMAGE}
        />
      ),
      illustration: goal.planImage,
      name: goal.planName,
      onClick: () => {
        handleGoalSelect({
          navigation,
          ...goal
        })
      },
      subtitle: goal.planDescription,
      title: goal.planName
    }
  })

  return newGoalPlans
}

export const NEWSDATA = [
  {
    article: [
      {
        heading: '',
        id: 1,
        mainBody:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
      },
      {
        heading: 'Why do we use it?',
        id: 5,
        mainBody:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
      }
    ],
    illustration: require('../assets/images/news.png'),
    subtitle: 'JAN 09, 2020',
    title: '9 steps to get good with money in 2020'
  }
]
