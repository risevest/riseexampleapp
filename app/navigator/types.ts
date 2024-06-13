import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamsList = {
  Login: undefined;
  Home: {user: Record<string, any>};
};

export type MainStackScreenProps<T extends keyof MainStackParamsList> =
  NativeStackScreenProps<MainStackParamsList, T>;
