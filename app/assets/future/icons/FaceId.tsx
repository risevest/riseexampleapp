import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { Props } from './types'

export function FaceId({ width, height, style, iconColor = '#0898A0' }: Props) {
  return (
    <Svg
      fill="none"
      height={height}
      style={style}
      viewBox="0 0 37 37"
      width={width}
    >
      <Path
        clipRule="evenodd"
        d="M36.488 8.367c0 .785.013 1.582 0 2.366-.027.744-.73 1.163-1.31.811-.352-.216-.46-.567-.446-.96V6.597c-.014-1.595-.676-2.839-2.054-3.677-.675-.406-1.418-.568-2.188-.554-1.243 0-2.472.013-3.715-.014-.257 0-.527-.094-.743-.243-.297-.203-.352-.595-.244-.906.15-.392.446-.595.92-.595 1.256 0 2.525-.013 3.782 0 .419 0 .837.04 1.243.122 2.54.473 4.512 2.636 4.714 5.218.068.812.014 1.623.014 2.434 0-.014.013-.014.027-.014zM.594 8.38c0-.918-.081-1.851.013-2.757C.891 3.068 3.161.864 5.714.675 7.281.567 8.862.607 10.429.607c.5 0 .891.433.878.892-.014.46-.419.852-.919.852-1.31.014-2.607 0-3.917.014-2.054.027-3.648 1.311-4.08 3.298a5 5 0 00-.081 1c-.014 1.312 0 2.637-.014 3.949 0 .243-.08.513-.216.716-.203.311-.594.406-.932.284-.378-.135-.608-.446-.608-.879-.014-.784 0-1.582 0-2.366.013.014.027.014.054.014zM28.964 36.582c-.77 0-1.553.014-2.323 0-.703-.013-1.108-.649-.838-1.23.162-.338.446-.5.81-.514h1.352c.972 0 1.959.014 2.931-.027 2.04-.094 3.729-1.798 3.796-3.853.04-1.257.014-2.528.027-3.785 0-.663.365-1.055.932-1.028a.849.849 0 01.784.663c.027.094.04.202.04.297 0 1.338.055 2.69-.04 4.015-.175 2.393-1.459 4.043-3.634 5.03-.892.405-1.837.46-2.81.432-.324-.013-.675 0-1.027 0zM7.997 36.555c-.73 0-1.459.04-2.188-.014-2.54-.162-4.864-2.298-5.215-4.826-.108-.825-.081-1.69-.094-2.528v-2.082c0-.582.337-.96.85-.974.527-.013.906.365.906.96.013.906 0 1.798 0 2.704 0 .77-.054 1.555.23 2.298.634 1.717 2.093 2.718 4.012 2.731 1.243.014 2.472 0 3.715 0 .419 0 .756.108.945.514.27.554-.08 1.203-.702 1.23-.81.027-1.635 0-2.459-.013 0 .013 0 .013 0 0zM18.629 29.93c-2.702.041-4.877-.905-6.728-2.635-.378-.352-.473-.73-.31-1.082.162-.365.54-.608.932-.514.23.054.473.203.662.379 1.026.96 2.202 1.622 3.58 1.92 2.526.54 4.809 0 6.808-1.663.136-.122.27-.244.406-.352.432-.378.918-.378 1.27-.027.378.392.378.866-.041 1.285-1.013 1.014-2.202 1.784-3.566 2.244-1.027.31-2.08.486-3.013.446zM19.71 17.345c0 1.135.081 2.284-.014 3.407-.148 1.554-1.58 2.798-3.377 2.73-.527-.013-.864-.392-.864-.892 0-.514.35-.865.905-.879.662 0 1.202-.216 1.486-.838.121-.257.162-.568.162-.852.013-1.92 0-3.826.013-5.745 0-.487.203-.784.581-.92.608-.216 1.162.23 1.175.947.014 1.014 0 2.028 0 3.042h-.067zM9.294 15.6c0-.527-.027-1.054.014-1.582.027-.46.405-.838.824-.919.513-.108 1.013.095 1.242.54.095.19.15.407.15.61.013.905.013 1.824 0 2.73-.014.69-.46 1.163-1.082 1.176-.635.014-1.134-.46-1.161-1.149-.014-.473 0-.946 0-1.42-.014.014 0 .014.013.014zM24.965 15.615c0-.487-.013-.974 0-1.447.014-.635.486-1.095 1.121-1.095s1.108.46 1.108 1.109c.014.946.014 1.892 0 2.839 0 .635-.527 1.162-1.121 1.149-.635-.014-1.094-.5-1.108-1.163v-1.392z"
        fill={iconColor}
        fillRule="evenodd"
      />
    </Svg>
  )
}