import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'
import { Platform, TextInput, TouchableOpacity } from 'react-native'

import { AmountInputProps } from './types'
import { useAmountInput } from './use-amount-input'

export default function AmountInput(props: AmountInputProps) {
  const { currency = 'USD', currencySymbol = '$', useOnlyUSD, error } = props
  const { colors } = useTheme()

  const {
    swapEditingAmount,
    onChangeAmount,
    currencySymbolToShow,
    nonEditingAmount,
    currentEditingAmount,
    amount
  } = useAmountInput(props)

  const textInputStyle = {
    color: colors.black,
    minWidth: Platform.OS === 'android' ? 85 : undefined
  }

  return (
    <Box alignItems="center" marginBottom={40} marginTop={20}>
      <Box flexDirection="row" justifyContent="space-between">
        <Box
          alignItems="flex-start"
          justifyContent="flex-start"
          marginRight={3}
          marginTop={Platform.OS === 'android' ? 10 : 0}
        >
          <Text fontSize={15} style={CURRENCY_SYMBOL} variant="bold-18">
            {currentEditingAmount === 'local' ? currencySymbol : '$'}
          </Text>
        </Box>
        <TextInput
          autoFocus
          keyboardType="numeric"
          onChangeText={onChangeAmount}
          placeholder="0.00"
          placeholderTextColor={colors.lightStroke}
          selectionColor={error ? colors.red : colors.primary}
          style={[AMOUNT_INPUT, textInputStyle]}
          testID="amount_input"
          value={
            currentEditingAmount === 'local'
              ? amount.localAmount
              : amount.dollarAmount
          }
        />
      </Box>

      {!useOnlyUSD && !props?.disableSwap ? (
        <Box position="absolute" right={0} top={20} width={34}>
          <TouchableOpacity
            disabled={props.disableSwap}
            onPress={swapEditingAmount}
            testID="toggle_input"
          >
            <Icon name="swap" size={34} />
            <Box marginTop={8}>
              <Text
                color="neutral-overlay"
                textAlign="center"
                variant="body-12-regular"
              >
                {currentEditingAmount === 'dollar' ? currency : 'USD'}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      ) : null}

      {!useOnlyUSD && !props.disableSwap ? (
        <Box marginTop={16}>
          <Text color="neutral-overlay" textAlign="center" variant="num-reg-16">
            <Text color="neutral-overlay">{currencySymbolToShow}</Text>
            {nonEditingAmount}
          </Text>
        </Box>
      ) : null}
    </Box>
  )
}

const CURRENCY_SYMBOL = { color: '#64748B' }
const AMOUNT_INPUT = {
  fontFamily: 'TomatoGrotesk-SemiBold',
  fontSize: 36
}
