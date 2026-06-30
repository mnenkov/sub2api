/**
 * English-only note removed during locale cleanup.
 */
export function formatCacheTokens(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M`
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`
  return tokens.toLocaleString()
}

/**
 * English-only note removed during locale cleanup.
 */
export function formatMultiplier(val: number): string {
  if (val >= 0.01) return val.toFixed(2)
  if (val >= 0.001) return val.toFixed(3)
  if (val >= 0.0001) return val.toFixed(4)
  return val.toPrecision(2)
}
