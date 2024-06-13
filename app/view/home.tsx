/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ViewStyle,
  ActivityIndicator,
  Button,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useUser from 'app/hooks/useUser';
import {Retry} from 'app/components/Retry';
import customerIo from 'app/utils/customer-io';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const HomePage = () => {
  const {status, refetch, data: user} = useUser();
  const [isAffiliate, setisAffiliate] = useState(false);

  useEffect(() => {
    const addDeviceForNotification = async () => {
      // Avoid using saga call to fix this.native exception
      let isAllowed = true;

      if (Platform.OS === 'android') {
        const status_ = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        isAllowed = status_ === 'granted';
      } else {
        const authorizationStatus = await messaging().requestPermission();
        isAllowed = !!authorizationStatus;
      }

      if (isAllowed) {
        try {
          const fcmMessaging = messaging();
          if (!fcmMessaging.isDeviceRegisteredForRemoteMessages) {
            await fcmMessaging.registerDeviceForRemoteMessages();
          }

          await fcmMessaging.getToken();
          customerIo.requestPermissionForNotification();
        } catch (error) {
          console.log(error);
        }
      }
    };
    addDeviceForNotification()
      .then(() => {})
      .catch(() => {
        /*  fail silently */
      });
  }, []);

  useEffect(() => {
    console.log(user?.uuid);
    if (user) {
      customerIo.identifyUser(user.uuid, user.email);
    }
  }, [user]);

  const isPending = status === 'pending';

  const setProperty = () => {
    customerIo.setUserProperties({
      is_affiliate: !isAffiliate,
    });
    Alert.alert('Success', 'Set is_affiliate to ' + !isAffiliate);
    setisAffiliate(!isAffiliate);
  };

  const logEvent = () => {
    customerIo.logEvent('bvn_verified', {
      reason: 'Bvn ran',
      status: 'success',
    });
    Alert.alert('Success', 'Logged event');
  };

  return (
    <View style={MAIN_STYLE}>
      <View style={[CENTRE, {display: isPending ? 'flex' : 'none'}]}>
        <ActivityIndicator />
      </View>

      {status === 'error' && <Retry onRetry={() => refetch()} />}
      <Text>HomePage</Text>

      <Text> Set User Property </Text>

      <Button
        onPress={setProperty}
        disabled={!user}
        title="Set user property"
      />
      <Button onPress={logEvent} disabled={!user} title="Log Event" />
    </View>
  );
};

export default HomePage;

const MAIN_STYLE: ViewStyle = {
  flex: 1,
};

const CENTRE: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};
