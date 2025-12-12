
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
 * Create typed styles with support for pseudo-classes, media queries, container queries, feature queries and complex selectors
 *
 * Supports custom extended themes via generic parameter.
 *
 * @example
 * ```ts
 * // Basic usage with default theme
 * const STYLES = createStyles((theme) => ({
 *     root: {
 *         display: 'flex',
 *         padding: theme.spacing.md,
 *         ':hover': { backgroundColor: theme.colors.backgroundHover },
 *     }
 * }))
 *
 * // With custom extended theme
 * type MyTheme = Theme & { colors: BaseColors & { accent: string } }
 *
 * const STYLES = createStyles<MyTheme>((theme) => ({
 *     root: {
 *         backgroundColor: theme.colors.accent, // TypeScript knows about accent!
 *     }
 * }))
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

