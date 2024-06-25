import instance from 'app/utils/axios'

export type WithdrawToPlanPayload = {
  amount: number
  planId: number
}

export const fetchPlanDetails = ({ planId }: { planId: PlanId }) =>
  instance
    .get(`/user-plans/${planId}`, {
      params: {
        $include:
          'portfolio.portfolio_mix.asset_class,user_portfolio.user_portfolio_mix'
      }
    })
    .then((res: AxiosRes<IPlan>) => res.data.data)

export const fetchPlanPortfolio = ({ planId }: { planId: PlanId }) =>
  instance
    .get(`/user-plans/${planId}`, {
      params: {
        $include: 'user_portfolio.user_portfolio_mix'
      }
    })
    .then((res: AxiosRes<IUserPortfolio>) => res.data.data)

export const fetchAssetClasses = () =>
  instance.get('/asset-classes').then((res: AxiosRes<any>) => res.data.data)

export const editPlan = ({
  planId,
  payload
}: {
  payload: object
  planId: PlanId
}): Promise<any> =>
  instance
    .put(`/user-plans/${planId}`, payload)
    .then((res: AxiosRes<any>) => res.data.data)

export const fundPlan = (data: { amount: number; userPlanId: number }) =>
  instance
    .post('/wallets/transfer/plan', data)
    .then((res: Axios.AxiosResponse<{ success: { plan: Partial<IPlan> } }>) => {
      return res.data?.success?.plan
    })

export const withdrawFromPlan = (data: WithdrawToPlanPayload) =>
  instance
    .post(`/user-plans/${data.planId}/withdraw-to-wallet`, {
      amount: data.amount
    })
    .then((res: AxiosRes<any>) => {
      if (res.status === 200) {
        return {
          requestStatus: 'success'
        }
      }
    })
    .catch((error) => {
      if (error) {
        return {
          message: error?.response?.data?.message,
          requestStatus: 'failed'
        }
      }
    })

export const fetchPlans = (offset: number): Promise<PlanRes> =>
  instance
    .get('/user-plans', { params: { $limit: 10, $offset: offset } })
    .then((res) => res.data)

export const createPlan = (data: object) =>
  instance.post('/user-plans', data).then((response) => {
    const plan: IPlan = response.data.data
    return {
      plan,
      requestStatus: 'success'
    }
  })

export const createBuildWealthPlan = (data: object) =>
  instance.post('/user-portfolios', data).then((response) => {
    const plan: IPlan = response.data.data.plan
    return {
      plan,
      requestStatus: 'success'
    }
  })

export const deletePlan = (userPlanId: number) =>
  instance
    .delete(`/user-plans/${userPlanId}`, {
      headers: {
        'content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return {
          message: 'Successfully deleted your plan',
          requestStatus: 'success'
        }
      }
    })
    .catch((error) => {
      if (error) {
        return {
          message: error?.response?.data?.message,
          requestStatus: 'failed'
        }
      }
    })
