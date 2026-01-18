/**
 * @aurora-ds/theme - Minimalist and Type-Safe API
 *
 * Philosophy:
 * 1. The library provides NO default theming
 * 2. You define the ENTIRE structure via `defineTheme`
 * 3. `defineTheme` is required - `createTheme` needs a definition
 *
 * @example
 * ```typescript
 * // 1. Define the structure
 * const themeDefinition = defineTheme({
 *   colors: { primary: null, secondary: null },
 *   spacing: { sm: null, md: null }
 * })
 *
 * // 2. Create a conforming theme
 * const myTheme = createTheme(themeDefinition, {
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * // 3. Use with full type-safety
 * const useStyles = createStyles((theme) => ({
 *   root: { color: theme.colors.primary }
 * }))
 *
 * // 4. Extract theme type for your components
 * type AppTheme = typeof myTheme  // ✅ Automatically inferred
 * ```
 */


// ============================================================================
// Core API
// ============================================================================

export { defineTheme, createTheme } from './utils/theme'

// ============================================================================
// Providers & Hooks
// ============================================================================

export { ThemeProvider, useTheme } from './providers/ThemeProvider'
export type { ThemeProviderProps } from './providers/ThemeProvider'

// ============================================================================
// Style Utilities
// ============================================================================

export { createStyles } from './utils/styles/createStyles'
export { keyframes } from './utils/styles/keyframes'
export { fontFace } from './utils/styles/fontFace'
export { cssVariables, cssVar, injectCssVariables } from './utils/styles/cssVariables'

// ============================================================================
// SSR Utilities
// ============================================================================

export { getSSRStyles, getSSRStyleTag, clearSSRRules, getSSRRulesArray } from './utils/styles/ssr'

// ============================================================================
// Style Engine (Advanced)
// ============================================================================

export {
    setThemeContextGetter,
    getTheme,
    insertRule,
    sanitizeCssValue,
} from './utils/styles/styleEngine'

// ============================================================================
// Types for Style Utilities
// ============================================================================

export type { StyleWithPseudos, StyleFunction, FontFaceOptions, CSSProperties } from './utils/styles/types'
