import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamsList = {
  Login: undefined;
  Home: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamsList> =
  NativeStackScreenProps<MainStackParamsList, T>;
