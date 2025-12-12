import type { BaseTheme } from '@/types/Theme'

/**
 * Default light theme
 * Use as a base for your custom themes
 *
 * @example
 * ```ts
 * import { defaultTheme, createTheme } from '@aurora-ui/theme'
 *
 * const myTheme = createTheme(defaultTheme, {
 *     colors: {
 *         primary: '#your-brand-color',
 *     },
 * })
 * ```
 */
export const defaultTheme: BaseTheme = {
    colors: {
        // Primary
        primary: '#2563eb',
        onPrimary: '#ffffff',
        hoverPrimary: '#1d4ed8',
        pressedPrimary: '#1e40af',

        // Secondary
        secondary: '#eff6ff',
        onSecondary: '#2563eb',
        hoverSecondary: '#dbeafe',

        // Background & Surface
        background: '#ffffff',
        surface: '#f8fafc',
        backgroundSecondary: '#f1f5f9',
        backgroundHover: '#e2e8f0',
        pressedBackground: '#cbd5e1',

        // Text
        text: '#0f172a',
        textSecondary: '#475569',
        textTertiary: '#94a3b8',

        // Border
        border: '#e2e8f0',
        borderLight: '#f1f5f9',

        // Semantic
        success: '#22c55e',
        onSuccess: '#ffffff',
        error: '#ef4444',
        onError: '#ffffff',
        warning: '#f59e0b',
        onWarning: '#ffffff',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    radius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
    },
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        xxl: '1.5rem',
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
}

/**
 * Default dark theme
 * A dark variant of the default theme
 */
export const defaultDarkTheme: BaseTheme = {
    ...defaultTheme,
    colors: {
        // Primary
        primary: '#3b82f6',
        onPrimary: '#ffffff',
        hoverPrimary: '#60a5fa',
        pressedPrimary: '#2563eb',

        // Secondary
        secondary: '#1e3a5f',
        onSecondary: '#93c5fd',
        hoverSecondary: '#1e40af',

        // Background & Surface
        background: '#0f172a',
        surface: '#1e293b',
        backgroundSecondary: '#334155',
        backgroundHover: '#475569',
        pressedBackground: '#64748b',

        // Text
        text: '#f8fafc',
        textSecondary: '#cbd5e1',
        textTertiary: '#64748b',

        // Border
        border: '#334155',
        borderLight: '#1e293b',

        // Semantic
        success: '#4ade80',
        onSuccess: '#0f172a',
        error: '#f87171',
        onError: '#0f172a',
        warning: '#fbbf24',
        onWarning: '#0f172a',
    },
}

