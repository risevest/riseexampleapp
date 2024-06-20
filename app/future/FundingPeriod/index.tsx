import { Button, DynamicModal } from 'app/components'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import { monthTrees } from 'app/utils'
import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

interface SelectFundingPeriodProps {
  breakdown: BreakdownData[]
  isModalVisible: boolean
  onClose: () => void
  onFundingPeriodSelect: (amount: string, fundPeriods: BreakdownData[]) => void
  plan: IPlan
}

const useSelectFundingMonthStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    amount: {
      alignItems: 'center',
      backgroundColor: theme.grey300,
      borderRadius: 31,
      flexBasis: '31%',
      justifyContent: 'center',
      marginBottom: 15,
      marginRight: 5,
      paddingVertical: 10
    }
  })

  return { styles, theme }
}

const FundingPeriod = ({
  breakdown,
  isModalVisible,
  onClose,
  onFundingPeriodSelect
}: SelectFundingPeriodProps) => {
  const { styles, theme } = useSelectFundingMonthStyles()
  const [fundingPeriods, setFundingPeriods] = React.useState<BreakdownData[]>(
    []
  )

  const selectFundingPeriod = (selectedPeriod: BreakdownData) => {
    const len = fundingPeriods.length
    const newFundingPeriods = fundingPeriods.filter(
      (p) => p.period === selectedPeriod.period
    )

    // add new period if it wasn't there before
    if (len === newFundingPeriods.length) {
      setFundingPeriods([...newFundingPeriods, selectedPeriod])
    } else {
      setFundingPeriods(newFundingPeriods)
    }
  }

  const aggregateAmount = (fPeriodsArray: BreakdownData[]): number => {
    return fPeriodsArray.reduce(
      (acc, currVal) => Number(acc) + Number(currVal.amount),
      0
    )
  }

  const disableSelectMonth = (
    period: number,
    netFunded: string | number
  ): boolean => {
    return period > new Date().getMonth() + 1 || Number(netFunded) > 0
  }

  const checkIsSelected = (selectedPeriod: BreakdownData): boolean => {
    return fundingPeriods.find(
      (fPeriods) => fPeriods.period === selectedPeriod.period
    )
      ? true
      : false
  }

  const setAmountBgColor = (breakdownItem: BreakdownData) => {
    if (disableSelectMonth(breakdownItem.period, breakdownItem.netFunded)) {
      return 'rgba(147, 201, 206, .5)'
    } else if (checkIsSelected(breakdownItem)) {
      return theme.primaryColor
    } else {
      return theme.grey05
    }
  }

  const buttonAmountText =
    aggregateAmount(fundingPeriods) === 0
      ? ''
      : `$${aggregateAmount(fundingPeriods)}`

  return (
    <DynamicModal
      headerText="Add Money To Goal"
      isModalOpen={isModalVisible}
      toggleModalVisibility={onClose}
      type="halfScreen"
    >
      <View style={TEXT_CONTAINER}>
        {breakdown.map((bdObject, index) => {
          return (
            <TouchableOpacity
              disabled={disableSelectMonth(bdObject.period, bdObject.netFunded)}
              key={index}
              onPress={() => selectFundingPeriod(bdObject)}
              style={[
                styles.amount,
                {
                  backgroundColor: setAmountBgColor(bdObject)
                }
              ]}
            >
              <P
                fontsize={15}
                fontWeight="bold"
                text={`${monthTrees[bdObject.period - 1]}-$${bdObject.amount}`}
                type={
                  checkIsSelected(bdObject) ||
                  disableSelectMonth(bdObject.period, bdObject.netFunded)
                    ? 'white'
                    : 'dark'
                }
              />
            </TouchableOpacity>
          )
        })}
      </View>
      <Button
        buttonStyle={BUTTON_STYLE}
        buttonText={`Add ${buttonAmountText}`}
        disabled={aggregateAmount(fundingPeriods) === 0}
        onPress={() => {
          onClose()
          onFundingPeriodSelect(
            aggregateAmount(fundingPeriods).toString(),
            fundingPeriods
          )
        }}
        textColor={theme.primarySurface}
        variant="primary"
      />
    </DynamicModal>
  )
}

const TEXT_CONTAINER: TextStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 10
}

const BUTTON_STYLE: ViewStyle = { marginTop: 20 }

export default FundingPeriod
