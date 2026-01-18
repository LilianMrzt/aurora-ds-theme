import { insertRule, toKebabCase } from './styleEngine'

import type { _InternalTheme } from '@/types'


/** Generate CSS variables from a theme object */
const generateCssVariables = (obj: Record<string, unknown>, prefix: string): string => {
    let css = ''

    for (const key in obj) {
        const value = obj[key]
        const kebabKey = toKebabCase(key)

        if (value && typeof value === 'object') {
            css += generateCssVariables(value as Record<string, unknown>, `${prefix}-${kebabKey}`)
        } else if (value != null) {
            css += `--${prefix}-${kebabKey}:${value};`
        }
    }

    return css
}

/** Injects CSS variables from theme into :root */
export const injectCssVariables = (theme: _InternalTheme, prefix = 'theme'): void => {
    const variables = generateCssVariables(theme, prefix)
    insertRule(`:root{${variables}}`)
}

/** Returns a CSS var() reference for a theme path */
export const cssVar = (path: string, fallback?: string): string => {
    const varName = `--theme-${path.replace(/\./g, '-')}`
    return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`
}

/** Creates CSS variable references from an object */
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
