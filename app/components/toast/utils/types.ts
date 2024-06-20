import type { Flatten } from 'app/utils/utilTypes'
import type { ToastOptions } from 'react-native-toast-message'
import type { ToastConfigParams } from 'react-native-toast-message'

import type { ToastConfig, ToastNames } from '../config'

export type ToastParams<TProps = unknown> = Flatten<
  ToastConfigParams<TProps> & {
    body?: string
    title?: string
  }
>

export type ToastShowParams = Flatten<
  Omit<Pick<ToastParams, 'body' | 'title'>, 'text1' | 'text2'> & ToastOptions
>

export type ToastProps<T> = T extends ToastNames
  ? React.ComponentProps<ToastConfig[T]> extends ToastParams<infer P>
    ? P
    : never
  : never

export type ToastShow<T extends ToastNames> = Flatten<
  Omit<ToastShowParams, 'props' | 'type'> &
    (ToastProps<T> extends never
      ? {
          props?: undefined
          type: T
        }
      : {
          props: ToastProps<T>
          type: T
        })
>
