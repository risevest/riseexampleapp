import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

import { Props } from './types'

export function ErrorIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 50 52" {...rest}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M25 31.368c.93 0 1.838-.378 3.07-1.094l14.562-8.292c1.838-1.054 2.848-2.128 2.848-3.798s-1.01-2.764-2.848-3.798L28.07 6.094C26.838 5.378 25.93 5 25 5c-.95 0-1.838.378-3.07 1.094L7.348 14.386C5.51 15.42 4.5 16.514 4.5 18.184s1.01 2.744 2.848 3.798l14.582 8.292c1.232.716 2.12 1.094 3.07 1.094zm0 9.485c.909 0 1.757-.398 2.949-1.094l15.047-8.63c1.575-.915 2.504-1.969 2.504-3.5 0-1.292-.707-2.287-1.737-3.022l-16.602 9.545c-.889.497-1.495.795-2.161.795-.666 0-1.293-.298-2.161-.795L6.237 24.607c-1.05.736-1.737 1.73-1.737 3.022 0 1.531.93 2.605 2.484 3.5l15.047 8.63c1.192.696 2.04 1.094 2.969 1.094zM25 50c.909 0 1.757-.418 2.949-1.094l15.047-8.65c1.555-.895 2.504-1.948 2.504-3.48 0-1.312-.707-2.306-1.737-3.042l-16.602 9.545c-.889.517-1.495.815-2.161.815-.666 0-1.293-.298-2.161-.815L6.237 33.734c-1.05.736-1.737 1.73-1.737 3.042 0 1.532.93 2.585 2.484 3.48l15.047 8.65C23.223 49.582 24.071 50 25 50z"
          fill="#71879C"
          fillOpacity={0.2}
        />
        <Path
          clipRule="evenodd"
          d="M49.5 12a8 8 0 11-16 0 8 8 0 0116 0zm-9.263-4.21a1.263 1.263 0 012.526 0V12a1.263 1.263 0 01-2.526 0V7.79zm1.263 7.157a1.263 1.263 0 100 2.527 1.263 1.263 0 000-2.527z"
          fill="#EB5757"
          fillRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h49v52H0z" fill="#fff" transform="translate(.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
