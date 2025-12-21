import type { Theme } from '@/types'

/**
 * Mock theme for tests
 */
export const mockTheme: Theme = {
    colors: {
        primary: '#6366f1',
        onPrimary: '#ffffff',
        primaryHover: '#4f46e5',
        primaryActive: '#4338ca',
        primarySubtle: '#eef2ff',
        primaryDisabled: '#a5b4fc',

        secondary: '#6b7280',
        onSecondary: '#ffffff',
        secondaryHover: '#4b5563',
        secondaryActive: '#374151',
        secondarySubtle: '#f3f4f6',
        secondaryDisabled: '#d1d5db',

        tertiary: '#8b5cf6',
        onTertiary: '#ffffff',
        tertiaryHover: '#7c3aed',
        tertiaryActive: '#6d28d9',
        tertiarySubtle: '#f5f3ff',
        tertiaryDisabled: '#c4b5fd',

        accent: '#06b6d4',
        onAccent: '#ffffff',
        accentHover: '#0891b2',
        accentActive: '#0e7490',
        accentSubtle: '#ecfeff',

        background: '#ffffff',
        surface: '#fafafa',
        surfaceHover: '#f4f4f5',
        surfaceActive: '#e4e4e7',
        elevated: '#ffffff',
        overlay: 'rgba(9, 9, 11, 0.5)',

        text: '#09090b',
        textSecondary: '#52525b',
        textTertiary: '#a1a1aa',
        textInverse: '#fafafa',

        border: '#e4e4e7',
        borderHover: '#d4d4d8',
        borderFocus: '#6366f1',
        borderSubtle: '#f4f4f5',

        success: '#10b981',
        onSuccess: '#ffffff',
        successHover: '#059669',
        successSubtle: '#ecfdf5',

        warning: '#f97316',
        onWarning: '#ffffff',
        warningHover: '#ea580c',
        warningSubtle: '#fff7ed',

        error: '#ef4444',
        onError: '#ffffff',
        errorHover: '#dc2626',
        errorSubtle: '#fef2f2',

        info: '#3b82f6',
        onInfo: '#ffffff',
        infoHover: '#2563eb',
        infoSubtle: '#eff6ff',

        link: '#6366f1',
        linkHover: '#4f46e5',
        linkActive: '#4338ca',
        linkVisited: '#8b5cf6',
        focus: '#6366f1',

        disabled: '#f4f4f5',
        disabledText: '#a1a1aa',
    },

    spacing: {
        none: '0',
        '2xs': '0.125rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
    },

    radius: {
        none: '0',
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
    },

    shadows: {
        none: 'none',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        focus: '0 0 0 3px rgb(99 102 241 / 0.4)',
    },

    fontSize: {
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3rem',
        '5xl': '4rem',
    },

    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    lineHeight: {
        none: 1,
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
    },

    zIndex: {
        behind: -1,
        base: 0,
        dropdown: 1000,
        sticky: 1100,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        tooltip: 1600,
        toast: 1700,
    },

    transition: {
        fast: '150ms ease-out',
        normal: '250ms ease-out',
        slow: '350ms ease-out',
    },

    opacity: {
        none: 0,
        lowest: 0.05,
        low: 0.1,
        medium: 0.25,
        high: 0.5,
        higher: 0.75,
        full: 1,
    },

    breakpoints: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
}
