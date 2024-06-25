import instance from 'app/utils/axios'
import { IWallet } from 'app/view/App/Wallet/interface'
import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useInvalidateCache, useWalletQuery } from './queries'

const listAccountsData = (data: IWallet) => Object.values(data)

function useGenerateAccountMutation() {
  return useMutation(
    (bvn: string) => instance.post('/nubans/generate', { bvn }),
    {
      mutationKey: 'generateAccounts'
    }
  )
}

export const useGetAccountNumbers = () => {
  const { status, error, data, ...query } = useQuery('accountNumbers', () =>
    instance
      .get('/nubans')
      .then((response) => listAccountsData(response?.data?.data))
  )
  const accountNumbers = data || []
  const err = error
    ? {
        msg: 'Unable to fetch your Nuban accounts.'
      }
    : {}
  return { accountNumbers, error: err, status, ...query }
}

export function useWallet() {
  const { wallet } = useWalletQuery()
  const { invalidateAccountNumbers } = useInvalidateCache()
  const { isLoading, refetch, accountNumbers, error } = useGetAccountNumbers()
  const generateAccountsMutation = useGenerateAccountMutation()

  const generateAccounts = React.useCallback(
    async (bvn: string) => {
      await generateAccountsMutation.mutateAsync(bvn, {
        onSuccess: () => {
          invalidateAccountNumbers()
        }
      })
    },
    [generateAccountsMutation, invalidateAccountNumbers]
  )

  return {
    accountNumbers,
    accountNumbersError: generateAccountsMutation.error,
    fetchAccountNumbersError: error,
    fetchNubanAccounts: refetch,
    generateAccounts: generateAccounts,
    loadingAccountNumbers: isLoading,
    wallet
  }
}
