import {
    cacheKeyToSuffix,
    createCacheKey,
    generateModuleCssClass,
    getModuleStyleSheet,
    hashString,
    setCurrentModuleContext,
    trackModuleDynamicRule,
    toKebabCase,
    toKebabCaseClassName
} from './styleEngine'

import type { StyleFunction, StyleWithPseudos } from './types'
import type { _InternalTheme } from '@/types'

/**
 * Tracks module IDs to detect collisions and disambiguate.
 * Maps moduleId → full stack signature that created it.
 * @internal
 */
const moduleRegistry = new Map<string, string>()

/**
 * Extracts component name from stack trace for class naming.
 * Uses a hash of the full file path to disambiguate same-name files in different folders.
 * @internal
 */
const getModuleId = (): string => {
    const stack = new Error().stack || ''

    // Try to match *.styles.ts/js pattern first
    const styleMatch = stack.match(/([A-Za-z0-9_]+)\.styles\.[tj]s/)
    const baseName = styleMatch?.[1]
        ? toKebabCaseClassName(styleMatch[1])
        : (() => {
            const fileMatch = stack.match(/\/([A-Za-z0-9_]+)\.[tj]sx?[:\d]*\)?$/m)
            return (fileMatch?.[1] && fileMatch[1] !== 'createStyles')
                ? toKebabCaseClassName(fileMatch[1])
                : 'style'
        })()

    // Extract the full file path for disambiguation
    const pathMatch = stack.match(/(?:at\s+.*?\(|at\s+)((?:[A-Za-z]:)?[^\s)]+\.styles\.[tj]s)/) ||
                      stack.match(/(?:at\s+.*?\(|at\s+)((?:[A-Za-z]:)?[^\s)]+\.[tj]sx?)[:\d]*\)?/m)
    const filePath = pathMatch?.[1] || ''

    // If the baseName is already registered by the same file, return it as-is (HMR case)
    const existing = moduleRegistry.get(baseName)
    if (existing === filePath) {
        return baseName
    }

    // If not registered yet, claim it
    if (!existing) {
        moduleRegistry.set(baseName, filePath)
        return baseName
    }

    // Collision: different file wants the same baseName → disambiguate with path hash
    const disambiguated = `${baseName}-${hashString(filePath)}`
    moduleRegistry.set(disambiguated, filePath)
    return disambiguated
}

/**
 * Singleton CSS variable theme proxy.
 * Stateless — always returns var(--theme-xxx) references regardless of actual theme.
 * Created lazily on first use, then reused for all subsequent createStyles calls.
 * @internal
 */
let cssVarThemeSingleton: _InternalTheme | null = null

/**
 * Creates a theme proxy that returns CSS variable references instead of actual values.
 * Supports any theme structure with unlimited nesting depth.
 * Each property access returns a value that:
 * - Can be used as a string (returns var(--theme-path))
 * - Can be accessed further for nested properties
 * @internal
 */
const createCSSVariableTheme = (): _InternalTheme => {
    if (cssVarThemeSingleton) { return cssVarThemeSingleton }

    const createNestedProxy = (path: string): unknown => {
        const getValue = () => `var(--theme-${path})`

        return new Proxy(getValue, {
            get(_, prop) {
                if (prop === Symbol.toPrimitive) {
                    return getValue
                }

                if (typeof prop !== 'string') {
                    return undefined
                }

                if (prop === 'toString' || prop === 'valueOf') {
                    return getValue
                }

                const kebabProp = toKebabCase(prop)
                const newPath = path ? `${path}-${kebabProp}` : kebabProp

                return createNestedProxy(newPath)
            },

            apply() {
                return getValue()
            }
        })
    }

    cssVarThemeSingleton = createNestedProxy('') as _InternalTheme
    return cssVarThemeSingleton
}

/**
 * Processes styles object and generates CSS classes using a module-specific stylesheet.
 * Static styles are injected immediately. Dynamic styles inject on first call per args.
 * @internal
 */
const processStyles = <T extends Record<string, StyleWithPseudos | StyleFunction>>(
    styles: T,
    componentName: string,
    moduleSheet: CSSStyleSheet | null
): Record<string, string | ((...args: unknown[]) => string)> => {
    const classes = {} as Record<string, string | ((...args: unknown[]) => string)>

    for (const key in styles) {
        const style = styles[key]
        if (style) {
            const baseName = `${componentName}-${toKebabCaseClassName(key)}`
            if (typeof style === 'function') {
                classes[key] = (...args: unknown[]) => {
                    const cacheKey = createCacheKey(args)
                    const className = `${baseName}-${cacheKeyToSuffix(cacheKey)}`
                    // Only inject if not already injected in this HMR cycle
                    if (!trackModuleDynamicRule(componentName, className)) {
                        const resolved = (style as (...a: unknown[]) => StyleWithPseudos)(...args)
                        generateModuleCssClass(resolved, className, moduleSheet)
                    }
                    return className
                }
            } else {
                generateModuleCssClass(style, baseName, moduleSheet)
                classes[key] = baseName
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
    const componentName = getModuleId()
    const moduleSheet = getModuleStyleSheet(componentName)

    // Set module context so keyframes()/fontFace() calls inject into the module sheet
    setCurrentModuleContext(componentName, moduleSheet)
    try {
        if (typeof stylesOrCreator === 'function') {
            const cssVarTheme = createCSSVariableTheme()
            const styles = stylesOrCreator(cssVarTheme)
            return processStyles(styles, componentName, moduleSheet) as Result
        }

        return processStyles(stylesOrCreator, componentName, moduleSheet) as Result
    } finally {
        setCurrentModuleContext(null)
    }
}
