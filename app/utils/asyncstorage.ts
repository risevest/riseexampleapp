import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItemToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    // fail silently for now
  }
}

export const fetchItemFromStorage = async (key: string, initial?: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value ?? initial
  } catch (error) {
    // fail silently for now
  }
}

export const removeItemFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // fail silently for now
  }
}

export const clearAllData = () =>
  AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys))
