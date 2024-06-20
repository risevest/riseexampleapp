import React from 'react'

import { IconProps, ICONS } from './types'

export default function Icon({
  name,
  size = 24,
  ignoreSize = false,
  ...props
}: IconProps) {
  const IconImpl = ICONS[name]
  return IconImpl ? (
    ignoreSize ? (
      <IconImpl {...props} />
    ) : (
      <IconImpl height={size} width={size} {...props} />
    )
  ) : null
}
