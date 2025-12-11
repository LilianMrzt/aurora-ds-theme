import type { StyleWithPseudos } from './types'
import type { Theme } from '@/types/Theme'

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
 * Convert values to valid CSS
 */
export const toCssValue = (key: string, value: unknown): string => {
    if (typeof value === 'number' && !UNITLESS_PROPERTIES.has(key)) {
        return `${value}px`
    }
    return String(value)
}

/**
 * Convert a styles object to CSS (simple properties only)
 * Optimized to avoid unnecessary allocations
 */
export const objectToCss = (obj: Record<string, unknown>): string => {
    const parts: string[] = []
    for (const key in obj) {
        const value = obj[key]
        if (value != null && typeof value !== 'object') {
            parts.push(`${toKebabCase(key)}:${toCssValue(key, value)}`)
        }
    }
    return parts.join(';') + (parts.length ? ';' : '')
}

/**
 * Convert an & selector to a valid CSS selector
 */
export const resolveAmpersandSelector = (selector: string, className: string): string => {
    return selector.replace(/&/g, `.${className}`)
}

/**
 * Create a cache key from arguments
 */
export const createCacheKey = (args: unknown[]): string => {
    const len = args.length
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
    if (key === 'true' || key === 'false' || /^-?\d+$/.test(key)) {
        return key
    }
    if (/^[a-z][a-z0-9]*$/i.test(key)) {
        return toKebabCaseClassName(key)
    }
    let hash = 5381
    for (let i = 0; i < key.length; i++) {
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
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
    }
    return (hash >>> 0).toString(36)
}

/**
 * Generic hash for a string
 */
export const hashString = (str: string): string => {
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
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
    let name = `${baseName}-${counter}`
    while (usedClassNames.has(name)) {
        name = `${baseName}-${++counter}`
    }
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
    const baseParts: string[] = []
    const specialRules: string[] = []

    for (const key in styles) {
        const value = (styles as Record<string, unknown>)[key]
        const firstChar = key[0]

        if (firstChar === '@') {
            // @media, @container, @supports
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                specialRules.push(`${key}{.${uniqueName}{${innerCss}}}`)
            }
        } else if (firstChar === '&') {
            // Complex selectors (& > div, &:nth-child, etc.)
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                const resolvedSelector = key.replace(/&/g, `.${uniqueName}`)
                specialRules.push(`${resolvedSelector}{${innerCss}}`)
            }
        } else if (firstChar === ':') {
            // Pseudo-classes (:hover, :focus, etc.)
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                specialRules.push(`.${uniqueName}${key}{${innerCss}}`)
            }
        } else if (value != null && typeof value !== 'object') {
            // Simple CSS properties
            baseParts.push(`${toKebabCase(key)}:${toCssValue(key, value)}`)
        }
    }

    // Inject rules
    if (baseParts.length) {
        insertRule(`.${uniqueName}{${baseParts.join(';')}}`)
    }
    for (const rule of specialRules) {
        insertRule(rule)
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

