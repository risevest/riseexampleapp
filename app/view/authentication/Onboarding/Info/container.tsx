import { setToken } from 'app/redux/user/actionCreators'
import { fetchItemFromStorage } from 'app/utils/asyncstorage'
import { AuthStackScreenProps } from 'app/view/navigator/types/auth-stack'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import View from './View'

function InfoContainer({
  setToken: setAuthToken,
  ...props
}: AuthStackScreenProps<'Info'> & PropsFromRedux) {
  const handleDoThisLater = async () => {
    const token = fetchItemFromStorage('sessionToken')
    setAuthToken(token)
  }

  return <View {...props} handleDoThisLater={handleDoThisLater} />
}

const connector = connect(null, { setToken })

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(InfoContainer)
