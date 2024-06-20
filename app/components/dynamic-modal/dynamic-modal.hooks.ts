import { screenHeight } from 'app/design/responsiveModule'

import { ModalType } from './dynamic-modal.props'

export function useGetModalHeight(type: ModalType, height?: number | string) {
  switch (type) {
    case 'halfScreen':
      return screenHeight / 2

    case 'fullScreen':
      return screenHeight

    case 'bottomSheet':
      return '25%'

    case 'fixedHeight':
      return height

    case 'partialHalf':
      return '40%'

    case 'content':
      return undefined

    default:
      return '80%'
  }
}
