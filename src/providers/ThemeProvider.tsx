import { createContext, useContext, useLayoutEffect, type ReactNode } from 'react'

import { setThemeContextGetter } from '@/utils/styles/styleEngine'

import type { Theme } from '@/types'


const ThemeContext = createContext<Theme | undefined>(undefined)

export type ThemeProviderProps<T extends Theme = Theme> = {
    theme: T
    children?: ReactNode
}

/**
 * Theme provider component.
 * Provides theme context to all child components.
 *
 * **Type Inference:** The theme type is automatically propagated to createStyles
 * and useTheme used within this provider. No type annotations needed!
 *
 * @example
 * ```tsx
 * const themeDefinition = defineTheme({
 *   colors: { primary: null, secondary: null },
 *   spacing: { sm: null, md: null }
 * })
 *
 * const myTheme = createTheme(themeDefinition, {
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * // Wrap your app
 * <ThemeProvider theme={myTheme}>
 *   <App />  // createStyles and useTheme get full autocomplete!
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = <T extends Theme>({
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
 * Hook to access the current theme with automatic type inference.
 *
 * The theme type is automatically inferred from the ThemeRegistry.
 * No type annotation needed!
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const theme = useTheme()
 *
 *   // ✅ Full autocomplete on theme.colors, theme.spacing, etc.
 *   return <div style={{ color: theme.colors.primary }} />
 * }
 * ```
 *
 * @throws {Error} If used outside a ThemeProvider
 */
export const useTheme = <T extends Theme = Theme>(): T => {
    const theme = useContext(ThemeContext)

    if (!theme) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return theme as T
}

