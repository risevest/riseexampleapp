import instance from 'app/utils/axios'

export const fetchBanks: () => Promise<IBank[]> = () =>
  instance.get('/bank-accounts/get-banks').then((res) => res.data.banks)

export const resolveBank = (data: Partial<BankAccount>): Promise<BankAccount> =>
  instance.post('/bank-accounts/create-account', data).then((res) => {
    return res.data
  })
export const findBank = (data: Partial<BankAccount>): Promise<BankAccount> =>
  instance.post('/bank-accounts/resolve', data).then((res) => {
    return res.data.data?.data
  })
