import { Platform } from 'react-native'

export default {
  // Dollars
  AFFILIATE_BONUS: 3,
  ALPHABET_REGEX: /^[\w,\-,']+$/,
  // minutes
  ANIMATION_DAMPING: 10,
  ANIMATION_MAX_DELAY_DURATION: 200,
  APP_VERSION: require('../../package.json').version,
  BACKGROUND_GRACE_PERIOD: 3,
  BLACKLISTED_COUNTRIES: ['NG'],
  // percentage
  BVN_REQUEST_CODE: '*565*0#',
  // Dollars
  DOLLAR_CARD_LIMIT: 2500,
  ERROR_RETRY_COUNT: 3,
  IS_E2E: true,
  IS_TEST_MODE: __DEV__,
  MAX_PLAN_NAME_LENGTH: 15,
  // Dollars
  MAX_VALUE_FOR_CRYPTO_FUNDING: 1000,
  MIN_VALUE_FOR_CRYPTO_FUNDING: 20,
  OFAC_BLACKLISTED_COUNTRIES: [
    'BY',
    'CF',
    'CG',
    'CU',
    'IR',
    'IQ',
    'LB',
    'LY',
    'RU'
  ],
  SHADOW_COLOR_RATIO: Platform.OS === 'android' ? 0.5 : 1,
  SHADOW_ELEVATION_TO_RADIUS_RATIO: 0.8,
  SMILE_ID_JOB_TYPES: {
    BIOMETRIC_KYC: 1,
    DOCUMENT_VERIFICATION: 6,
    ENHANCED_KYC: 5
  },
  STOCKS_DOWNTIME: {
    END_HOUR: 22,
    END_MINUTES: 30,
    START_HOUR: 18
  }
}
