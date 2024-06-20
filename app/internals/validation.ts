import { formatPhoneNumber } from 'app/internals/strings'
import { isValidPhoneNumber } from 'libphonenumber-js'
import * as yup from 'yup'

export const phoneNumberSchema = yup
  .object({
    phone: yup
      .string()
      .required('Phone number is required')
      .test(
        'verify-phone-number',
        'Phone number is invalid',
        function (value: string | undefined): boolean {
          if (!value) {
            return false
          }
          // @ts-expect-error ts can't access this
          const countryCode = this.parent.countryCode ?? ''

          const formattedValue = formatPhoneNumber(value, countryCode)
          if (!formattedValue) {
            return false
          }
          return isValidPhoneNumber(formattedValue, countryCode)
        }
      )
  })
  .required()

export const bvnSchema = yup.object({
  bvn: yup
    .string()
    .length(11, 'Invalid BVN entered')
    .required('BVN is required')
})
