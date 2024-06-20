import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import Diamond from 'app/assets/images/diamond.svg'
import { Body, P } from 'app/design/typography'
import { fetchBuildWealthPlanDispatcher } from 'app/redux/plan/dispatchers'
import { AppState } from 'app/redux/types'
import { renderBalance } from 'app/utils/index'
import React from 'react'
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'

import { Retry } from '../'
import useDashboardTabStyles from './styles'

interface BuildWealthProps extends INavigationProps, PropsFromRedux {}

const BuildWealthTab = ({
  navigation,
  requestStatus,
  buildWealthPlan,
  isVisible,
  fetchBuildWealthPlan
}: BuildWealthProps) => {
  const { styles, theme } = useDashboardTabStyles()

  return (
    <View>
      <SkeletonContent
        containerStyle={SKELETON_CONTAINER}
        isLoading={requestStatus === 'pending'}
        layout={[{ height: 101, key: 'someId', marginTop: 25, width: '100%' }]}
      >
        {requestStatus === 'success' &&
          buildWealthPlan?.type !== 'build-wealth' && (
            <TouchableOpacity
              onPress={() => navigation?.navigate('BuildWealth')}
              style={styles.emptyPlanWrapper}
            >
              <Diamond height={34} style={styles.diamond} width={41} />
              <View>
                <Body
                  fontsize={17}
                  style={{ color: theme.primaryColor }}
                  text="Own Your Future"
                />
                <P
                  fontsize={14}
                  fontWeight="300"
                  style={{ color: theme.primaryColor }}
                  text="Tap here to create a Build Wealth plan"
                />
              </View>
            </TouchableOpacity>
          )}
        {requestStatus === 'success' &&
          buildWealthPlan?.type === 'build-wealth' && (
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('PlanDetails', {
                  planId: buildWealthPlan.id
                })
              }
              style={BUILD_WEALTH_BTN}
            >
              <View style={styles.imageView}>
                <Image
                  source={
                    buildWealthPlan?.pictureUrl
                      ? { uri: buildWealthPlan.pictureUrl }
                      : require('app/assets/images/build-wealth.png')
                  }
                  style={styles.buildWealthImage}
                />
              </View>
              <View
                style={[styles.buildWealthSection, BUILD_WEALTH_TXT_CONTAINER]}
              >
                <P
                  fontsize={15}
                  fontWeight="200"
                  text="Build Wealth"
                  type="white"
                />
                <P fontsize={13} fontWeight="200" text="Returns" type="white" />
              </View>
              <View style={styles.buildWealthSection}>
                <P
                  fontsize={15}
                  text={renderBalance(
                    isVisible,
                    buildWealthPlan?.currentBalance
                  )}
                  type="white"
                />
                <P
                  fontsize={13}
                  fontWeight="300"
                  style={{ color: theme.success }}
                  text={`+${buildWealthPlan.capitalGains || '0.00'} last week`}
                />
              </View>
            </TouchableOpacity>
          )}
        {requestStatus === 'failed' && (
          <Retry
            onRetry={fetchBuildWealthPlan}
            text="Can't fetch your Build wealth plan at this time"
          />
        )}
      </SkeletonContent>
    </View>
  )
}

const SKELETON_CONTAINER: ViewStyle = { flex: 1 }
const BUILD_WEALTH_BTN: ViewStyle = { marginTop: 20 }
const BUILD_WEALTH_TXT_CONTAINER: ViewStyle = { bottom: 40 }

const mapStateToProps = (state: AppState) => ({
  buildWealthPlan: state.plan.buildWealthPlan,
  isVisible: state.wallet.isTotalBalanceVisible,
  requestStatus: state.plan.requestStatus,
  user: state.user.user,
  userPlans: state.plan?.userPlans || []
})

const connector = connect(mapStateToProps, {
  fetchBuildWealthPlan: fetchBuildWealthPlanDispatcher
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BuildWealthTab)
