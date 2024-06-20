import { AuthStackScreenProps } from 'app/view/navigator/types/auth-stack'

export interface IInfo extends AuthStackScreenProps<'Info'> {
  handleDoThisLater: () => void
}
