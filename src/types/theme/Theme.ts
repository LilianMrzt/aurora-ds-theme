import type { BaseColors , BaseFontSize , BaseFontWeight , BaseLineHeight , BaseRadius , BaseShadows , BaseSpacing , Theme , BaseTransition , BaseZIndex } from '@/types'

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

