import { UserState } from 'app/redux/user/types'
import instance from 'app/utils/axios'

export interface WithdrawToBankAccountPayload {
  payload: WithdrawTransactionPayload
  walletId: string
}

export interface WithdrawTransactionPayload {
  amount: string
  bankAccountId: string
  email: string
  pin: string
  withdrawalReason: string
}

export const fetchWallet = (
  userId: UserState['userId']
): Promise<IRiseWallet> =>
  instance
    .get(`/users/${userId}/get-wallet`)
    .then((res) => res?.data?.data?.wallet)

export const fetchWalletStats = (): Promise<RiseWalletStats> =>
  instance.get('/auth/stats').then((res) => res.data.data)

export const transferToBankAccount = ({
  walletId,
  payload
}: WithdrawToBankAccountPayload) =>
  instance
    .post(`/wallets/transfer/${walletId}/bank`, {
      ...payload
    })
    .then((res) => {
      if (res.status === 200)
        return {
          requestStatus: 'success',
          ...res.data
        }
    })
    .catch((error) => {
      return {
        message: error?.response?.data?.errors?.message,
        requestStatus: 'failed'
      }
    })
