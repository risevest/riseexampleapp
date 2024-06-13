import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamsList} from './types';
import LoginPage from 'app/view/login';
import HomePage from 'app/view/home';
import React, {useRef} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import CustomerIO from 'app/utils/customer-io';

const Stack = createNativeStackNavigator<MainStackParamsList>();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen component={LoginPage} name="Login" />
    <Stack.Screen component={HomePage} name="Home" />
  </Stack.Navigator>
);

export const navigationRef =
  createNavigationContainerRef<MainStackParamsList>();

const RootNavigator = () => {
  const routeNameRef = useRef<string | undefined>();

  const setCurrentRoute = () => {
    routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
    SplashScreen.hide();
  };

  const onStateChange: React.ComponentProps<
    typeof NavigationContainer
  >['onStateChange'] = async () => {
    const previousRouteName = routeNameRef?.current;
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      if (currentRouteName) {
        CustomerIO.tagScreen(currentRouteName);
      }
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      onReady={setCurrentRoute}
      onStateChange={onStateChange}
      ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
