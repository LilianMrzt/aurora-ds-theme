/**
 * @aurora-ds/theme - Minimalist and Type-Safe Theme System
 *
 * @example
 * ```typescript
 * // 1. Define your theme type
 * type MyTheme = {
 *   colors: { primary: string; secondary: string }
 *   spacing: { sm: string; md: string }
 * }
 *
 * // 2. Create theme(s) with the type
 * export const lightTheme = createTheme<MyTheme>({
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * // 3. Register type for autocomplete (once in your app)
 * declare module '@aurora-ds/theme' {
 *   interface ThemeRegistry {
 *     theme: MyTheme
 *   }
 * }
 *
 * // 4. Use everywhere with full autocomplete!
 * const useStyles = createStyles((theme) => ({
 *   root: { color: theme.colors.primary }  // ✅ Autocomplete!
 * }))
 * ```
 */


// ============================================================================
// Core API
// ============================================================================

export { createTheme } from './utils/theme'

// ============================================================================
// Types - Theme Registry for Module Augmentation
// ============================================================================

export type { Theme, ThemeRegistry } from './types/theme/Theme'

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
