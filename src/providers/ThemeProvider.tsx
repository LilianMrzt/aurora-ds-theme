import { createContext, useContext, useLayoutEffect, type ReactNode } from 'react'

import { setThemeContextGetter } from '@/utils/styles/styleEngine'

import type { BaseTheme } from '@/types/Theme'

const ThemeContext = createContext<BaseTheme | undefined>(undefined)

export type ThemeProviderProps<T extends BaseTheme = BaseTheme> = {
    theme: T
    children?: ReactNode
}

/**
 * Theme provider component
 * Provides theme context to all child components
 *
 * @example
 * ```tsx
 * // With default theme
 * <ThemeProvider theme={defaultTheme}>
 *     <App />
 * </ThemeProvider>
 *
 * // With custom extended theme
 * <ThemeProvider theme={myCustomTheme}>
 *     <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = <T extends BaseTheme>({
    theme,
    children
}: ThemeProviderProps<T>) => {
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
 * Hook to access the current theme
 * Use the generic parameter to get proper typing for extended themes
 *
 * @example
 * ```tsx
 * // Basic usage
 * const theme = useTheme()
 *
 * // With custom theme type
 * const theme = useTheme<MyCustomTheme>()
 * ```
 *
 * @throws {Error} If used outside a ThemeProvider
 */
export const useTheme = <T extends BaseTheme = BaseTheme>(): T => {
    const theme = useContext(ThemeContext)

    if (!theme) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return theme as T
}

