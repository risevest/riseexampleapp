import WhiteArrow from 'app/assets/icons/svg/white-arrow.svg'
import { Body, P } from 'app/design/typography'
import { getJoinedChallenges as getJoinedChallengesDispatcher } from 'app/redux/challenge/dispatchers'
import { watchPlanChallengeSuccessDispatcher } from 'app/redux/plan/dispatchers'
import { AppState } from 'app/redux/types'
import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { connect } from 'react-redux'

import { carouselData } from './data'
import { useChallengeStyles } from './styles'

interface Props extends INavigationProps {
  challenges: ChallengeData[]
  getJoinedChallenges: () => Promise<{
    data: ChallengeData[]
    requestStatus: string
  }>
  requestStatus: RequestStatus
  watchPlanChallenge: (plan: IPlan) => any
}

const ChallengeCarousel = ({
  navigation,
  challenges,
  getJoinedChallenges,
  watchPlanChallenge,
  requestStatus
}: Props) => {
  const { styles, theme } = useChallengeStyles()
  const [activeSlide, setActiveSlide] = React.useState(0)

  const checkForChallenge = async (challengeName: string) => {
    if (challenges.length > 0) {
      findChallenge(challenges, challengeName)
    } else {
      // It is possible that an error occured when fetching the challenges initally.
      // If that is the case, challenges array will be empty, so we fetch the challenges again.
      // This will ensure users don't join a challenge again they've already joined

      const requestData = await getJoinedChallenges()
      if (requestData?.requestStatus === 'success') {
        findChallenge(requestData?.data, challengeName)
      }
    }
  }

  const findChallenge = (
    challengeData: ChallengeData[],
    challengeName: string
  ) => {
    const foundChallenge = challengeData?.find(
      (challenge) => challenge.challenge.planName === challengeName
    )

    if (foundChallenge) {
      watchPlanChallenge(foundChallenge.challengePlan)
      navigation?.navigate('PlanDetails', {
        planId: foundChallenge.challengePlan.id
      })
    } else {
      navigation?.navigate('PayDayStack', { screen: 'PayDayLanding' })
    }
  }

  const renderItem = ({ item }: any) => {
    const Icon = item.Icon

    const BODY: TextStyle = {
      color: theme.primarySurface,
      lineHeight: 22
    }

    return (
      <TouchableOpacity
        disabled={item.type === 'challenge' && requestStatus === 'pending'}
        onPress={
          item.type === 'challenge'
            ? () => checkForChallenge(item.name)
            : item.onPress
        }
        style={[styles.wrapper, item.style]}
      >
        <View style={styles.info}>
          {item.position === 'relative' ? (
            Icon
          ) : (
            <View style={ICON_CONTAINER}>{Icon}</View>
          )}
          <View style={styles.infoText}>
            <Body fontsize={17} style={BODY} text={item.title} type="white" />
            <P
              fontsize={13}
              fontWeight="400"
              style={{
                color: theme.primarySurface
              }}
              text={item.body}
              type="white"
            />
          </View>
          <View>
            {item.type === 'challenge' && requestStatus === 'pending' && (
              <ActivityIndicator
                color={theme.primarySurface}
                size="small"
                style={ACTIVITY_INDICATOR}
              />
            )}
            <WhiteArrow height={14} width={8} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Carousel
        autoplay
        autoplayInterval={5000}
        containerCustomStyle={CAROUSEL_CONTAINER}
        data={carouselData(navigation)}
        enableMomentum={false}
        itemWidth={Dimensions.get('window').width}
        lockScrollWhileSnapping
        loop
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
      />
      <Pagination
        activeDotIndex={activeSlide}
        containerStyle={PAGINATION}
        dotsLength={carouselData(navigation).length}
        dotStyle={styles.dot}
      />
    </View>
  )
}

const CAROUSEL_CONTAINER = {
  paddingBottom: 20
}

const PAGINATION = { marginTop: -40 }

const ICON_CONTAINER: ViewStyle = { marginLeft: 5, marginRight: 20 }

const ACTIVITY_INDICATOR: ViewStyle = {
  marginTop: -35,
  position: 'absolute',
  right: 2
}

const mapStateToProps = (state: AppState) => ({
  challenges: state.challenge?.challenges || [],
  requestStatus: state.challenge?.requestStatus
})

export default connect(mapStateToProps, {
  getJoinedChallenges: getJoinedChallengesDispatcher,
  watchPlanChallenge: watchPlanChallengeSuccessDispatcher
})(ChallengeCarousel as React.FunctionComponent)
