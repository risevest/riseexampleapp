import {
  getFreshChatRestoreID,
  saveFreshChatRestoreID
} from 'app/domains/fresh-chat'
import { errorLogger } from 'app/utils/error/logger'
import { Freshchat, FreshchatUser } from 'react-native-freshchat-sdk'

function handleError(error: unknown) {
  errorLogger.captureError(error)
}

export async function setUserProperty(user: RiseUser) {
  const freshchatUser = new FreshchatUser()
  freshchatUser.email = user.email
  freshchatUser.firstName = user.firstName
  setUserProperties({ id: String(user.id) })
  Freshchat.setUser(freshchatUser, (error: any) => {
    handleError(error)
  })
  Freshchat.identifyUser(
    String(user.id),
    await getFreshChatRestoreID(),
    handleError
  )
}

export function setUserProperties(properties: Record<string, string>) {
  Freshchat.setUserProperties(properties, (error: any) => {
    handleError(error)
  })
}

export async function showConversationList() {
  Freshchat.showConversations()
}

export function setToken(token: string) {
  Freshchat.setPushRegistrationToken(token)
}

Freshchat.addEventListener(Freshchat.EVENT_USER_RESTORE_ID_GENERATED, () => {
  Freshchat.getUser(async (user: FreshchatUser) => {
    await saveFreshChatRestoreID(user.restoreId)
  })
})
