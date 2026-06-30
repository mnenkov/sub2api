/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */

import { i18n, getLocale } from '@/i18n'

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return i18n.global.t('common.time.never')

  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()

  // English-only note removed during locale cleanup
  if (diffMs < 0 || isNaN(diffMs)) return i18n.global.t('common.time.never')

  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) return i18n.global.t('common.time.daysAgo', { n: diffDays })
  if (diffHours > 0) return i18n.global.t('common.time.hoursAgo', { n: diffHours })
  if (diffMins > 0) return i18n.global.t('common.time.minutesAgo', { n: diffMins })
  return i18n.global.t('common.time.justNow')
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0'

  const locale = getLocale()
  const absNum = Math.abs(num)

  // Use Intl.NumberFormat for compact notation if supported and needed
  // English-only note removed during locale cleanup
  const formatter = new Intl.NumberFormat(locale, {
    notation: absNum >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  })

  return formatter.format(num)
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatCurrency(amount: number | null | undefined, currency: string = 'USD'): string {
  if (amount === null || amount === undefined) return '$0.00'

  const locale = getLocale()

  // For very small amounts, show more decimals
  const fractionDigits = amount > 0 && amount < 0.01 ? 6 : 2

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount)
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * @param options Intl.DateTimeFormatOptions
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatDate(
  date: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  },
  localeOverride?: string
): string {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const locale = localeOverride ?? getLocale()
  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatDateOnly(date: string | Date | null | undefined): string {
  return formatDate(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * @param options Intl.DateTimeFormatOptions
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatDateTime(
  date: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  localeOverride?: string
): string {
  return formatDate(date, options, localeOverride)
}

/**
 * English-only note removed during locale cleanup.
 */
export function formatDateTimeLocalInput(timestampSeconds: number | null): string {
  if (!timestampSeconds) return ''
  const date = new Date(timestampSeconds * 1000)
  if (isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

/**
 * English-only note removed during locale cleanup.
 */
export function parseDateTimeLocalInput(value: string): number | null {
  if (!value) return null
  const date = new Date(value)
  if (isNaN(date.getTime())) return null
  return Math.floor(date.getTime() / 1000)
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatReasoningEffort(effort: string | null | undefined): string {
  const raw = (effort ?? '').toString().trim()
  if (!raw) return '-'

  const normalized = raw.toLowerCase().replace(/[-_\s]/g, '')
  switch (normalized) {
    case 'low':
      return 'Low'
    case 'medium':
      return 'Medium'
    case 'high':
      return 'High'
    case 'xhigh':
    case 'extrahigh':
      return 'XHigh'
    case 'max':
      return 'Max'
    case 'none':
    case 'minimal':
      return '-'
    default:
      // best-effort: Title-case first letter
      return raw.length > 1 ? raw[0].toUpperCase() + raw.slice(1) : raw.toUpperCase()
  }
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatTime(date: string | Date | null | undefined): string {
  return formatDate(date, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatNumberLocaleString(num: number): string {
  return num.toLocaleString()
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatCostFixed(amount: number, fractionDigits: number = 4): string {
  return amount.toFixed(fractionDigits)
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatTokensK(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`
  return tokens.toString()
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatCompactNumber(
  num: number | null | undefined,
  options?: { allowBillions?: boolean }
): string {
  if (num === null || num === undefined) return '0'

  const abs = Math.abs(num)
  const allowBillions = options?.allowBillions !== false

  if (allowBillions && abs >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
  if (abs >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatCountdown(targetDate: string | Date | null | undefined): string | null {
  if (!targetDate) return null

  const now = new Date()
  const target = new Date(targetDate)
  const diffMs = target.getTime() - now.getTime()

  // English-only note removed during locale cleanup
  if (diffMs <= 0 || isNaN(diffMs)) return null

  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  const remainingHours = diffHours % 24
  const remainingMins = diffMins % 60

  if (diffDays > 0) {
    // English-only note removed during locale cleanup
    return i18n.global.t('common.time.countdown.daysHours', { d: diffDays, h: remainingHours })
  }
  if (diffHours > 0) {
    // English-only note removed during locale cleanup
    return i18n.global.t('common.time.countdown.hoursMinutes', { h: diffHours, m: remainingMins })
  }
  // English-only note removed during locale cleanup
  return i18n.global.t('common.time.countdown.minutes', { m: diffMins })
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatCountdownWithSuffix(targetDate: string | Date | null | undefined): string | null {
  const countdown = formatCountdown(targetDate)
  if (!countdown) return null
  return i18n.global.t('common.time.countdown.withSuffix', { time: countdown })
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function formatRelativeWithDateTime(date: string | Date | null | undefined): string {
  if (!date) return ''

  const relativeTime = formatRelativeTime(date)
  const dateTime = formatDateTime(date)

  // English-only note removed during locale cleanup
  if (!dateTime || relativeTime === i18n.global.t('common.time.never')) {
    return relativeTime
  }

  return `${relativeTime} · ${dateTime}`
}
