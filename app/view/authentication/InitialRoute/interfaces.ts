export interface InitialAuthInterface extends INavigationProps {
  logoutUser: () => void
  user: RiseUser
}
