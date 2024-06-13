import instance from 'app/utils/axios';
import {AxiosResponse} from 'axios';

export const login = (email: string, password: string) =>
  instance
    .post<{email: string; password: string}, AxiosResponse<Session>>(
      '/auth/login',
      {email, password},
      {
        timeout: 30000,
      },
    )
    .then(res => {
      return res.data;
    });

export const getUserProfile = () =>
  instance.get<RiseUser>('/auth/profile').then(res => res.data);
