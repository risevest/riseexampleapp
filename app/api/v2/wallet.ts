import instance from './base'

interface IPayload {
  value: boolean
}

export const toggleWalletInterest = (payload: IPayload) =>
  instance.patch('/wallets/toggle-interest', payload).then((res) => res.data)
