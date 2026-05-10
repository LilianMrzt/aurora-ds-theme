import * as React from 'react'
import { createContext, useContext, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'

import { setThemeContextGetter, toKebabCase, insertRule, setResponsiveBreakpoints } from '@/utils/styles/styleEngine'

import type { _InternalTheme } from '@/types'

const IS_SERVER = typeof document === 'undefined'
const THEME_STYLE_ID = 'aurora-theme-variables'
const THEME_TRANSITION_STYLE_ID = 'aurora-theme-transition'
const DISABLE_TRANSITIONS_CLASS = 'aurora-disable-transitions'
const FORCE_TRANSITIONS_CLASS = 'aurora-force-transitions'

/**
 * Use `useInsertionEffect` when available (React 18+) so that style mutations
 * happen *before* layout effects of children — this is the official React API
 * for CSS-in-JS libraries and avoids any FOUC during commit. Falls back to
 * `useLayoutEffect` on older React versions.
 * @internal
 */
const useInsertionEffect: typeof useLayoutEffect =
    (React as unknown as { useInsertionEffect?: typeof useLayoutEffect }).useInsertionEffect
    ?? useLayoutEffect

let transitionRuleInjected = false

/**
 * Injects global CSS rule to disable transitions during theme switch.
 * @internal
 */
const injectDisableTransitionsRule = (): void => {
    if (transitionRuleInjected || IS_SERVER) {
        return
    }
    insertRule(`.${DISABLE_TRANSITIONS_CLASS} *,.${DISABLE_TRANSITIONS_CLASS} *::before,.${DISABLE_TRANSITIONS_CLASS} *::after{transition:none!important}`)
    transitionRuleInjected = true
}

/**
 * Injects/updates global CSS rule to force color transitions during theme switch.
 * @internal
 */
const injectForceTransitionsRule = (durationMs: number): void => {
    if (IS_SERVER) {
        return
    }

    let styleElement = document.getElementById(THEME_TRANSITION_STYLE_ID) as HTMLStyleElement | null

    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = THEME_TRANSITION_STYLE_ID
        document.head.appendChild(styleElement)
    }

    styleElement.textContent = `.${FORCE_TRANSITIONS_CLASS} *,.${FORCE_TRANSITIONS_CLASS} *::before,.${FORCE_TRANSITIONS_CLASS} *::after{transition:color ${durationMs}ms,background-color ${durationMs}ms,border-color ${durationMs}ms,fill ${durationMs}ms,stroke ${durationMs}ms!important}`
}

const ThemeContext = createContext<_InternalTheme | undefined>(undefined)

/**
 * Generates CSS variables string from a theme object.
 * @internal
 */
const generateCSSVariables = (
    obj: Record<string, unknown>,
    prefix = 'theme'
): string => {
    let css = ''
    for (const key in obj) {
        const value = obj[key]
        const varName = `${prefix}-${toKebabCase(key)}`
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            css += generateCSSVariables(value as Record<string, unknown>, varName)
        } else if (value != null) {
            css += `--${varName}:${value};`
        }
    }
    return css
}

export type ThemeProviderProps = {
    theme: _InternalTheme
    /**
     * Whether to disable CSS transitions during theme changes.
     * This prevents visual glitches when switching themes.
     * Ignored if `transitionDuration` is set.
     * @default true
     */
    disableTransitionsOnChange?: boolean
    /**
     * Duration in milliseconds for color transitions during theme changes.
     * When set, forces a smooth transition on all color-related properties
     * (color, background-color, border-color, fill, stroke).
     * Takes precedence over `disableTransitionsOnChange`.
     */
    transitionDuration?: number
    children?: ReactNode
}

/**
 * Provides the theme to all child components.
 * Injects CSS variables into :root for dynamic theme switching.
 *
 * @example
 * ```tsx
 * <ThemeProvider theme={lightTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = ({
    theme,
    disableTransitionsOnChange = true,
    transitionDuration,
    children
}: ThemeProviderProps) => {
    const previousGetter = setThemeContextGetter(() => theme)
    const isFirstRender = useRef(true)
    const lastInjectedCssRef = useRef<string | null>(null)

    // Register responsive breakpoints from theme.breakpoints (if present) so
    // that `padding: { base, md, lg }` style tokens can be expanded into
    // matching @media rules by the engine. Done synchronously during render
    // so that any createStyles call following the provider mount sees the
    // up-to-date breakpoint registry.
    const breakpoints = (theme as unknown as { breakpoints?: Record<string, string | number> }).breakpoints
    setResponsiveBreakpoints(breakpoints)

    // Generate CSS variables string from theme
    const cssVariables = useMemo(() => generateCSSVariables(theme), [theme])

    // Inject CSS variables into :root
    useInsertionEffect(() => {
        if (IS_SERVER) {
            return
        }

        const isThemeChange = !isFirstRender.current
        const useForceTransition = transitionDuration !== undefined && transitionDuration > 0
        const shouldDisableTransitions = disableTransitionsOnChange && !useForceTransition && isThemeChange

        // Inject the disable-transitions rule once (if needed)
        if (shouldDisableTransitions) {
            injectDisableTransitionsRule()
            document.documentElement.classList.add(DISABLE_TRANSITIONS_CLASS)
        }

        // Force color transitions if transitionDuration is set
        if (useForceTransition && isThemeChange) {
            injectForceTransitionsRule(transitionDuration)
            document.documentElement.classList.add(FORCE_TRANSITIONS_CLASS)
        }

        let styleElement = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null

        if (!styleElement) {
            styleElement = document.createElement('style')
            styleElement.id = THEME_STYLE_ID
            document.head.appendChild(styleElement)
        }

        // Skip the DOM write if the resulting CSS is identical to the previous
        // injection — this avoids an unnecessary style recalc when the user
        // re-creates the theme object on every render without memoizing it.
        const nextCss = `:root{${cssVariables}}`
        if (lastInjectedCssRef.current !== nextCss) {
            styleElement.textContent = nextCss
            lastInjectedCssRef.current = nextCss
        }

        // Re-enable transitions after styles are applied
        if (shouldDisableTransitions) {
            // Use requestAnimationFrame to ensure styles are applied before re-enabling
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.documentElement.classList.remove(DISABLE_TRANSITIONS_CLASS)
                })
            })
        }

        // Remove force transitions class after animation completes
        if (useForceTransition && isThemeChange) {
            const timeoutId = setTimeout(() => {
                document.documentElement.classList.remove(FORCE_TRANSITIONS_CLASS)
            }, transitionDuration)

            isFirstRender.current = false

            return () => {
                clearTimeout(timeoutId)
            }
        }

        isFirstRender.current = false
    }, [cssVariables, disableTransitionsOnChange, transitionDuration])

    useLayoutEffect(() => {
        return () => {
            setThemeContextGetter(previousGetter)
        }
    }, [previousGetter])

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

/**
 * Hook to access the current theme.
 *
 * Type is automatically inferred from ThemeRegistry (module augmentation).
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const theme = useTheme()
 *   return <div style={{ color: theme.colors.primary }} />
 * }
 * ```
 *
 * @throws {Error} If used outside a ThemeProvider
 */
export const useTheme = (): _InternalTheme => {
    const theme = useContext(ThemeContext)

    if (!theme) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return theme
}

