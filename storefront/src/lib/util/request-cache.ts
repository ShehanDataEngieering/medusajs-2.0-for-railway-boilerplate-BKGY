/**
 * Request deduplication utility
 * Prevents duplicate API requests from being made simultaneously
 */

type CacheEntry<T> = {
  promise: Promise<T>
  timestamp: number
}

const requestCache = new Map<string, CacheEntry<any>>()
const CACHE_TTL = 5000 // 5 seconds

/**
 * Deduplicates requests by caching promises
 * If the same request is made within TTL, returns the cached promise
 */
export function dedupeRequest<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const now = Date.now()
  const cached = requestCache.get(key)

  // Return cached promise if it exists and is not expired
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.promise
  }

  // Create new promise and cache it
  const promise = fetcher().finally(() => {
    // Clean up cache after request completes
    setTimeout(() => {
      requestCache.delete(key)
    }, CACHE_TTL)
  })

  requestCache.set(key, { promise, timestamp: now })
  return promise
}

/**
 * Clear all cached requests
 */
export function clearRequestCache() {
  requestCache.clear()
}

/**
 * Generate cache key from parameters
 */
export function generateCacheKey(
  endpoint: string,
  params?: Record<string, any>
): string {
  if (!params) return endpoint
  
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${JSON.stringify(params[key])}`)
    .join('&')
  
  return `${endpoint}?${sortedParams}`
}
