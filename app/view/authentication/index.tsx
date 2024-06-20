import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import ExternalLinks from '../App/More/ExternalLinks'
import { AuthStackParamsList } from '../navigator/types/auth-stack'
import InitialAuthRoute from './InitialRoute'
import { IntroScreens } from './intro-screens/intro-screens'
import { Info } from './Onboarding'
import PinLogin from './Pin/PinLogin'
import { SignIn } from './sign-in/sign-in'
import {
  ConfirmPIN,
  CreatePIN,
  EnterPhoneNumber,
  MoreInformation,
  PINSuccessScreen,
  ReviewDetails,
  SetupPassword,
  VerifyPhoneNumber
} from './sign-up'

const Stack = createStackNavigator<AuthStackParamsList>()

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="InitialRoute"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={IntroScreens}
        name="IntroScreens"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen component={InitialAuthRoute} name="InitialRoute" />
      <Stack.Screen
        component={SignIn}
        name="Login"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen component={PinLogin} name="PinLogin" />

      <Stack.Screen component={Info} name="Info" />
      <Stack.Screen component={ExternalLinks} name="ExternalLinks" />

      <Stack.Screen component={EnterPhoneNumber} name="EnterPhoneNumber" />
      <Stack.Screen component={VerifyPhoneNumber} name="VerifyPhoneNumber" />
      <Stack.Screen component={MoreInformation} name="MoreInformation" />
      <Stack.Screen component={ReviewDetails} name="ReviewDetails" />
      <Stack.Screen component={SetupPassword} name="SetupPassword" />
      <Stack.Screen component={CreatePIN} name="CreatePIN" />
      <Stack.Screen component={ConfirmPIN} name="ConfirmPIN" />
      <Stack.Screen component={PINSuccessScreen} name="PINSuccessScreen" />
      {/* <Stack.Screen component={SocialSurvey} name="SocialSurvey" /> */}
      {/* <Stack.Screen component={SuccessScreen} name="SuccessScreen" /> */}
    </Stack.Navigator>
  )
}

export default AuthStack
