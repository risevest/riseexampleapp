import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import { defaultPlanImages } from 'app/utils'
import { formatInput } from 'app/utils/numberformatter'
import * as React from 'react'
import {
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { P } from '../../design/typography'
import { AppState } from '../../redux/types'
import useDashboardTabsStyle from './styles'

interface IOtherPlansProps extends INavigationProps {
  requestStatus: RequestStatus
  userPlans: IPlan[]
}

const OtherPlans = ({
  userPlans,
  navigation,
  requestStatus
}: IOtherPlansProps) => {
  const { styles, theme } = useDashboardTabsStyle()

  const fetchPlans = (plans: IPlan[]): IPlan[] => {
    const fetchedPlans = plans
      .filter((uPlans) => uPlans?.type !== 'build-wealth')
      .slice(0, 2)
    return fetchedPlans
  }

  const EMPTY_PLAN_TEXT: TextStyle = {
    color: theme.tertiaryColor,
    marginBottom: 3
  }

  return (
    <View>
      <SkeletonContent
        containerStyle={SKELETON_CONTAINER}
        isLoading={requestStatus === 'pending'}
        layout={[
          {
            children: [
              { height: 101, width: 170 },
              { height: 10, marginTop: 10, width: 100 },
              { height: 10, marginTop: 5, width: 50 }
            ],
            flexDirection: 'column',
            key: 'plansId'
          },
          {
            children: [
              { height: 101, width: 170 },
              { height: 10, marginTop: 10, width: 100 },
              { height: 10, marginTop: 5, width: 50 }
            ],
            flexDirection: 'column',
            key: 'plansId2'
          }
        ]}
      >
        {userPlans.length === 0 && (
          <View style={[styles.emptyPlans, EMPTY_PLAN_CONTAINER]}>
            <P
              fontsize={17}
              style={EMPTY_PLAN_TEXT}
              text="Nothing to see yet"
            />
            <P
              fontsize={13}
              fontWeight="200"
              text="Tap on 'Explore Plans' to create a new plan"
            />
            <TouchableOpacity
              onPress={() => navigation?.navigate('PlansStack')}
              style={styles.explorePlans}
            >
              <Ionicons name="search" size={14} style={styles.searchIcon} />
              <P
                fontsize={11}
                style={{ color: theme.primaryColor }}
                text="Explore Plans"
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={USER_PLANS}>
          {userPlans.length >= 1 &&
            fetchPlans(userPlans).map((plan) => (
              <View key={plan.id} style={PLAN_CONTAINER}>
                <TouchableOpacity
                  onPress={() =>
                    navigation?.navigate('PlanDetails', { planId: plan.id })
                  }
                  style={styles.planImageContainer}
                >
                  <Image
                    resizeMode="cover"
                    source={
                      Boolean(plan.pictureUrl)
                        ? { uri: plan?.pictureUrl }
                        : defaultPlanImages[plan?.planType?.toLowerCase()]
                          ? defaultPlanImages[plan?.planType?.toLowerCase()]
                          : require('app/assets/images/build-wealth.png')
                    }
                    style={PLAN_IMAGE}
                  />
                </TouchableOpacity>
                <P
                  fontsize={16}
                  fontWeight="300"
                  style={styles.planText}
                  text={plan.name}
                />
                <P
                  fontsize={14}
                  style={{ color: theme.tertiaryColor }}
                  text={`$${
                    formatInput(Number(plan.currentBalance).toFixed(2)) ||
                    '0.00'
                  }`}
                />
              </View>
            ))}
        </View>
      </SkeletonContent>
    </View>
  )
}

const SKELETON_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20
}

const EMPTY_PLAN_CONTAINER: TextStyle = { width: '100%' }

const USER_PLANS: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const PLAN_CONTAINER: ViewStyle = { width: '48%' }

const PLAN_IMAGE: ImageStyle = {
  height: '100%',
  width: '100%'
}

const mapStateToProps = (state: AppState) => ({
  requestStatus: state.plan.requestStatus,
  userPlans: state.plan?.userPlans?.userPlans || []
})

export default connect(mapStateToProps)(OtherPlans)
