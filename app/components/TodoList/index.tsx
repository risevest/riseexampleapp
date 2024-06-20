import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import AddMoney from 'app/assets/icons/svg/add-money.svg'
import Diamond from 'app/assets/icons/svg/diamond-icon.svg'
import NairaCard from 'app/assets/icons/svg/dollar-card.svg'
import Identity from 'app/assets/icons/svg/identity.svg'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Header, P } from 'app/design/typography'
import { useWalletQuery } from 'app/hooks'
import { useVerification } from 'app/hooks/useVerification'
import * as React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Entypo from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'

import { screenWidth } from '../../design/responsiveModule'
import { AppState } from '../../redux/types'

interface IOnboardingTodoList extends INavigationProps {
  buildWealthPlan: any
  cards: ICard[]
  cardsRequestStatus: RequestStatus
  planRequestStatus: RequestStatus
  user: RiseUser
  userRequestStatus: RequestStatus
}

const useOnboardingTodoListStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    row: {
      ...Styles.spaceBetween,
      borderBottomColor: theme.lightGrey,
      borderBottomWidth: 1,
      paddingBottom: 15,
      paddingTop: 15
    },
    status: {
      alignItems: 'center',
      backgroundColor: theme.error,
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 3
    },
    wrapper: {
      ...Styles.body
    }
  })

  return { styles, theme }
}

const OnboardingTodoList = ({
  navigation,
  buildWealthPlan,
  cards,
  user,
  userRequestStatus,
  planRequestStatus,
  cardsRequestStatus
}: IOnboardingTodoList) => {
  const { theme, styles } = useOnboardingTodoListStyles()
  const { wallet, requestStatus: walletRequestStatus } = useWalletQuery()

  const defaultCard = cards.find((card) => card.isDefault === true)
  const hasFunds =
    Number(wallet?.balanceUsd) > 1 || Number(wallet?.totalBalance) > 0
  const { itemsVerified, idVerifiedStatus } = useVerification()
  const hasBuildWealthPlan = buildWealthPlan?.type === 'build-wealth'

  const checkForTodo = (): boolean => {
    let hasTodo = false
    if (
      !hasFunds ||
      itemsVerified < 2 ||
      idVerifiedStatus === 'Not Verified' ||
      (!hasBuildWealthPlan && !user?.hasBuildWealth) ||
      !defaultCard
    ) {
      hasTodo = true
    }

    return hasTodo
  }

  const buildWealthPlanWidth = 0.45 * screenWidth

  return checkForTodo() ? (
    <View style={CONTAINER}>
      <Header fontsize={17} text="To-Do List" />
      <SkeletonContent
        containerStyle={SKELETON_CONTAINER}
        isLoading={
          cardsRequestStatus === 'pending' ||
          planRequestStatus === 'pending' ||
          walletRequestStatus === 'pending' ||
          userRequestStatus === 'pending'
        }
        layout={[{ height: 61, key: 'todoId', width: '100%' }]}
      >
        <Animatable.View animation="slideInLeft" duration={700} useNativeDriver>
          {!hasBuildWealthPlan && !user?.hasBuildWealth && (
            <TouchableOpacity
              onPress={() => navigation?.navigate('BuildWealth')}
              style={styles.row}
            >
              <View style={{ ...Styles.row }}>
                <Diamond height={42} width={42} />
                <View style={TEXT_CONTAINER}>
                  <P
                    fontsize={15}
                    fontWeight="300"
                    style={{ width: buildWealthPlanWidth }}
                    text="Start a 'Build Wealth' Plan"
                    type="dark"
                  />
                  <P
                    fontsize={13}
                    fontWeight="300"
                    style={SUB_TEXT}
                    text="Own your future"
                    type="light"
                  />
                </View>
              </View>
              <View style={STATUS_CONTAINER}>
                <View style={styles.status}>
                  <P
                    fontsize={14}
                    fontWeight="600"
                    text="Pending"
                    type="white"
                  />
                </View>
                <Entypo
                  color={theme.primaryTextColor}
                  name="chevron-small-right"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          )}
          {!hasFunds && (
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('WalletStack', { screen: 'AddMoney' })
              }
              style={styles.row}
            >
              <View style={{ ...Styles.row }}>
                <AddMoney height={42} width={42} />
                <View style={TEXT_CONTAINER}>
                  <P
                    fontsize={15}
                    fontWeight="300"
                    text="Add Money"
                    type="dark"
                  />
                  <P
                    fontsize={13}
                    fontWeight="300"
                    style={SUB_TEXT}
                    text="Start your investment journey"
                    type="light"
                  />
                </View>
              </View>
              <View style={STATUS_CONTAINER}>
                <View style={styles.status}>
                  <P
                    fontsize={14}
                    fontWeight="600"
                    text="Pending"
                    type="white"
                  />
                </View>
                <Entypo
                  color={theme.primaryTextColor}
                  name="chevron-small-right"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          )}
          {!defaultCard && (
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('WalletStack', { screen: 'PickCardType' })
              }
              style={styles.row}
            >
              <View style={{ ...Styles.row }}>
                <NairaCard height={42} width={42} />
                <View style={TEXT_CONTAINER}>
                  <P
                    fontsize={15}
                    fontWeight="300"
                    text="Link a card"
                    type="dark"
                  />
                  <P
                    fontsize={13}
                    fontWeight="300"
                    style={SUB_TEXT}
                    text="Automate your investments"
                    type="light"
                  />
                </View>
              </View>
              <View style={STATUS_CONTAINER}>
                <View style={styles.status}>
                  <P
                    fontsize={14}
                    fontWeight="600"
                    text="Pending"
                    type="white"
                  />
                </View>
                <Entypo
                  color={theme.primaryTextColor}
                  name="chevron-small-right"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          )}
          {itemsVerified < 2 && (
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('IDStack', { screen: 'IDNotice' })
              }
              style={styles.row}
            >
              <View style={{ ...Styles.row }}>
                <Identity height={42} width={42} />
                <View style={TEXT_CONTAINER_2}>
                  <P
                    fontsize={15}
                    fontWeight="300"
                    text="Verify your identity"
                    type="dark"
                  />
                  <P
                    fontsize={13}
                    fontWeight="300"
                    style={SUB_TEXT}
                    text="We need to know who you are"
                    type="light"
                  />
                </View>
              </View>
              <View style={STATUS_CONTAINER}>
                <View style={styles.status}>
                  <P
                    fontsize={14}
                    fontWeight="600"
                    text={`${itemsVerified}/2 Verified`}
                    type="white"
                  />
                </View>
                <Entypo
                  color={theme.primaryTextColor}
                  name="chevron-small-right"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          )}
        </Animatable.View>
      </SkeletonContent>
    </View>
  ) : null
}

const CONTAINER: ViewStyle = {
  marginBottom: 20,
  marginTop: 20,
  paddingHorizontal: 20
}

const SKELETON_CONTAINER: ViewStyle = {
  marginBottom: 20,
  marginTop: 20,
  paddingHorizontal: 20
}

const TEXT_CONTAINER: ViewStyle = { marginLeft: 10, marginTop: 5 }

const SUB_TEXT: TextStyle = { marginTop: 4 }

const STATUS_CONTAINER: ViewStyle = { ...Styles.row, alignItems: 'center' }

const TEXT_CONTAINER_2 = { marginLeft: 10, marginTop: 3 }

const mapStateToProps = (state: AppState) => ({
  buildWealthPlan: state.plan.buildWealthPlan,
  cards: state.card.cards,
  cardsRequestStatus: state.card.requestStatus,
  planRequestStatus: state.plan.requestStatus,
  user: state.user.user,
  userRequestStatus: state.user.requestStatus
})

const connector = connect(mapStateToProps, null)

export default connector(OnboardingTodoList)
