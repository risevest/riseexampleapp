import { selectUserId } from 'app/redux/user/selector'
import firebaseUtils from 'app/utils/analytics/firebaseUtils'
import { PinStackScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { useSelector } from 'react-redux'

import { useEditUserMutation } from '../../../../hooks/mutations/user/useEditUserMutation'
import ConfirmPin from './View'

function ConfirmPinContainer({
  navigation,
  route,
  ...props
}: PinStackScreenProps<'ConfirmPin'>) {
  const editUserMutation = useEditUserMutation()
  const userId = useSelector(selectUserId)
  const handlePinCreation = React.useCallback(
    (pin: string) => {
      editUserMutation.mutate(
        { id: Number(userId), pin },
        {
          onError: () =>
            firebaseUtils.logEvent('set_pin', {
              origin_screen_name: 'Confirm pin',
              status: 'error'
            }),
          onSuccess: async () => {
            firebaseUtils.logEvent('set_pin', {
              origin_screen_name: 'Confirm pin',
              status: 'success'
            })
            navigation?.navigate('ConfirmPINReset', {
              prevRoute: route?.params?.prevRoute
            })
          }
        }
      )
    },
    [editUserMutation, navigation, route?.params?.prevRoute, userId]
  )
  return (
    <ConfirmPin
      route={route}
      {...props}
      handlePinCreation={handlePinCreation}
      loading={editUserMutation.isLoading}
    />
  )
}

export default ConfirmPinContainer
