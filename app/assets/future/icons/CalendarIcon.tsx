import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

import { Props } from './types'

export function CalendarIcon({ width, height }: Props) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 40 41" width={width}>
      <Rect
        fill="#71879C"
        fillOpacity={0.1}
        height={40}
        rx={20}
        width={40}
        y={0.174}
      />
      <Path
        d="M13.582 28.174h12.835c1.712 0 2.583-.87 2.583-2.525v-10.96c0-1.645-.87-2.515-2.582-2.515H13.582c-1.703 0-2.583.85-2.583 2.515v10.96c0 1.664.88 2.525 2.582 2.525zm-.048-.917c-1.045 0-1.606-.54-1.606-1.58V17.66c0-1.04.561-1.58 1.606-1.58h12.922c1.026 0 1.616.54 1.616 1.58v8.018c0 1.04-.59 1.58-1.616 1.58H13.534zm4.633-8.029h.532c.27 0 .329-.056.329-.312v-.53c0-.245-.058-.302-.329-.302h-.532c-.27 0-.329.057-.329.303v.53c0 .255.058.311.33.311zm3.134 0h.532c.27 0 .329-.056.329-.312v-.53c0-.245-.058-.302-.33-.302h-.531c-.27 0-.329.057-.329.303v.53c0 .255.058.311.329.311zm3.124 0h.542c.26 0 .329-.056.329-.312v-.53c0-.245-.068-.302-.33-.302h-.541c-.261 0-.329.057-.329.303v.53c0 .255.068.311.329.311zm-9.392 3.017h.542c.261 0 .329-.057.329-.312v-.53c0-.255-.068-.312-.329-.312h-.542c-.26 0-.329.057-.329.312v.53c0 .255.068.312.33.312zm3.134 0h.532c.27 0 .329-.057.329-.312v-.53c0-.255-.058-.312-.329-.312h-.532c-.27 0-.329.057-.329.312v.53c0 .255.058.312.33.312zm3.134 0h.532c.27 0 .329-.057.329-.312v-.53c0-.255-.058-.312-.33-.312h-.531c-.27 0-.329.057-.329.312v.53c0 .255.058.312.329.312zm3.124 0h.542c.26 0 .329-.057.329-.312v-.53c0-.255-.068-.312-.33-.312h-.541c-.261 0-.329.057-.329.312v.53c0 .255.068.312.329.312zm-9.392 3.007h.542c.261 0 .329-.057.329-.312v-.52c0-.256-.068-.312-.329-.312h-.542c-.26 0-.329.056-.329.312v.52c0 .255.068.312.33.312zm3.134 0h.532c.27 0 .329-.057.329-.312v-.52c0-.256-.058-.312-.329-.312h-.532c-.27 0-.329.056-.329.312v.52c0 .255.058.312.33.312zm3.134 0h.532c.27 0 .329-.057.329-.312v-.52c0-.256-.058-.312-.33-.312h-.531c-.27 0-.329.056-.329.312v.52c0 .255.058.312.329.312z"
        fill="#0898A0"
      />
    </Svg>
  )
}