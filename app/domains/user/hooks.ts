import { AffiliateDetails, AffiliateTransaction } from 'app/domains/user'
import { USE_USER_CONFIG, useDisplayMessage } from 'app/hooks'
import { queryClient } from 'app/rq'
import { flatMap } from 'lodash'
import { useCallback } from 'react'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'

import {
  addSocialSurvey,
  changePhoneNumber,
  editUser,
  getAffiliateDetails
} from './api'
import { USER_MUTATION_KEYS } from './constants'
import { SocialSurveyPayload, SocialSurveyPayloadServer } from './types'

function transformSocialSurveyPayload(
  data: SocialSurveyPayload
): SocialSurveyPayloadServer {
  return {
    information_source: data.informationSource,
    referral_code: data.referralCode
  }
}

export function useEditUserMutation() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: editUser,
    onError: (error) => displayServerError(error),
    onSuccess: async () =>
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
  })
}

export function useChangePhoneNumber() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: changePhoneNumber,
    onError: (error) => {
      displayServerError(error)
    }
  })
}

export function useAddSocialSurvey() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (data: SocialSurveyPayload) =>
      addSocialSurvey(transformSocialSurveyPayload(data)),
    mutationKey: USER_MUTATION_KEYS.addSocialSurvey,
    onError: (error) => {
      displayServerError(error)
    },
    onSuccess: async () =>
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
  })
}

export function useAffiliateCommissionTransctions() {
  type Page = InfiniteData<{
    meta: {
      limit: number
      offset: number
      total: number
    }
    transactions: AffiliateTransaction[]
  }>
  const getData = async ({ pageParam = 0 }) => {
    const response = await getAffiliateDetails(pageParam)
    return {
      meta: response.meta as {
        limit: number
        offset: number
        total: number
      },
      transactions: response.data as AffiliateTransaction[]
    }
  }

  const getDataFromPages = useCallback((pages: Page) => {
    return flatMap(pages.pages, (d) => d.transactions)
  }, [])

  const { data: pureData, ...query } = useInfiniteQuery<{
    meta: {
      limit: number
      offset: number
      total: number
    }
    transactions: AffiliateTransaction[]
  }>({
    getNextPageParam: (lastPage: any, pages) => {
      if (pages.length) {
        const next = pages?.[pages.length - 1]
        if (next.transactions.length >= next.meta.limit) {
          return next.meta.offset + next.meta.limit
        } else {
          return undefined
        }
      }
    },
    queryFn: getData,
    queryKey: ['get-affilliate-commission-transactions']
  })

  return {
    data: pureData ? getDataFromPages(pureData) : [],
    ...query
  }
}

export function useAffiliateDetails() {
  const { data, ...query } = useQuery({
    queryFn: () => getAffiliateDetails(0),
    queryKey: ['get-affilliate-details']
  })

  return {
    details: data
      ? {
          details: data!.extra as AffiliateDetails,
          transactions: data.data as AffiliateTransaction[]
        }
      : {
          transactions: [] as AffiliateTransaction[]
        },
    ...query
  }
}
