export type RouteObject = {
  accessibilityLabel?: string
  icon?: string
  key: string
  testId?: string
  title: string
}

export type RouteComponent = {
  component: JSX.Element
  key: string
}

export type TabT = {
  components: RouteComponent[]
  customIndex?: number
  disableTabPress?: boolean
  getCurrentIndex: (index: number) => void
  routes: RouteObject[]
  swipeEnabled?: boolean
}
