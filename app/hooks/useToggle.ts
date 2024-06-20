import { useMemo, useState } from 'react'

interface UseToggleHandlers {
  _set: (s: boolean) => void
  off: () => void
  on: () => void
  reset: () => void
  toggle: () => void
}
type UseToggle = [boolean, UseToggleHandlers]

export const useToggle = (initialState = false): UseToggle => {
  const [state, setState] = useState(initialState)

  const handlers: UseToggleHandlers = useMemo(
    () => ({
      _set: function (s) {
        setState(s)
      },
      off: function () {
        setState(false)
      },
      on: function () {
        setState(true)
      },
      reset: function () {
        setState(initialState)
      },
      toggle: function () {
        setState((s) => !s)
      }
    }),
    [initialState]
  )

  return [state, handlers]
}
