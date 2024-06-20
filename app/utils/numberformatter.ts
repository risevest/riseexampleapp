/**
 * Okay, so this is a brute implementation of a naira formatter that let's us format the user's input (up to 9,999,999,999)
 * with comma separated values and also accept decimal places as well. This is brute force as I implemented this as
 * it was coming to me. Lol. Still needs formatting as there's a lot of repetiton here that can be properly encapsulated and abstracted
 * to make it more readable and maintainable
 *
 * @param inputValue Value to be formatted
 */

export const formatInput = (inputValue: string) => {
  if (typeof inputValue === 'undefined') {
    return '0.00'
  }

  let formattedInput = ''
  const { numberBeforeDecimal, numberAfterDecimal, hasDecimal } =
    checkIfInputIsDecimal(inputValue)

  if (numberBeforeDecimal?.length < 4) {
    if (!!numberAfterDecimal) {
      formattedInput = numberBeforeDecimal + `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput = numberBeforeDecimal + '.'
    } else {
      formattedInput = numberBeforeDecimal
    }
  }

  if (numberBeforeDecimal?.length === 4) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal?.substring(1) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput =
        numberBeforeDecimal[0] + ',' + numberBeforeDecimal?.substring(1) + '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] + ',' + numberBeforeDecimal?.substring(1)
    }
  }

  if (numberBeforeDecimal?.length === 5) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        ',' +
        numberBeforeDecimal?.substring(2) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput = formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        ',' +
        numberBeforeDecimal?.substring(2) +
        '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        ',' +
        numberBeforeDecimal?.substring(2)
    }
  }

  if (numberBeforeDecimal?.length === 6) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        ',' +
        numberBeforeDecimal?.substring(3) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        ',' +
        numberBeforeDecimal?.substring(3) +
        '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        ',' +
        numberBeforeDecimal?.substring(3)
    }
  }

  if (numberBeforeDecimal?.length === 7) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        ',' +
        numberBeforeDecimal?.substring(4) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        ',' +
        numberBeforeDecimal?.substring(4) +
        '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        ',' +
        numberBeforeDecimal?.substring(4)
    }
  }

  if (numberBeforeDecimal?.length === 8) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        ',' +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        numberBeforeDecimal[4] +
        ',' +
        numberBeforeDecimal?.substring(5) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput = formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        ',' +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        numberBeforeDecimal[4] +
        ',' +
        numberBeforeDecimal?.substring(5) +
        '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        ',' +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        numberBeforeDecimal[4] +
        ',' +
        numberBeforeDecimal?.substring(5)
    }
  }

  if (numberBeforeDecimal?.length === 9) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        ',' +
        numberBeforeDecimal[3] +
        numberBeforeDecimal[4] +
        numberBeforeDecimal[5] +
        ',' +
        numberBeforeDecimal?.substring(6) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        ',' +
        numberBeforeDecimal[3] +
        numberBeforeDecimal[4] +
        numberBeforeDecimal[5] +
        ',' +
        numberBeforeDecimal?.substring(6) +
        '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        ',' +
        numberBeforeDecimal[3] +
        numberBeforeDecimal[4] +
        numberBeforeDecimal[5] +
        ',' +
        numberBeforeDecimal?.substring(6)
    }
  }

  if (numberBeforeDecimal?.length === 10) {
    if (!!numberAfterDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        ',' +
        numberBeforeDecimal[4] +
        numberBeforeDecimal[5] +
        numberBeforeDecimal[6] +
        ',' +
        numberBeforeDecimal?.substring(7) +
        `.${numberAfterDecimal}`
    } else if (numberAfterDecimal === '' && hasDecimal) {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        ',' +
        numberBeforeDecimal[4] +
        numberBeforeDecimal[5] +
        numberBeforeDecimal[6] +
        ',' +
        numberBeforeDecimal?.substring(7) +
        '.'
    } else {
      formattedInput =
        numberBeforeDecimal[0] +
        ',' +
        numberBeforeDecimal[1] +
        numberBeforeDecimal[2] +
        numberBeforeDecimal[3] +
        ',' +
        numberBeforeDecimal[4] +
        numberBeforeDecimal[5] +
        numberBeforeDecimal[6] +
        ',' +
        numberBeforeDecimal?.substring(7)
    }
  }

  return formattedInput
}

// Remove commas from input
export const stripInputOffCommas = (value: string) => value?.replace(/,/g, '')

export const checkIfInputIsDecimal = (value: string) => {
  let numberBeforeDecimal = ''
  let numberAfterDecimal = ''
  let hasDecimal = false

  const strippedInput = stripInputOffCommas(value)

  // Check if input has decimal places and get the number before and after the decimal place
  if (strippedInput?.indexOf('.') > 0) {
    numberBeforeDecimal = strippedInput.split('.')[0]
    numberAfterDecimal = strippedInput.split('.')[1]
    hasDecimal = true
  } else {
    numberBeforeDecimal = strippedInput
  }

  return { hasDecimal, numberAfterDecimal, numberBeforeDecimal }
}

export const formatPlanValue = (
  currentBalance: string | number | undefined | null,
  formatValue = true,
  currency: '$' | '₦' = '$'
): string | number => {
  if (!isNaN(Number(currentBalance)) && currentBalance !== null) {
    const convertToNumber = Number(currentBalance) || 0
    const removeNegativeValue = Number(currentBalance).toFixed(2).slice(1)
    if (formatValue) {
      if (Number(currentBalance).toFixed(2)[0] !== '-') {
        return `${currency}${formatInput(Number(convertToNumber).toFixed(2))}`
      }
      return `- ${currency}${formatInput(
        Number(removeNegativeValue).toFixed(2)
      )}`
    } else {
      return convertToNumber
    }
  }
  return formatValue ? `${currency}0.00` : 0
}

export const calculatePlanPercentageInc = (
  returnsArray: IReturns[]
): {
  isPositive: boolean
  latestReturn: IReturns
  percentageIncrease: string
} => {
  if (!returnsArray || returnsArray.length <= 1) {
    // would need to revisit this.
    return {
      isPositive: true,
      // @ts-expect-error
      latestReturn: {
        balance: 0,
        currentEarning: 0,
        percentChange: 0,
        returns: 0
      },
      percentageIncrease: ''
    }
  } else {
    const latestReturn = returnsArray[returnsArray.length - 1]
    const percentChange = latestReturn?.percentChange || 0

    return {
      isPositive: percentChange >= 0,
      latestReturn,
      percentageIncrease: Number(percentChange).toFixed(2)
    }
  }
}
