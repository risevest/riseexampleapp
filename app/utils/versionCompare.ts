/**
 * Compares one app version against another.
 * @param firstVersion String e.g. 2.10.2
 * @param secondVersion String e.g. 2.9.0
 * @returns -1, 1 or 0
 * - -1 if firstVersion is less than secondVersion
 * - 1 i firstVersion is greater than secondVersion
 * - 0 if they are equal
 */
export const versionCompare = (firstVersion: string, secondVersion: string) => {
  const [fMajor, fMinor, fPatch] = String(firstVersion).split('.')
  const [sMajor, sMinor, sPatch] = String(secondVersion).split('.')

  const localCompare = (a: string, b: string) => {
    if (Number(a) < Number(b)) {
      return -1
    }
    if (Number(a) > Number(b)) {
      return 1
    }
  }

  let value = localCompare(fMajor, sMajor)

  if (!value) {
    value = localCompare(fMinor, sMinor)
  }

  if (!value) {
    value = localCompare(fPatch, sPatch)
  }

  if (!value) {
    value = 0
  }

  return value
}
