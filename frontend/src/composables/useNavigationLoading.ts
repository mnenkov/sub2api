/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
import { ref, readonly, computed } from 'vue'

/**
 * English-only note removed during locale cleanup.
 *
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
export function useNavigationLoading() {
  // English-only note removed during locale cleanup
  const _isLoading = ref(false)

  // English-only note removed during locale cleanup
  let navigationStartTime: number | null = null

  // English-only note removed during locale cleanup
  let showLoadingTimer: ReturnType<typeof setTimeout> | null = null

  // English-only note removed during locale cleanup
  const shouldShowLoading = ref(false)

  // English-only note removed during locale cleanup
  const ANTI_FLICKER_DELAY = 100

  /**
   * English-only note removed during locale cleanup.
   */
  const clearTimer = (): void => {
    if (showLoadingTimer !== null) {
      clearTimeout(showLoadingTimer)
      showLoadingTimer = null
    }
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const startNavigation = (): void => {
    navigationStartTime = Date.now()
    _isLoading.value = true

    // English-only note removed during locale cleanup
    clearTimer()
    showLoadingTimer = setTimeout(() => {
      if (_isLoading.value) {
        shouldShowLoading.value = true
      }
    }, ANTI_FLICKER_DELAY)
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const endNavigation = (): void => {
    clearTimer()
    _isLoading.value = false
    shouldShowLoading.value = false
    navigationStartTime = null
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const cancelNavigation = (): void => {
    clearTimer()
    // English-only note removed during locale cleanup
    // English-only note removed during locale cleanup
    navigationStartTime = null
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const resetState = (): void => {
    clearTimer()
    _isLoading.value = false
    shouldShowLoading.value = false
    navigationStartTime = null
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const getNavigationDuration = (): number | null => {
    if (navigationStartTime === null) {
      return null
    }
    return Date.now() - navigationStartTime
  }

  // English-only note removed during locale cleanup
  const isLoading = computed(() => shouldShowLoading.value)

  // English-only note removed during locale cleanup
  const isNavigating = readonly(_isLoading)

  return {
    isLoading,
    isNavigating,
    startNavigation,
    endNavigation,
    cancelNavigation,
    resetState,
    getNavigationDuration,
    // English-only note removed during locale cleanup
    ANTI_FLICKER_DELAY
  }
}

// English-only note removed during locale cleanup
let navigationLoadingInstance: ReturnType<typeof useNavigationLoading> | null = null

export function useNavigationLoadingState() {
  if (!navigationLoadingInstance) {
    navigationLoadingInstance = useNavigationLoading()
  }
  return navigationLoadingInstance
}

// English-only note removed during locale cleanup
export function _resetNavigationLoadingInstance(): void {
  if (navigationLoadingInstance) {
    navigationLoadingInstance.resetState()
  }
  navigationLoadingInstance = null
}
