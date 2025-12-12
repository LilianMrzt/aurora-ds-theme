// Main exports for @aurora-ui/theme

// Types
export type {
    Theme,
    BaseTheme,
    BaseColors,
    BaseSpacing,
    BaseRadius,
    BaseShadows,
    BaseFontSize,
    BaseFontWeight,
    ExtendTheme,
    DeepPartial,
    ThemeOverride,
} from './types/Theme'

// Providers
export { ThemeProvider, useTheme } from './providers/ThemeProvider'
export type { ThemeProviderProps } from './providers/ThemeProvider'

// Theme utilities
export { createTheme, mergeThemes, createThemeVariant } from './utils/theme/createTheme'
export { defaultTheme, defaultDarkTheme } from './utils/theme/defaultTheme'

// Style utilities
export { createStyles } from './utils/styles/createStyles'
export { keyframes } from './utils/styles/keyframes'
export { fontFace } from './utils/styles/fontFace'
export { cssVariables, cssVar, injectCssVariables } from './utils/styles/cssVariables'

// SSR utilities
export { getSSRStyles, getSSRStyleTag, clearSSRRules, getSSRRulesArray } from './utils/styles/ssr'

// Style engine internals (for advanced use cases)
export {
    setThemeContextGetter,
    getTheme,
    insertRule,
} from './utils/styles/styleEngine'

// Types for style utilities
export type { StyleWithPseudos, StyleFunction, FontFaceOptions, CSSProperties } from './utils/styles/types'

