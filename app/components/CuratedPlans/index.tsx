/* eslint-disable react-hooks/exhaustive-deps */
import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import { Retry, RiskPlans } from 'app/components'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import { UseTheme, useTheme } from 'app/design/theme'
import { Header, P } from 'app/design/typography'
import { getAssetClassesDispatcher } from 'app/redux/plan/dispatchers'
import { AppState } from 'app/redux/types'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import { connect } from 'react-redux'

import { planRestriction } from '../../utils/index'
import { cardSpec } from '../Slider/index'

const useCuratedPlansStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    explorePlans: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'rgba(131, 143, 145, 0.05)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 31,
      justifyContent: 'center',
      marginTop: 33,
      width: 160
    },
    loadingStyle: {
      borderRadius: 8,
      height: 148,
      marginRight: 8,
      marginTop: 22,
      width: 150
    },
    plan: {
      backgroundColor: theme.lightText,
      borderRadius: 8,
      height: getComputedHeight(148),
      marginRight: 8,
      marginTop: 22,
      padding: 16,
      width: getComputedWidth(150)
    },
    planRisk: {
      borderBottomColor: theme.lightText,
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginBottom: 6,
      paddingBottom: 8
    },
    searchIcon: {
      color: theme.primaryColor,
      marginRight: 10,
      marginTop: 3
    }
  })

  return { styles, theme }
}

interface ICuratePlansProps extends INavigationProps {
  assetClasses: IAssetClass[]
  getAssetClasses: () => Promise<void>
  requestStatus: RequestStatus
  user: RiseUser | null
  userPlans: IPlan[]
}

const CuratedPlans = ({
  navigation,
  assetClasses,
  getAssetClasses,
  requestStatus,
  userPlans,
  user
}: ICuratePlansProps) => {
  const { styles, theme } = useCuratedPlansStyles()

  useEffect(() => {
    getAssetClasses()
  }, [])

  const handlePlanSelect = (item: IAssetClass) => {
    const isRestricted = planRestriction(
      userPlans,
      Boolean(user?.emailVerified),
      navigation
    )
    if (!isRestricted) {
      handleNavigation(item)
    }
  }

  const handleNavigation = (item: IAssetClass) => {
    navigation?.navigate('AssetClass', {
      params: {
        assetClass: item,
        assetId: item.id,
        originScreenName: 'Dashboard'
      },
      screen: 'AssetClassRoot'
    })
  }

  const HEADER_TEXT = {
    color: theme.tertiaryColor,
    marginBottom: 3,
    marginTop: 15
  }

  return (
    <View style={CONTAINER}>
      <Header fontsize={17} style={HEADER_TEXT} text="Asset Classes" />
      <P
        fontsize={14}
        fontWeight="200"
        style={{ color: theme.primaryTextColor }}
        text="Some plans for you based on your profile"
      />
      <SkeletonContent
        containerStyle={SKELETON_CONTAINER}
        isLoading={requestStatus === 'pending'}
        layout={[
          {
            key: 'firstPlan',
            ...styles.loadingStyle
          },
          {
            key: 'secondPlan',
            ...styles.loadingStyle
          },
          {
            key: 'thirdPlan',
            ...styles.loadingStyle
          }
        ]}
      >
        {requestStatus === 'success' && (
          <FlatList
            data={assetClasses.filter(
              (assetClass) => assetClass.name !== 'Venture Capital'
            )}
            decelerationRate="fast"
            horizontal
            keyExtractor={(item, index) => `${index}`}
            pagingEnabled
            renderItem={({ item }) => (
              <RiskPlans
                key={item.id}
                name={item.longName}
                onPress={() => handlePlanSelect(item)}
                riskLevel={item.riskLevel}
              />
            )}
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSpec.FULL_SIZE}
          />
        )}
        {requestStatus === 'failed' && assetClasses.length === 0 && (
          <Retry
            onRetry={getAssetClasses}
            text="Something went wrong fetching Asset classes"
          />
        )}
      </SkeletonContent>
    </View>
  )
}

const CONTAINER: ViewStyle = { paddingHorizontal: 20 }
const SKELETON_CONTAINER: ViewStyle = { flex: 1, flexDirection: 'row' }

const mapStateToProps = (state: AppState) => ({
  assetClasses: state.plan?.assetClasses || [],
  requestStatus: state.plan?.requestStatus,
  user: state.user.user,
  userPlans: state.plan?.userPlans?.userPlans || []
})

export default connect(mapStateToProps, {
  getAssetClasses: getAssetClassesDispatcher
})(CuratedPlans)
