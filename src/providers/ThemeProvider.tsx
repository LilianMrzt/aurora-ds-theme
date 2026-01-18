import { createContext, useContext, useLayoutEffect, type ReactNode } from 'react'

import { setThemeContextGetter } from '@/utils/styles/styleEngine'

import type { _InternalTheme } from '@/types'


const ThemeContext = createContext<_InternalTheme | undefined>(undefined)

export type ThemeProviderProps = {
    theme: _InternalTheme
    children?: ReactNode
}

/**
 * Provides the theme to all child components.
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

