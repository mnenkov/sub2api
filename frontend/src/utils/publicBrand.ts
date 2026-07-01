const PUBLIC_BRAND_NAME = 'Subtrix'
const LEGACY_PUBLIC_SITE_NAMES = new Set(['', 'AI Gateway', 'Sub2API', 'Sub2api'])

export function resolvePublicSiteName(siteName?: string | null): string {
  const trimmed = siteName?.trim() || ''
  return LEGACY_PUBLIC_SITE_NAMES.has(trimmed) ? PUBLIC_BRAND_NAME : trimmed
}

export { PUBLIC_BRAND_NAME }
