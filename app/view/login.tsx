/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ViewStyle,
  TextInput as Input,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from '@tanstack/react-query';
import {login} from 'app/api/auth';

const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (data: {email: string; password: string}) =>
      login(data.email, data.password),
  });

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLoginMutation();

  const continueLogin = () => {
    loginMutation.mutate(
      {email, password},
      {
        onSuccess(res) {
          console.log(res);
        },
        onError(err) {
          Alert.alert('Failed to Login', err.message || 'Something went wrong');
        },
      },
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={MAIN_STYLE}>
      <Text>Email</Text>
      <Input
        style={INPUT_STYLE}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <Input style={INPUT_STYLE} value={password} onChangeText={setPassword} />

      <View>
        <Button
          disabled={!email || !password}
          title="Continue"
          onPress={continueLogin}
        />
      </View>

      <View
        style={[CENTRE, {display: loginMutation.isPending ? 'flex' : 'none'}]}>
        <ActivityIndicator />
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;

const MAIN_STYLE: ViewStyle = {
  flex: 1,
  paddingTop: 10,
  paddingHorizontal: 20,
};

const INPUT_STYLE: ViewStyle = {
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: '#000',
  paddingHorizontal: 20,
  paddingVertical: 10,
  marginBottom: 10,
};

const CENTRE: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};
