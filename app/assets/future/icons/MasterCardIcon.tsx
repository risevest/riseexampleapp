import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function MasterCardIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" height={40} viewBox="0 0 40 40" width={40} {...rest}>
      <Rect fill="#71879C" fillOpacity={0.1} height={40} rx={20} width={40} />
      <G clipPath="url(#clip0_20214_28790)">
        <Path
          d="M31.95 24.524v-.284h-.074l-.085.195-.085-.195h-.075v.284h.053v-.214l.08.185h.055l.08-.185v.214h.052zm-.469 0v-.235h.095v-.048h-.242v.048h.095v.235h.052z"
          fill="#F79410"
        />
        <Path d="M23.546 25.744h-6.4v-11.5h6.4v11.5z" fill="#FF5F00" />
        <Path
          d="M17.552 19.993a7.302 7.302 0 012.793-5.75 7.313 7.313 0 00-11.832 5.75 7.313 7.313 0 0011.832 5.75 7.301 7.301 0 01-2.793-5.75z"
          fill="#EB001B"
        />
        <Path
          d="M32.179 19.993a7.313 7.313 0 01-11.833 5.75 7.3 7.3 0 002.793-5.75 7.3 7.3 0 00-2.793-5.75 7.313 7.313 0 0111.833 5.75"
          fill="#F79E1B"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_20214_28790">
          <Path
            d="M0 0H25.2917V14.6426H0z"
            fill="#fff"
            transform="translate(7.354 12.679)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
