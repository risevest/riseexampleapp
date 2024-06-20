import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack'
import { PinStackParamsList } from 'app/view/navigator/types'
import React from 'react'

import ConfirmPINReset from './Confirmation'
import ConfirmPin from './ConfirmPin'
import CreatePin from './CreatePin'

const Stack = createStackNavigator<PinStackParamsList>()

const PinStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={CreatePin} name="CreatePinScreen" />
      <Stack.Screen component={ConfirmPin} name="ConfirmPin" />
      <Stack.Screen component={ConfirmPINReset} name="ConfirmPINReset" />
    </Stack.Navigator>
  )
}

export default PinStack
