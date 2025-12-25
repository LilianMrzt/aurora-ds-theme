import {
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
    defaultOpacity,
    defaultBreakpoints,
} from './defaultTheme'

import type { Theme, DeepPartial, CreateThemeOptions, CustomTheme } from '@/types'

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
 * Shallow merge that replaces entire categories instead of deep merging
 */
const shallowMerge = <T extends Record<string, unknown>>(target: T, source: DeepPartial<T>): T => {
    const result = { ...target }

    for (const key in source) {
        const sourceValue = source[key]
        if (sourceValue !== undefined) {
            // Replace the entire category instead of deep merging
            result[key] = sourceValue as T[Extract<keyof T, string>]
        }
    }

    return result
}

/**
 * Create a theme by merging a base theme with overrides
 *
 * @param baseTheme - The base theme to extend
 * @param overrides - Partial overrides to apply
 * @param options - Optional configuration
 * @param options.mode - 'merge' (default) deep merges, 'replace' replaces entire categories
 *
 * @example
 * ```ts
 * // Default behavior: deep merge (extends existing tokens)
 * const myTheme = createTheme(defaultTheme, {
 *     colors: {
 *         primary: '#ff0000',
 *         // Other color tokens from defaultTheme are preserved
 *     },
 * })
 *
 * // Replace mode: completely replace categories
 * const myTheme = createTheme(defaultTheme, {
 *     colors: {
 *         // This becomes the ENTIRE colors object
 *         brand: '#ff0000',
 *         surface: '#ffffff',
 *         text: '#000000',
 *     },
 * }, { mode: 'replace' })
 * ```
 */
export const createTheme = <T extends Theme>(
    baseTheme: T,
    overrides: DeepPartial<T>,
    options: CreateThemeOptions = {}
): T => {
    const { mode = 'merge' } = options

    // Create cache key from base theme reference + overrides hash + mode
    const cacheKey = `${hashObject(baseTheme)}_${hashObject(overrides)}_${mode}`

    const cached = themeCache.get(cacheKey)
    if (cached) {
        return cached as T
    }

    const result = mode === 'replace'
        ? shallowMerge(baseTheme, overrides)
        : deepMerge(baseTheme, overrides)

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

/**
 * Create a fully custom theme with your own color tokens
 * This allows you to define a completely different color token structure
 * without being constrained by BaseColors
 *
 * @param config - Full theme configuration with custom colors
 *
 * @example
 * ```ts
 * // Define your custom color tokens
 * type MyBrandColors = {
 *     brand: string
 *     brandHover: string
 *     brandActive: string
 *     surface: string
 *     surfaceElevated: string
 *     textPrimary: string
 *     textSecondary: string
 *     border: string
 * }
 *
 * // Create a theme with ONLY your color tokens
 * const myTheme = createCustomTheme<MyBrandColors>({
 *     colors: {
 *         brand: '#007bff',
 *         brandHover: '#0056b3',
 *         brandActive: '#004085',
 *         surface: '#ffffff',
 *         surfaceElevated: '#f8f9fa',
 *         textPrimary: '#212529',
 *         textSecondary: '#6c757d',
 *         border: '#dee2e6',
 *     },
 *     // Uses defaults for other tokens, or provide your own:
 *     // spacing: { ... },
 *     // radius: { ... },
 * })
 *
 * // TypeScript knows your theme has only YOUR color tokens:
 * myTheme.colors.brand      // ✅ OK
 * myTheme.colors.primary    // ❌ Error - doesn't exist
 * ```
 */
export const createCustomTheme = <
    TColors extends Record<string, string>,
    TSpacing extends Record<string, string> = typeof defaultSpacing,
    TRadius extends Record<string, string> = typeof defaultRadius,
    TShadows extends Record<string, string> = typeof defaultShadows,
    TFontSize extends Record<string, string> = typeof defaultFontSize,
    TFontWeight extends Record<string, number> = typeof defaultFontWeight,
    TLineHeight extends Record<string, number> = typeof defaultLineHeight,
    TZIndex extends Record<string, number> = typeof defaultZIndex,
    TTransition extends Record<string, string> = typeof defaultTransition,
    TOpacity extends Record<string, number> = typeof defaultOpacity,
    TBreakpoints extends Record<string, string> = typeof defaultBreakpoints,
>(config: {
    colors: TColors
    spacing?: TSpacing
    radius?: TRadius
    shadows?: TShadows
    fontSize?: TFontSize
    fontWeight?: TFontWeight
    lineHeight?: TLineHeight
    zIndex?: TZIndex
    transition?: TTransition
    opacity?: TOpacity
    breakpoints?: TBreakpoints
}): CustomTheme<TColors, TSpacing, TRadius, TShadows, TFontSize, TFontWeight, TLineHeight, TZIndex, TTransition, TOpacity, TBreakpoints> => {
    return {
        colors: config.colors,
        spacing: (config.spacing ?? defaultSpacing) as TSpacing,
        radius: (config.radius ?? defaultRadius) as TRadius,
        shadows: (config.shadows ?? defaultShadows) as TShadows,
        fontSize: (config.fontSize ?? defaultFontSize) as TFontSize,
        fontWeight: (config.fontWeight ?? defaultFontWeight) as TFontWeight,
        lineHeight: (config.lineHeight ?? defaultLineHeight) as TLineHeight,
        zIndex: (config.zIndex ?? defaultZIndex) as TZIndex,
        transition: (config.transition ?? defaultTransition) as TTransition,
        opacity: (config.opacity ?? defaultOpacity) as TOpacity,
        breakpoints: (config.breakpoints ?? defaultBreakpoints) as TBreakpoints,
    }
}

