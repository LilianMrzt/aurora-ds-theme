import type { BaseTheme, DeepPartial } from '@/types/Theme'

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
export const createTheme = <T extends BaseTheme>(
    baseTheme: T,
    overrides: DeepPartial<T>
): T => {
    return deepMerge(baseTheme, overrides)
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
export const mergeThemes = <T extends BaseTheme>(
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
export const createThemeVariant = <T extends BaseTheme>(
    variantOverrides: DeepPartial<T>
) => {
    return (baseTheme: T): T => createTheme(baseTheme, variantOverrides)
}

