import type { BillingMode, PricingInterval } from '@/api/admin/channels'

export interface IntervalFormEntry {
  min_tokens: number
  max_tokens: number | null
  tier_label: string
  input_price: number | string | null
  output_price: number | string | null
  cache_write_price: number | string | null
  cache_read_price: number | string | null
  per_request_price: number | string | null
  sort_order: number
}

export interface PricingFormEntry {
  models: string[]
  billing_mode: BillingMode
  input_price: number | string | null
  output_price: number | string | null
  cache_write_price: number | string | null
  cache_read_price: number | string | null
  image_output_price: number | string | null
  per_request_price: number | string | null
  intervals: IntervalFormEntry[]
}

// English-only note removed during locale cleanup
const MTOK = 1_000_000

export function toNullableNumber(val: number | string | null | undefined): number | null {
  if (val === null || val === undefined || val === '') return null
  const num = Number(val)
  return isNaN(num) ? null : num
}

/* English-only note removed during locale cleanup */
export function mTokToPerToken(val: number | string | null | undefined): number | null {
  const num = toNullableNumber(val)
  return num === null ? null : parseFloat((num / MTOK).toPrecision(10))
}

/* English-only note removed during locale cleanup */
export function perTokenToMTok(val: number | null | undefined): number | null {
  if (val === null || val === undefined) return null
  // English-only note removed during locale cleanup
  return parseFloat((val * MTOK).toPrecision(10))
}

export function apiIntervalsToForm(intervals: PricingInterval[]): IntervalFormEntry[] {
  return (intervals || []).map(iv => ({
    min_tokens: iv.min_tokens,
    max_tokens: iv.max_tokens,
    tier_label: iv.tier_label || '',
    input_price: perTokenToMTok(iv.input_price),
    output_price: perTokenToMTok(iv.output_price),
    cache_write_price: perTokenToMTok(iv.cache_write_price),
    cache_read_price: perTokenToMTok(iv.cache_read_price),
    per_request_price: iv.per_request_price,
    sort_order: iv.sort_order
  }))
}

export function formIntervalsToAPI(intervals: IntervalFormEntry[]): PricingInterval[] {
  return (intervals || []).map(iv => ({
    min_tokens: iv.min_tokens,
    max_tokens: iv.max_tokens,
    tier_label: iv.tier_label,
    input_price: mTokToPerToken(iv.input_price),
    output_price: mTokToPerToken(iv.output_price),
    cache_write_price: mTokToPerToken(iv.cache_write_price),
    cache_read_price: mTokToPerToken(iv.cache_read_price),
    per_request_price: toNullableNumber(iv.per_request_price),
    sort_order: iv.sort_order
  }))
}

// English-only note removed during locale cleanup

interface ModelPattern {
  pattern: string
  prefix: string  // English-only note removed during locale cleanup
  wildcard: boolean
}

function toModelPattern(model: string): ModelPattern {
  const lower = model.toLowerCase()
  const wildcard = lower.endsWith('*')
  return {
    pattern: model,
    prefix: wildcard ? lower.slice(0, -1) : lower,
    wildcard,
  }
}

function patternsConflict(a: ModelPattern, b: ModelPattern): boolean {
  if (!a.wildcard && !b.wildcard) return a.prefix === b.prefix
  if (a.wildcard && !b.wildcard) return b.prefix.startsWith(a.prefix)
  if (!a.wildcard && b.wildcard) return a.prefix.startsWith(b.prefix)
  // English-only note removed during locale cleanup
  return a.prefix.startsWith(b.prefix) || b.prefix.startsWith(a.prefix)
}

/* English-only note removed during locale cleanup */
export function findModelConflict(models: string[]): [string, string] | null {
  const patterns = models.map(toModelPattern)
  for (let i = 0; i < patterns.length; i++) {
    for (let j = i + 1; j < patterns.length; j++) {
      if (patternsConflict(patterns[i], patterns[j])) {
        return [patterns[i].pattern, patterns[j].pattern]
      }
    }
  }
  return null
}

// English-only note removed during locale cleanup

/** Validate interval list and return an error message, or null when valid.
 *
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function validateIntervals(
  intervals: IntervalFormEntry[],
  mode: BillingMode = 'token',
): string | null {
  if (!intervals || intervals.length === 0) return null

  // English-only note removed during locale cleanup
  const sorted = [...intervals].sort((a, b) => a.min_tokens - b.min_tokens)

  for (let i = 0; i < sorted.length; i++) {
    const err = validateSingleInterval(sorted[i], i)
    if (err) return err
  }

  // English-only note removed during locale cleanup
  if (mode !== 'token') return null
  return checkIntervalOverlap(sorted)
}

function validateSingleInterval(iv: IntervalFormEntry, idx: number): string | null {
  if (iv.min_tokens < 0) {
    return `Interval #${idx + 1}: minimum token count (${iv.min_tokens}) cannot be negative`
  }
  if (iv.max_tokens != null) {
    if (iv.max_tokens <= 0) {
      return `Interval #${idx + 1}: maximum token count (${iv.max_tokens}) must be greater than 0`
    }
    if (iv.max_tokens <= iv.min_tokens) {
      return `Interval #${idx + 1}: maximum token count (${iv.max_tokens}) must be greater than minimum token count (${iv.min_tokens})`
    }
  }
  return validateIntervalPrices(iv, idx)
}

function validateIntervalPrices(iv: IntervalFormEntry, idx: number): string | null {
  const prices: [string, number | string | null][] = [
    ['Input price', iv.input_price],
    ['Output price', iv.output_price],
    ['Cache write price', iv.cache_write_price],
    ['Cache read price', iv.cache_read_price],
    ['Per-request price', iv.per_request_price],
  ]
  for (const [name, val] of prices) {
    if (val != null && val !== '' && Number(val) < 0) {
      return `Interval #${idx + 1}: ${name} cannot be negative`
    }
  }
  return null
}

function checkIntervalOverlap(sorted: IntervalFormEntry[]): string | null {
  for (let i = 0; i < sorted.length; i++) {
    // English-only note removed during locale cleanup
    if (sorted[i].max_tokens == null && i < sorted.length - 1) {
      return `Interval #${i + 1}: an unbounded interval (empty maximum token count) must be last`
    }
    if (i === 0) continue
    const prev = sorted[i - 1]
    // English-only note removed during locale cleanup
    if (prev.max_tokens == null || prev.max_tokens > sorted[i].min_tokens) {
      const prevMax = prev.max_tokens == null ? '∞' : String(prev.max_tokens)
      return `Intervals #${i} and #${i + 1} overlap: previous upper bound (${prevMax}) is greater than current lower bound (${sorted[i].min_tokens})`
    }
  }
  return null
}

/* English-only note removed during locale cleanup */
export function getPlatformTagClass(platform: string): string {
  switch (platform) {
    case 'anthropic': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    case 'openai': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    case 'gemini': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'antigravity': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case 'grok': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

/* English-only note removed during locale cleanup */
export function getPlatformTextClass(platform: string): string {
  switch (platform) {
    case 'anthropic': return 'text-orange-700 dark:text-orange-400'
    case 'openai': return 'text-emerald-700 dark:text-emerald-400'
    case 'gemini': return 'text-blue-700 dark:text-blue-400'
    case 'antigravity': return 'text-purple-700 dark:text-purple-400'
    case 'grok': return 'text-slate-700 dark:text-slate-300'
    default: return ''
  }
}
