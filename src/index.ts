// Main exports for @aurora-ui/theme

// Types
export type {
    // Theme types
    Theme,
    ExtendedTheme,
    BaseColors,
    BaseSpacing,
    BaseRadius,
    BaseShadows,
    BaseFontSize,
    BaseFontWeight,
    BaseLineHeight,
    BaseZIndex,
    BaseTransition,
    ExtendTheme,
    DeepPartial,
    ThemeOverride,
    // Color types
    ColorScale,
    ColorName,
    ColorShade,
    // Palette types
    PaletteName,
} from './types'

// Providers
export { ThemeProvider, useTheme } from './providers/ThemeProvider'
export type { ThemeProviderProps } from './providers/ThemeProvider'

// Theme utilities
export { createTheme, mergeThemes, createThemeVariant } from './utils/theme/createTheme'
export {
    // Complete themes
    defaultTheme,
    defaultDarkTheme,
    // Individual presets for modular customization
    defaultColors,
    defaultDarkColors,
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
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

// Theme presets (ready-to-use palettes)
export {
    palettes,
    indigoLight,
    indigoDark,
    roseLight,
    roseDark,
    emeraldLight,
    emeraldDark,
    violetLight,
    violetDark,
    amberLight,
    amberDark,
    cyanLight,
    cyanDark,
    slateLight,
    slateDark,
    grayLight,
    grayDark,
    blueLight,
    blueDark,
    tealLight,
    tealDark,
} from './utils/theme/palettes'

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
    sanitizeCssValue,
} from './utils/styles/styleEngine'

// Types for style utilities
export type { StyleWithPseudos, StyleFunction, FontFaceOptions, CSSProperties } from './utils/styles/types'
