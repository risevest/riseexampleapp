const ROUNDING_FACTOR = 1000000000000000

/**
 * Rounds off a number to n decimal places
 * @param value value to be rounded off
 * @param n number of decimal places
 */
export function round(value: number, n: number = 2): number {
  const precision = Math.pow(10, n)

  return Math.round(value * precision) / precision
}

/**
 * Basically ignores every amount not in the cent
 * @param value amount of money to be rounded off
 * @param cent x in 1/10^x of a currency.
 */
export function roundCurrency(value: number, cent = 2) {
  const precision = Math.pow(10, cent)
  const safeFloor =
    (precision * Math.round(value * ROUNDING_FACTOR)) / ROUNDING_FACTOR

  return Math.floor(safeFloor) / precision
}

export function formatPercentage(value: number | string) {
  return value + '%'
}
