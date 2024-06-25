import _ from 'lodash';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {toastConfig, ToastNames} from './config';

export function ToastRoot({includedToasts}: {includedToasts?: ToastNames[]}) {
  const edges = useSafeAreaInsets();

  return (
    <Toast
      bottomOffset={edges.bottom + 30}
      config={
        includedToasts ? _.pick(toastConfig, includedToasts) : toastConfig
      }
      topOffset={edges.top + 10}
    />
  );
}
