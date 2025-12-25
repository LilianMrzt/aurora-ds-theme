import type { BaseBreakpoints, BaseColors , BaseFontSize , BaseFontWeight , BaseLineHeight , BaseOpacity, BaseRadius , BaseShadows , BaseSpacing , Theme , BaseTransition , BaseZIndex } from '@/types'

/**
 * Generic theme type that allows extending base tokens
 */
export type ExtendedTheme<
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
export type ExtendTheme<T extends Partial<Theme> & Record<string, unknown>> =
    Theme & T

/**
 * Utility type to deeply make all properties optional
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Type for theme overrides
 */
export type ThemeOverride<T extends Theme = Theme> = DeepPartial<T>

// ============================================================================
// CUSTOM THEME TYPES - For complete color/token replacement
// ============================================================================

/**
 * Base structure for custom themes with user-defined color tokens
 * Use this when you want to completely replace the default color tokens
 * with your own semantic tokens
 */
export type CustomThemeBase<TColors extends Record<string, string>> = {
    colors: TColors
    spacing: BaseSpacing
    radius: BaseRadius
    shadows: BaseShadows
    fontSize: BaseFontSize
    fontWeight: BaseFontWeight
    lineHeight: BaseLineHeight
    zIndex: BaseZIndex
    transition: BaseTransition
    opacity: BaseOpacity
    breakpoints: BaseBreakpoints
}

/**
 * Fully customizable theme where ALL token categories can be replaced
 *
 * @example
 * ```ts
 * // Define your own color tokens
 * type MyColors = {
 *     brand: string
 *     brandHover: string
 *     surface: string
 *     textPrimary: string
 *     textSecondary: string
 * }
 *
 * // Create your theme type
 * type MyTheme = CustomTheme<MyColors>
 *
 * // Use with createCustomTheme()
 * const myTheme = createCustomTheme<MyColors>({
 *     colors: {
 *         brand: '#007bff',
 *         brandHover: '#0056b3',
 *         surface: '#ffffff',
 *         textPrimary: '#212529',
 *         textSecondary: '#6c757d',
 *     },
 *     // ... other tokens use defaults or custom
 * })
 * ```
 */
export type CustomTheme<
    TColors extends Record<string, string> = Record<string, string>,
    TSpacing extends Record<string, string> = BaseSpacing,
    TRadius extends Record<string, string> = BaseRadius,
    TShadows extends Record<string, string> = BaseShadows,
    TFontSize extends Record<string, string> = BaseFontSize,
    TFontWeight extends Record<string, number> = BaseFontWeight,
    TLineHeight extends Record<string, number> = BaseLineHeight,
    TZIndex extends Record<string, number> = BaseZIndex,
    TTransition extends Record<string, string> = BaseTransition,
    TOpacity extends Record<string, number> = BaseOpacity,
    TBreakpoints extends Record<string, string> = BaseBreakpoints,
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
    opacity: TOpacity
    breakpoints: TBreakpoints
}

/**
 * Options for theme creation
 */
export type CreateThemeOptions = {
    /**
     * How to handle the merge of overrides with the base theme
     * - 'merge': Deep merge overrides into base (default, preserves base tokens)
     * - 'replace': Replace entire categories when specified in overrides
     */
    mode?: 'merge' | 'replace'
}

/**
 * Options for custom theme creation
 */
export type CreateCustomThemeOptions<T> = {
    /**
     * Use defaults from the standard theme for non-color tokens
     * If false, you must provide all tokens
     * @default true
     */
    useDefaults?: boolean

    /**
     * Partial overrides for non-color tokens
     * Only used when useDefaults is true
     */
    overrides?: Partial<Omit<T, 'colors'>>
}

