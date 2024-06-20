import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { IconName } from 'app/assets/icons/types'
import {
  TransactionRequestType,
  TransactionStatus,
  WalletTransaction
} from 'app/domains/wallet/transactions/types'
import { formatAmount } from 'app/internals/strings'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface ITransactionItem {
  item: WalletTransaction
  navigate: () => void
}

export function getTransactionIcon(
  status: TransactionStatus,
  requestType: TransactionRequestType
): { arithmeticSign: '+' | '-' | ''; icon: IconName } {
  switch (status) {
    case 'successful':
      if (requestType === 'withdrawal') {
        return {
          arithmeticSign: '-',
          icon: 'minus-transaction'
        }
      }
      return {
        arithmeticSign: '+',
        icon: 'plus-transaction'
      }

    case 'failed':
      return {
        arithmeticSign: '',
        icon: 'exclamation-failed'
      }
    case 'canceled':
      return {
        arithmeticSign: '',
        icon: 'error'
      }
    default:
      return {
        arithmeticSign: '',
        icon: 'pending-transaction'
      }
  }
}

const TransactionItem = ({ item, navigate }: ITransactionItem) => {
  const { icon, arithmeticSign } = getTransactionIcon(item?.status, item?.type)

  const currencySymbol = item?.currency === 'ngn' ? '₦' : '$'

  return (
    <TouchableOpacity onPress={navigate}>
      <Box flexDirection="row" justifyContent="space-between" marginBottom={20}>
        <Box flex={1} flexDirection="row" flexWrap="wrap">
          <Box marginRight={11} marginTop={4}>
            <Icon name={icon} size={36} />
          </Box>
          <Box flex={1}>
            <Text
              color="neutral-dark-mode"
              numberOfLines={2}
              variant="body-15-regular"
            >
              {`${item?.metadata?.description || 'No transaction description'}`}
            </Text>
            <Text color="soft-tect" fontSize={14} variant="body-15-regular">
              {moment(item.createdAt).format('MMM DD, YYYY')}
            </Text>
          </Box>
        </Box>
        <Text
          color="neutral-dark-mode"
          fontSize={15}
          variant="header-h3-18-reg"
        >
          {`${arithmeticSign} ${currencySymbol}${formatAmount(item.amount)}`}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}

export default TransactionItem
