import constants from 'app/config/constants'
import { validatePlanName } from 'app/utils/utilFunctions'
import React from 'react'
import { Keyboard } from 'react-native'

import { useDisplayMessage } from './useDisplayMessage'

type Config = {
  maxCount?: number
  validationMessage?: string | ((maxCount: string) => string)
  validationTitle?: string
}

/**
 * useNameLengthValidation Here lies the logic for the plan name validation
 * @param name string this is the name to be Verified
 * @returns {Object} validationState State of the validation.
 * @returns {boolean} validationState.percentage percentage with respect to the max amount of characters
 * @returns {boolean} validationState.valid shows if the plan name is valid
 */
export function useNameLengthValidation(name: string, config?: Config) {
  const maxCount = config?.maxCount ?? constants.MAX_PLAN_NAME_LENGTH
  const [showedError, setShowedError] = React.useState(false)
  const { displayError } = useDisplayMessage()
  const valid = React.useMemo(() => validatePlanName(name), [name])

  React.useEffect(() => {
    if (valid && showedError) {
      setShowedError(false)
    }
    if (!valid && name.length > 0 && !showedError) {
      Keyboard.dismiss()
      setShowedError(true)
      displayError(
        config?.validationTitle || "You've reached the character limit",
        config?.validationMessage
          ? typeof config?.validationMessage === 'string'
            ? config?.validationMessage
            : config?.validationMessage(maxCount.toString())
          : `Your plan name has to be less than ${maxCount} characters.`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config?.validationMessage,
    config?.validationTitle,
    displayError,
    maxCount,
    name.length,
    showedError,
    valid
  ])

  const percentage = React.useMemo(
    () => Math.min((name.length / maxCount) * 100, 100),
    [maxCount, name.length]
  )

  return { percentage, valid }
}
