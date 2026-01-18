import { CSSProperties } from 'react'

/** CSS properties with support for pseudo-classes, media/container queries, and complex selectors */
export type StyleWithPseudos = CSSProperties & {
    [key: `:${string}`]: CSSProperties
    [key: `@media ${string}`]: CSSProperties
    [key: `@container ${string}`]: CSSProperties
    [key: `@supports ${string}`]: CSSProperties
    [key: `& ${string}` | `&>${string}` | `&:${string}` | `&[${string}`]: CSSProperties
}

/** Function that returns StyleWithPseudos */
export type StyleFunction = (...args: never[]) => StyleWithPseudos

/** Options for @font-face */
export type FontFaceOptions = {
    fontFamily: string
    src: string
    fontStyle?: 'normal' | 'italic' | 'oblique'
    fontWeight?: number | string
    fontDisplay?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
    unicodeRange?: string
}

export type { CSSProperties }

