import { fetchItemFromStorage, setItemToStorage } from 'app/utils/asyncstorage'

export async function saveFreshChatRestoreID(restoreID: string) {
  return setItemToStorage('fresh-chat-restore-id', restoreID)
}

export async function getFreshChatRestoreID(): Promise<string | null> {
  const restoreID = await fetchItemFromStorage('fresh-chat-restore-id')
  if (!restoreID) {
    return null
  }
  return restoreID
}
