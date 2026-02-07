import { createContext, useContext, useLayoutEffect, useMemo, type ReactNode } from 'react'

import { setThemeContextGetter, toKebabCase } from '@/utils/styles/styleEngine'

import type { _InternalTheme } from '@/types'

const IS_SERVER = typeof document === 'undefined'
const THEME_STYLE_ID = 'aurora-theme-variables'

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
    children
}: ThemeProviderProps) => {
    const previousGetter = setThemeContextGetter(() => theme)

    // Generate CSS variables string from theme
    const cssVariables = useMemo(() => generateCSSVariables(theme), [theme])

    // Inject CSS variables into :root
    useLayoutEffect(() => {
        if (IS_SERVER) {
            return
        }

        let styleElement = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null

        if (!styleElement) {
            styleElement = document.createElement('style')
            styleElement.id = THEME_STYLE_ID
            document.head.appendChild(styleElement)
        }

        styleElement.textContent = `:root{${cssVariables}}`
    }, [cssVariables])

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

