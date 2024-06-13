import {API_BASE_URL} from '@env';
import {getMMKVItem} from 'app/storage';
import {
  getBrand,
  getDeviceId,
  getVersion,
  getSystemVersion,
} from 'react-native-device-info';
import axios, {InternalAxiosRequestConfig as AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';

function useAuthentication(config: AxiosRequestConfig) {
  const token = getMMKVItem('sessionToken');

  if (token && config?.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config!;
}

export async function useDeviceInfo(config: AxiosRequestConfig) {
  const deviceBrand = getBrand();

  config.headers = {
    ...config.headers,
    appVersion: getVersion(),
    device: `${deviceBrand}(${getDeviceId()})`,
    osVersion: getSystemVersion(),
    'rise-platform': 'mobile',
    'rise-platform-os': Platform.OS,
  } as any;
  return config;
}

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60 * 1000,
});
instance.interceptors.request.use(useAuthentication);
instance.interceptors.request.use(useDeviceInfo);

export const extractErrorMessage = (error: any): string | undefined => {
  if (typeof error === 'string') {
    return error;
  }
  const message = error?.response?.message;
  if (message && typeof message === 'string') {
    return message;
  }
  return error?.response?.data?.message;
};

export default instance;
// Here
