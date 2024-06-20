import { format, formatDistance } from 'date-fns'

export function formatDateDistance(date: Date) {
  return formatDistance(date, new Date(), {
    addSuffix: true
  })
}

export function formatDate(date: Date) {
  return format(date, 'd MMM yyyy')
}
