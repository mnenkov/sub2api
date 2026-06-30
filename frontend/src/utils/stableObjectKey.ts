let globalStableObjectKeySeed = 0

/**
 * English-only note removed during locale cleanup.
 */
export function createStableObjectKeyResolver<T extends object>(prefix = 'item') {
  const keyMap = new WeakMap<T, string>()

  return (item: T): string => {
    const cached = keyMap.get(item)
    if (cached) {
      return cached
    }

    const key = `${prefix}-${++globalStableObjectKeySeed}`
    keyMap.set(item, key)
    return key
  }
}
