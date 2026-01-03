// Main exports for @aurora-ui/theme

// Types
export type {
    // Theme types
    Theme,
    ExtendedTheme,
    BaseBreakpoints,
    BaseColors,
    BaseSpacing,
    BaseRadius,
    BaseShadows,
    BaseFontSize,
    BaseFontWeight,
    BaseLineHeight,
    BaseZIndex,
    BaseTransition,
    BaseOpacity,
    ExtendTheme,
    DeepPartial,
    ThemeOverride,
    // Custom theme types
    CustomTheme,
    CustomThemeBase,
    CreateThemeOptions,
    CreateCustomThemeOptions,
    // Color types
    ColorScale,
    ColorName,
    ColorShade,
} from './types'

// Providers
export { ThemeProvider, useTheme } from './providers/ThemeProvider'
export type { ThemeProviderProps } from './providers/ThemeProvider'

// Theme utilities
export { createTheme, mergeThemes, createThemeVariant, createCustomTheme } from './utils/theme/createTheme'
export {
    // Complete themes
    defaultTheme,
    // Individual presets for modular customization
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
    defaultOpacity,
    defaultBreakpoints,
} from './utils/theme/defaultTheme'

// Color scales (25-950 shades)
export {
    colors,
    gray,
    slate,
    stone,
    red,
    orange,
    amber,
    yellow,
    lime,
    green,
    emerald,
    teal,
    cyan,
    sky,
    blue,
    indigo,
    violet,
    purple,
    fuchsia,
    pink,
    rose,
    white,
    black,
    transparent,
    current,
} from './utils/theme/colors'

// Theme presets (ready-to-use palette)
export {
    defaultPalette,
} from './utils/theme/palettes'

// Style utilities
export { createStyles, createTypedStyles } from './utils/styles/createStyles'
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
    sanitizeCssValue,
} from './utils/styles/styleEngine'


// Types for style utilities
export type { StyleWithPseudos, StyleFunction, FontFaceOptions, CSSProperties } from './utils/styles/types'
