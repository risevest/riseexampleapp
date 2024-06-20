import { IconName } from 'app/assets/icons/types'
import { toastMethods } from 'app/components/toast'
import { extractErrorMessage } from 'app/utils/utilFunctions'

export const useDisplayMessage = (icon?: IconName) => {
  const displayError = (title: string, message: string) =>
    toastMethods.show({
      props: {
        contentProps: {
          description: message,
          icon: icon ?? 'alert-error-info',
          title: title || 'Error'
        },
        type: 'error'
      },
      type: 'alert'
    })

  const displaySuccess = (title: string, message: string) =>
    toastMethods.show({
      props: {
        contentProps: {
          description: message,
          icon: icon || 'alert-feed',
          title: title || 'Success'
        }
      },
      type: 'alert'
    })

  const displayServerError = (error: any, title = 'Error') => {
    const message = extractErrorMessage(error) ?? 'Something went wrong'
    displayError(title, message)
  }
  return { displayError, displayServerError, displaySuccess }
}
