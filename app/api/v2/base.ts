import { NEW_API_BASE_URL } from '@env'
import { useAuthentication, useDeviceInfo } from 'app/internals/axios'
import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: NEW_API_BASE_URL,
  timeout: 60 * 1000
})

instance.interceptors.request.use(useAuthentication)
instance.interceptors.request.use(useDeviceInfo)

export type { AxiosError }
export default instance
