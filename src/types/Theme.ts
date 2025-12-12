/**
 * Base color tokens that any theme should have
 * Users can extend this with their own colors
 */
export type BaseColors = {
    // Primary - Main actions
    primary: string
    onPrimary: string
    hoverPrimary: string
    pressedPrimary: string

    // Secondary - Secondary actions (primary tint)
    secondary: string
    onSecondary: string
    hoverSecondary: string

    // Background & Surface
    background: string
    surface: string
    backgroundSecondary: string
    backgroundHover: string
    pressedBackground: string

    // Text
    text: string
    textSecondary: string
    textTertiary: string

    // Border
    border: string
    borderLight: string

    // Semantic - States and feedback
    success: string
    onSuccess: string
    error: string
    onError: string
    warning: string
    onWarning: string
}

/**
 * Base spacing tokens
 * Users can extend with additional sizes
 */
export type BaseSpacing = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
}

/**
 * Base radius tokens
 */
export type BaseRadius = {
    sm: string
    md: string
    lg: string
}

/**
 * Base shadow tokens
 */
export type BaseShadows = {
    sm: string
    md: string
    lg: string
}

/**
 * Base font size tokens
 */
export type BaseFontSize = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
}

/**
 * Base font weight tokens
 */
export type BaseFontWeight = {
    regular: number
    medium: number
    semibold: number
    bold: number
}

/**
 * Base theme structure with required tokens
 * This is the minimum theme structure required by Aurora
 */
export type BaseTheme = {
    colors: BaseColors
    spacing: BaseSpacing
    radius: BaseRadius
    shadows: BaseShadows
    fontSize: BaseFontSize
    fontWeight: BaseFontWeight
}

/**
 * Generic theme type that allows extending base tokens
 *
 * @example
 * ```ts
 * // Extend colors with custom tokens
 * type MyColors = BaseColors & {
 *     accent: string
 *     info: string
 *     onInfo: string
 * }
 *
 * // Extend spacing with additional sizes
 * type MySpacing = BaseSpacing & {
 *     xxl: string
 *     '2xl': string
 * }
 *
 * // Create your custom theme type
 * type MyTheme = Theme<MyColors, MySpacing>
 * ```
 */
export type Theme<
    TColors extends BaseColors = BaseColors,
    TSpacing extends BaseSpacing = BaseSpacing,
    TRadius extends BaseRadius = BaseRadius,
    TShadows extends BaseShadows = BaseShadows,
    TFontSize extends BaseFontSize = BaseFontSize,
    TFontWeight extends BaseFontWeight = BaseFontWeight,
    TExtensions extends Record<string, unknown> = Record<string, never>
> = {
    colors: TColors
    spacing: TSpacing
    radius: TRadius
    shadows: TShadows
    fontSize: TFontSize
    fontWeight: TFontWeight
} & TExtensions

/**
 * Helper type to create a custom theme with extensions
 *
 * @example
 * ```ts
 * type MyTheme = ExtendTheme<{
 *     colors: BaseColors & { accent: string }
 *     spacing: BaseSpacing & { xxl: string }
 *     // Add completely custom properties
 *     breakpoints: { sm: string; md: string; lg: string }
 * }>
 * ```
 */
export type ExtendTheme<T extends Partial<BaseTheme> & Record<string, unknown>> =
    BaseTheme & T

/**
 * Utility type to deeply make all properties optional
 * Useful for theme overrides
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Type for theme overrides (partial theme for merging)
 */
export type ThemeOverride<T extends BaseTheme = BaseTheme> = DeepPartial<T>

