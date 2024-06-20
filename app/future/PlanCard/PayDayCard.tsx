import { useNavigation } from '@react-navigation/native'
import { useChallengesQuery } from 'app/hooks/queries/challenge/useChallenges'
import { watchPlanChallengeSuccess } from 'app/redux/plan/actionCreators'
import React from 'react'
import { useDispatch } from 'react-redux'

import { PlanTypesCard } from './PlanTypesCard'

const PayDayCard = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { joinedChallenges } = useChallengesQuery()

  const checkForChallenge = () => {
    findChallenge(joinedChallenges, 'Pay Day')
  }

  const findChallenge = (
    challenges: ChallengeData[],
    challengeName: string
  ) => {
    const foundChallenge = challenges.find(
      (challenge: any) => challenge?.challenge?.planName === challengeName
    )

    // Stops the user from creating a new challenge if they are already in the existing
    // challenge type. If not, it allows them to go through the payday challenge plan creation flow
    if (foundChallenge) {
      dispatch(watchPlanChallengeSuccess(foundChallenge?.challengePlan))
      navigation?.navigate('PlanDetails', {
        canGoBack: true,
        planId: foundChallenge.challengePlan.id
      })
    } else {
      navigation?.navigate('App', {
        params: {
          // @ts-expect-error no types passed?
          params: {
            screen: 'PayDayLanding'
          },
          screen: 'PayDayStack'
        },
        screen: 'AppStack'
      })
    }
  }

  return (
    <PlanTypesCard
      isAssetClass={false}
      isPayDayChallenge={true}
      onPress={checkForChallenge}
    />
  )
}

export default PayDayCard
