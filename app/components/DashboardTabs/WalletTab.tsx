/* eslint-disable react-hooks/exhaustive-deps */
import { SkeletonContent } from '@balogunofafrica/react-native-skeleton-content-nonexpo'
import { Retry } from 'app/components'
import Styles from 'app/design/Styles'
import { P } from 'app/design/typography'
import { useWalletQuery } from 'app/hooks'
import { AppState } from 'app/redux/types'
import { renderBalance } from 'app/utils'
import React, { useEffect } from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { connect, Matching } from 'react-redux'

import { fetchUserCardsDispatcher } from '../../redux/card/dispatchers'
import useDashboardTabsStyle from './styles'

interface IWalletTab extends INavigationProps {
  fetchCards: () => void
  getWallet: (userId: number) => void
  isFetching?: boolean
  isVisible: boolean
  requestStatus: 'idle' | 'success' | 'failed' | 'pending'
  userId?: number | null
  wallet?: null | IRiseWallet
}

type WalletTabProps = {
  isVisible: boolean
  requestStatus: 'idle' | 'success' | 'failed' | 'pending'
  userId: number
} & { fetchCards: () => Promise<void> }

const WalletTab = ({
  getWallet,
  navigation,
  userId,
  requestStatus,
  fetchCards,
  isVisible
}: Matching<WalletTabProps, Partial<IWalletTab>>) => {
  const { styles, theme } = useDashboardTabsStyle()
  const { wallet } = useWalletQuery()
  useEffect(() => {
    fetchCards?.()
  }, [])

  return (
    <View>
      <SkeletonContent
        containerStyle={SKELETON_CONTAINER}
        isLoading={requestStatus === 'pending'}
        layout={[
          { height: 101, key: 'walletTab', marginTop: 25, width: '100%' }
        ]}
      >
        {requestStatus === 'success' && (
          <>
            <TouchableOpacity
              onPress={() => navigation?.navigate('WalletStack')}
              style={[styles.walletView, WALLET]}
            >
              <View>
                <P
                  fontsize={15}
                  fontWeight="300"
                  style={WALLET_BALANCE_TEXT}
                  text="Wallet Balance"
                  type="white"
                />
                <P
                  fontsize={22}
                  text={`${renderBalance(
                    isVisible as boolean,
                    wallet?.balanceUsd
                  )}`}
                  type="white"
                />
              </View>
              <View style={{ ...Styles.row }}>
                <P
                  fontsize={16}
                  fontWeight="600"
                  text="View Wallet"
                  type="white"
                />
                <Entypo
                  color={theme.primarySurface}
                  name="chevron-small-right"
                  size={25}
                  style={ICON}
                />
              </View>
            </TouchableOpacity>
          </>
        )}
        {requestStatus === 'failed' && (
          <Retry
            onRetry={() => getWallet && getWallet(Number(userId))}
            text="Unable to fetch your wallet"
          />
        )}
      </SkeletonContent>
    </View>
  )
}

const SKELETON_CONTAINER = { flex: 1 }

const WALLET: ViewStyle = { marginTop: 20 }

const WALLET_BALANCE_TEXT = { marginBottom: 5 }

const ICON: ViewStyle = { marginTop: -1 }

const mapStateToProps = (state: AppState) => ({
  isVisible: state.wallet.isWalletBalanceVisible,
  requestStatus: state.wallet.requestStatus,
  userId: state.user.userId
})

export default connect(mapStateToProps, {
  fetchCards: fetchUserCardsDispatcher
})(WalletTab)
