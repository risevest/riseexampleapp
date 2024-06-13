import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';

const mmkv = new MMKV({
  id: 'app-data',
});

export const setMMKVItem = (key: string, data: string) => {
  return mmkv.set(key, data);
};

export const getMMKVItem = (key: string) => {
  const value = mmkv.getString(key);
  return value ?? null;
};

interface AppState {
  token?: string;
  session?: Session;
}

const persistStorage: StateStorage = {
  getItem: getMMKVItem,
  removeItem: name => mmkv.delete(name),
  setItem: (name, value) => setMMKVItem(name, value),
};

export const useAppStore = create<AppState>()(
  persist(
    (_, __) => ({
      token: undefined,
      session: undefined,
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => persistStorage),
      version: 1,
    },
  ),
);
