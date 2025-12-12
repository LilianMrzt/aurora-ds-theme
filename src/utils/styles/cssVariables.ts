import { insertRule, toKebabCase } from './styleEngine'

import type { BaseTheme } from '@/types'


/**
 * Generate CSS variables from a theme object
 */
const generateCssVariables = (obj: Record<string, unknown>, prefix: string): string => {
    let css = ''

    for (const key in obj) {
        const value = obj[key]
        const varName = `--${prefix}-${toKebabCase(key)}`

        if (value && typeof value === 'object') {
            css += generateCssVariables(value as Record<string, unknown>, `${prefix}-${toKebabCase(key)}`)
        } else if (value != null) {
            css += `${varName}:${value};`
        }
    }

    return css
}

/**
 * Create CSS variables from the theme
 * Injects variables into :root
 *
 * @example
 * ```ts
 * // In ThemeProvider
 * injectCssVariables(theme, 'aurora')
 * // Generates: :root { --aurora-colors-primary: #2563EB; ... }
 * ```
 */
export const injectCssVariables = (theme: BaseTheme, prefix = 'theme'): void => {
    const variables = generateCssVariables(theme, prefix)
    insertRule(`:root{${variables}}`)
}

/**
 * Helper to use a CSS variable from the theme
 *
 * @example
 * ```ts
 * const STYLES = createStyles({
 *     root: { color: cssVar('colors-primary') }
 * })
 * // Generates: color: var(--theme-colors-primary)
 * ```
 */
export const cssVar = (path: string, fallback?: string): string => {
    const varName = `--theme-${path.replace(/\./g, '-')}`
    return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`
}

/**
 * Create CSS variable references from a typed object
 * Returns an object with the same structure where values are var() references
 *
 * @example
 * ```ts
 * const vars = cssVariables({
 *     primaryColor: '#007bff',
 *     spacing: '1rem',
 * })
 * // vars.primaryColor === 'var(--primary-color)'
 * ```
 */
export const cssVariables = <T extends Record<string, string | number>>(
    variables: T,
    options: { prefix?: string; inject?: boolean } = {}
): { [K in keyof T]: string } => {
    const { prefix = '', inject = false } = options
    const result = {} as { [K in keyof T]: string }
    let cssToInject = ''

    for (const key in variables) {
        const kebabKey = toKebabCase(key)
        const varName = prefix ? `--${prefix}-${kebabKey}` : `--${kebabKey}`
        result[key] = `var(${varName})`

        if (inject) {
            cssToInject += `${varName}:${variables[key]};`
        }
    }

    if (inject && cssToInject) {
        insertRule(`:root{${cssToInject}}`)
    }

    return result
}

