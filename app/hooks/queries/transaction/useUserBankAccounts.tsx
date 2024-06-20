import { fetchUserBankAccounts } from 'app/api'
import { setUserProperties } from 'app/utils/analytics'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from 'react-query'

export const useUserBankAccounts = () => {
  const { status, data, ...query } = useQuery<IBankAccount[]>(
    'bankAccounts',
    () => fetchUserBankAccounts(),
    {
      onSuccess: (banks) => {
        if (banks?.length > 0) {
          setUserProperties({ has_bank_account: true })
        } else {
          setUserProperties({ has_bank_account: false })
        }
      }
    }
  )
  const bankAccounts = (data || []) as IBankAccount[]
  return {
    bankAccounts,
    requestStatus: transformQueryStatusToRiseStatus(status),
    ...query
  }
}
