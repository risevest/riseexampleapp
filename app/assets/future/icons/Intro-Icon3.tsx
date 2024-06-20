import * as React from 'react'
import Svg, { Defs, Image, Path, Pattern, Use } from 'react-native-svg'

import { Props } from './types'
export function IntroIcon3({ height, width, ...rest }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 300 300"
      width={width}
      {...rest}
    >
      <Path d="M0 0h300v300H0z" fill="url(#prefix__pattern0)" />
      <Path d="M0 0h300v300H0z" fill="url(#prefix__pattern0)" />
      <Defs>
        <Pattern
          height={1}
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
        >
          <Use
            transform="matrix(.00059 0 0 .00059 0 0)"
            xlinkHref="#prefix__image0"
          />
        </Pattern>
        <Image
          height={1704}
          id="prefix__image0"
          width={1702}
        />
      </Defs>
    </Svg>
  )
}