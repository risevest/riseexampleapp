import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import Styles, { shadow } from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Text } from 'app/future'
import { formatInputAmount, parseAmount } from 'app/internals/strings'
import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native'

interface DualCurrencyInputProps {
  invert?: boolean
  localCurrencySymbol: string
  onChange: (amount: DualAmount) => void
  onShowRates?: () => void
  rate: number
  rateLabel?: string
}

export interface DualAmount {
  dollarAmount: number
  localAmount: number
}

export interface CurrencyInputProps extends TextInputProps {
  containerStyle?: object
  localCurrencySymbol: string
}

function useDualCurrencyInputStyles() {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    dollar: {
      fontSize: getComputedWidth(18),
      fontWeight: '400',
      lineHeight: getComputedWidth(21)
    },
    input: {
      color: theme.gray,
      flex: 1,
      fontFamily: 'TomatoGrotesk-Regular',
      fontSize: getComputedWidth(18),
      marginTop: 5,
      paddingBottom: 15,
      paddingTop: 15,
      textAlign: 'right'
    },
    inputBorderStyle: {
      borderBottomColor: theme.lightGrey,
      borderBottomWidth: 1
    },
    inputView: {
      ...Styles.row,
      alignItems: 'center',
      paddingBottom: 10
    },
    label: {
      ...Styles.topSpacing
    },
    rateInfoView: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.primarySurface,
      borderColor: theme.primarySurface,
      borderRadius: 20,
      borderWidth: 1,
      bottom: getComputedHeight(-15),
      elevation: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: getComputedWidth(16),
      paddingVertical: getComputedHeight(8),
      position: 'absolute',
      zIndex: 1,
      ...shadow(0, 4, 8, 'rgba(129, 143, 180, 0.18)', 1)
    },
    why: {
      backgroundColor: 'rgba(113, 135, 156, 0.1)',
      borderRadius: 20,
      marginLeft: getComputedWidth(15),
      paddingHorizontal: 13,
      paddingVertical: getComputedHeight(4)
    }
  })

  return { styles, theme }
}

export function DollarCurrencyInput({
  containerStyle,
  ...props
}: Omit<CurrencyInputProps, 'localCurrencySymbol'>) {
  const { styles, theme } = useDualCurrencyInputStyles()

  return (
    <View style={[styles.inputView, containerStyle]}>
      <Text textStyle={styles.dollar} type="num-15-reg" variant="dark">
        $
      </Text>
      <TextInput
        contextMenuHidden={true}
        editable={true}
        keyboardType="numeric"
        placeholder="0.00"
        placeholderTextColor={theme.tertiaryColor}
        style={styles.input}
        testID="dollar_input"
        {...props}
      />
    </View>
  )
}

function LocalCurrencyInput({
  containerStyle,
  localCurrencySymbol,
  ...props
}: CurrencyInputProps) {
  const { styles, theme } = useDualCurrencyInputStyles()

  const CURRENCY_SYMBOL: TextStyle = {
    color: theme.gray,
    fontWeight: '600'
  }

  return (
    <View style={[styles.inputView, containerStyle]}>
      <Text textStyle={CURRENCY_SYMBOL} type="num-15-reg" variant="dark">
        {localCurrencySymbol}
      </Text>
      <TextInput
        contextMenuHidden={true}
        editable={true}
        keyboardType="numeric"
        placeholder="0.00"
        placeholderTextColor={theme.tertiaryColor}
        style={styles.input}
        {...props}
      />
    </View>
  )
}

interface RateInfoProps {
  localCurrencySymbol: string
  onShowRates?: () => void
  rate: number
  rateLabel?: string
}

function RateInfo({
  localCurrencySymbol,
  rate,
  onShowRates,
  rateLabel
}: RateInfoProps) {
  const { styles, theme } = useDualCurrencyInputStyles()
  const showWhy = !!onShowRates
  const label = rateLabel ?? `$1 = ${localCurrencySymbol}${rate}`

  const LABEL: TextStyle = {
    color: theme.gray,
    fontWeight: 'bold',
    lineHeight: getComputedWidth(15)
  }

  const QUESTION: TextStyle = {
    color: theme.primaryColor,
    fontWeight: '400',
    lineHeight: getComputedWidth(15)
  }

  return (
    <View style={styles.rateInfoView}>
      <Text textStyle={LABEL} type="label-12-reg" variant="dark">
        {label}
      </Text>
      {showWhy ? (
        <TouchableOpacity onPress={onShowRates} style={styles.why}>
          <Text textStyle={QUESTION} type="label-12-reg" variant="primary">
            Why this rate?
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

function DualCurrencyInput({
  onChange,
  onShowRates,
  rate,
  localCurrencySymbol,
  rateLabel,
  invert
}: DualCurrencyInputProps) {
  const { styles } = useDualCurrencyInputStyles()
  const [values, setValues] = useState({
    dollar: '',
    local: ''
  })

  const exportAmount = (local: number, usd: number) => {
    onChange({
      dollarAmount: usd,
      localAmount: local
    })
  }

  const onChangeLocalValue = (value: string) => {
    const raw = Number(parseAmount(value))
    const usdRaw = Number((raw / rate).toFixed(2))

    if (raw >= Number.MAX_SAFE_INTEGER || usdRaw >= Number.MAX_SAFE_INTEGER) {
      return
    }

    setValues({
      dollar: formatInputAmount(String(usdRaw)),
      local: formatInputAmount(String(parseAmount(value)))
    })

    exportAmount(raw, usdRaw)
  }

  const onChangeDollarValue = (value: string) => {
    const raw = Number(parseAmount(value))
    const localRaw = Number((raw * rate).toFixed(2))

    if (raw >= Number.MAX_SAFE_INTEGER || localRaw >= Number.MAX_SAFE_INTEGER) {
      return
    }

    setValues({
      dollar: formatInputAmount(String(parseAmount(value))),
      local: formatInputAmount(String(localRaw))
    })

    exportAmount(localRaw, raw)
  }

  const TopInput = invert ? (
    <DollarCurrencyInput
      autoFocus
      containerStyle={styles.inputBorderStyle}
      onChangeText={onChangeDollarValue}
      value={values.dollar}
    />
  ) : (
    <LocalCurrencyInput
      containerStyle={styles.inputBorderStyle}
      localCurrencySymbol={localCurrencySymbol}
      onChangeText={onChangeLocalValue}
      value={values.local}
    />
  )
  const BottomInput = invert ? (
    <LocalCurrencyInput
      localCurrencySymbol={localCurrencySymbol}
      onChangeText={onChangeLocalValue}
      value={values.local}
    />
  ) : (
    <DollarCurrencyInput
      autoFocus
      onChangeText={onChangeDollarValue}
      value={values.dollar}
    />
  )

  return (
    <View style={{ paddingHorizontal: getComputedWidth(20) }}>
      <View style={TOP_INPUT_CONTAINER}>
        {TopInput}
        <RateInfo
          localCurrencySymbol={localCurrencySymbol}
          onShowRates={onShowRates}
          rate={rate}
          rateLabel={rateLabel}
        />
      </View>
      {BottomInput}
    </View>
  )
}

const TOP_INPUT_CONTAINER: TextStyle = { position: 'relative' }

export default DualCurrencyInput
