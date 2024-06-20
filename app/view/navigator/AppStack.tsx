import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack'
import { selectUserToken } from 'app/redux/user/selector'
import React from 'react'
import { useSelector } from 'react-redux'

import AuthStack from '../authentication'
import NestedStack from './BottomNavigator'
import { AppStackParamsList } from './types/app-stack'

const Stack = createStackNavigator<AppStackParamsList>()

const AppStack = () => {
  const token = useSelector(selectUserToken)

  return (
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{ headerShown: false }}
    >
      {token ? (
        <Stack.Screen component={NestedStack} name="AppStack" />
      ) : (
        <Stack.Screen component={AuthStack} name="AuthStack" />
      )}
    </Stack.Navigator>
  )
}

export default AppStack
