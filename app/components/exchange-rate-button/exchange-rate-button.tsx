import { Box, Text } from '@risemaxi/sarcelle'
import { Currency, CurrencyRate, RequestType } from 'app/domains/wallet'
import { useToggle } from 'app/hooks'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'

import ExchangeRateModal from '../ExchangeRateModal/new-exchange-rate-modal'

interface ExchangeRateButtonProps {
  currency: Currency
  currencySymbol: string
  rate: CurrencyRate
  transactionType: RequestType
}

export default function ExchangeRateButton({
  currencySymbol,
  rate,
  transactionType,
  currency
}: ExchangeRateButtonProps) {
  const [
    showExchangeRateModal,
    { toggle: toggleExchangeRateModal, off: closeExchangeRateModal }
  ] = useToggle()

  const rateUsed =
    transactionType === 'funding' ? rate?.buyRate : rate?.sellRate

  if (rate.buyRate === rate.sellRate) {
    return null
  }

  return (
    <>
      <Box flexDirection="row">
        <Box
          alignSelf="center"
          borderColor="offWhiteLight"
          borderWidth={0.48}
          flex={1}
        />
        <Box
          alignItems="center"
          alignSelf="center"
          backgroundColor="white"
          borderRadius={20}
          flexDirection="row"
          justifyContent="center"
          paddingHorizontal={12}
          paddingVertical={7}
        >
          <Text fontSize={12} fontWeight="bold" variant="num-reg-15">
            $1 = {currencySymbol}
            {rateUsed}
            {'  '}
          </Text>
          <TouchableOpacity onPress={toggleExchangeRateModal}>
            <Box
              backgroundColor="background"
              borderRadius={20}
              elevation={3}
              paddingHorizontal={12}
              paddingVertical={4}
              style={SHADOW_STYLE}
            >
              <Text color="primary" variant="body-12-regular">
                Why this rate?
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>

        <Box
          alignSelf="center"
          borderColor="offWhiteLight"
          borderWidth={0.48}
          flex={1}
        />
      </Box>

      <ExchangeRateModal
        buyRate={Number(rate?.buyRate)}
        currency={String(currency)}
        currencySymbol={currencySymbol}
        isVisible={showExchangeRateModal}
        onPress={closeExchangeRateModal}
        sellRate={Number(rate?.sellRate)}
        toggleVisibility={toggleExchangeRateModal}
      />
    </>
  )
}

const SHADOW_STYLE: ViewStyle = {
  elevation: 6,
  shadowColor: 'rgba(43, 57, 75, 0.15)',
  shadowOffset: {
    height: 3,
    width: 0
  },
  shadowOpacity: 0.27,

  shadowRadius: 4.65
}
