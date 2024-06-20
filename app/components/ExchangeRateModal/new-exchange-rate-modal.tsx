import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'

import { NewButton as Button } from '../button'
import { DynamicModal } from '../dynamic-modal/dynamic-modal'
import {
  ExchangeRateModalItemProps,
  ExchangeRateModalProps
} from './new-exchange-rate-modal.props'

function ExchangeRateItem({
  rate,
  subText,
  type,
  currencySymbol
}: ExchangeRateModalItemProps) {
  return (
    <>
      <Box marginVertical={16.59}>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="body-15-regular">{`USD ${type} Rate`}</Text>
          <Text variant="num-reg-15">{`${currencySymbol}${rate}`}</Text>
        </Box>
        <Text color="soft-tect" variant="body-13-regular">
          {subText}
        </Text>
      </Box>
      <Box borderColor="offWhite0003" borderTopWidth={1} />
    </>
  )
}

function ExchangeRateWarning({ text }: { text: string }) {
  const { colors } = useTheme()

  return (
    <Box
      alignItems="center"
      backgroundColor="purple004"
      borderRadius={8}
      flexDirection="row"
      marginBottom="l"
      padding="m"
    >
      <Icon color={colors.purple001} name="info" />
      <Box flex={1} marginHorizontal="m">
        <Text
          color="neutral-dark-mode"
          fontSize={14}
          lineHeight={21}
          variant="body-13-regular"
        >
          {text}
        </Text>
      </Box>
    </Box>
  )
}

export default function NewExchangeRateModal({
  isVisible,
  toggleVisibility,
  onPress,
  buyRate,
  sellRate,
  currency,
  currencySymbol,
  onDismiss
}: ExchangeRateModalProps) {
  return (
    <DynamicModal
      headerText="About Exchange Rates"
      isModalOpen={isVisible}
      onDismiss={onDismiss}
      toggleModalVisibility={toggleVisibility}
      type="content"
    >
      <Box marginTop="l">
        {currency === 'KES' && (
          <ExchangeRateWarning
            text="Kindly note that we round up your funding figures as processing fees
          from our providers."
          />
        )}
        {['GBP', 'EUR'].includes(currency) && (
          <ExchangeRateWarning
            text={`Kindly note that ${currency} withdrawals are not instant and may take up to 4 business days.`}
          />
        )}
        <Box borderColor="offWhite0003" borderTopWidth={1} />
        <ExchangeRateItem
          currencySymbol={currencySymbol}
          rate={buyRate}
          subText="You're funding at this rate"
          type="Buy"
        />
        <ExchangeRateItem
          currencySymbol={currencySymbol}
          rate={sellRate}
          subText="You're withdrawing at this rate"
          type="Sell"
        />
        <Box marginVertical={24}>
          <Text
            color="text0004"
            fontSize={11}
            textAlign="center"
            variant="body-12-regular"
          >
            These exchange rates are provided by independent third parties who
            handle fund conversions at the prevailing parallel rates and are not
            set, or controlled by Rise. They are subject to change based on
            market trends.
          </Text>
        </Box>
        <Box marginBottom={50}>
          <Button
            onPress={onPress || toggleVisibility}
            text="Accept & Continue"
          />
        </Box>
      </Box>
    </DynamicModal>
  )
}
