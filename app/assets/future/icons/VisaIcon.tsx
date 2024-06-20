import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

import { Props } from './types'

export function VisaIcon({ ...rest }: Props) {
  return (
    <Svg fill="none" viewBox="0 0 42 42" {...rest}>
      <Circle cx={21} cy={21} fill="#172274" r={21} />
      <Path
        clipRule="evenodd"
        d="M16.065 24.789l2.341-7.72h2.09l-2.342 7.72h-2.089zM15.131 17.072l-1.88 3.273c-.477.857-.757 1.29-.891 1.831h-.03c.034-.686-.062-1.53-.07-2.006l-.208-3.098H8.536l-.036.208c.903 0 1.438.454 1.586 1.382l.685 6.128h2.164l4.376-7.718h-2.18zM31.375 24.789l-.058-1.148-2.608-.002-.534 1.15h-2.268l4.112-7.705h2.784l.697 7.705h-2.125zm-.24-4.554c-.023-.57-.043-1.345-.004-1.813h-.03c-.128.383-.674 1.534-.914 2.1l-.777 1.692h1.831l-.106-1.979zM22.688 25.008c-1.475 0-2.454-.468-3.153-.885l.995-1.52c.628.351 1.12.756 2.253.756.365 0 .716-.095.915-.44.29-.502-.067-.772-.883-1.234l-.402-.262c-1.21-.827-1.734-1.612-1.164-2.982.364-.877 1.325-1.541 2.91-1.541 1.094 0 2.12.473 2.717.935l-1.144 1.341c-.583-.47-1.066-.71-1.62-.71-.44 0-.775.17-.89.4-.218.431.07.725.705 1.12l.48.304c1.468.927 1.818 1.898 1.45 2.806-.633 1.563-1.873 1.912-3.17 1.912z"
        fill="#fff"
        fillRule="evenodd"
      />
    </Svg>
  )
}