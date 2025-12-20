import type { BaseColors , BaseFontSize , BaseFontWeight , BaseLineHeight , BaseOpacity , BaseShadows , BaseSpacing , BaseTransition , BaseZIndex , BaseRadius } from '@/types'

/**
 * Standard theme type with all required tokens
 */
export type Theme = {
    colors: BaseColors
    spacing: BaseSpacing
    radius: BaseRadius
    shadows: BaseShadows
    fontSize: BaseFontSize
    fontWeight: BaseFontWeight
    lineHeight: BaseLineHeight
    zIndex: BaseZIndex
    transition: BaseTransition
    opacity: BaseOpacity
}

