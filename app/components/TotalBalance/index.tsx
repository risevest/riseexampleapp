import Plus from 'app/assets/icons/svg/plus.svg'
import Styles from 'app/design/Styles'
import { useWalletQuery } from 'app/hooks'
import { toggleTotalBalanceVisibilityDispatcher } from 'app/redux/wallet/dispatchers'
import { renderBalance } from 'app/utils'
import React from 'react'
import {
  Platform,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { UseTheme, useTheme } from '../../design/theme'
import { P } from '../../design/typography'
import { AppState } from '../../redux/types'

const useTotalBalanceStyles = () => {
  const { theme } = useTheme() as UseTheme

  const addMoneyView: ViewStyle = {
    alignItems: 'center',
    backgroundColor: theme.secondaryColor,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 7
  }

  return { styles: { addMoneyView }, theme }
}

interface ITotalBalance extends INavigationProps {
  isVisible: boolean
  toggleBalanceVisibility: (isVisible: boolean) => void
  wallet: IRiseWallet
}

const TotalBalance = ({
  navigation,
  toggleBalanceVisibility,
  isVisible
}: ITotalBalance) => {
  const { theme, styles } = useTotalBalanceStyles()

  const { wallet } = useWalletQuery()

  const handleToggleBalanceVisibility = () => {
    toggleBalanceVisibility(!isVisible)
  }

  const ADD_MONEY: TextStyle = {
    color: theme.primaryColor,
    marginLeft: 5,
    marginTop: 0
  }

  return (
    <View style={WRAPPER}>
      <View>
        <View style={HEADING_VIEW}>
          <P
            fontsize={15}
            fontWeight="200"
            style={TOTAL_BALANCE_TEXT}
            text="Total Balance"
          />
          <Ionicons
            color={theme.primaryColor}
            name={isVisible ? 'ios-eye-off' : 'ios-eye'}
            onPress={handleToggleBalanceVisibility}
            size={20}
            style={ICON}
          />
        </View>
      </View>
      <View style={{ ...Styles.row, ...Styles.spaceBetween }}>
        <View>
          <P
            fontsize={22}
            style={BALANCE}
            text={`${renderBalance(isVisible, wallet?.totalBalance)}`}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation?.navigate('WalletStack', { screen: 'AddMoney' })
          }
          style={styles.addMoneyView}
        >
          <Plus height={12} width={12} />
          <P
            fontsize={14}
            fontWeight="600"
            style={ADD_MONEY}
            text="Add Money"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const TOTAL_BALANCE_TEXT: TextStyle = { marginRight: 7 }

const ICON: ViewStyle = {
  marginLeft: 3,
  marginTop: Platform.OS === 'ios' ? 2 : 0
}

const BALANCE: TextStyle = {
  color: '#1E252B'
}

const WRAPPER: ViewStyle = {
  justifyContent: 'space-between',
  marginTop: 20,
  paddingHorizontal: 20
}
const HEADING_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 6
}

const mapStateToProps = (state: AppState) => ({
  isVisible: state.wallet.isTotalBalanceVisible
})

export default connect(mapStateToProps, {
  toggleBalanceVisibility: toggleTotalBalanceVisibilityDispatcher
})(TotalBalance)
