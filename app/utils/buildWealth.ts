import { ASSET_CLASS_EXPECTED_RETURNS } from 'app/utils/portfolioHeavyLifting'
import moment from 'moment'

interface IProps {
  age: number
  assetClasses: any
  investmentProfile: IInvestmentProfile
  rates: Rates
  user: RiseUser
}

interface ReturnsCalculator {
  amount: number
  assetClasses: any
}

interface InvestmentProjectionCalculator {
  assetClasses: any
  duration: number
  yearlyAmount: number
}

export const calculateInvestmentWorth = ({
  investmentProfile,
  rates,
  assetClasses,
  user,
  age
}: IProps) => {
  const estimatedMonthlyInvestment = Number(
    (Number(investmentProfile.percentageInvestable) / 100) *
      Number(investmentProfile.monthlyIncome)
  ).toFixed(2)

  const convertInvestmentToDollars = Number(
    Number(estimatedMonthlyInvestment) / rates.toUsd
  ).toFixed(2)

  const userCurrentAge = user.dob
    ? new Date().getFullYear() - Number(user?.dob?.split('-')[0])
    : age
  const retirementAge = investmentProfile.retirementAge

  const durationOfBuildWealthInvestment = retirementAge - userCurrentAge

  const { totalInvestmentYearEnd, totalReturns } =
    calculateInvestmentProjection({
      assetClasses,
      duration: durationOfBuildWealthInvestment,
      yearlyAmount: Number(convertInvestmentToDollars) * 12
    })

  return {
    annualEstimatedReturns: totalReturns,
    convertInvestmentToDollars,
    dueDate: getDueDate(durationOfBuildWealthInvestment),
    duration: durationOfBuildWealthInvestment,
    estimatedMonthlyInvestment,
    estimatedReturnsPercentage: estimatedReturnsPerAnnum({ assetClasses }),
    targetBuildWealthAmount: totalInvestmentYearEnd
  }
}

export const annualEstimatedReturns = ({
  assetClasses,
  amount
}: ReturnsCalculator) => {
  const assetClassTotalReturns = assetClasses.map((assetClass: any) => {
    return (
      (assetClass.percentage / 100) *
      Number(Number(amount).toFixed(2)) *
      ASSET_CLASS_EXPECTED_RETURNS[
        assetClass.name ||
          (assetClass.assetClass as 'Real Estate' | 'Stocks' | 'Fixed Income')
      ]
    )
  })

  const sumOfTotalReturns = assetClassTotalReturns.reduce(
    (acc: number, currentValue: number) => Number(acc) + Number(currentValue),
    0
  )
  return Number(sumOfTotalReturns).toFixed(2)
}

/**
 * Amount Put in --- Investment Amount -- Returns -- total returns
 * 1000 -- 1000 -- 100 -- 1100
 * 2000 -- 2100 -- 100 -- 2200
 * 3000 -- 3200 -- 100 -- 3300
 */

export const calculateInvestmentProjection = ({
  duration,
  yearlyAmount,
  assetClasses
}: InvestmentProjectionCalculator) => {
  const amountPutInYearly = Number(yearlyAmount)
  let investmentAmount = Number(yearlyAmount)
  let totalReturns = 0
  let totalInvestmentYearEnd = 0

  for (let i = 0; i < duration; i++) {
    const returns = annualEstimatedReturns({
      amount: investmentAmount,
      assetClasses
    })
    totalInvestmentYearEnd = Number(returns) + Number(investmentAmount)
    investmentAmount =
      Number(totalInvestmentYearEnd) + Number(amountPutInYearly)
    totalReturns = Number(totalReturns) + Number(returns)
  }

  return {
    totalAmountInvested: Number(amountPutInYearly * duration).toFixed(2),
    totalInvestmentYearEnd: Number(totalInvestmentYearEnd).toFixed(2),
    totalReturns: Number(totalReturns).toFixed(2)
  }
}

export const getDueDate = (duration: number): string => {
  const dueDate = moment().add(duration, 'year').format('Do MMM, YYYY')

  return dueDate
}

export const estimatedReturnsPerAnnum = ({
  assetClasses
}: Omit<ReturnsCalculator, 'amount'>): string => {
  const annualReturns =
    assetClasses.length === 3
      ? '13.7'
      : assetClasses.length === 2
        ? '13.5'
        : '12'
  return annualReturns
}
