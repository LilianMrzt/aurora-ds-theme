import { createContext, useContext, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'

import { setThemeContextGetter, toKebabCase, insertRule } from '@/utils/styles/styleEngine'

import type { _InternalTheme } from '@/types'

const IS_SERVER = typeof document === 'undefined'
const THEME_STYLE_ID = 'aurora-theme-variables'
const DISABLE_TRANSITIONS_CLASS = 'aurora-disable-transitions'

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
     * @default true
     */
    disableTransitionsOnChange?: boolean
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
    children
}: ThemeProviderProps) => {
    const previousGetter = setThemeContextGetter(() => theme)
    const isFirstRender = useRef(true)

    // Generate CSS variables string from theme
    const cssVariables = useMemo(() => generateCSSVariables(theme), [theme])

    // Inject CSS variables into :root
    useLayoutEffect(() => {
        if (IS_SERVER) {
            return
        }

        // Inject the disable-transitions rule once
        if (disableTransitionsOnChange) {
            injectDisableTransitionsRule()
        }

        // Disable transitions during theme change (skip first render)
        const shouldDisableTransitions = disableTransitionsOnChange && !isFirstRender.current

        if (shouldDisableTransitions) {
            document.documentElement.classList.add(DISABLE_TRANSITIONS_CLASS)
        }

        let styleElement = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null

        if (!styleElement) {
            styleElement = document.createElement('style')
            styleElement.id = THEME_STYLE_ID
            document.head.appendChild(styleElement)
        }

        styleElement.textContent = `:root{${cssVariables}}`

        // Re-enable transitions after styles are applied
        if (shouldDisableTransitions) {
            // Use requestAnimationFrame to ensure styles are applied before re-enabling
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.documentElement.classList.remove(DISABLE_TRANSITIONS_CLASS)
                })
            })
        }

        isFirstRender.current = false
    }, [cssVariables, disableTransitionsOnChange])

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

