import {
    cacheKeyToSuffix,
    createCacheKey,
    createLRUCache,
    generateCssClass,
    MAX_CACHE_SIZE,
    toKebabCase,
    toKebabCaseClassName
} from './styleEngine'

import type { StyleFunction, StyleWithPseudos } from './types'
import type { _InternalTheme } from '@/types'

/**
 * Extracts component name from stack trace for class naming.
 * @internal
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
 * Creates a theme proxy that returns CSS variable references instead of actual values.
 * Supports any theme structure with unlimited nesting depth.
 * Each property access returns a value that:
 * - Can be used as a string (returns var(--theme-path))
 * - Can be accessed further for nested properties
 * @internal
 */
const createCSSVariableTheme = (): _InternalTheme => {
    const createNestedProxy = (path: string): unknown => {
        // Create a function that returns the CSS variable
        const getValue = () => `var(--theme-${path})`

        // Return a proxy that acts as both a value and an object for further nesting
        return new Proxy(getValue, {
            get(_, prop) {
                // Handle Symbol.toPrimitive for coercion
                if (prop === Symbol.toPrimitive) {
                    return getValue
                }

                // Ignore other symbols (used by React, JSON.stringify, etc.)
                if (typeof prop !== 'string') {
                    return undefined
                }

                // Handle coercion to string/primitive
                if (prop === 'toString' || prop === 'valueOf') {
                    return getValue
                }

                // Create nested path
                const kebabProp = toKebabCase(prop)
                const newPath = path ? `${path}-${kebabProp}` : kebabProp

                // Return a new proxy for the nested path
                return createNestedProxy(newPath)
            },

            // When used in string context (template literals, string concatenation)
            apply() {
                return getValue()
            }
        })
    }

    return createNestedProxy('') as _InternalTheme
}

/**
 * Cache for CSS variable-based styles.
 * Key is the stringified creator function, value is the processed styles.
 * @internal
 */
const cssVarStylesCache = new Map<string, Record<string, string | ((...args: unknown[]) => string)>>()

/**
 * Processes styles object and generates CSS classes.
 * @internal
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
 * Creates styles with theme support. Type is inferred from ThemeRegistry.
 * Supports pseudo-classes, media queries, and complex selectors.
 *
 * Uses CSS variables (var(--theme-xxx)) for dynamic theme switching.
 * Theme values are automatically updated when ThemeProvider's theme changes.
 *
 * @param stylesOrCreator - Static styles object or function that receives theme
 *
 * @example
 * ```tsx
 * const styles = createStyles((theme) => ({
 *   root: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md
 *   }
 * }))
 *
 * // Usage in component
 * function MyComponent() {
 *   return <div className={styles.root}>Hello</div>
 * }
 * ```
 */
export const createStyles = <
    T extends Record<string, StyleWithPseudos | StyleFunction> = Record<string, StyleWithPseudos | StyleFunction>
>(
        stylesOrCreator: T | ((theme: _InternalTheme) => T)
    ): { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string } => {
    type Result = { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string }
    const componentName = getComponentNameFromStack()

    // Styles with theme (function)
    if (typeof stylesOrCreator === 'function') {
        const creatorKey = `${componentName}:${stylesOrCreator.toString().slice(0, 200)}`
        let cached = cssVarStylesCache.get(creatorKey)

        if (!cached) {
            const cssVarTheme = createCSSVariableTheme()
            const styles = stylesOrCreator(cssVarTheme)
            cached = processStyles(styles, componentName)
            cssVarStylesCache.set(creatorKey, cached)
        }

        return cached as Result
    }


    // Styles without theme (direct object)
    return processStyles(stylesOrCreator, componentName) as Result
}

