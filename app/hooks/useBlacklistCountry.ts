import constants from 'app/config/constants'
import { fetchItemFromStorage } from 'app/utils/asyncstorage'
import React from 'react'

interface Payload {
  blackList?: string[]
  initialState?: boolean
}

export const useBlacklistCountry = (options?: Payload) => {
  const { initialState = true, blackList = constants.BLACKLISTED_COUNTRIES } =
    options ?? {}
  const [blackListed, setBlackListed] = React.useState(initialState)
  React.useEffect(() => {
    ;(async () => {
      const country = await fetchItemFromStorage('country')
      const isBlackListed = blackList.includes(String(country))
      setBlackListed(isBlackListed)
    })()
  }, [blackList])
  return blackListed
}
