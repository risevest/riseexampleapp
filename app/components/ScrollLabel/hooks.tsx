import { useToggle } from 'app/hooks'
import { isCloseToBottom } from 'app/utils'
import React, { useMemo } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps
} from 'react-native'

import { ScrollLabel } from './scroll-label'
import { Scrollable } from './types'

type Props<T> = {
  scrollRef: React.MutableRefObject<T | null>
  showScrollLabel?: boolean | undefined
}

export const useScrollLabel = <T extends Scrollable>(props: Props<T>) => {
  const [isLabelVisible, { on: showLabel, off: hideLabel }] = useToggle(
    props.showScrollLabel
  )

  const renderIndicator = useMemo(() => {
    return isLabelVisible ? <ScrollLabel scrollRef={props.scrollRef} /> : null
  }, [isLabelVisible, props.scrollRef])

  const handleScroll = (onScroll?: ScrollViewProps['onScroll']) => {
    return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll?.(event)

      if (isCloseToBottom(event.nativeEvent)) {
        hideLabel()
      } else {
        showLabel()
      }
    }
  }

  return {
    handleScroll,
    renderIndicator
  }
}
