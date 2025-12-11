import { getSSRRulesInternal, resetState } from './styleEngine'

/**
 * SSR: Get all collected CSS rules as a single string
 * @returns The CSS content to inject into HTML
 */
export const getSSRStyles = (): string => {
    return getSSRRulesInternal().join('')
}

/**
 * SSR: Get styles as a <style> tag ready to inject
 * @returns The complete style tag to inject into <head>
 */
export const getSSRStyleTag = (): string => {
    const css = getSSRStyles()
    if (!css) { return '' }
    return `<style id="aurora-styles">${css}</style>`
}

/**
 * SSR: Clear the collected rules buffer
 * Call at the beginning of each SSR request to ensure clean state
 */
export const clearSSRRules = (): void => {
    resetState()
}

/**
 * SSR: Get raw CSS rules as an array
 * @returns Array of CSS rules
 */
export const getSSRRulesArray = (): string[] => {
    return [...getSSRRulesInternal()]
}

