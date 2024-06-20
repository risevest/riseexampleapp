import { CommonActions, useNavigation } from '@react-navigation/native'

export function useRemoveScreensFromState(screens: string[]) {
  const navigation = useNavigation()
  const removeScreenFn = () => {
    navigation?.dispatch((state) => {
      const routes = state.routes.filter(
        (r: { name: string }) => !screens.includes(r.name)
      )

      return CommonActions.reset({
        ...state,
        index: routes.length - 1,
        routes
      })
    })
  }

  return (action?: () => void) => {
    setTimeout(() => {
      action?.()
      removeScreenFn()
    }, 300)
  }
}
