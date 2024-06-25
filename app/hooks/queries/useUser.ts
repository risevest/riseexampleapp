import crashlytics from '@react-native-firebase/crashlytics'
import { getUserProfile } from 'app/api'
import { CountryCode } from 'app/domains/wallet'
import { setUserProperty } from 'app/internals/chat'
import { editUserAction } from 'app/redux/user/actionCreators'
import { setUserProperties } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import CustomerIO from 'app/utils/analytics/customer-io'
import { countriesData } from 'app/utils/countriesData'
import { transformQueryStatusToRiseStatus } from 'app/utils/utilFunctions'
import { differenceInYears } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function extractUser(user: RiseUser) {
  return {
    ...user,
    country: user?.country?.toUpperCase() as CountryCode | undefined,
    isGKUUser: (['gh', 'ug', 'ke'] as const).includes(
      user.country?.toLowerCase() as 'gh'
    ),
    isNGUser: user.country?.toLowerCase() === 'ng'
  }
}

export const usePopulateUser = () => {
  const dispatch = useDispatch()
  return (data: RiseUser) => {
    setUserProperty(data)
    // populate the redux store when the user object is fetched
    dispatch(editUserAction(data))
  }
}

export const USE_USER_CONFIG = {
  queryFn: getUserProfile,
  queryKey: ['get-user-profile']
}

const setUserProps = (user: RiseUser) => {
  const verification = []

  user?.bvnVerified && verification.push('bvn')
  user?.phone && verification.push('phone')
  user?.emailVerified && verification.push('email')

  const age = differenceInYears(new Date(), new Date(String(user?.dob ?? '')))

  const profileSettings = user?.account?.profileSettings

  const userCountry = countriesData.find(
    (country) =>
      country.countryCode?.toLowerCase() === user?.country?.toLowerCase()
  )

  setUserProperties({
    DOB: new Date(user?.dob)?.toString(),
    age,
    bvn_verified: user?.bvnVerified,
    country: String(userCountry?.countryNameEn),
    email_verified: user?.emailVerified,
    employment_status: String(profileSettings?.monthlyIncomeRange),
    gender: String(user?.gender),
    in_app_distribution: String(user?.informationSource),
    is_affiliate: Boolean(user?.account?.referral?.isAffiliate),
    is_referred: String(Boolean(user?.referralId)),
    job_sector: String(profileSettings?.jobSector),
    marital_status: String(profileSettings?.maritalStatus),
    monthly_income_range: String(profileSettings?.monthlyIncomeRange),
    referred_investors: user?.account?.referral?.invested,
    referred_signups: user?.account?.referral?.signups,
    signup_date: new Date(user?.dob)?.toString(),
    verification: verification
  })

  amplitude.setUserProperties({
    Email: user?.email,
    'Employment Status': String(profileSettings?.employmentStatus),
    Gender: user?.gender,
    'In-App Attribution Channel': user?.informationSource,
    'Is Referred': Boolean(user?.referralId),
    'Job Sector': String(profileSettings?.jobSector),
    'Marital Status': String(profileSettings?.maritalStatus),
    'Monthly Income Range': String(profileSettings?.monthlyIncomeRange),
    'Phone Number': user?.phone
  })
  crashlytics().setAttribute('email', String(user?.email))

  CustomerIO.setUserProperties({
    inapp_attribution_channel: user?.informationSource,
    is_referred: Boolean(String(user?.referralId))
  })

  CustomerIO.setUserProperties({
    cio_subscription_preferences: JSON.stringify({
      topics: {
        topic_1: !!user?.newsletterSubscribed,
        topic_2: true
      }
    })
  })
}

export const useUser = () => {
  const populate = usePopulateUser()

  const { status, data, ...query } = useQuery({
    select: extractUser,
    queryFn: getUserProfile,
    queryKey: ['get-user-profile']
  })

  useEffect(() => {
    if(data) {
      populate(data)
      setUserProps(data)
    }
  }, [data])

  const verifiedList: string[] = []

  if (data?.bvnVerified) {
    verifiedList.push('bvn')
  }
  if (data?.emailVerified) {
    verifiedList.push('email')
  }
  if (data?.verification?.proofOfIdStatus === 'approved') {
    verifiedList.push('id')
  }
  if (data?.phoneNumberVerified) {
    verifiedList.push('phone')
  }

  amplitude.setUserProperties({
    'Verification Type Done': verifiedList?.join(',')
  })
  CustomerIO.setUserProperties({
    phone_number: data?.phone,
    verification_type_done: verifiedList?.join(',')
  })

  return {
    pureStatus: status,
    status: transformQueryStatusToRiseStatus(status),
    user: data,
    ...query
  }
}
