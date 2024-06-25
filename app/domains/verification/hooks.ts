import { USE_USER_CONFIG, useDisplayMessage } from 'app/hooks'
import { generateID } from 'app/internals/strings'
import { queryClient } from 'app/rq'
import { convertKeysToCamelCase } from 'app/utils/utilFunctions'
import { AxiosError } from 'axios'
import { groupBy } from 'lodash'
import mime from 'mime'
import { Platform } from 'react-native'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createIdentity,
  createIdentityManually,
  generateOTP,
  getIdentityTypes,
  getRecentlySubmittedIdentity,
  intitateVerification,
  resetIdentity,
  reverifyIdentityCheck,
  verifyEmailOTP,
  verifyPhoneNumber,
  verifyPhoneNumberOTP,
  verifyUser
} from './api'
import { VERIFICATION_QUERY_KEYS } from './constants'
import {
  BaseAsset,
  IdentityCode,
  IdentityType,
  IdentityTypeServer,
  NewIdentity,
  NewManualIdentity,
  OTPVerificationPayload,
  ReverifyIdentity,
  ReverifyIdentityServer
} from './types'

function extractIdentityTypes(
  identities: IdentityTypeServer[]
): IdentityType[] {
  return identities.map((identity) => {
    return {
      code: identity.code,
      country: identity.country_name,
      countryCode: identity.country,
      isIdentityCard: identity.is_identity_card,
      name: identity.name,
      provider: identity.provider,
      smileidIdType: identity.smileid_id_type,
      smileidJobId: identity.smileid_job_id
    }
  })
}

function extractReVerifyBVN(data: ReverifyIdentityServer): ReverifyIdentity {
  return {
    shouldReverify: data?.should_reverify
  }
}

export function getFilePath(path: string): string {
  const newImageUri = 'file:///' + path.split('file:/').join('')
  return Platform.OS === 'android' ? newImageUri : path.replace('file://', '')
}

export function createFileForm(uri: string): BaseAsset {
  const newImageUri = getFilePath(uri)
  return {
    name: generateID(),
    type: mime.getType(newImageUri),
    uri: newImageUri
  }
}

export function useCreateIdentityMutation(identityType: IdentityCode) {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: NewIdentity) =>
      createIdentity({
        country: payload.country,
        id_image: !!payload?.idImage
          ? createFileForm(payload?.idImage.uri!)
          : undefined,
        identifier: payload.identifier,
        identity_type: identityType,
        selfie: createFileForm(payload.selfie.uri!)
      }),
    mutationKey: ['create-identity', identityType],
    onError: (error: AxiosError) => {
      if (identityType === 'bvn') {
        displayServerError(error, 'BVN Verification Failed')
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
    }
  })
}

export function useVerifyIdManuallyMutation(identityType: IdentityCode) {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: (payload: NewManualIdentity) =>
      createIdentityManually({
        country: payload?.country,
        id_image: !!payload?.idImage
          ? createFileForm(payload?.idImage.uri!)
          : undefined,
        identifier: payload?.identifier,
        identity_type: payload?.identityType
      }),
    mutationKey: ['create-identity', identityType],
    onError: (error: AxiosError) => {
      if (identityType === 'bvn') {
        displayServerError(error, 'BVN Verification Failed')
      } else if (error?.response?.status === 422) {
        displayServerError(error, 'Cannot manually verify ID')
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
    }
  })
}

export function useCreateBVNIdentity() {
  return useCreateIdentityMutation('bvn')
}

export function useGetIdentityTypes() {
  const { data, ...query } = useQuery('identity-types', getIdentityTypes)

  const identityTypes = extractIdentityTypes(data || [])
  const identityTypesByCountry = groupBy(identityTypes, 'countryCode')
  const identityTypesByCountryMap = Object.keys(identityTypesByCountry).map(
    (k) => {
      const [sample] = identityTypesByCountry[k]
      return {
        country: sample?.country,
        countryCode: sample?.countryCode
      }
    }
  )

  return {
    ...query,
    identityTypes,
    identityTypesByCountry,
    identityTypesByCountryMap
  }
}

export function useVerifyEmailMutation() {
  const { displayServerError, displaySuccess } = useDisplayMessage()

  return useMutation(
    (payload: OTPVerificationPayload) => {
      return generateOTP(payload.email, payload.phone)
    },
    {
      mutationKey: ['verify-email'],
      onError: (error) => {
        displayServerError(error, 'Verify Error')
      },
      onSuccess: async () => {
        displaySuccess('Verify Email', 'Verification code sent to your email')
      }
    }
  )
}

export function usePhoneNumberVerificationOTP() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: verifyPhoneNumberOTP,
    onError: (error) => {
      displayServerError(error)
    }
  })
}

export function usePhoneNumberVerification() {
  const { displayServerError } = useDisplayMessage()
  return useMutation({
    mutationFn: verifyPhoneNumber,
    onError: (error) => displayServerError(error),
    onSuccess: async () => {
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
    }
  })
}

export function useReverifyIdentityCheck(identityType: string) {
  const { data, ...query } = useQuery({
    queryFn: () => reverifyIdentityCheck(identityType),
    queryKey: VERIFICATION_QUERY_KEYS.reverifyIdentity,
    select: extractReVerifyBVN
  })

  return {
    data,
    ...query
  }
}

export function useResetIdentity() {
  return useMutation({
    mutationFn: (identityType: string) => resetIdentity(identityType),
    mutationKey: VERIFICATION_QUERY_KEYS.resetIdentity,
    onSuccess: async () => {
      await queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
    }
  })
}

export function useVerifyEmailOTPMutation() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: verifyEmailOTP,
    onError: (error) => displayServerError(error),
    onSuccess: () => queryClient.invalidateQueries(USE_USER_CONFIG.queryKey)
  })
}

export function useVerifyUserMutation() {
  const { displayServerError } = useDisplayMessage()

  return useMutation({
    mutationFn: verifyUser,
    onError: (error) => displayServerError(error)
  })
}

export function useInitiateVerification({
  identifier,
  identityType
}: {
  identifier: string
  identityType: IdentityType
}) {
  const { displayServerError } = useDisplayMessage()
  return useQuery({
    onError: (error) => displayServerError(error),
    queryFn: () =>
      intitateVerification({
        identifier,
        identityType
      }),

    queryKey: ['initiate-verification', identityType.name, identifier]
  })
}

export function useRecentlySubmittedIdentity(
  category: 'phone-number' | 'id-card'
) {
  const { data: recentIdentityServer, ...query } = useQuery(
    'recent-identity',
    () => getRecentlySubmittedIdentity(category),
    {
      refetchOnMount: true,
      retry(failureCount, error) {
        if (
          (error as AxiosError)?.response?.status === 404 ||
          failureCount > 2
        ) {
          return false
        }
        return true
      }
    }
  )

  return {
    ...query,
    recentIdentity: !!recentIdentityServer
      ? convertKeysToCamelCase(recentIdentityServer)
      : null
  }
}
