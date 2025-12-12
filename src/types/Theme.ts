/**
 * Base color tokens following modern design system semantics
 * Inspired by Material Design 3, Radix, and Tailwind conventions
 */
export type BaseColors = {
    // === PRIMARY ===
    // Main brand color for primary actions, links, active states
    primary: string
    onPrimary: string           // Text/icons on primary
    primaryHover: string
    primaryActive: string
    primarySubtle: string       // Light tint for backgrounds

    // === SECONDARY ===
    // Supporting color for secondary actions
    secondary: string
    onSecondary: string
    secondaryHover: string
    secondaryActive: string
    secondarySubtle: string

    // === ACCENT ===
    // Highlight color for emphasis, badges, indicators
    accent: string
    onAccent: string
    accentHover: string
    accentSubtle: string

    // === NEUTRAL / SURFACE ===
    // Background layers (from back to front)
    background: string          // Base app background
    surface: string             // Cards, modals, elevated content
    surfaceHover: string
    surfaceActive: string
    elevated: string            // Dropdowns, popovers, tooltips
    overlay: string             // Modal/drawer backdrop (with alpha)

    // === TEXT ===
    text: string                // Primary text
    textSecondary: string       // Secondary/muted text
    textTertiary: string        // Placeholder, disabled text
    textInverse: string         // Text on dark backgrounds

    // === BORDER ===
    border: string              // Default borders
    borderHover: string         // Borders on hover
    borderFocus: string         // Focus rings
    borderSubtle: string        // Subtle dividers

    // === SEMANTIC: SUCCESS ===
    success: string
    onSuccess: string
    successHover: string
    successSubtle: string       // Success background tint

    // === SEMANTIC: WARNING ===
    warning: string
    onWarning: string
    warningHover: string
    warningSubtle: string

    // === SEMANTIC: ERROR / DESTRUCTIVE ===
    error: string
    onError: string
    errorHover: string
    errorSubtle: string

    // === SEMANTIC: INFO ===
    info: string
    onInfo: string
    infoHover: string
    infoSubtle: string

    // === INTERACTIVE ===
    link: string                // Link color
    linkHover: string
    linkVisited: string
    focus: string               // Focus ring color (often primary-based)

    // === DISABLED ===
    disabled: string            // Disabled elements background
    disabledText: string        // Disabled text color
}

/**
 * Spacing scale with semantic naming
 * Based on 4px unit system
 */
export type BaseSpacing = {
    none: string    // 0
    px: string      // 1px - hairline borders
    xs: string      // 4px - tight spacing
    sm: string      // 8px - small spacing
    md: string      // 16px - default spacing
    lg: string      // 24px - large spacing
    xl: string      // 32px - extra large
    '2xl': string   // 48px - section spacing
    '3xl': string   // 64px - large sections
    '4xl': string   // 96px - page sections
}

/**
 * Border radius scale
 */
export type BaseRadius = {
    none: string    // 0
    sm: string      // Small elements (badges, tags)
    md: string      // Default (buttons, inputs)
    lg: string      // Cards, modals
    xl: string      // Large cards, hero sections
    '2xl': string   // Extra large
    full: string    // Circular (avatars, pills)
}

/**
 * Shadow scale for elevation
 */
export type BaseShadows = {
    none: string
    xs: string      // Subtle shadow (buttons)
    sm: string      // Cards at rest
    md: string      // Dropdowns, raised cards
    lg: string      // Modals, dialogs
    xl: string      // Popovers, floating elements
    '2xl': string   // High elevation
    inner: string   // Inset shadow (inputs)
}

/**
 * Font size scale with line-height recommendations
 */
export type BaseFontSize = {
    xs: string      // 12px - Small labels, captions
    sm: string      // 14px - Secondary text, buttons
    md: string      // 16px - Body text (base)
    lg: string      // 18px - Large body, subheadings
    xl: string      // 20px - Section titles
    '2xl': string   // 24px - Card titles
    '3xl': string   // 30px - Page titles
    '4xl': string   // 36px - Hero titles
    '5xl': string   // 48px - Display
    '6xl': string   // 60px - Large display
}

/**
 * Font weight scale
 */
export type BaseFontWeight = {
    thin: number        // 100
    light: number       // 300
    regular: number     // 400 - Body text
    medium: number      // 500 - Emphasis
    semibold: number    // 600 - Headings
    bold: number        // 700 - Strong emphasis
    extrabold: number   // 800 - Display
}

/**
 * Line height scale
 */
export type BaseLineHeight = {
    none: number        // 1 - Headings
    tight: number       // 1.25 - Tight text
    snug: number        // 1.375 - Compact
    normal: number      // 1.5 - Body text
    relaxed: number     // 1.625 - Readable
    loose: number       // 2 - Very relaxed
}

/**
 * Z-index scale for layering
 */
export type BaseZIndex = {
    behind: number      // -1
    base: number        // 0
    dropdown: number    // 1000
    sticky: number      // 1100
    fixed: number       // 1200
    overlay: number     // 1300
    modal: number       // 1400
    popover: number     // 1500
    tooltip: number     // 1600
    toast: number       // 1700
}

/**
 * Transition timing
 */
export type BaseTransition = {
    fast: string        // 100ms - Micro interactions
    normal: string      // 200ms - Default
    slow: string        // 300ms - Larger elements
    slower: string      // 500ms - Page transitions
}

/**
 * Base theme structure with required tokens
 */
export type BaseTheme = {
    colors: BaseColors
    spacing: BaseSpacing
    radius: BaseRadius
    shadows: BaseShadows
    fontSize: BaseFontSize
    fontWeight: BaseFontWeight
    lineHeight: BaseLineHeight
    zIndex: BaseZIndex
    transition: BaseTransition
}

/**
 * Generic theme type that allows extending base tokens
 */
export type Theme<
    TColors extends BaseColors = BaseColors,
    TSpacing extends BaseSpacing = BaseSpacing,
    TRadius extends BaseRadius = BaseRadius,
    TShadows extends BaseShadows = BaseShadows,
    TFontSize extends BaseFontSize = BaseFontSize,
    TFontWeight extends BaseFontWeight = BaseFontWeight,
    TLineHeight extends BaseLineHeight = BaseLineHeight,
    TZIndex extends BaseZIndex = BaseZIndex,
    TTransition extends BaseTransition = BaseTransition,
    TExtensions extends Record<string, unknown> = Record<string, never>
> = {
    colors: TColors
    spacing: TSpacing
    radius: TRadius
    shadows: TShadows
    fontSize: TFontSize
    fontWeight: TFontWeight
    lineHeight: TLineHeight
    zIndex: TZIndex
    transition: TTransition
} & TExtensions

/**
 * Helper type to create a custom theme with extensions
 */
export type ExtendTheme<T extends Partial<BaseTheme> & Record<string, unknown>> =
    BaseTheme & T

/**
 * Utility type to deeply make all properties optional
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Type for theme overrides
 */
export type ThemeOverride<T extends BaseTheme = BaseTheme> = DeepPartial<T>

