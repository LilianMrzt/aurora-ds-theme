import { createContext, FC, useContext, useLayoutEffect } from 'react'

import { setThemeContextGetter } from '@/utils/styles/styleEngine'

import type { ThemeProviderProps } from './ThemeProvider.props'
import type { Theme } from '@/types/Theme'

const ThemeContext = createContext<Theme | undefined>(undefined)

/**
 * Theme provider component
 * Provides theme context to all child components
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ theme, children }) => {
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
 * @throws {Error} If used outside of a ThemeProvider
 */
export const useTheme = (): Theme => {
    const theme = useContext(ThemeContext)

    if (!theme) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return theme
}

