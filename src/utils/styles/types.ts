import { CSSProperties } from 'react'

/**
 * A responsive value: either a raw CSS value, or an object whose keys are
 * the breakpoint names declared on `theme.breakpoints` (plus the special
 * `base` key for the unmediated value).
 *
 * @example
 * ```ts
 * padding: { base: 8, md: 16, lg: 24 }
 * color: { base: 'red', md: 'blue' }
 * ```
 *
 * The breakpoint keys are intentionally typed as a free `string` index so
 * that any user-defined breakpoint (e.g. `desktop`, `wide`, `phone`) is
 * accepted without coupling the type to a hardcoded list.
 */
export type ResponsiveValue<T> = T | {
    base?: T
    [breakpoint: string]: T | undefined
}

/** Maps a CSSProperties-like object so each value can also be a {@link ResponsiveValue}. */
export type ResponsiveCSSProperties = {
    [K in keyof CSSProperties]?: CSSProperties[K] | ResponsiveValue<CSSProperties[K]>
}

/** CSS properties with support for pseudo-classes, media/container queries, complex selectors and responsive token values. */
export type StyleWithPseudos = ResponsiveCSSProperties & {
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

