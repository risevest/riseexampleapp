import instance from 'app/utils/axios'

export const fetchTransactions = (
  offset: number
): Promise<Paginate<ITransactionObj>> =>
  instance
    .get('/transactions', { params: { $offset: offset } })
    .then((res) => res.data)

export const fetchPendingWithdrawals = (): Promise<any> =>
  instance
    .get('/transactions', {
      params: {
        status: 'pending withdrawals'
      }
    })
    .then((res) => res.data)

export const fetchRates = () =>
  instance
    .get('/transactions/exchange-rate')
    .then((res: AxiosRes<Rates>) => res.data?.data)

export const fetchProcessingFees = (amount: string) =>
  instance
    .get(`/transactions/processing-fee?amount=${amount}`)
    .then((res: AxiosRes<IProcessingFee>) => res.data?.data)

export const fetchUserBankAccounts = () =>
  instance.get('/bank-accounts/user-accounts').then((res) => res.data?.accounts)

export const fetchTransaction = (transactionId: number) =>
  instance
    .get(`/transaction/${transactionId}`)
    .then((res) => res.data?.transaction)
