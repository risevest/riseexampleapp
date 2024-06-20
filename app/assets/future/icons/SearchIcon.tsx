import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
  height: number
  width: number
}

export function SearchIcon({ width, height }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 14 15" width={width}>
      <Path
        clipRule="evenodd"
        d="M13.743 13.57L9.91 9.736a5.425 5.425 0 001.05-3.232A5.531 5.531 0 005.46.996 5.436 5.436 0 000 6.464a5.532 5.532 0 005.5 5.508 5.408 5.408 0 003.242-1.061l.004-.003 3.83 3.831a.826.826 0 101.167-1.169zm-8.247-2.696a4.425 4.425 0 01-4.4-4.406 4.35 4.35 0 014.368-4.374 4.425 4.425 0 014.4 4.406 4.35 4.35 0 01-4.368 4.374z"
        fill="#0898A0"
        fillRule="evenodd"
        opacity={0.5}
      />
    </Svg>
  )
}
