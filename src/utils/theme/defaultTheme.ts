import { defaultPalette } from './palettes'

import type { Theme } from '@/types'


/**
 * Default spacing scale
 */
export const defaultSpacing: Theme['spacing'] = {
    none: '0',
    '2xs': '0.125rem', // 2px
    xs: '0.25rem',     // 4px
    sm: '0.5rem',      // 8px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '3rem',     // 48px
    '3xl': '4rem',     // 64px
    '4xl': '6rem',     // 96px
    '5xl': '8rem',     // 128px
}

/**
 * Default border radius scale
 */
export const defaultRadius: Theme['radius'] = {
    none: '0',
    xs: '0.125rem',    // 2px
    sm: '0.25rem',     // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    full: '9999px',
}

/**
 * Default shadow scale
 */
export const defaultShadows: Theme['shadows'] = {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    focus: '0 0 0 3px rgb(99 102 241 / 0.4)',
}

/**
 * Default font size scale
 */
export const defaultFontSize: Theme['fontSize'] = {
    '2xs': '0.625rem', // 10px
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    md: '1rem',        // 16px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    '4xl': '3rem',     // 48px
    '5xl': '4rem',     // 64px
}

/**
 * Default font weight scale
 */
export const defaultFontWeight: Theme['fontWeight'] = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
}

/**
 * Default line height scale
 */
export const defaultLineHeight: Theme['lineHeight'] = {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
}

/**
 * Default z-index scale
 */
export const defaultZIndex: Theme['zIndex'] = {
    behind: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    toast: 1700,
}

/**
 * Default transition scale
 */
export const defaultTransition: Theme['transition'] = {
    fast: '150ms ease-out',
    normal: '250ms ease-out',
    slow: '350ms ease-out',
}

/**
 * Default opacity scale
 */
export const defaultOpacity: Theme['opacity'] = {
    none: 0,
    lowest: 0.05,
    low: 0.1,
    medium: 0.25,
    high: 0.5,
    higher: 0.75,
    full: 1,
}

/**
 * Default responsive breakpoints
 */
export const defaultBreakpoints: Theme['breakpoints'] = {
    xs: '480px',   // Extra small devices (phones in landscape)
    sm: '640px',   // Small devices (large phones, small tablets)
    md: '768px',   // Medium devices (tablets)
    lg: '1024px',  // Large devices (desktops)
    xl: '1280px',  // Extra large devices (large desktops)
    '2xl': '1536px', // Extra extra large devices (wide screens)
}

/**
 * Complete default theme V2
 */
export const defaultTheme: Theme = {
    colors: defaultPalette,
    spacing: defaultSpacing,
    radius: defaultRadius,
    shadows: defaultShadows,
    fontSize: defaultFontSize,
    fontWeight: defaultFontWeight,
    lineHeight: defaultLineHeight,
    zIndex: defaultZIndex,
    transition: defaultTransition,
    opacity: defaultOpacity,
    breakpoints: defaultBreakpoints,
}

