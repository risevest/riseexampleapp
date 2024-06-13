import {Keyboard, Alert} from 'react-native';
import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: error => {
        Keyboard.dismiss();
        if (
          error instanceof Error &&
          error.message.toLocaleLowerCase().includes('network')
        ) {
          Alert.alert(
            'Error',
            error.message + ' Please check your device for internet connection',
          );
        }
      },
    },
    queries: {
      // extend stale time to one minute
      // this means if I query something and I query it again in another screen
      // if this time set here hasn't gone by it shouldn't hit the server again
      // the default is 20 seconds
      staleTime: 1000 * 60,
    },
  },
});
