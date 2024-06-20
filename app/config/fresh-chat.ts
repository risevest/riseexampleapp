import { FRESH_CHAT_APP_ID, FRESH_CHAT_APP_KEY } from '@env'
import { Freshchat, FreshchatConfig } from 'react-native-freshchat-sdk'

export function initFreshChat() {
  const freshchatConfig = new FreshchatConfig(
    FRESH_CHAT_APP_ID,
    FRESH_CHAT_APP_KEY
  )
  Freshchat.init(freshchatConfig)
}
