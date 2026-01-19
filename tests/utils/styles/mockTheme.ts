import { createTheme } from '@/utils/theme'

/**
 * Mock theme type for tests
 */
export type MockThemeType = {
    colors: {
        background: string
        surface: string
        surfaceHover: string
        surfaceActive: string
        text: string
        textSecondary: string
        textTertiary: string
        primary: string
        primaryHover: string
        primaryActive: string
        primarySubtle: string
        primaryDisabled: string
        onPrimary: string
        secondary: string
        secondaryHover: string
        secondaryActive: string
        secondarySubtle: string
        secondaryDisabled: string
        onSecondary: string
        border: string
        disabled: string
        disabledText: string
        success: string
        successSubtle: string
        warning: string
        warningSubtle: string
        error: string
        errorHover: string
        errorSubtle: string
        onError: string
        info: string
        infoSubtle: string
        link: string
        linkHover: string
        linkActive: string
        linkDisabled: string
    }
    spacing: {
        none: string
        '2xs': string
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        '2xl': string
        '3xl': string
        '4xl': string
        '5xl': string
    }
    radius: {
        none: string
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        '2xl': string
        full: string
    }
    shadows: {
        none: string
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        '2xl': string
        inner: string
        focus: string
    }
    fontSize: {
        '2xs': string
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        '2xl': string
        '3xl': string
        '4xl': string
        '5xl': string
    }
    fontWeight: {
        light: number
        regular: number
        medium: number
        semibold: number
        bold: number
    }
    lineHeight: {
        none: number
        tight: number
        normal: number
        relaxed: number
        loose: number
    }
    zIndex: {
        behind: number
        base: number
        dropdown: number
        sticky: number
        overlay: number
        modal: number
        popover: number
        tooltip: number
        toast: number
    }
    transition: {
        fast: string
        normal: string
        slow: string
    }
    opacity: {
        none: number
        lowest: number
        low: number
        medium: number
        high: number
        higher: number
        full: number
    }
    breakpoints: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        '2xl': string
    }
}

/**
 * Mock theme for tests
 */
export const mockTheme = createTheme({
    colors: {
        background: '#ffffff',
        surface: '#fafafa',
        surfaceHover: '#f4f4f5',
        surfaceActive: '#e4e4e7',
        text: '#09090b',
        textSecondary: '#52525b',
        textTertiary: '#a1a1aa',
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        primaryActive: '#4338ca',
        primarySubtle: '#eef2ff',
        primaryDisabled: '#a5b4fc',
        onPrimary: '#ffffff',
        secondary: '#f1f5f9',
        secondaryHover: '#e2e8f0',
        secondaryActive: '#cbd5e1',
        secondarySubtle: '#f8fafc',
        secondaryDisabled: '#e2e8f0',
        onSecondary: '#334155',
        border: '#e4e4e7',
        disabled: '#f4f4f5',
        disabledText: '#a1a1aa',
        success: '#10b981',
        successSubtle: '#ecfdf5',
        warning: '#f97316',
        warningSubtle: '#fff7ed',
        error: '#ef4444',
        errorHover: '#dc2626',
        errorSubtle: '#fef2f2',
        onError: '#ffffff',
        info: '#3b82f6',
        infoSubtle: '#eff6ff',
        link: '#6366f1',
        linkHover: '#4f46e5',
        linkActive: '#4338ca',
        linkDisabled: '#a5b4fc',
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
})

// Register theme type for tests
declare module '@/types/theme/Theme' {
    interface ThemeRegistry {
        theme: MockThemeType
    }
}
