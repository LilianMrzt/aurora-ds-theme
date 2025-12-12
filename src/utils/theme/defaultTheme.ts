import type { BaseTheme } from '@/types/Theme'

/**
 * Default color palette - Modern 2025 aesthetic
 * Inspired by Linear, Vercel, Stripe, and contemporary design trends
 */
export const defaultColors: BaseTheme['colors'] = {
    // === PRIMARY (Electric Indigo) ===
    // A vibrant, modern indigo with slight purple undertone
    primary: '#6366f1',
    onPrimary: '#ffffff',
    primaryHover: '#4f46e5',
    primaryActive: '#4338ca',
    primarySubtle: '#eef2ff',

    // === SECONDARY (Modern Gray) ===
    // Clean, neutral gray with cool undertone
    secondary: '#6b7280',
    onSecondary: '#ffffff',
    secondaryHover: '#4b5563',
    secondaryActive: '#374151',
    secondarySubtle: '#f3f4f6',

    // === ACCENT (Vibrant Cyan) ===
    // Eye-catching cyan for highlights and CTAs
    accent: '#06b6d4',
    onAccent: '#ffffff',
    accentHover: '#0891b2',
    accentSubtle: '#ecfeff',

    // === NEUTRAL / SURFACE ===
    // Clean, minimal surfaces
    background: '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    surfaceActive: '#e4e4e7',
    elevated: '#ffffff',
    overlay: 'rgba(9, 9, 11, 0.5)',

    // === TEXT ===
    // High contrast, crisp text
    text: '#09090b',
    textSecondary: '#52525b',
    textTertiary: '#a1a1aa',
    textInverse: '#fafafa',

    // === BORDER ===
    // Subtle, modern borders
    border: '#e4e4e7',
    borderHover: '#d4d4d8',
    borderFocus: '#6366f1',
    borderSubtle: '#f4f4f5',

    // === SUCCESS (Mint Green) ===
    // Fresh, modern green
    success: '#10b981',
    onSuccess: '#ffffff',
    successHover: '#059669',
    successSubtle: '#ecfdf5',

    // === WARNING (Warm Orange) ===
    // Vibrant but not aggressive
    warning: '#f97316',
    onWarning: '#ffffff',
    warningHover: '#ea580c',
    warningSubtle: '#fff7ed',

    // === ERROR (Vibrant Red) ===
    // Clear, modern red
    error: '#ef4444',
    onError: '#ffffff',
    errorHover: '#dc2626',
    errorSubtle: '#fef2f2',

    // === INFO (Cool Blue) ===
    // Distinct from primary, informational
    info: '#3b82f6',
    onInfo: '#ffffff',
    infoHover: '#2563eb',
    infoSubtle: '#eff6ff',

    // === INTERACTIVE ===
    link: '#6366f1',
    linkHover: '#4f46e5',
    linkVisited: '#8b5cf6',
    focus: '#6366f1',

    // === DISABLED ===
    disabled: '#f4f4f5',
    disabledText: '#a1a1aa',
}

/**
 * Dark mode colors - Premium dark aesthetic
 * OLED-friendly with rich, deep blacks
 */
export const defaultDarkColors: BaseTheme['colors'] = {
    // === PRIMARY (Brightened Indigo) ===
    primary: '#818cf8',
    onPrimary: '#1e1b4b',
    primaryHover: '#a5b4fc',
    primaryActive: '#6366f1',
    primarySubtle: '#312e81',

    // === SECONDARY (Light Gray) ===
    secondary: '#9ca3af',
    onSecondary: '#1f2937',
    secondaryHover: '#d1d5db',
    secondaryActive: '#e5e7eb',
    secondarySubtle: '#1f2937',

    // === ACCENT (Bright Cyan) ===
    accent: '#22d3ee',
    onAccent: '#164e63',
    accentHover: '#67e8f9',
    accentSubtle: '#164e63',

    // === NEUTRAL / SURFACE ===
    // Deep, rich blacks
    background: '#09090b',
    surface: '#18181b',
    surfaceHover: '#27272a',
    surfaceActive: '#3f3f46',
    elevated: '#27272a',
    overlay: 'rgba(0, 0, 0, 0.8)',

    // === TEXT ===
    text: '#fafafa',
    textSecondary: '#a1a1aa',
    textTertiary: '#71717a',
    textInverse: '#09090b',

    // === BORDER ===
    border: '#27272a',
    borderHover: '#3f3f46',
    borderFocus: '#818cf8',
    borderSubtle: '#18181b',

    // === SUCCESS ===
    success: '#34d399',
    onSuccess: '#022c22',
    successHover: '#6ee7b7',
    successSubtle: '#064e3b',

    // === WARNING ===
    warning: '#fb923c',
    onWarning: '#431407',
    warningHover: '#fdba74',
    warningSubtle: '#7c2d12',

    // === ERROR ===
    error: '#f87171',
    onError: '#450a0a',
    errorHover: '#fca5a5',
    errorSubtle: '#7f1d1d',

    // === INFO ===
    info: '#60a5fa',
    onInfo: '#1e3a8a',
    infoHover: '#93c5fd',
    infoSubtle: '#1e40af',

    // === INTERACTIVE ===
    link: '#818cf8',
    linkHover: '#a5b4fc',
    linkVisited: '#c4b5fd',
    focus: '#818cf8',

    // === DISABLED ===
    disabled: '#27272a',
    disabledText: '#52525b',
}

/**
 * Default spacing scale
 */
export const defaultSpacing: BaseTheme['spacing'] = {
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
export const defaultRadius: BaseTheme['radius'] = {
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
export const defaultShadows: BaseTheme['shadows'] = {
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
export const defaultFontSize: BaseTheme['fontSize'] = {
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
export const defaultFontWeight: BaseTheme['fontWeight'] = {
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
export const defaultLineHeight: BaseTheme['lineHeight'] = {
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
export const defaultZIndex: BaseTheme['zIndex'] = {
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
export const defaultTransition: BaseTheme['transition'] = {
    fast: '100ms ease-out',
    normal: '200ms ease-out',
    slow: '300ms ease-out',
    slower: '500ms ease-out',
}

/**
 * Complete default light theme
 */
export const defaultTheme: BaseTheme = {
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
export const defaultDarkTheme: BaseTheme = {
    ...defaultTheme,
    colors: defaultDarkColors,
}

