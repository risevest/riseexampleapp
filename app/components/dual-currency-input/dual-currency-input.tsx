import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import { useToggle } from 'app/hooks'
import React from 'react'
import { TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import ExchangeRateModal from '../ExchangeRateModal/new-exchange-rate-modal'
import {
  CurrencyInputProps,
  DualCurrencyInputProps
} from './dual-currency.props'
import { useDualCurrencyInput } from './use-dual-currency-input'

export function CurrencyInput({
  currencySymbol,
  ...props
}: CurrencyInputProps) {
  const { colors } = useTheme()

  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={20}
      width="100%"
    >
      <Text
        color="neutral-dark-mode"
        fontSize={15}
        fontWeight="bold"
        variant="num-reg-15"
      >
        {currencySymbol || '$'}
      </Text>
      <TextInput
        style={[TEXT_INPUT, { color: colors['neutral-dark-mode'] }]}
        {...props}
      />
    </Box>
  )
}

export default function DualCurrencyInput({
  currencySymbol,
  buyRate,
  sellRate,
  currency,
  handleChange,
  requestType
}: DualCurrencyInputProps) {
  const [
    isExchangeRateModalOpen,
    { toggle: toggleExchangeRateModal, off: closeExchangeRateModal }
  ] = useToggle()

  const rateToBeUsed =
    requestType === 'funding' ? Number(buyRate) : Number(sellRate)

  const { onChangeLocalValue, onChangeDollarValue, values } =
    useDualCurrencyInput(rateToBeUsed, handleChange)

  return (
    <>
      <Box borderColor="offWhite0003" borderTopWidth={1} paddingVertical={20}>
        <CurrencyInput
          autoFocus
          currencySymbol={currencySymbol}
          keyboardType="numeric"
          onChangeText={(text) => onChangeLocalValue(text)}
          placeholder="0.00"
          value={values.local}
        />
      </Box>

      <Box
        alignSelf="center"
        borderColor="offWhiteLight"
        borderWidth={0.48}
        width="100%"
      />

      <Box bottom={20}>
        <Box
          alignItems="center"
          alignSelf="center"
          borderRadius={20}
          elevation={3}
          flexDirection="row"
          justifyContent="center"
          paddingHorizontal={5}
          paddingVertical={7}
          shadowColor="black"
          shadowOpacity={0.26}
          shadowRadius={10}
          style={CURRENCY_RATE_CONTAINER}
        >
          <Text fontSize={12} fontWeight="bold" variant="num-reg-15">
            $ = {currencySymbol} {rateToBeUsed}
            {'  '}
          </Text>
          <TouchableOpacity onPress={toggleExchangeRateModal}>
            <Box
              backgroundColor="offWhite0003"
              borderRadius={20}
              paddingHorizontal={12}
              paddingVertical={4}
            >
              <Text color="primary" variant="body-12-regular">
                Why this rate?
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>

        <Box paddingTop={10}>
          <CurrencyInput
            keyboardType="numeric"
            onChangeText={(text) => onChangeDollarValue(text)}
            placeholder="0.00"
            value={values.dollar}
          />
        </Box>
      </Box>

      <ExchangeRateModal
        buyRate={Number(buyRate)}
        currency={String(currency)}
        currencySymbol={currencySymbol}
        isVisible={isExchangeRateModalOpen}
        onPress={closeExchangeRateModal}
        sellRate={Number(sellRate)}
        toggleVisibility={toggleExchangeRateModal}
      />
    </>
  )
}

const CURRENCY_RATE_CONTAINER = {
  backgroundColor: 'white',
  shadowOffset: { height: 2, width: 0 }
}

const TEXT_INPUT: TextStyle & ViewStyle = {
  fontFamily: 'TomatoGrotesk-Regular',
  fontSize: 15,
  height: '100%',
  textAlign: 'right',
  width: '50%'
}
