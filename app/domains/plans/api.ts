import instance from 'app/utils/axios'

import { AssetClassPlanType, GoalBasedPlanType, Plan, Stocks } from './types'

// fetch plans
export const fetchPlans = (offset: number): Promise<Paginate<Plan>> =>
  instance
    .get('/user-plans', { params: { $limit: 10, $offset: offset } })
    .then((res) => res.data)

export const fetchMaturedPlans = (offset: number): Promise<Paginate<Plan>> =>
  instance
    .get('/user-plans', {
      params: { $limit: 10, $offset: offset, active: false, isClosed: true }
    })
    .then((res) => res.data)

export const fetchGoalBasedPlans = () =>
  instance
    .get('/goal-plans')
    .then((res) => res.data as Paginate<GoalBasedPlanType>)

export const fetchAssetBasedPlans = () =>
  instance
    .get('/asset-classes')
    .then((res) => res.data as Paginate<AssetClassPlanType>)

export const fetchStocks = () =>
  instance
    .get('/stocks', {
      params: {
        $limit: 20
      }
    })
    .then((res) => res.data as Paginate<Stocks>)
