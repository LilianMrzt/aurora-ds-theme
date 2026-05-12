/**
 * @aurora-ds/theme - Minimalist and Type-Safe Theme System
 */

// Core API
export { createTheme } from './utils/theme'


// Types
export type { ThemeRegistry } from './types/theme/Theme'

// Providers & Hooks
export { ThemeProvider, useTheme } from './providers/ThemeProvider'

// Style Utilities
export { createStyles } from './utils/styles/createStyles'
export type { CreateStylesOptions } from './utils/styles/createStyles'
export { createVariants } from './utils/styles/createVariants'
export type {
    CreateVariantsConfig,
    CompoundVariant,
    VariantProps,
    VariantFn
} from './utils/styles/createVariants'
export { keyframes } from './utils/styles/keyframes'
export { fontFace } from './utils/styles/fontFace'
export { cssVariables, cssVar, injectCssVariables } from './utils/styles/cssVariables'
export { globalStyles } from './utils/styles/globalStyles'
export type { GlobalStyleBlock } from './utils/styles/globalStyles'
export { cx } from './utils/styles/cx'
export type { CxArg } from './utils/styles/cx'

// SSR Utilities
export { getSSRStyles, getSSRStyleTag, clearSSRRules, getSSRRulesArray } from './utils/styles/ssr'

// Types for advanced usage
export type { StyleWithPseudos, FontFaceOptions, ResponsiveValue, ResponsiveCSSProperties } from './utils/styles'
