/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 *
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
import { ref, readonly } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router'

/**
 * English-only note removed during locale cleanup.
 */
type ComponentImportFn = () => Promise<unknown>

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
const PREFETCH_ADJACENCY: Record<string, string[]> = {
  // English-only note removed during locale cleanup
  '/admin/dashboard': ['/admin/accounts', '/admin/users'],
  '/admin/accounts': ['/admin/dashboard', '/admin/users'],
  '/admin/users': ['/admin/groups', '/admin/dashboard'],
  '/admin/groups': ['/admin/subscriptions', '/admin/users'],
  '/admin/subscriptions': ['/admin/groups', '/admin/redeem'],
  // User routes
  '/dashboard': ['/keys', '/usage'],
  '/keys': ['/dashboard', '/usage'],
  '/usage': ['/keys', '/redeem'],
  '/redeem': ['/usage', '/profile'],
  '/profile': ['/dashboard', '/keys']
}

/**
 * English-only note removed during locale cleanup.
 */
type IdleCallbackHandle = number | ReturnType<typeof setTimeout>

/**
 * requestIdleCallback polyfill (Safari < 15)
 */
const scheduleIdleCallback = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): IdleCallbackHandle => {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(callback, options)
  }
  return setTimeout(() => {
    callback({ didTimeout: false, timeRemaining: () => 50 })
  }, 1000)
}

const cancelScheduledCallback = (handle: IdleCallbackHandle): void => {
  if (typeof window.cancelIdleCallback === 'function' && typeof handle === 'number') {
    window.cancelIdleCallback(handle)
  } else {
    clearTimeout(handle)
  }
}

/**
 * English-only note removed during locale cleanup.
 *
 * English-only note removed during locale cleanup.
 */
export function useRoutePrefetch(router?: Router) {
  // English-only note removed during locale cleanup
  const pendingPrefetchHandle = ref<IdleCallbackHandle | null>(null)

  // English-only note removed during locale cleanup
  const prefetchedRoutes = ref<Set<string>>(new Set())

  /**
   * English-only note removed during locale cleanup.
   */
  const getComponentImporter = (path: string): ComponentImportFn | null => {
    if (!router) return null

    const routes = router.getRoutes()
    const route = routes.find((r) => r.path === path)

    if (route && route.components?.default) {
      const component = route.components.default
      // English-only note removed during locale cleanup
      if (typeof component === 'function') {
        return component as ComponentImportFn
      }
    }
    return null
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const getPrefetchPaths = (route: RouteLocationNormalized): string[] => {
    return PREFETCH_ADJACENCY[route.path] || []
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const prefetchComponent = async (importFn: ComponentImportFn): Promise<void> => {
    try {
      await importFn()
    } catch (error) {
      // English-only note removed during locale cleanup
      if (import.meta.env.DEV) {
        console.debug('[Prefetch] Failed to prefetch component:', error)
      }
    }
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const cancelPendingPrefetch = (): void => {
    if (pendingPrefetchHandle.value !== null) {
      cancelScheduledCallback(pendingPrefetchHandle.value)
      pendingPrefetchHandle.value = null
    }
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const triggerPrefetch = (route: RouteLocationNormalized): void => {
    cancelPendingPrefetch()

    const prefetchPaths = getPrefetchPaths(route)
    if (prefetchPaths.length === 0) return

    pendingPrefetchHandle.value = scheduleIdleCallback(
      () => {
        pendingPrefetchHandle.value = null

        const routePath = route.path
        if (prefetchedRoutes.value.has(routePath)) return

        // English-only note removed during locale cleanup
        const importFns: ComponentImportFn[] = []
        for (const path of prefetchPaths) {
          const importFn = getComponentImporter(path)
          if (importFn) {
            importFns.push(importFn)
          }
        }

        if (importFns.length > 0) {
          Promise.all(importFns.map(prefetchComponent)).then(() => {
            prefetchedRoutes.value.add(routePath)
          })
        }
      },
      { timeout: 2000 }
    )
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const resetPrefetchState = (): void => {
    cancelPendingPrefetch()
    prefetchedRoutes.value.clear()
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const isAdminRoute = (path: string): boolean => {
    return path.startsWith('/admin')
  }

  /**
   * English-only note removed during locale cleanup.
   */
  const getPrefetchConfig = (route: RouteLocationNormalized): ComponentImportFn[] => {
    const paths = getPrefetchPaths(route)
    const importFns: ComponentImportFn[] = []
    for (const path of paths) {
      const importFn = getComponentImporter(path)
      if (importFn) importFns.push(importFn)
    }
    return importFns
  }

  return {
    prefetchedRoutes: readonly(prefetchedRoutes),
    triggerPrefetch,
    cancelPendingPrefetch,
    resetPrefetchState,
    _getPrefetchConfig: getPrefetchConfig,
    _isAdminRoute: isAdminRoute
  }
}

// English-only note removed during locale cleanup
export const _adminPrefetchMap = PREFETCH_ADJACENCY
export const _userPrefetchMap = PREFETCH_ADJACENCY
