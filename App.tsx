/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import CustomerIO from 'app/utils/customer-io';
import messaging from '@react-native-firebase/messaging';

import {CustomerIO as _CustomerIO} from 'customerio-reactnative';

import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import RootNavigator from 'app/navigator/navigation';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from 'app/rq';

function App(): React.JSX.Element {
  useEffect(() => {
    CustomerIO.init();

    /**
     * @param {import('@react-native-firebase/messaging').FirebaseMessagingTypes.RemoteMessage|null} notification
     */
    const handleFirebaseMessage = async (
      notification: FirebaseMessagingTypes.RemoteMessage | null,
    ) => {
      console.log(notification);
    };

    messaging()
      .getInitialNotification()
      .then(handleFirebaseMessage)
      .catch(_ => {
        /* fail silently */
      });
    // handle instances for when notification is opened from app on standby
    messaging().onNotificationOpenedApp(handleFirebaseMessage);
    //foreground listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      _CustomerIO
        .pushMessaging()
        .onMessageReceived(remoteMessage)
        .then(handled => {
          if (handled) {
            _CustomerIO
              .pushMessaging()
              .trackNotificationReceived(remoteMessage);
          }
        });
    });

    //background listener
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      _CustomerIO
        .pushMessaging()
        .onBackgroundMessageReceived(remoteMessage)
        .then(handled => {
          if (handled) {
            _CustomerIO
              .pushMessaging()
              .trackNotificationReceived(remoteMessage);
          }
        });
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
