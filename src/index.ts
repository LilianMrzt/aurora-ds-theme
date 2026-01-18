/**
 * @aurora-ds/theme - Minimalist and Type-Safe Theme System
 */

// Core API
export { createTheme } from './utils/theme'

// Color Scales
export { colors } from './utils/theme/colors'

// Types
export type { ThemeRegistry } from './types/theme/Theme'

// Providers & Hooks
export { ThemeProvider, useTheme } from './providers/ThemeProvider'

// Style Utilities
export { createStyles } from './utils/styles/createStyles'
export { keyframes } from './utils/styles/keyframes'
export { fontFace } from './utils/styles/fontFace'
export { cssVariables, cssVar, injectCssVariables } from './utils/styles/cssVariables'

// SSR Utilities
export { getSSRStyles, getSSRStyleTag, clearSSRRules, getSSRRulesArray } from './utils/styles/ssr'

// Types for advanced usage
export type { StyleWithPseudos, FontFaceOptions } from './utils/styles/types'
