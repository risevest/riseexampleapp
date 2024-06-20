import {
  fetchAssetClasses,
  fetchPlanDetails,
  fetchPlanPortfolio,
  fetchRates
} from 'app/api'
import {
  fetchUserPlanAction,
  getAssetClassesSuccessAction
} from 'app/redux/plan/actionCreators'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

export const usePlan = (planId: number) => {
  const dispatch = useDispatch()
  const { status, data, ...query } = useQuery<IPlan>(['planDetails', planId], {
    onSuccess: (res) => {
      dispatch(fetchUserPlanAction(res))
    },
    queryFn: () => fetchPlanDetails({ planId })
  })

  const plan = (data ? data : {}) as IPlan
  return {
    plan,
    status: transformQueryStatusToRiseStatus(status),
    ...query
  }
}

export const useRates = () => {
  const { status, data, ...query } = useQuery<Rates>('rates', {
    queryFn: () => fetchRates()
  })

  const rates = (data ? data : {}) as Rates
  return {
    rates,
    status: transformQueryStatusToRiseStatus(status),
    ...query
  }
}

export const usePlanPortfolio = (planId: PlanId) => {
  const { status, data, ...query } = useQuery<IUserPortfolio>(
    ['planPortfolio', planId],
    {
      queryFn: () => fetchPlanPortfolio({ planId })
    }
  )

  const portfolio = (data ? data : {}) as IUserPortfolio
  return {
    portfolio,
    status: transformQueryStatusToRiseStatus(status),
    ...query
  }
}

export const useAssetClasses = () => {
  const dispatch = useDispatch()
  return useQuery('assetClasses', {
    onSuccess: (assetClass: IAssetClass[]) => {
      // this would allow us remove the one in the redux store
      dispatch(getAssetClassesSuccessAction(assetClass))
    },
    queryFn: () => fetchAssetClasses()
  })
}
