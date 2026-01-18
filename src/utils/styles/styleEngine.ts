import type { StyleWithPseudos } from './types'
import type { Theme } from '@/types'

const IS_SERVER = typeof document === 'undefined'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let themeContextGetter: (() => any) | null = null
let styleSheet: CSSStyleSheet | null = null
let ssrRules: string[] = []

const cssKeyCache = new Map<string, string>([
    ['backgroundColor', 'background-color'],
    ['borderRadius', 'border-radius'],
    ['fontSize', 'font-size'],
    ['fontWeight', 'font-weight'],
    ['lineHeight', 'line-height'],
    ['marginTop', 'margin-top'],
    ['marginBottom', 'margin-bottom'],
    ['marginLeft', 'margin-left'],
    ['marginRight', 'margin-right'],
    ['paddingTop', 'padding-top'],
    ['paddingBottom', 'padding-bottom'],
    ['paddingLeft', 'padding-left'],
    ['paddingRight', 'padding-right'],
    ['textAlign', 'text-align'],
    ['justifyContent', 'justify-content'],
    ['alignItems', 'align-items'],
    ['flexDirection', 'flex-direction'],
    ['flexWrap', 'flex-wrap'],
    ['boxShadow', 'box-shadow'],
    ['zIndex', 'z-index'],
])

const staticStyleCache = new Map<string, string>()
const usedClassNames = new Set<string>()
const injectedKeyframes = new Set<string>()
const injectedFontFaces = new Set<string>()
let keyframeCounter = 0

const UNITLESS_PROPERTIES = new Set([
    'animationIterationCount', 'columnCount', 'fillOpacity', 'flexGrow', 'flexShrink',
    'fontWeight', 'lineHeight', 'opacity', 'order', 'orphans', 'widows', 'zIndex', 'zoom'
])

/**
 * Max LRU cache size for dynamic styles.
 * @internal
 */
export const MAX_CACHE_SIZE = 100

if (!IS_SERVER) {
    const existingStyle = document.getElementById('aurora-styles') as HTMLStyleElement | null
    if (existingStyle) {
        styleSheet = existingStyle.sheet as CSSStyleSheet
    } else {
        const style = document.createElement('style')
        style.id = 'aurora-styles'
        document.head.appendChild(style)
        styleSheet = style.sheet as CSSStyleSheet
    }
}

/**
 * Sets the theme getter function used by createStyles.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setThemeContextGetter = <T extends Theme>(getter: (() => T | undefined) | null): (() => any) | null => {
    const previous = themeContextGetter
    themeContextGetter = getter
    return previous
}

/**
 * Returns the current theme from the context.
 * @internal
 */
export const getTheme = (): Theme | undefined => {
    return themeContextGetter?.()
}

/**
 * Inserts a CSS rule into the stylesheet (or SSR buffer).
 * @internal
 */
export const insertRule = (rule: string): void => {
    if (IS_SERVER) {
        ssrRules.push(rule)
    } else if (styleSheet) {
        try {
            styleSheet.insertRule(rule, styleSheet.cssRules.length)
        } catch {
            // Ignore errors (invalid rules)
        }
    }
}

/**
 * Converts camelCase to kebab-case with caching.
 * @internal
 */
export const toKebabCase = (key: string): string => {
    let cached = cssKeyCache.get(key)
    if (!cached) {
        cached = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        cssKeyCache.set(key, cached)
    }
    return cached
}

/**
 * Converts PascalCase/camelCase to kebab-case for class names.
 * @internal
 */
export const toKebabCaseClassName = (name: string): string => {
    return name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()
}

const CSS_INJECTION_PATTERNS = /expression\s*\(|javascript\s*:|data\s*:\s*text\/html|behavior\s*:|@import|<\s*\/?\s*style/i

/**
 * Sanitizes CSS value to prevent injection attacks.
 * @internal
 */
export const sanitizeCssValue = (value: string): string => {
    const cleaned = value.replace(/\0/g, '')
    if (CSS_INJECTION_PATTERNS.test(cleaned)) {
        return 'unset'
    }
    return cleaned
}

/**
 * Converts a value to valid CSS (adds px for numbers).
 * @internal
 */
export const toCssValue = (key: string, value: unknown): string => {
    if (typeof value === 'number' && !UNITLESS_PROPERTIES.has(key)) {
        return `${value}px`
    }
    return sanitizeCssValue(String(value))
}

/**
 * Converts a styles object to a CSS string.
 * @internal
 */
export const objectToCss = (obj: Record<string, unknown>): string => {
    let result = ''
    for (const key in obj) {
        const value = obj[key]
        if (value != null && typeof value !== 'object') {
            result += `${toKebabCase(key)}:${toCssValue(key, value)};`
        }
    }
    return result
}

/**
 * Resolves & selectors to actual class selectors.
 * @internal
 */
export const resolveAmpersandSelector = (selector: string, className: string): string => {
    return selector.includes('&') ? selector.replace(/&/g, `.${className}`) : `.${className}${selector}`
}

/**
 * Creates a cache key from function arguments.
 * @internal
 */
export const createCacheKey = (args: unknown[]): string => {
    const len = args.length
    if (len === 0) {return ''}
    if (len === 1) {
        const arg = args[0]
        if (arg === undefined) {return 'u'}
        if (arg === null) {return 'n'}
        if (typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean') {
            return String(arg)
        }
    }
    if (len <= 4) {
        let result = ''
        for (let i = 0; i < len; i++) {
            const arg = args[i]
            const t = typeof arg
            if (arg === undefined) {
                result += i ? '|u' : 'u'
            } else if (arg === null) {
                result += i ? '|n' : 'n'
            } else if (t === 'string' || t === 'number' || t === 'boolean') {
                result += i ? '|' + arg : String(arg)
            } else {
                return JSON.stringify(args)
            }
        }
        return result
    }
    return JSON.stringify(args)
}

/**
 * Converts a cache key to a valid CSS class suffix.
 * @internal
 */
export const cacheKeyToSuffix = (key: string): string => {
    const firstChar = key.charCodeAt(0)
    if (key.length < 20) {
        if ((firstChar >= 97 && firstChar <= 122) || (firstChar >= 65 && firstChar <= 90)) {
            let valid = true
            for (let i = 1; i < key.length; i++) {
                const c = key.charCodeAt(i)
                if (!((c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57))) {
                    valid = false
                    break
                }
            }
            if (valid) {return toKebabCaseClassName(key)}
        } else if (firstChar === 45 || (firstChar >= 48 && firstChar <= 57)) {
            let valid = true
            for (let i = 1; i < key.length; i++) {
                if (key.charCodeAt(i) < 48 || key.charCodeAt(i) > 57) {
                    valid = false
                    break
                }
            }
            if (valid) {return key}
        }
    }
    let hash = 5381
    const len = key.length
    for (let i = 0; i < len; i++) {
        hash = ((hash << 5) + hash) ^ key.charCodeAt(i)
    }
    return (hash >>> 0).toString(36)
}

/**
 * Creates an LRU cache with O(1) operations.
 * @internal
 */
export const createLRUCache = <V>(maxSize: number): { getOrSet: (key: string, factory: () => V) => V } => {
    const cache = new Map<string, V>()
    return {
        getOrSet(key: string, factory: () => V): V {
            const existing = cache.get(key)
            if (existing !== undefined) {
                cache.delete(key)
                cache.set(key, existing)
                return existing
            }
            const value = factory()
            if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value
                if (firstKey !== undefined) { cache.delete(firstKey) }
            }
            cache.set(key, value)
            return value
        }
    }
}

/**
 * Generates a hash from a styles object.
 * @internal
 */
export const hashStyles = (styles: StyleWithPseudos): string => {
    const str = JSON.stringify(styles)
    let hash = 5381
    const len = str.length
    for (let i = 0; i < len; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
    }
    return (hash >>> 0).toString(36)
}

/**
 * Generates a hash from a string.
 * @internal
 */
export const hashString = (str: string): string => {
    let hash = 5381
    const len = str.length
    for (let i = 0; i < len; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
    }
    return (hash >>> 0).toString(36)
}

/**
 * Returns a unique class name, adding suffix if needed.
 * @internal
 */
export const getUniqueClassName = (baseName: string): string => {
    if (!usedClassNames.has(baseName)) {
        usedClassNames.add(baseName)
        return baseName
    }
    let counter = 2
    while (usedClassNames.has(`${baseName}-${counter}`)) {
        counter++
    }
    const name = `${baseName}-${counter}`
    usedClassNames.add(name)
    return name
}

/**
 * Generates CSS class with support for pseudo-classes, media queries, etc.
 * @internal
 */
export const generateCssClass = (styles: StyleWithPseudos, className: string, useCache = false): string => {
    if (useCache) {
        const hash = hashStyles(styles)
        const cached = staticStyleCache.get(hash)
        if (cached) { return cached }
    }

    const uniqueName = getUniqueClassName(className)
    let baseCss = ''

    for (const key in styles) {
        const value = (styles as Record<string, unknown>)[key]
        const firstChar = key[0]

        if (firstChar === '@') {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertRule(`${key}{.${uniqueName}{${innerCss}}}`)
            }
        } else if (firstChar === '&') {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertRule(`${key.replace(/&/g, `.${uniqueName}`)}{${innerCss}}`)
            }
        } else if (firstChar === ':') {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertRule(`.${uniqueName}${key}{${innerCss}}`)
            }
        } else if (value != null && typeof value !== 'object') {
            baseCss += `${toKebabCase(key)}:${toCssValue(key, value)};`
        }
    }

    if (baseCss) {
        insertRule(`.${uniqueName}{${baseCss}}`)
    }

    if (useCache) {
        staticStyleCache.set(hashStyles(styles), uniqueName)
    }

    return uniqueName
}

/**
 * Checks if keyframes CSS has already been injected.
 * @internal
 */
export const hasKeyframes = (css: string): boolean => {
    return injectedKeyframes.has(css)
}

/**
 * Registers keyframes CSS as injected.
 * @internal
 */
export const addKeyframes = (css: string): void => {
    injectedKeyframes.add(css)
}

/**
 * Returns next unique keyframe ID.
 * @internal
 */
export const getNextKeyframeId = (): string => {
    return (++keyframeCounter).toString(36)
}

/**
 * Checks if font-face CSS has already been injected.
 * @internal
 */
export const hasFontFace = (css: string): boolean => {
    return injectedFontFaces.has(css)
}

/**
 * Registers font-face CSS as injected.
 * @internal
 */
export const addFontFace = (css: string): void => {
    injectedFontFaces.add(css)
}

/**
 * Returns SSR rules array.
 * @internal
 */
export const getSSRRulesInternal = (): string[] => {
    return ssrRules
}

/**
 * Resets all internal state (for SSR).
 * @internal
 */
export const resetState = (): void => {
    ssrRules = []
    staticStyleCache.clear()
    usedClassNames.clear()
    injectedKeyframes.clear()
    injectedFontFaces.clear()
    keyframeCounter = 0
}
