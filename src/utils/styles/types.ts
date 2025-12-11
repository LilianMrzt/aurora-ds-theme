import { CSSProperties } from 'react'

/**
 * Extended type to support pseudo-classes, media queries, container queries, supports and complex selectors
 */
export type StyleWithPseudos = CSSProperties & {
    // Pseudo-classes (:hover, :focus, etc.)
    [key: `:${string}`]: CSSProperties
    // Media queries (@media)
    [key: `@media ${string}`]: CSSProperties
    // Container queries (@container)
    [key: `@container ${string}`]: CSSProperties
    // Feature queries (@supports)
    [key: `@supports ${string}`]: CSSProperties
    // Complex selectors (& > div, &:nth-child, etc.)
    [key: `& ${string}` | `&>${string}` | `&:${string}` | `&[${string}`]: CSSProperties
}

/**
 * Type for a function that returns StyleWithPseudos with any parameters
 */
export type StyleFunction = (...args: never[]) => StyleWithPseudos

/**
 * Type for @font-face options
 */
export type FontFaceOptions = {
    /** Font family name */
    fontFamily: string
    /** Font source(s) - URL or local() */
    src: string
    /** Font style */
    fontStyle?: 'normal' | 'italic' | 'oblique'
    /** Font weight */
    fontWeight?: number | string
    /** Display behavior */
    fontDisplay?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
    /** Unicode character range */
    unicodeRange?: string
}

export type { CSSProperties }

