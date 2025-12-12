import type { Theme, DeepPartial } from '@/types'

/**
 * Simple hash function for objects (djb2)
 */
const hashObject = (obj: unknown): string => {
    const str = JSON.stringify(obj)
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
    }
    return (hash >>> 0).toString(36)
}

/**
 * Memoization cache for createTheme
 */
const themeCache = new Map<string, Theme>()

/**
 * Maximum number of themes to cache before eviction
 */
export const MAX_THEME_CACHE_SIZE = 50

/**
 * Clear the theme cache (useful for testing)
 */
export const clearThemeCache = (): void => {
    themeCache.clear()
}

/**
 * Get the current theme cache size (useful for testing)
 */
export const getThemeCacheSize = (): number => {
    return themeCache.size
}

/**
 * Deep merge two objects
 */
const deepMerge = <T extends Record<string, unknown>>(target: T, source: DeepPartial<T>): T => {
    const result = { ...target }

    for (const key in source) {
        const sourceValue = source[key]
        const targetValue = target[key]

        if (
            sourceValue !== undefined &&
            typeof sourceValue === 'object' &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            targetValue !== null
        ) {
            result[key] = deepMerge(
                targetValue as Record<string, unknown>,
                sourceValue as DeepPartial<Record<string, unknown>>
            ) as T[Extract<keyof T, string>]
        } else if (sourceValue !== undefined) {
            result[key] = sourceValue as T[Extract<keyof T, string>]
        }
    }

    return result
}

/**
 * Create a theme by merging a base theme with overrides
 *
 * @example
 * ```ts
 * const myTheme = createTheme(defaultTheme, {
 *     colors: {
 *         primary: '#ff0000',
 *         // Only override what you need
 *     },
 *     spacing: {
 *         md: '1.5rem',
 *     },
 * })
 * ```
 */
export const createTheme = <T extends Theme>(
    baseTheme: T,
    overrides: DeepPartial<T>
): T => {
    // Create cache key from base theme reference + overrides hash
    const cacheKey = `${hashObject(baseTheme)}_${hashObject(overrides)}`

    const cached = themeCache.get(cacheKey)
    if (cached) {
        return cached as T
    }

    const result = deepMerge(baseTheme, overrides)

    // Evict oldest if cache is full
    if (themeCache.size >= MAX_THEME_CACHE_SIZE) {
        const firstKey = themeCache.keys().next().value
        if (firstKey) {themeCache.delete(firstKey)}
    }

    themeCache.set(cacheKey, result)
    return result
}

/**
 * Merge multiple theme overrides into one
 * Later overrides take precedence
 *
 * @example
 * ```ts
 * const theme = mergeThemes(
 *     baseTheme,
 *     brandOverrides,
 *     darkModeOverrides,
 *     userPreferences
 * )
 * ```
 */
export const mergeThemes = <T extends Theme>(
    baseTheme: T,
    ...overrides: DeepPartial<T>[]
): T => {
    return overrides.reduce<T>(
        (acc, override) => deepMerge(acc, override),
        baseTheme
    )
}

/**
 * Create a theme extension factory
 * Useful for creating theme variants (dark mode, high contrast, etc.)
 *
 * @example
 * ```ts
 * const createDarkVariant = createThemeVariant({
 *     colors: {
 *         background: '#1a1a1a',
 *         text: '#ffffff',
 *     },
 * })
 *
 * const darkTheme = createDarkVariant(lightTheme)
 * ```
 */
export const createThemeVariant = <T extends Theme>(
    variantOverrides: DeepPartial<T>
) => {
    return (baseTheme: T): T => createTheme(baseTheme, variantOverrides)
}

