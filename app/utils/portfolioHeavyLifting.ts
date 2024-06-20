import { IAssetDistribution, IAssetShape } from 'app/redux/portfolio/types'

export const calculatePortfolioDistribution = (
  userPortfolio: IUserPortfolio[]
): IAssetDistribution => {
  const netWorth: number = userPortfolio.reduce(
    (acc, currVal) => Number(acc) + Number(currVal.currentBalance),
    0
  )

  const percentageMixesData = userPortfolio.map((uPortfolio) => {
    if (
      (uPortfolio.category === 'asset-class' || !uPortfolio.category) &&
      !uPortfolio.userPortfolio
    ) {
      if (
        uPortfolio?.planType?.toLowerCase() === 'real estate plan' ||
        uPortfolio.assetId === 2
      ) {
        return {
          realEstate: Number(uPortfolio.currentBalance || 0)
        }
      } else if (
        uPortfolio?.planType?.toLowerCase() === 'stocks plan' ||
        uPortfolio.assetId === 1
      ) {
        return {
          stocks: Number(uPortfolio.currentBalance || 0)
        }
      } else if (
        uPortfolio?.planType?.toLowerCase() === 'fixed income plan' ||
        uPortfolio.assetId === 4
      ) {
        return {
          fixedIncome: Number(uPortfolio.currentBalance || 0)
        }
      }
    }
    if (uPortfolio.userPortfolio) {
      return uPortfolio.userPortfolio.mixes.map((portfolioMix) => {
        if (portfolioMix.assetClass) {
          if (portfolioMix.assetClass.isStock) {
            const stocksPercentage =
              (Number(portfolioMix.percentage) / 100) *
              Number(uPortfolio.currentBalance)
            return {
              stocks: stocksPercentage
            }
          } else if (portfolioMix.assetClass.isRealEstate) {
            const realEstatePercentage =
              (Number(portfolioMix.percentage) / 100) *
              Number(uPortfolio.currentBalance)
            return {
              realEstate: realEstatePercentage
            }
          } else if (portfolioMix.assetClass.isFixedIncome) {
            const fixedIncomePercentage =
              (Number(portfolioMix.percentage) / 100) *
              Number(uPortfolio.currentBalance)
            return {
              fixedIncome: fixedIncomePercentage
            }
          }
        }
      })
    }
  })

  const flattenPercentageMix = (percentageMixesData as [])
    .reduce((acc, currVal) => acc?.concat(currVal), [])
    ?.filter((mixesValue) => mixesValue !== undefined)

  // Individual Asset classes mixes
  const stocksPercentageTotal = flattenPercentageMix
    ?.map((stock: { stocks: number }) => stock?.stocks)
    .filter((value) => value !== undefined)
    .reduce((acc: number, currVal) => acc + currVal, 0)
  const realEstatePercentageTotal = flattenPercentageMix
    ?.map((realEstate: { realEstate: any }) => realEstate?.realEstate)
    .filter((value: any) => value !== undefined)
    .reduce((acc: number, currVal: number) => acc + currVal, 0)
  const fixedIncomePercentageTotal = flattenPercentageMix
    ?.map((fixedIncome: { fixedIncome: any }) => fixedIncome?.fixedIncome)
    .filter((value: any) => value !== undefined)
    .reduce((acc: number, currVal: number) => acc + currVal, 0)

  const assetDistribution: IAssetShape[] = [
    {
      assetValue: Number(Number(realEstatePercentageTotal).toFixed(2)),
      id: 1,
      percentage: Number(
        Number((Number(realEstatePercentageTotal) * 100) / netWorth).toFixed(2)
      ),
      title: 'Real Estate'
    },
    {
      assetValue: Number(Number(stocksPercentageTotal).toFixed(2)),
      id: 2,
      percentage: Number(
        Number((Number(stocksPercentageTotal) * 100) / netWorth).toFixed(2)
      ),
      title: 'Stocks'
    },
    {
      assetValue: Number(Number(fixedIncomePercentageTotal).toFixed(2)),
      id: 3,
      percentage: Number(
        Number((Number(fixedIncomePercentageTotal) * 100) / netWorth).toFixed(2)
      ),
      title: 'Fixed Income'
    }
  ]

  return {
    assetCount: assetDistribution.filter(
      (asset) => Number(asset?.assetValue) > 0
    ).length,
    assetDistribution,
    netWorth
  }
}

const performance = (arr: IRisePortfolio[]) => {
  const historicalPerformance: Record<number, number> = {}

  arr?.map((portfolio) => {
    return portfolio?.historicalPerformance?.map((histo) => {
      if (
        Object.prototype.hasOwnProperty.call(historicalPerformance, histo.year)
      ) {
        historicalPerformance[histo.year] += Number(histo?.returnsPercentage)
      } else {
        historicalPerformance[histo.year] = Number(histo?.returnsPercentage)
      }
    })
  })

  return historicalPerformance
}

export const calculateAverageYearlyPerformance = (
  arr: IRisePortfolio[]
): YearlyRisePortfolio[] => {
  let averagePercentageList = []

  const yearlyPerformance = Object.entries(performance(arr)).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  )

  for (const [key, value] of yearlyPerformance) {
    let averagePercentageDictionary = {} as {
      averagePercentage: string
      year: string
    }
    const averagePercentage = Number(Number(value) / arr.length).toFixed(2)
    averagePercentageDictionary.year = key
    averagePercentageDictionary.averagePercentage = averagePercentage
    averagePercentageList.push(averagePercentageDictionary)
  }

  return averagePercentageList
}

export const getInterestRate = (
  assetClass: string,
  duration: number
): number => {
  let interestRateValue: number = 0
  if (assetClass === 'real estate') {
    if (duration === 3) {
      interestRateValue = 3.75
    } else if (duration === 6) {
      interestRateValue = 7.5
    } else if (duration === 12) {
      interestRateValue = 15
    }
  } else if (assetClass === 'fixed income') {
    if (duration === 3) {
      interestRateValue = 2.5
    } else if (duration === 6) {
      interestRateValue = 5
    } else if (duration === 12) {
      interestRateValue = 10
    }
  } else if (assetClass === 'stocks') {
    interestRateValue = 14
  }

  return interestRateValue
}

export const ASSET_CLASS_EXPECTED_RETURNS: Record<string, number> = {
  'Fixed Income': 0.12,
  'Real Estate': 0.15,
  Stocks: 0.14
}

type AssetClassPercentage = {
  assetClass?: string
  assetClassId: number | undefined
  percentage: number
}

export const setAssetClassPercentage = (
  stocksPercentage: number,
  rePercentage: number,
  fixedIncomePercentage: number,
  assetClasses: IAssetClass[]
): AssetClassPercentage[] => {
  const assets = (assetClasses || []).reduce<{ [key: string]: IAssetClass }>(
    (acc, asset) => {
      if (asset?.name) {
        acc[asset.name] = asset
      }
      return acc
    },
    {}
  )

  return [
    {
      assetClass: assets.Stocks?.name || '',
      assetClassId: assets.Stocks?.id,
      percentage: stocksPercentage
    },
    {
      assetClass: assets['Real Estate']?.name || '',
      assetClassId: assets['Real Estate']?.id,
      percentage: rePercentage
    },
    {
      assetClass: assets['Fixed Income']?.name || '',
      assetClassId: assets['Fixed Income']?.id,
      percentage: fixedIncomePercentage
    }
  ]
}

export const calculateAssetClassPercentageDistribution = (
  duration: number,
  assetClasses: IAssetClass[]
): AssetClassPercentage[] => {
  let assetClassDistribution: AssetClassPercentage[] = [
    { assetClass: '', assetClassId: 0, percentage: 0 }
  ]

  if (Number(duration) <= 12) {
    // a year and less
    assetClassDistribution = setAssetClassPercentage(0, 40, 60, assetClasses)
  } else if (Number(duration) <= 24) {
    // btw 1 and 2 years
    assetClassDistribution = setAssetClassPercentage(20, 40, 40, assetClasses)
  } else if (Number(duration) <= 36) {
    // btw 2 and 3 years
    assetClassDistribution = setAssetClassPercentage(40, 40, 20, assetClasses)
  } else if (Number(duration) <= 48) {
    // btw 3 and 4 years
    assetClassDistribution = setAssetClassPercentage(50, 40, 10, assetClasses)
  } else if (Number(duration) <= 60) {
    // btw 4 and 5 years
    assetClassDistribution = setAssetClassPercentage(60, 40, 0, assetClasses)
  } else if (Number(duration) > 60) {
    // more than 5 years
    assetClassDistribution = setAssetClassPercentage(90, 10, 0, assetClasses)
  }

  return assetClassDistribution
}

export const calculateGoalReturns = (
  assetClassDistribution: AssetClassPercentage[],
  amountInvested: number
) => {
  const totalReturns = assetClassDistribution.map((assetClass) => {
    return (
      (assetClass.percentage / 100) *
        amountInvested *
        ASSET_CLASS_EXPECTED_RETURNS[
          assetClass.assetClass as 'Stocks' | 'Fixed Income' | 'Real Estate'
        ] || 1
    )
  })

  const sumOfTotalReturns = totalReturns.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  )

  return sumOfTotalReturns
}
