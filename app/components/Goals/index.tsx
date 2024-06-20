/* eslint-disable react-hooks/exhaustive-deps */
import { UseTheme, useTheme } from 'app/design/theme'
import { Header, P } from 'app/design/typography'
import { fetchGoalPlansDispatcher } from 'app/redux/plan/dispatchers'
import { AppState } from 'app/redux/types'
import { GOALS } from 'app/utils/carouselData'
import React, { ComponentType } from 'react'
import { ActivityIndicator, StyleSheet, TextStyle, View } from 'react-native'
import { connect } from 'react-redux'

import { Retry } from '../Retry'
import SliderComp from '../Slider'

const useGoalsStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({})

  return { styles, theme }
}

interface IGoals extends INavigationProps {
  fetchGoalPlans: () => Promise<void>
  goalPlans: GoalPlanData[]
  requestStatus: RequestStatus
  user: RiseUser | null
  userPlans: IPlan[]
}

const Goals: ComponentType<IGoals> = ({
  navigation,
  userPlans,
  user,
  goalPlans,
  requestStatus,
  fetchGoalPlans
}: IGoals) => {
  const { theme } = useGoalsStyles()

  React.useEffect(() => {
    fetchGoalPlans()
  }, [])

  const HEADER: TextStyle = {
    color: theme.tertiaryColor,
    marginBottom: 3,
    marginTop: 37,
    paddingHorizontal: 20
  }

  const TITLE: TextStyle = {
    color: theme.primaryTextColor,
    paddingHorizontal: 20
  }

  const ACTIVITY_INDICATOR = { marginTop: 50 }

  return (
    <View>
      <Header fontsize={17} style={HEADER} text="Goals" />
      <P
        fontsize={14}
        fontWeight="200"
        style={TITLE}
        text="Put your money where your mind is"
      />
      {requestStatus === 'pending' && (
        <ActivityIndicator
          color={theme.primaryColor}
          size="small"
          style={ACTIVITY_INDICATOR}
        />
      )}
      {requestStatus === 'failed' && (
        <Retry onRetry={fetchGoalPlans} text="Failed to fetch goal plans" />
      )}
      {requestStatus === 'success' && (
        <SliderComp
          data={GOALS({
            goalPlans,
            navigation,
            originScreenName: 'Dashboard',
            user: user as RiseUser,
            userPlans
          })}
          hasIcon={true}
          imageSource="uri"
        />
      )}
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({
  goalPlans: state.plan.goalPlans,
  requestStatus: state.plan.requestStatus,
  user: state.user.user,
  userPlans: state.plan?.userPlans?.userPlans || []
})

export default connect(mapStateToProps, {
  fetchGoalPlans: fetchGoalPlansDispatcher
})(Goals)
