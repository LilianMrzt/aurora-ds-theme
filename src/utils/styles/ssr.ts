import { getSSRRulesInternal, resetState } from './styleEngine'

/** SSR: Returns all collected CSS rules as a single string */
export const getSSRStyles = (): string => {
    return getSSRRulesInternal().join('')
}

/** SSR: Returns styles wrapped in a style tag */
export const getSSRStyleTag = (): string => {
    const css = getSSRStyles()
    if (!css) { return '' }
    return `<style id="aurora-styles">${css}</style>`
}

/** SSR: Clears the collected rules buffer */
export const clearSSRRules = (): void => {
    resetState()
}

/** SSR: Returns raw CSS rules as an array */
export const getSSRRulesArray = (): string[] => {
    return [...getSSRRulesInternal()]
}
