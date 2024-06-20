import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack'
import { MessageScreen } from 'app/view/App/message/message'
import { ForgotPasswordParamsList } from 'app/view/navigator/types'
import React from 'react'

import ConfirmEmail from './confirm-email'
import CreateNewPassword from './create-new-password'
import ResetPassword from './reset-password'

const Stack = createStackNavigator<ForgotPasswordParamsList>()

const ForgotPasswordStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={ResetPassword} name="ResetPasswordHome" />
      <Stack.Screen component={ConfirmEmail} name="ConfirmEmail" />
      <Stack.Screen component={CreateNewPassword} name="CreateNewPassword" />
      <Stack.Screen component={MessageScreen} name="MessageScreen" />
    </Stack.Navigator>
  )
}

export default ForgotPasswordStack
