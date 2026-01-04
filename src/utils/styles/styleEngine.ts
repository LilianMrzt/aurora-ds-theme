import type { StyleWithPseudos } from './types'
import type { Theme } from '@/types'

// Environment detection (constant since it never changes)
const IS_SERVER = typeof document === 'undefined'

// Global theme getter
let themeContextGetter: (() => Theme | undefined) | null = null

// Stylesheet for client-side injection
let styleSheet: CSSStyleSheet | null = null

// SSR buffer to collect server-side rules
let ssrRules: string[] = []

// Cache for camelCase → kebab-case conversion (pre-allocated for common keys)
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

// Global cache for static styles (avoids regenerating the same styles)
const staticStyleCache = new Map<string, string>()

// Set to track already used class names
const usedClassNames = new Set<string>()

// Set to track already injected keyframes
const injectedKeyframes = new Set<string>()

// Set to track already injected font-faces
const injectedFontFaces = new Set<string>()

// Counter for unique keyframe names generation
let keyframeCounter = 0

// Properties that accept unitless numbers (optimized Set)
const UNITLESS_PROPERTIES = new Set([
    'animationIterationCount', 'columnCount', 'fillOpacity', 'flexGrow', 'flexShrink',
    'fontWeight', 'lineHeight', 'opacity', 'order', 'orphans', 'widows', 'zIndex', 'zoom'
])

// Max LRU cache size for dynamic styles
export const MAX_CACHE_SIZE = 100

// Initialize stylesheet (client-side only)
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
 * Set the theme getter
 */
export const setThemeContextGetter = (getter: (() => Theme | undefined) | null): (() => Theme | undefined) | null => {
    const previous = themeContextGetter
    themeContextGetter = getter
    return previous
}

/**
 * Get the current theme
 */
export const getTheme = (): Theme | undefined => {
    return themeContextGetter?.()
}

/**
 * Insert a CSS rule
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
 * Convert camelCase to kebab-case with caching
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
 * Convert PascalCase/camelCase to kebab-case for class names
 */
export const toKebabCaseClassName = (name: string): string => {
    return name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()
}

/**
 * Dangerous patterns that could be used for CSS injection attacks
 * - expression(): IE-specific, allows JavaScript execution
 * - url() with javascript:/data:: can execute scripts or embed malicious content
 * - behavior: IE-specific, loads external HTC files
 * - -moz-binding: Firefox-specific, loads XBL files
 * - @import: could load external malicious stylesheets
 * - </style>: could break out of style context
 */
const CSS_INJECTION_PATTERNS = /expression\s*\(|javascript\s*:|data\s*:\s*text\/html|behavior\s*:|@import|<\s*\/?\s*style/i

/**
 * Sanitize a CSS value to prevent injection attacks
 * Returns the sanitized value or 'unset' if the value is dangerous
 */
export const sanitizeCssValue = (value: string): string => {
    // Remove any null bytes
    const cleaned = value.replace(/\0/g, '')

    // Check for dangerous patterns
    if (CSS_INJECTION_PATTERNS.test(cleaned)) {
        return 'unset'
    }

    return cleaned
}


/**
 * Convert values to valid CSS with sanitization
 */
export const toCssValue = (key: string, value: unknown): string => {
    if (typeof value === 'number' && !UNITLESS_PROPERTIES.has(key)) {
        return `${value}px`
    }
    return sanitizeCssValue(String(value))
}

/**
 * Convert a styles object to CSS (simple properties only)
 * Optimized to avoid unnecessary allocations
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
 * Convert an & selector to a valid CSS selector
 */
export const resolveAmpersandSelector = (selector: string, className: string): string => {
    return selector.includes('&') ? selector.replace(/&/g, `.${className}`) : `.${className}${selector}`
}

/**
 * Create a cache key from arguments
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
 * Convert cacheKey to a valid CSS suffix
 */
export const cacheKeyToSuffix = (key: string): string => {
    // Fast path for simple keys
    const firstChar = key.charCodeAt(0)
    if (key.length < 20) {
        if ((firstChar >= 97 && firstChar <= 122) || (firstChar >= 65 && firstChar <= 90)) {
            // Starts with letter, check if alphanumeric
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
            // Number or negative number
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
    // Hash for complex keys
    let hash = 5381
    const len = key.length
    for (let i = 0; i < len; i++) {
        hash = ((hash << 5) + hash) ^ key.charCodeAt(i)
    }
    return (hash >>> 0).toString(36)
}

/**
 * Optimized LRU cache with O(1) deletion
 */
export const createLRUCache = <V>(maxSize: number): { getOrSet: (key: string, factory: () => V) => V } => {
    const cache = new Map<string, V>()
    return {
        getOrSet(key: string, factory: () => V): V {
            const existing = cache.get(key)
            if (existing !== undefined) {
                // Move to end (most recent) - O(1) with Map
                cache.delete(key)
                cache.set(key, existing)
                return existing
            }
            const value = factory()
            if (cache.size >= maxSize) {
                // Remove oldest (first element)
                const firstKey = cache.keys().next().value
                if (firstKey !== undefined) { cache.delete(firstKey) }
            }
            cache.set(key, value)
            return value
        }
    }
}

/**
 * Hash for static styles cache
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
 * Generic hash for a string
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
 * Get a unique class name
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
 * Generate a CSS class with support for complex selectors
 * Optimized to minimize allocations and iterations
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
            // @media, @container, @supports
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertRule(`${key}{.${uniqueName}{${innerCss}}}`)
            }
        } else if (firstChar === '&') {
            // Complex selectors (& > div, &:nth-child, etc.)
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertRule(`${key.replace(/&/g, `.${uniqueName}`)}{${innerCss}}`)
            }
        } else if (firstChar === ':') {
            // Pseudo-classes (:hover, :focus, etc.)
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertRule(`.${uniqueName}${key}{${innerCss}}`)
            }
        } else if (value != null && typeof value !== 'object') {
            // Simple CSS properties
            baseCss += `${toKebabCase(key)}:${toCssValue(key, value)};`
        }
    }

    // Inject base rule
    if (baseCss) {
        insertRule(`.${uniqueName}{${baseCss}}`)
    }

    if (useCache) {
        staticStyleCache.set(hashStyles(styles), uniqueName)
    }

    return uniqueName
}

/**
 * Check if a keyframe already exists
 */
export const hasKeyframes = (css: string): boolean => {
    return injectedKeyframes.has(css)
}

/**
 * Add a keyframe to the registry
 */
export const addKeyframes = (css: string): void => {
    injectedKeyframes.add(css)
}

/**
 * Get the next keyframe ID
 */
export const getNextKeyframeId = (): string => {
    return (++keyframeCounter).toString(36)
}

/**
 * Check if a font-face already exists
 */
export const hasFontFace = (css: string): boolean => {
    return injectedFontFaces.has(css)
}

/**
 * Add a font-face to the registry
 */
export const addFontFace = (css: string): void => {
    injectedFontFaces.add(css)
}

/**
 * Get SSR rules
 */
export const getSSRRulesInternal = (): string[] => {
    return ssrRules
}

/**
 * Reset SSR state
 */
export const resetState = (): void => {
    ssrRules = []
    staticStyleCache.clear()
    usedClassNames.clear()
    injectedKeyframes.clear()
    injectedFontFaces.clear()
    keyframeCounter = 0
}

