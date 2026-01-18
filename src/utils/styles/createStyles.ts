
import {
    cacheKeyToSuffix,
    createCacheKey,
    createLRUCache,
    generateCssClass,
    getTheme,
    MAX_CACHE_SIZE,
    toKebabCaseClassName
} from './styleEngine'

import type { StyleFunction, StyleWithPseudos } from './types'
import type { Theme } from '@/types'

/**
 * Extract component name from stack trace
 */
const getComponentNameFromStack = (): string => {
    const stack = new Error().stack || ''
    const match = stack.match(/([A-Za-z0-9_]+)\.styles\.[tj]s/)
    if (match?.[1]) {
        return toKebabCaseClassName(match[1])
    }
    const fileMatch = stack.match(/\/([A-Za-z0-9_]+)\.[tj]sx?[:\d]*\)?$/m)
    if (fileMatch?.[1] && fileMatch[1] !== 'createStyles') {
        return toKebabCaseClassName(fileMatch[1])
    }
    return 'style'
}

/**
 * Process styles and generate CSS classes
 */
const processStyles = <T extends Record<string, StyleWithPseudos | StyleFunction>>(
    styles: T,
    componentName: string
): Record<string, string | ((...args: unknown[]) => string)> => {
    const classes = {} as Record<string, string | ((...args: unknown[]) => string)>

    for (const key in styles) {
        const style = styles[key]
        if (style) {
            const baseName = `${componentName}-${toKebabCaseClassName(key)}`
            if (typeof style === 'function') {
                const lru = createLRUCache<string>(MAX_CACHE_SIZE)
                classes[key] = (...args: unknown[]) => {
                    const cacheKey = createCacheKey(args)
                    return lru.getOrSet(cacheKey, () => {
                        const resolved = (style as (...a: unknown[]) => StyleWithPseudos)(...args)
                        return generateCssClass(resolved, `${baseName}-${cacheKeyToSuffix(cacheKey)}`)
                    })
                }
            } else {
                classes[key] = generateCssClass(style, baseName, true)
            }
        }
    }

    return classes
}

/**
z * Creates type-safe styles with theme support.
 *
 * Supports pseudo-classes, media queries, container queries, feature queries and complex selectors.
 * Theme type is automatically inferred from your theme definition.
 *
 * @template TTheme - Theme type (automatically inferred from context)
 * @template T - Styles object type
 *
 * @example
 * ```ts
 * // Define your theme structure
 * const themeDefinition = defineTheme({
 *   colors: { primary: null, secondary: null },
 *   spacing: { sm: null, md: null }
 * })
 *
 * const myTheme = createTheme(themeDefinition, {
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * type AppTheme = typeof myTheme
 *
 * // Use with full type-safety
 * const useStyles = createStyles<AppTheme>((theme) => ({
 *   root: {
 *     display: 'flex',
 *     padding: theme.spacing.sm,        // ✅ Autocomplete works
 *     color: theme.colors.primary,      // ✅ Type-safe
 *     ':hover': {
 *       color: theme.colors.secondary   // ✅ Full IntelliSense
 *     }
 *   }
 * }))
 * ```
 *
 * @example
 * ```ts
 * // Without theme parameter (static styles)
 * const useStyles = createStyles({
 *   root: {
 *     display: 'flex',
 *     padding: '16px'
 *   }
 * })
 * ```
 */
export const createStyles = <
    TTheme extends Theme = Theme,
    T extends Record<string, StyleWithPseudos | StyleFunction> = Record<string, StyleWithPseudos | StyleFunction>
>(
        stylesOrCreator: T | ((theme: TTheme) => T)
    ): { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string } => {
    type Result = { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string }
    const componentName = getComponentNameFromStack()

    // Styles with theme (function)
    if (typeof stylesOrCreator === 'function') {
        let cached: Result | null = null
        let lastTheme: TTheme | undefined

        return new Proxy({} as Result, {
            get(_, prop: string | symbol) {
                const theme = getTheme() as TTheme | undefined
                if (!theme) {
                    throw new Error('createStyles: Theme context not found. Make sure you are using this inside a ThemeProvider.')
                }
                if (theme !== lastTheme || !cached) {
                    cached = processStyles(stylesOrCreator(theme), componentName) as Result
                    lastTheme = theme
                }
                return cached[prop as keyof T]
            }
        })
    }

    // Styles without theme (direct object)
    return processStyles(stylesOrCreator, componentName) as Result
}

/**
 * Creates a pre-typed createStyles function for your custom theme.
 * Eliminates the need to specify the theme type on every createStyles call.
 *
 * @template TTheme - Your theme type (use `typeof myTheme`)
 *
 * @example
 * ```ts
 * // 1. Define and create your theme
 * const themeDefinition = defineTheme({
 *   colors: { brand: null, accent: null },
 *   spacing: { sm: null, md: null }
 * })
 *
 * const myTheme = createTheme(themeDefinition, {
 *   colors: { brand: '#007bff', accent: '#9c27b0' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * type AppTheme = typeof myTheme
 *
 * // 2. Create a pre-typed createStyles (do this once in a shared file)
 * export const createStyles = createTypedStyles<AppTheme>()
 *
 * // 3. Use everywhere without specifying the type!
 * const useStyles = createStyles((theme) => ({
 *   button: {
 *     backgroundColor: theme.colors.brand,    // ✅ Full autocomplete
 *     padding: theme.spacing.md,              // ✅ Type-safe
 *   }
 * }))
 * ```
 */
export const createTypedStyles = <TTheme extends Record<string, unknown>>() => {
    return <T extends Record<string, StyleWithPseudos | StyleFunction>>(
        stylesOrCreator: T | ((theme: TTheme) => T)
    ): { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string } => {
        // Cast to Theme for internal processing - the actual theme structure doesn't matter
        // as long as it's passed through correctly to the user's callback
        return createStyles<Theme, T>(stylesOrCreator as T | ((theme: Theme) => T))
    }
}

