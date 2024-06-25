import 'intl';
import 'intl/locale-data/jsonp/en';

import {init} from '@amplitude/analytics-react-native';
import {
  AMPLITUDE_API_KEY,
  APPSFLYERS_APP_ID,
  APPSFLYERS_DEV_KEY,
  SENTRY_DSN,
} from '@env';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import messaging from '@react-native-firebase/messaging';
import {ThemeProvider} from '@risemaxi/sarcelle';
import * as Sentry from '@sentry/react-native';
import {InactiveBlur} from 'app/components/inactive-blur';
import {queryClient} from 'app/rq';
import amp from 'app/utils/analytics/amplitude';
import CustomerIO from 'app/utils/analytics/customer-io';
import firebaseUtils from 'app/utils/analytics/firebaseUtils';
import {CustomerIO as _CustomerIO} from 'customerio-reactnative';
import React, {useEffect} from 'react';
import {Alert, LogBox} from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import codePush from 'react-native-code-push';
import {getBundleId} from 'react-native-device-info';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LaunchArguments} from 'react-native-launch-arguments';
import RNRestart from 'react-native-restart';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {ErrorBoundary} from './app/components/ErrorBoundary';
import Notification from './app/components/Notification';
import SessionMonitor from './app/components/SessionMonitor';
import {ToastRoot} from './app/components/toast';
import config from './app/config/constants';
import {initFreshChat} from './app/config/fresh-chat';
import {ThemeManager} from './app/design/ThemeManager';
import {persistor, store} from './app/redux/store';
import {
  setAppsFlyerLinkState,
  setFcmInitialNotificationState,
} from './app/store/settings';
import fbSDKUtils from './app/utils/analytics/fbsdk';
import {errorLogger} from './app/utils/error/logger';
import RootNavigator from './app/view/navigator/index';

const bundleId = getBundleId();

if (LaunchArguments.value().isE2E) {
  LogBox.ignoreAllLogs(); // Log box displays over ui element sometinmes and causes some issues with maestro
}

init(AMPLITUDE_API_KEY, '', {
  appVersion: config.APP_VERSION,
});

Sentry.init({
  beforeSend: event => {
    if (
      !event.message?.includes(
        'ViewPropTypes will be removed from React Native, along with all other PropTypes',
      ) &&
      event.environment !== 'development'
    ) {
      return event;
    }

    return null;
  },
  debug: false,
  dsn: SENTRY_DSN,
  enableAutoSessionTracking: true,
  environment: __DEV__
    ? 'development'
    : bundleId?.includes('qa')
    ? 'QA'
    : 'production',
});

initFreshChat();
appsFlyer.setOneLinkCustomDomains(
  ['click.risevest.com'],
  () => {},
  () => {},
);
const onDeepLinkCanceller = appsFlyer.onDeepLink(res => {
  if (res?.deepLinkStatus !== 'NOT_FOUND') {
    const DLValue = res?.data?.deep_link_value;
    if (DLValue) {
      setAppsFlyerLinkState(DLValue.startsWith('/') ? DLValue : `/${DLValue}`);
    }
  }
});

appsFlyer.initSdk(
  {
    appId: APPSFLYERS_APP_ID,
    devKey: APPSFLYERS_DEV_KEY,
    isDebug: __DEV__,
    onDeepLinkListener: true,
    onInstallConversionDataListener: true,
    timeToWaitForATTUserAuthorization: 20,
  },
  () => {},
  () => {},
);

/**
 * @param {unknown} error
 * @param {boolean} isFatal
 * @returns
 */
const handleError = (error, isFatal) => {
  // fetch
  if (!error) {
    return;
  }

  errorLogger.captureError(error);
  if (isFatal && !__DEV__) {
    Alert.alert(
      'Hmmm!',
      "That's odd and unexpected. Please restart to continue.",
      [
        {
          onPress: () => RNRestart.Restart(),
          text: 'Reload',
        },
      ],
      {cancelable: false},
    );
  }
};

setJSExceptionHandler((error, isFatal) => {
  handleError(error, isFatal);
}, true);

setNativeExceptionHandler(errorString => {
  // @Todo: Handle native crash here
  handleError(errorString, false);
});

Ionicons.loadFont().catch(error => handleError(error, false));

const EnableInappMessaging = () => {
  inAppMessaging().setMessagesDisplaySuppressed(false);
  return <></>;
};

const App = () => {
  useEffect(() => {
    inAppMessaging().setMessagesDisplaySuppressed(true);
    firebaseUtils.logEvent('open_splash_screen');
    amp.logEvent('Splash Screen Opened');

    fbSDKUtils.init();

    CustomerIO.init();

    fbSDKUtils.init();
    /**
     * @param {import('@react-native-firebase/messaging').FirebaseMessagingTypes.RemoteMessage|null} notification
     */
    const handleFirebaseMessage = notification => {
      if (notification?.data) {
        setFcmInitialNotificationState({
          targetId: Number(
            notification.data?.targetId || notification.data?.target_id,
          ),
          targetType: String(
            notification.data?.targetType || notification.data?.target_type,
          ),
          targetUrl: String(
            notification.data?.targetUrl || notification.data?.target_url,
          ),
        });
      }
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
      onDeepLinkCanceller();
    };
  }, []);

  return (
    <GestureHandlerRootView style={FLEX}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {EnableInappMessaging()}
              <ThemeProvider>
                <ErrorBoundary>
                  <ThemeManager>
                    <SessionMonitor />
                    <RootNavigator />
                    <ToastRoot />
                    <Notification />
                  </ThemeManager>
                </ErrorBoundary>
                <InactiveBlur />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
})(App);

const FLEX = {flex: 1};
