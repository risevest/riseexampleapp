/* eslint-disable react-hooks/exhaustive-deps */
import { ExchangeRateModal } from 'app/components'
import constants from 'app/config/constants'
import {
  getComputedHeight,
  getComputedWidth
} from 'app/design/responsiveModule'
import Styles, { shadow } from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import { Button, Text } from 'app/future'
import { useRates } from 'app/hooks'
import { useWalletQuery } from 'app/hooks'
import {
  formatInput,
  formatPlanValue,
  stripInputOffCommas
} from 'app/utils/numberformatter'
import React, { ReactElement, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface INewTransferPage extends INavigationProps {
  LeftText: string | ReactElement
  OptionSelect?: ReactElement
  additionalInfoText?: string
  buttonText: string
  crypto?: Crypto
  displayBTCText?: boolean
  fieldValues: {
    dollarValue: string
    nairaValue: string
  }
  fromToWallet: 'from' | 'to'
  getFieldValues: (fieldValues: any) => void
  hasHeader?: boolean
  hasNairaField: boolean
  isEditable: boolean
  params?: any
  parentNavigation?: () => void
  transferType?: 'deposit' | 'withdrawal'
}

const useNewTransferPageStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    button: {
      marginTop: 13
    },
    divider: {
      alignSelf: 'center',
      backgroundColor: theme.lightGrey,
      height: '100%',
      position: 'absolute',
      width: 1
    },
    dividerView: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0
    },
    iconView: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.primaryColor,
      borderRadius: 24 / 2,
      height: 24,
      justifyContent: 'center',
      position: 'absolute',
      width: 24,
      zIndex: 0
    },
    input: {
      color: '#333333',
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
    leftTextView: {
      ...Styles.topSpacing,
      marginBottom: Styles.topSpacing.marginTop
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
      paddingHorizontal: getComputedWidth(5),
      paddingVertical: getComputedHeight(5),
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
    },
    wrapper: {
      ...Styles.spaceBetween,
      ...Styles.topSpacing,
      ...Styles.horizontalPadding,
      borderBottomColor: theme.lightGrey,
      borderBottomWidth: 1,
      borderTopColor: theme.lightGrey,
      borderTopWidth: 1
    }
  })

  return { styles, theme }
}

const NewTransferPage = ({
  hasNairaField = false,
  LeftText,
  displayBTCText,
  fromToWallet = 'to',
  buttonText = 'Add Money',
  parentNavigation = undefined,
  getFieldValues,
  hasHeader = true,
  OptionSelect,
  additionalInfoText,
  transferType = 'deposit',
  isEditable = true,
  fieldValues,
  crypto,
  navigation
}: INewTransferPage) => {
  const { wallet } = useWalletQuery()
  const { rates } = useRates()

  const { styles, theme } = useNewTransferPageStyles()

  const [inputValues, setInputValues] = useState({
    dollarValue: fieldValues?.dollarValue || '',
    nairaValue: fieldValues?.nairaValue || ''
  })
  const [isModalVisible, setModalVisible] = useState(false)
  const rateUsed = transferType === 'deposit' ? rates.toUsd : rates.toNgn

  const handleInputConversion = (
    fieldType: 'naira' | 'dollar',
    value: string
  ) => {
    const amountToBeConverted = Number(stripInputOffCommas(value))
    if (fieldType === 'naira') {
      const convertedDollarValue = Number(
        amountToBeConverted / rateUsed
      ).toFixed(2)
      setInputValues({
        ...inputValues,
        dollarValue: Number.isNaN(Number(convertedDollarValue))
          ? formatInput('0.00')
          : formatInput(convertedDollarValue),
        nairaValue: formatInput(value)
      })
    } else {
      const convertedNairaValue = Number(
        amountToBeConverted * rateUsed
      ).toFixed(2)
      setInputValues({
        ...inputValues,
        dollarValue: formatInput(value),
        nairaValue: Number.isNaN(Number(convertedNairaValue))
          ? formatInput('0.00')
          : formatInput(convertedNairaValue)
      })
    }
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const disableButton = (): true | false => {
    const { nairaValue, dollarValue } = inputValues
    let disabled: boolean

    if (
      Number(nairaValue) === 0 ||
      Number(dollarValue) === 0 ||
      Number.isNaN(Number(stripInputOffCommas(nairaValue))) ||
      Number.isNaN(Number(stripInputOffCommas(dollarValue)))
    ) {
      disabled = true
    } else {
      disabled = false
    }

    return disabled
  }

  const exposeFieldValues = () => {
    const exposedFieldValues = {
      dollarValue: Number(stripInputOffCommas(inputValues.dollarValue)).toFixed(
        2
      ),
      nairaValue: Number(stripInputOffCommas(inputValues.nairaValue)).toFixed(2)
    }

    getFieldValues && getFieldValues(exposedFieldValues)
  }

  const handlePress = () => setModalVisible(false)

  const WHY_TEXT: TextStyle = {
    color: theme.primaryColor,
    fontWeight: '400',
    lineHeight: getComputedWidth(15)
  }

  const displayFromToDestination = () => {
    return (
      <View style={styles.wrapper}>
        {fromToWallet === 'to' ? (
          <View style={[styles.leftTextView, LEFT_TEXT_CONTAINER]}>
            {typeof LeftText === 'string' ? (
              <Text type="reg-17-main" variant="dark">
                {LeftText}
              </Text>
            ) : (
              LeftText
            )}
          </View>
        ) : (
          <View style={styles.leftTextView}>
            <Text type="reg-17-main" variant="dark">
              Rise Wallet
            </Text>
            <Text textStyle={BALANCE_USD} type="num-15-reg" variant="light">
              {`$${wallet?.balanceUsd}`}
            </Text>
          </View>
        )}
        <View style={styles.dividerView}>
          <View style={styles.iconView}>
            <Ionicons color={theme.primarySurface} name="arrow-forward-sharp" />
          </View>
        </View>
        {fromToWallet === 'to' ? (
          <View style={styles.leftTextView}>
            <Text type="reg-17-main" variant="dark">
              Rise Wallet
            </Text>
            <Text textStyle={BALANCE_USD_2} type="num-15-reg" variant="light">
              {`$${wallet?.balanceUsd}`}
            </Text>
          </View>
        ) : (
          <View style={[styles.leftTextView, LEFT_TEXT_CONTAINER_2]}>
            {typeof LeftText === 'string' ? (
              <Text type="reg-17-main" variant="dark">
                {LeftText}
              </Text>
            ) : (
              LeftText
            )}
          </View>
        )}
      </View>
    )
  }

  useEffect(() => {
    exposeFieldValues()
  }, [inputValues])

  const { nairaValue, dollarValue } = inputValues

  return (
    <KeyboardAvoidingView enabled style={CONTAINER}>
      <ScrollView>
        {hasHeader && displayFromToDestination()}
        <View>
          <View style={{ paddingHorizontal: getComputedWidth(20) }}>
            {hasNairaField && (
              <View style={NAIRA_FIELD_CONTAINER}>
                <View style={[styles.inputView, styles.inputBorderStyle]}>
                  <Text
                    textStyle={NAIRA_SYMBOL}
                    type="num-15-reg"
                    variant="dark"
                  >
                    ₦
                  </Text>
                  <TextInput
                    autoFocus
                    contextMenuHidden={true}
                    editable={isEditable}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      handleInputConversion('naira', value.replace(/-|\s/g, ''))
                    }
                    placeholder="0.00"
                    placeholderTextColor={theme.tertiaryColor}
                    style={styles.input}
                    value={nairaValue}
                  />
                </View>
                <View style={styles.rateInfoView}>
                  <Text textStyle={RATE} type="label-12-reg" variant="dark">
                    {`$1 = ₦${rateUsed || '-'}`}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.why}
                  >
                    <Text
                      textStyle={WHY_TEXT}
                      type="label-12-reg"
                      variant="primary"
                    >
                      Why this rate?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={styles.inputView}>
              <Text textStyle={DOLLAR_SYMBOL} type="num-15-reg" variant="dark">
                $
              </Text>
              <TextInput
                contextMenuHidden={true}
                editable={isEditable}
                keyboardType="numeric"
                onChangeText={(value) =>
                  handleInputConversion('dollar', value.replace(/-|\s/g, ''))
                }
                placeholder="0.00"
                placeholderTextColor={theme.tertiaryColor}
                style={styles.input}
                value={dollarValue}
              />
            </View>
          </View>
          <View style={styles.inputBorderStyle} />
          <View style={{ paddingHorizontal: getComputedWidth(20) }}>
            {additionalInfoText && (
              <P
                fontsize={14}
                fontWeight="400"
                style={ADDITIONAL_INFO_TEXT}
                text={additionalInfoText}
              />
            )}
            {displayBTCText && (
              <>
                <P
                  fontsize={11}
                  fontWeight="300"
                  style={DEPOSIT_IN_CRYPTO}
                  text={`You can deposit between ${formatPlanValue(
                    constants.MIN_VALUE_FOR_CRYPTO_FUNDING
                  )} and ${formatPlanValue(
                    constants.MAX_VALUE_FOR_CRYPTO_FUNDING
                  )} in ${crypto}.`}
                />
              </>
            )}
            {OptionSelect && OptionSelect}
            <Button
              containerStyle={styles.button}
              disabled={disableButton()}
              isLoading={false}
              onPress={parentNavigation || handlePress}
              variant="primary"
            >
              {buttonText}
            </Button>
          </View>
        </View>
        <ExchangeRateModal
          closeModal={closeModal}
          disabled={disableButton()}
          handleAcceptPress={handlePress}
          isModalVisible={isModalVisible}
          navigation={navigation}
          rates={rates}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const LEFT_TEXT_CONTAINER: ViewStyle = { justifyContent: 'center' }

const BALANCE_USD: TextStyle = { marginTop: 3 }

const BALANCE_USD_2: TextStyle = { marginLeft: 'auto', marginTop: 3 }

const LEFT_TEXT_CONTAINER_2: ViewStyle = { marginLeft: 'auto', marginTop: 3 }

const CONTAINER: ViewStyle = { flex: 1 }

const NAIRA_FIELD_CONTAINER: ViewStyle = { position: 'relative' }

const NAIRA_SYMBOL: TextStyle = {
  color: '#333333',
  fontWeight: '600'
}

const RATE: TextStyle = {
  color: '#333333',
  fontWeight: 'bold',
  lineHeight: getComputedWidth(15)
}

const DOLLAR_SYMBOL: TextStyle = {
  fontSize: getComputedWidth(18),
  fontWeight: '400',
  lineHeight: getComputedWidth(21)
}

const ADDITIONAL_INFO_TEXT: TextStyle = {
  marginHorizontal: 25,
  marginTop: 14,
  textAlign: 'center'
}

const DEPOSIT_IN_CRYPTO: TextStyle = {
  lineHeight: 13,
  marginTop: 14,
  textAlign: 'center'
}

export default NewTransferPage
