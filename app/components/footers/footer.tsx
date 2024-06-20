import React from 'react'
import { ZoomIn } from 'react-native-reanimated'

import { SpringBox, SpringBoxProps } from '../animated/spring-box'
import { CustomerCareFooter } from './customer-care-footer'
import { PhoneNumberFooter } from './phone-number-footer'

export function Footer(props: SpringBoxProps = {}) {
  return (
    <SpringBox
      alignItems="center"
      delayFactor={1}
      entering={ZoomIn}
      justifyContent="center"
      left={0}
      marginTop={10}
      right={0}
      {...props}
    >
      <CustomerCareFooter />
      <PhoneNumberFooter />
    </SpringBox>
  )
}
