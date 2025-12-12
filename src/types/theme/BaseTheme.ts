import type { BaseColors , BaseFontSize , BaseFontWeight , BaseLineHeight , BaseShadows , BaseSpacing , BaseTransition , BaseZIndex , BaseRadius } from '@/types'

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

