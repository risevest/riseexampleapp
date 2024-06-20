import { compact, keys, map } from 'lodash'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

const reduceArrayToObjectPureFn = (item: any, culm: any) =>
  Object.assign(culm, item)

const reduceArrayToObject = (array: any) =>
  Array.isArray(array)
    ? compact(array).reduce(reduceArrayToObjectPureFn, {})
    : array

export const HapticFeedbackTypes = {
  impactHeavy: 'impactHeavy',
  impactLight: 'impactLight',
  impactMedium: 'impactMedium',
  keyboardPress: 'keyboardPress', // Android Only
  notificationError: 'notificationError',
  notificationSuccess: 'notificationSuccess',
  notificationWarning: 'notificationWarning',
  selection: 'selection',
  soft: 'soft'
}

const hapticToTrigger = (haptic: keyof typeof HapticFeedbackTypes) => ({
  [haptic]: () => ReactNativeHapticFeedback.trigger(haptic)
})

const haptics = reduceArrayToObject(
  map(keys(HapticFeedbackTypes), hapticToTrigger)
)

export default haptics
