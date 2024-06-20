import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

//this was a created due to a bug in react-navigation where gesture can't be disabled on a single screen
export function useDisableNavigationGesture(enableNavigation: boolean = false) {
  const navigation = useNavigation()

  useEffect(() => {
    if (!enableNavigation) {
      navigation?.addListener('beforeRemove', (e) => {
        e.preventDefault() //for android devices with on screen back button
      })
    }

    // disable swipe
    navigation.getParent()?.setOptions({ gestureEnabled: false })

    // re-enable swipe after going back
    return () => {
      navigation.getParent()?.setOptions({ gestureEnabled: true })
    }
  }, [enableNavigation, navigation])
}
