import { indigoLight, indigoDark } from './palettes'

import type { Theme } from '@/types'


/**
 * Default spacing scale
 */
export const defaultSpacing: Theme['spacing'] = {
    none: '0',
    px: '1px',
    xs: '0.25rem',     // 4px
    sm: '0.5rem',      // 8px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '3rem',     // 48px
    '3xl': '4rem',     // 64px
    '4xl': '6rem',     // 96px
}

/**
 * Default border radius scale
 */
export const defaultRadius: Theme['radius'] = {
    none: '0',
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
}

/**
 * Default font size scale
 */
export const defaultFontSize: Theme['fontSize'] = {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    md: '1rem',        // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
}

/**
 * Default font weight scale
 */
export const defaultFontWeight: Theme['fontWeight'] = {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
}

/**
 * Default line height scale
 */
export const defaultLineHeight: Theme['lineHeight'] = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
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
    fixed: 1200,
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
    fast: '100ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
    slower: '500ms ease-out',
}

/**
 * Default colors (using indigo palette)
 */
export const defaultColors = indigoLight

/**
 * Default dark colors (using indigo palette)
 */
export const defaultDarkColors = indigoDark

/**
 * Complete default light theme
 */
export const defaultTheme: Theme = {
    colors: defaultColors,
    spacing: defaultSpacing,
    radius: defaultRadius,
    shadows: defaultShadows,
    fontSize: defaultFontSize,
    fontWeight: defaultFontWeight,
    lineHeight: defaultLineHeight,
    zIndex: defaultZIndex,
    transition: defaultTransition,
}

/**
 * Complete default dark theme
 */
export const defaultDarkTheme: Theme = {
    ...defaultTheme,
    colors: defaultDarkColors,
}

