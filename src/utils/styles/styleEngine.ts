import type { StyleWithPseudos } from './types'
import type { _InternalTheme } from '@/types'

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

const injectedKeyframes = new Set<string>()
const injectedFontFaces = new Set<string>()

/**
 * Tracks which keyframes/font-faces belong to which module for HMR invalidation.
 * Maps componentName → Set of css strings injected by that module.
 * @internal
 */
const moduleKeyframes = new Map<string, Set<string>>()
const moduleFontFaces = new Map<string, Set<string>>()

/**
 * Current module context for keyframes/fontFace injection scoping.
 * When non-null, keyframes/fontFace calls will inject into the module's sheet
 * and track their cache entries for HMR invalidation.
 * @internal
 */
let currentModuleContext: { name: string; sheet: CSSStyleSheet | null } | null = null

const UNITLESS_PROPERTIES = new Set([
    'animationIterationCount', 'columnCount', 'fillOpacity', 'flexGrow', 'flexShrink',
    'fontWeight', 'lineHeight', 'opacity', 'order', 'orphans', 'widows', 'zIndex', 'zoom'
])


/**
 * Registry of per-module stylesheets for HMR support.
 * Maps componentName to its dedicated CSSStyleSheet.
 * @internal
 */
const moduleStyleSheets = new Map<string, CSSStyleSheet>()

/**
 * Tracks injected dynamic rule keys per module for deduplication within a single HMR cycle.
 * Maps componentName to a Set of className strings already injected.
 * @internal
 */
const moduleDynamicRules = new Map<string, Set<string>>()

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
export const setThemeContextGetter = <T extends _InternalTheme>(getter: (() => T | undefined) | null): (() => any) | null => {
    const previous = themeContextGetter
    themeContextGetter = getter
    return previous
}

/**
 * Returns the current theme from the context.
 * @internal
 */
export const getTheme = (): _InternalTheme | undefined => {
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
 * Creates or retrieves a dedicated stylesheet for a module (identified by componentName).
 * On subsequent calls with the same name (HMR), clears all existing rules.
 * @internal
 */
export const getModuleStyleSheet = (componentName: string): CSSStyleSheet | null => {
    if (IS_SERVER) { return null }

    const existing = moduleStyleSheets.get(componentName)
    if (existing) {
        // HMR path: clear all existing rules so they can be re-injected with new values
        const rulesLen = existing.cssRules.length
        for (let i = rulesLen - 1; i >= 0; i--) {
            existing.deleteRule(i)
        }
        // Reset dynamic rules tracking for this module
        moduleDynamicRules.delete(componentName)
        // Invalidate keyframes/font-faces caches for this module so they can be re-injected
        const modKf = moduleKeyframes.get(componentName)
        if (modKf) {
            modKf.forEach(css => injectedKeyframes.delete(css))
            modKf.clear()
        }
        const modFf = moduleFontFaces.get(componentName)
        if (modFf) {
            modFf.forEach(css => injectedFontFaces.delete(css))
            modFf.clear()
        }
        return existing
    }

    const style = document.createElement('style')
    style.id = `aurora-mod-${componentName}`
    style.setAttribute('data-aurora-module', componentName)
    document.head.appendChild(style)
    const sheet = style.sheet as CSSStyleSheet
    moduleStyleSheets.set(componentName, sheet)
    return sheet
}

/**
 * Inserts a CSS rule into a specific module stylesheet (or SSR buffer).
 * @internal
 */
export const insertModuleRule = (sheet: CSSStyleSheet | null, rule: string): void => {
    if (IS_SERVER) {
        ssrRules.push(rule)
    } else if (sheet) {
        try {
            sheet.insertRule(rule, sheet.cssRules.length)
        } catch {
            // Ignore errors (invalid rules)
        }
    }
}

const AMPERSAND_RE = /&/g

/**
 * Generates CSS class using a dedicated module stylesheet.
 * Uses deterministic class names (no uniqueness suffix) for HMR stability.
 * @internal
 */
export const generateModuleCssClass = (
    styles: StyleWithPseudos,
    className: string,
    sheet: CSSStyleSheet | null
): string => {
    let baseCss = ''
    const dotClass = `.${className}`

    for (const key in styles) {
        const value = (styles as Record<string, unknown>)[key]
        const firstChar = key.charCodeAt(0)

        if (firstChar === 64 /* @ */) {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertModuleRule(sheet, `${key}{${dotClass}{${innerCss}}}`)
            }
        } else if (firstChar === 38 /* & */) {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                AMPERSAND_RE.lastIndex = 0
                insertModuleRule(sheet, `${key.replace(AMPERSAND_RE, dotClass)}{${innerCss}}`)
            }
        } else if (firstChar === 58 /* : */) {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                insertModuleRule(sheet, `${dotClass}${key}{${innerCss}}`)
            }
        } else if (value != null && typeof value !== 'object') {
            baseCss += `${toKebabCase(key)}:${toCssValue(key, value)};`
        }
    }

    if (baseCss) {
        insertModuleRule(sheet, `${dotClass}{${baseCss}}`)
    }

    return className
}

/**
 * Max tracked dynamic rules per module before disabling deduplication.
 * Prevents unbounded memory growth with highly variable dynamic args.
 * @internal
 */
const MAX_DYNAMIC_RULES_PER_MODULE = 500

/**
 * Tracks a dynamic rule for a module to avoid duplicate injection within one HMR cycle.
 * Returns true if the rule was already injected (skip), false if it's new (inject).
 * When the cap is reached, always returns false (re-inject) to prevent memory leaks.
 * @internal
 */
export const trackModuleDynamicRule = (componentName: string, ruleKey: string): boolean => {
    let set = moduleDynamicRules.get(componentName)
    if (!set) {
        set = new Set()
        moduleDynamicRules.set(componentName, set)
    }
    if (set.has(ruleKey)) { return true }
    // Cap reached: don't track more, but don't block injection
    if (set.size >= MAX_DYNAMIC_RULES_PER_MODULE) { return false }
    set.add(ruleKey)
    return false
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
 * Results are cached for repeated lookups.
 * @internal
 */
const classNameCache = new Map<string, string>()
export const toKebabCaseClassName = (name: string): string => {
    let cached = classNameCache.get(name)
    if (!cached) {
        cached = name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .toLowerCase()
        classNameCache.set(name, cached)
    }
    return cached
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
 * Skips sanitization for CSS variable references (safe by construction).
 * @internal
 */
export const toCssValue = (key: string, value: unknown): string => {
    if (typeof value === 'number') {
        return UNITLESS_PROPERTIES.has(key) ? String(value) : `${value}px`
    }
    const str = String(value)
    // CSS variable references from the theme proxy are safe by construction
    if (str.charCodeAt(0) === 118 /* 'v' */ && str.startsWith('var(--')) {
        return str
    }
    return sanitizeCssValue(str)
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
    return hashString(key)
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
 * Sets the current module context for keyframes/fontFace scoping.
 * @internal
 */
export const setCurrentModuleContext = (name: string | null, sheet: CSSStyleSheet | null = null): void => {
    currentModuleContext = name ? { name, sheet } : null
}

/**
 * Checks if keyframes CSS has already been injected.
 * @internal
 */
export const hasKeyframes = (css: string): boolean => {
    return injectedKeyframes.has(css)
}

/**
 * Registers keyframes CSS as injected and tracks it per-module for HMR invalidation.
 * @internal
 */
export const addKeyframes = (css: string): void => {
    injectedKeyframes.add(css)
    if (currentModuleContext) {
        let set = moduleKeyframes.get(currentModuleContext.name)
        if (!set) {
            set = new Set()
            moduleKeyframes.set(currentModuleContext.name, set)
        }
        set.add(css)
    }
}

/**
 * Returns a deterministic keyframe name based on content hash.
 * @internal
 */
export const getKeyframeName = (css: string): string => {
    return `aurora-kf-${hashString(css)}`
}

/**
 * Inserts a keyframe rule into the appropriate stylesheet (module or global).
 * @internal
 */
export const insertKeyframeRule = (rule: string): void => {
    if (currentModuleContext?.sheet) {
        insertModuleRule(currentModuleContext.sheet, rule)
    } else {
        insertRule(rule)
    }
}

/**
 * Checks if font-face CSS has already been injected.
 * @internal
 */
export const hasFontFace = (css: string): boolean => {
    return injectedFontFaces.has(css)
}

/**
 * Registers font-face CSS as injected and tracks it per-module for HMR invalidation.
 * @internal
 */
export const addFontFace = (css: string): void => {
    injectedFontFaces.add(css)
    if (currentModuleContext) {
        let set = moduleFontFaces.get(currentModuleContext.name)
        if (!set) {
            set = new Set()
            moduleFontFaces.set(currentModuleContext.name, set)
        }
        set.add(css)
    }
}

/**
 * Inserts a font-face rule into the appropriate stylesheet (module or global).
 * @internal
 */
export const insertFontFaceRule = (rule: string): void => {
    if (currentModuleContext?.sheet) {
        insertModuleRule(currentModuleContext.sheet, rule)
    } else {
        insertRule(rule)
    }
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
    injectedKeyframes.clear()
    injectedFontFaces.clear()
    moduleKeyframes.clear()
    moduleFontFaces.clear()
    currentModuleContext = null
    if (!IS_SERVER) {
        moduleStyleSheets.forEach((_, key) => {
            const el = document.getElementById(`aurora-mod-${key}`)
            if (el) { el.remove() }
        })
    }
    moduleStyleSheets.clear()
    moduleDynamicRules.clear()
}

