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
 * Dev-only flag, dead-code-eliminated in production builds.
 * @internal
 */
const __DEV__ = typeof process !== 'undefined'
    && typeof process.env !== 'undefined'
    && process.env.NODE_ENV !== 'production'

/**
 * Set of stable module ids for which the React-component anti-pattern warning
 * has already fired, so we never spam the console more than once per module.
 * @internal
 */
const reactComponentWarningSeen = new Set<string>()

/**
 * Heuristic that flags `createStyles` calls happening inside a React render.
 * Looks for tell-tale frame names (`renderWithHooks`, `react-dom`, `react-stack-bottom-frame`).
 * Only runs in dev. Safe to skip in any other environment (no-op).
 * @internal
 */
const detectReactComponentMisuse = (id: string): void => {
    if (!__DEV__) { return }
    if (reactComponentWarningSeen.has(id)) { return }
    const stack = new Error().stack || ''
    if (!/(renderWithHooks|react-dom|react-stack-bottom-frame|beginWork)/.test(stack)) { return }
    reactComponentWarningSeen.add(id)
    // eslint-disable-next-line no-console
    console.warn(
        `[aurora-ds] createStyles("${id}") was called from inside a React render. ` +
        'Move it to module top-level — calling it on every render creates a new stylesheet ' +
        'each time, hurting performance and breaking caching.'
    )
}

/**
 * Tracks module IDs to detect collisions and disambiguate.
 * Maps moduleId → full stack signature that created it.
 * @internal
 */
const moduleRegistry = new Map<string, string>()

/**
 * Monotonic counter used as a fallback when the calling module cannot be
 * identified from the stack trace (e.g., minified production bundles where
 * `*.styles.ts` filenames have been stripped). Guarantees each
 * `createStyles()` call gets a unique module id, preventing different
 * components inside the same chunk from sharing — and clobbering — the
 * same module stylesheet.
 * @internal
 */
let anonymousModuleCounter = 0

/**
 * Extracts component name from stack trace for class naming.
 * Uses a hash of the full file path to disambiguate same-name files in different folders.
 *
 * In production builds, bundlers (Vite/webpack/etc.) minify and merge source
 * files into hashed chunks, so the original `*.styles.[tj]s` filenames are
 * lost from stack traces. When that happens we fall back to a monotonic
 * counter so that each `createStyles` call gets its own module sheet
 * instead of all of them sharing a single name (which used to cause
 * `getModuleStyleSheet` to wipe each other's rules via the HMR reset path).
 * @internal
 */
const getModuleId = (): string => {
    const stack = new Error().stack || ''

    // Try to match *.styles.ts/js pattern first (works in dev / non-minified builds)
    const styleMatch = stack.match(/([A-Za-z0-9_]+)\.styles\.[tj]s/)

    if (!styleMatch?.[1]) {
        // Production / minified build path: original module name is unrecoverable.
        // Allocate a fresh, unique id per call so module sheets never collide.
        return `s${(anonymousModuleCounter++).toString(36)}`
    }

    const baseName = toKebabCaseClassName(styleMatch[1])

    // Extract the full file path for disambiguation (same-name files in different folders)
    const pathMatch = stack.match(/(?:at\s+.*?\(|at\s+)((?:[A-Za-z]:)?[^\s)]+\.styles\.[tj]s)/)
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
 * Options for {@link createStyles}.
 */
export type CreateStylesOptions = {
    /**
     * Explicit, stable module id used to namespace generated class names.
     *
     * **Strongly recommended in production** to avoid relying on
     * `Error().stack` parsing, which is fragile across engines and
     * unreliable after minification. When provided, this id is used as-is
     * (after kebab-casing) and guarantees deterministic class names across
     * builds, SSR ↔ CSR boundaries and HMR cycles.
     *
     * @example
     * ```ts
     * // Button.styles.ts
     * export const styles = createStyles((theme) => ({ ... }), { id: 'button' })
     * ```
     */
    id?: string
}

/**
 * Creates styles with theme support. Type is inferred from ThemeRegistry.
 * Supports pseudo-classes, media queries, and complex selectors.
 *
 * Uses CSS variables (var(--theme-xxx)) for dynamic theme switching.
 * Theme values are automatically updated when ThemeProvider's theme changes.
 *
 * @param stylesOrCreator - Static styles object or function that receives theme
 * @param options - Optional configuration. Pass `{ id }` to opt-out of stack-trace based
 *                  module identification (recommended for production / SSR setups).
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
 * // Or with an explicit id (recommended in production):
 * const styles = createStyles((theme) => ({ ... }), { id: 'my-component' })
 * ```
 */
export const createStyles = <
    T extends Record<string, StyleWithPseudos | StyleFunction> = Record<string, StyleWithPseudos | StyleFunction>
>(
        stylesOrCreator: T | ((theme: _InternalTheme) => T),
        options?: CreateStylesOptions
    ): { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string } => {
    type Result = { [K in keyof T]: T[K] extends (...args: infer TArgs) => StyleWithPseudos ? (...args: TArgs) => string : string }
    const componentName = options?.id
        ? toKebabCaseClassName(options.id)
        : getModuleId()

    detectReactComponentMisuse(componentName)

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
