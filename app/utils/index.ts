import { UseTheme, useTheme } from 'app/design/theme'
import { getHasSeenIntroScreen } from 'app/store/settings'
import {
  Alert,
  ImageRequireSource,
  NativeScrollEvent,
  Platform
} from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import { fetchItemFromStorage } from './asyncstorage'
import { formatPlanValue } from './numberformatter'

type IAccountAction = {
  bodyText: string
} & INavigationProps

export const accountActionAlert = ({
  navigation,
  bodyText
}: IAccountAction) => {
  return Alert.alert(
    'Account Action Required',
    bodyText,
    [
      {
        onPress: () => navigation?.navigate('IDStack'),
        style: 'cancel',
        text: 'Verify email now'
      },
      {
        style: 'destructive',
        text: 'Do it later'
      }
    ],
    { cancelable: true }
  )
}

export const planRestriction = (
  userPlans: IPlan[],
  isEmailVerified: boolean,
  navigation: any
): boolean => {
  let isUserRestricted: boolean = true

  if (!isEmailVerified) {
    if (userPlans?.length === 3) {
      accountActionAlert({
        bodyText:
          'You need to verify your email address before creating more plans',
        navigation
      })
    } else if (
      userPlans?.length === 2 &&
      !userPlans.find((plan) => plan.type === 'build-wealth')
    ) {
      accountActionAlert({
        bodyText:
          'You can only create a Build Wealth plan and any other two plans. Verify your email address to create more plans',
        navigation
      })
    } else {
      isUserRestricted = false
    }
  } else {
    isUserRestricted = false
  }

  return isUserRestricted
}

export const replaceTextContent = (
  str: string,
  substr: any,
  newSubstr: string,
  start: number,
  end: number
) => {
  const newString = str?.substring(start, end).replace(substr, newSubstr)
  return newString
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text) {
    const newString =
      text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

    return newString
  }

  return ''
}

export const strippedEmail = (email: string): string => {
  const regex = new RegExp(/[\S]/g)
  const emailFirstPart = email.split('@')[0]
  const emailSecondPart = email.split('@')[1]
  const emailDomain = emailSecondPart?.split('.')[0]
  const asteriskContent = replaceTextContent(
    emailFirstPart,
    regex,
    '*',
    1,
    emailFirstPart.length - 1
  )
  const hideEmailDomain = replaceTextContent(
    emailDomain,
    regex,
    '*',
    0,
    emailDomain?.length
  )

  const protectedEmail = `${email[0]}${asteriskContent}${
    emailFirstPart[emailFirstPart.length - 1]
  }@${hideEmailDomain}.${emailSecondPart?.split('.')[1]}`

  return protectedEmail
}

export const formatDateValue = (date: string) => {
  const newDate = date.replace(/\s/g, '-')

  return newDate
}

export const getInitialRouteName = async () => {
  let route = ''
  const hasSeenIntroScreen = getHasSeenIntroScreen()
  const hasBiometricsSetup = await fetchItemFromStorage('setupBiometrics')
  if (hasSeenIntroScreen) {
    if (hasBiometricsSetup) {
      route = 'Pin'
    } else {
      route = 'Intro'
    }
  } else {
    route = 'Intro'
  }
  return route
}

export const convertStringToSentenceCase = (input: string) => {
  if (typeof input === 'string') {
    const lowercaseStr = input.toLowerCase()
    const splitString = lowercaseStr.split(' ')

    for (let i = 0; i < splitString.length; i += 1) {
      splitString[i] =
        splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1)

      return splitString.join(' ')
    }
  } else {
    return
  }
}

export const PROFILE_TYPES = {
  aggressive: 'fire',
  conservative: 'evergreen_tree',
  flexible: 'star2'
} as any

export const sortBanks = (bankSort: IBank[]) => {
  const sortedArray = bankSort.slice().sort((a, b) => {
    const bankA = a.name.toLowerCase()
    const bankB = b.name.toLowerCase()

    if (bankA < bankB) {
      return -1
    }

    if (bankA > bankB) {
      return 1
    }

    return 0
  })
  return sortedArray
}

export const getSecondsLapsed = (startDate: Date, endDate: Date) => {
  const dif = startDate.getTime() - endDate.getTime()
  const secondsDiff = dif / 1000
  return Math.abs(secondsDiff)
}

export const useGetStatusStyles = (status: string) => {
  const { theme } = useTheme() as UseTheme

  let statusStyles = {
    arithmeticSign: '',
    iconBGColor: '',
    iconColor: '',
    iconName: ''
  }

  switch (status) {
    case 'top up':
    case 'bonus':
    case 'credit':
    case 'credit_wallet_user':
    case 'payout':
    case 'commission':
    case 'withdrawal-processed':
    case 'wallet-to-wallet-recipient':
    case 'wallet-top-up':
    case 'new-exchange-rate':
    case 'wallet-interest':
    case 'new-real-estate-return':
    case 'authorization':
      statusStyles = {
        arithmeticSign: '+',
        iconBGColor: theme.green20,
        iconColor: theme.success,
        iconName: 'add'
      }
      break
    case 'withdrawal':
    case 'debit_wallet_user':
    case 'fund':
    case 'recurring-plan-funded':
    case 'withdrawal-request':
    case 'wallet-to-wallet-sender':
    case 'plan-funded':
      statusStyles = {
        arithmeticSign: '-',
        iconBGColor: theme.red10,
        iconColor: theme.error,
        iconName: 'remove'
      }
      break
    case 'pending':
    case 'pending approval':
      statusStyles = {
        arithmeticSign: '',
        iconBGColor: theme.orange200,
        iconColor: theme.warning,
        iconName: 'pause'
      }
      break
    case 'successful':
      statusStyles = {
        arithmeticSign: '',
        iconBGColor: theme.green20,
        iconColor: theme.success,
        iconName: 'checkmark'
      }
      break
    case 'failed':
      statusStyles = {
        arithmeticSign: '',
        iconBGColor: theme.red10,
        iconColor: theme.error,
        iconName: 'close'
      }
      break
    case 'canceled':
      statusStyles = {
        arithmeticSign: '-',
        iconBGColor: theme.red10,
        iconColor: theme.error,
        iconName: 'remove'
      }
      break
    case 'new-gift-recipient':
    case 'gift-plan-declined':
      statusStyles = {
        arithmeticSign: '+',
        iconBGColor: theme.maroon10,
        iconColor: theme.maroon,
        iconName: 'add'
      }
      break
    case 'new-gift-sender':
    case 'gift-plan-accepted':
      statusStyles = {
        arithmeticSign: '-',
        iconBGColor: theme.maroon10,
        iconColor: theme.maroon,
        iconName: 'remove'
      }
      break
  }
  return statusStyles
}

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize
}: NativeScrollEvent) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
}

export const allowedTime = [
  {
    label: '00:00',
    value: '00:00'
  },
  {
    label: '01:00',
    value: '01:00'
  },
  {
    label: '02:00',
    value: '02:00'
  },
  {
    label: '03:00',
    value: '03:00'
  },
  {
    label: '04:00',
    value: '04:00'
  },
  {
    label: '05:00',
    value: '05:00'
  },
  {
    label: '06:00',
    value: '06:00'
  },
  {
    label: '07:00',
    value: '07:00'
  },
  {
    label: '08:00',
    value: '08:00'
  },
  {
    label: '09:00',
    value: '09:00'
  },
  {
    label: '10:00',
    value: '10:00'
  },
  {
    label: '11:00',
    value: '11:00'
  },
  {
    label: '12:00',
    value: '12:00'
  },
  {
    label: '13:00',
    value: '13:00'
  },
  {
    label: '14:00',
    value: '14:00'
  },
  {
    label: '15:00',
    value: '15:00'
  },
  {
    label: '16:00',
    value: '16:00'
  },
  {
    label: '17:00',
    value: '17:00'
  },
  {
    label: '18:00',
    value: '18:00'
  },
  {
    label: '19:00',
    value: '19:00'
  },
  {
    label: '20:00',
    value: '20:00'
  },
  {
    label: '21:00',
    value: '21:00'
  },
  {
    label: '22:00',
    value: '22:00'
  },
  {
    label: '23:00',
    value: '23:00'
  }
]

export const daysAllowed = [
  {
    label: 'Monday',
    value: 'Monday'
  },
  {
    label: 'Tuesday',
    value: 'Tuesday'
  },
  {
    label: 'Wednesday',
    value: 'Wednesday'
  },
  {
    label: 'Thursday',
    value: 'Thursday'
  },
  {
    label: 'Friday',
    value: 'Friday'
  },
  {
    label: 'Saturday',
    value: 'Saturday'
  },
  {
    label: 'Sunday',
    value: 'Sunday'
  }
]

export const itemsToVerify = [
  {
    isVerified: false,
    name: 'Email Verification',
    type: 'email'
  },
  {
    isVerified: false,
    name: 'ID Document',
    type: 'id'
  }
]

export const getDaySuffix = (dOfMonth: number): string => {
  let suffix: string
  switch (dOfMonth) {
    case 1:
    case 21:
    case 31:
      suffix = 'st'
      break
    case 2:
    case 22:
      suffix = 'nd'
      break
    case 3:
    case 23:
      suffix = 'rd'
      break
    default:
      suffix = 'th'
      break
  }
  return suffix
}

export const defaultPlanImages: Record<string, ImageRequireSource> = {
  'business plan': require('app/assets/future/images/stocks.jpg'),
  'fixed income plan': require('app/assets/future/images/fixed-income.jpg'),
  'real estate plan': require('app/assets/future/images/real-estate.jpg'),
  'school plan': require('app/assets/future/images/school.jpg'),
  'stocks plan': require('app/assets/future/images/stocks.jpg'),
  'wedding plan': require('app/assets/future/images/wedding.jpg')
} as any

export const plansReturnsNotice = {
  'fixed income plan': 'Returns are updated daily',
  'real estate plan': 'Returns are updated monthly',
  'stocks plan': 'Returns are updated every weekday'
}

export const partitionArray = (
  arr: any[],
  start: number,
  end: number,
  partionBy: number
) => {
  const partitionedArray = []
  if (arr?.length) {
    for (let i = 0; i < arr.length; i++) {
      const copyArr = arr.slice(start, end)
      if (copyArr.length === 0) {
        // do nothing. We don't want to add empty arrays to the partition
      } else {
        partitionedArray.push(copyArr)
      }
      start += partionBy
      end += partionBy
    }
  }

  return partitionedArray
}

export const pageMap = {
  Feed: {
    paramName: 'feedId',
    stack: 'NewsDetails'
  },
  GiftPlan: {
    paramName: 'planId',
    screen: 'AcceptDecline',
    stack: 'AcceptDeclineStack'
  },
  Transaction: {
    paramName: 'transactionId',
    screen: 'TransactionDetails',
    stack: 'TransactionsStack'
  },
  UserPlan: {
    paramName: 'planId',
    screen: 'PlanDetails',
    stack: 'PlanDetails'
  },
  Wallet: {
    screen: 'WalletScreen',
    stack: 'FutureWalletStack'
  },
  verifications: {
    screen: 'IDVerification',
    stack: 'IDStack'
  }
} as any

export type IPlanTag = {
  closed: {
    tag: string
    tagBackground: string
    tagColor: string
  }
  'fixed income plan': {
    tag: string
    tagBackground: string
    tagColor: string
  }
  mixed: {
    tag: string
    tagBackground: string
    tagColor: string
  }
  'real estate plan': {
    tag: string
    tagBackground: string
    tagColor: string
  }
  'stocks plan': {
    tag: string
    tagBackground: string
    tagColor: string
  }
}

interface PlanTag {
  tag: string
  tagBackground: string
  tagColor: string
}

export const planTag: Record<string, PlanTag> = {
  closed: {
    tag: 'Closed',
    tagBackground: 'rgba(131,143,145,1)',
    tagColor: '#fff'
  },
  'fixed income plan': {
    tag: 'Fixed Income',
    tagBackground: 'rgba(188, 16, 88, 0.1)',
    tagColor: '#BC1058'
  },
  mixed: {
    tag: 'Mixed',
    tagBackground: 'rgba(1, 34, 36, 0.1)',
    tagColor: '#012224'
  },
  'real estate plan': {
    tag: 'Real Estate',
    tagBackground: '#E6F5F6',
    tagColor: '#0898A0'
  },
  'stocks plan': {
    tag: 'Stocks',
    tagBackground: 'rgba(134, 109, 197, 0.1)',
    tagColor: '#866DC5'
  }
}

export const renderBalance = (
  isVisible: boolean,
  balance: string | undefined
): string => {
  const balanceShown = isVisible ? `${formatPlanValue(balance)}` : '**********'

  return balanceShown
}

export const infoObject = {
  Business: 'A short to mid-term investment plan to start your dream business.',
  School:
    'Financially preparing for school can be challenging but having an investment plan helps. This goal helps you fund your tuition and cover school expenses. '
}

export const hapticFeedback = () => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true
  }

  Platform.OS === 'ios' &&
    ReactNativeHapticFeedback.trigger('impactMedium', options)
}

export const monthTrees = {
  0: 'JAN',
  1: 'FEB',
  10: 'NOV',
  11: 'DEC',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEP',
  9: 'OCT'
} as any

export const generateMonths = (
  startMonth: number,
  amount: number
): {
  amount: number
  month: string
  monthIndex: number
}[] => {
  let months: { amount: number; month: string; monthIndex: number }[] = []

  for (let i = 0; i < 12; i++) {
    if (startMonth > 11) {
      startMonth = startMonth - 12
      months.push({
        amount,
        month: monthTrees[startMonth],
        monthIndex: startMonth + 12
      })
    } else {
      months.push({
        amount,
        month: monthTrees[startMonth],
        monthIndex: startMonth
      })
    }
    startMonth++
    amount = amount + 10
  }
  return months
}

type PercentageProps = {
  percentageValue: number | string
  toBeCalculated: 'percentage' | 'percentageValue'
  wholeValue: number | string
}

export const calculatePercentage = ({
  wholeValue,
  percentageValue,
  toBeCalculated
}: PercentageProps): string => {
  let percentage = ''

  if (toBeCalculated === 'percentage') {
    percentage = Number(
      (Number(percentageValue) * 100) / Number(wholeValue)
    ).toFixed(2)
  } else if (toBeCalculated === 'percentageValue') {
    percentage = Number(
      (Number(percentageValue) / 100) * Number(wholeValue)
    ).toFixed(2)
  }

  return percentage
}

type UpdateProps = {
  amount: number
  balance: number
  updateType: 'debit-plan' | 'credit-plan'
}

export const updateBalance = ({
  updateType,
  balance,
  amount
}: UpdateProps): number => {
  let newCurrentBalance: number
  if (updateType === 'debit-plan') {
    newCurrentBalance = Number(balance) - Number(amount)
  } else {
    newCurrentBalance = Number(balance) + Number(amount)
  }

  return newCurrentBalance
}

export const VERIFICATION_DOCS: { [key: string]: string } = {
  driver_license: "Driver's License",
  national_id: 'NIN Slip',
  passport: 'International Passport',
  voter: "Voter's Card"
}

export function sortArray<Type>(unsortedArray: Type[], sortKey: keyof Type) {
  const sortedArray = unsortedArray.slice().sort((a, b) => {
    const itemA = a[sortKey]
    const itemB = b[sortKey]

    if (itemA < itemB) {
      return -1
    }

    if (itemA > itemB) {
      return 1
    }

    return 0
  })

  return sortedArray
}

type StackedImagesProps = {
  itemWidth: number
  numOfItems?: number
  percToHide: number
}

export const calculateStackedImagesWidth = ({
  numOfItems = 0,
  percToHide,
  itemWidth
}: StackedImagesProps) => {
  // The formula generated for this is ->>> (n-(n-1)* a) * x
  // Where x is the width of each individual item
  // a is the percentage of the item's width we want to hide
  // n is the number of items
  return (numOfItems - (numOfItems - 1) * percToHide) * itemWidth
}
