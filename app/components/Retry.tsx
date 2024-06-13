import {extractErrorMessage} from 'app/utils/axios';
import React from 'react';
import {Button, Text, TextStyle, View, ViewStyle} from 'react-native';

import {StyleProp} from 'react-native';

export interface RetryProps {
  buttonText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: any;
  onRetry: () => void;
  text?: string;
}

export const Retry = ({
  text,
  error,
  onRetry,
  containerStyle,
  buttonText,
}: RetryProps) => {
  if (error && !text) {
    text = extractErrorMessage(error);
  }

  return (
    <View style={[WRAPPER, containerStyle]}>
      <Text style={ERROR_TEXT}>{text}</Text>
      <Button onPress={onRetry} title={buttonText ?? 'Tap to retry'} />
    </View>
  );
};

const ERROR_TEXT: TextStyle = {
  marginTop: 5,
};

const WRAPPER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};
