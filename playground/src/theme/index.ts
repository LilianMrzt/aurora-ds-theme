import { createTheme } from '../../../src'

// 1. Définir le type du thème selon le README
type PlaygroundTheme = {
    colors: {
        primary: string
        primaryHover: string
        primaryLight: string
        secondary: string
        secondaryHover: string
        success: string
        successHover: string
        warning: string
        warningHover: string
        error: string
        errorHover: string
        background: string
        surface: string
        text: string
        textMuted: string
        border: string
    }
    spacing: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
    }
    radius: {
        sm: string
        md: string
        lg: string
        full: string
    }
    shadows: {
        sm: string
        md: string
        lg: string
    }
}

// 2. Module augmentation pour l'autocomplétion
declare module '../../../src' {
    interface ThemeRegistry {
        theme: PlaygroundTheme
    }
}

// 3. Créer les thèmes
export const lightTheme = createTheme({
    colors: {
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        primaryLight: '#eff6ff',
        secondary: '#a855f7',
        secondaryHover: '#9333ea',
        success: '#10b981',
        successHover: '#059669',
        warning: '#f59e0b',
        warningHover: '#d97706',
        error: '#ef4444',
        errorHover: '#dc2626',
        background: '#f4f4f5',
        surface: '#ffffff',
        text: '#18181b',
        textMuted: '#71717a',
        border: '#e4e4e7',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    radius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
})

export const darkTheme = createTheme({
    colors: {
        primary: '#60a5fa',
        primaryHover: '#3b82f6',
        primaryLight: '#1e3a5f',
        secondary: '#c084fc',
        secondaryHover: '#a855f7',
        success: '#34d399',
        successHover: '#10b981',
        warning: '#fbbf24',
        warningHover: '#f59e0b',
        error: '#f87171',
        errorHover: '#ef4444',
        background: '#09090b',
        surface: '#18181b',
        text: '#fafafa',
        textMuted: '#a1a1aa',
        border: '#3f3f46',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    radius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    },
})

export type AppTheme = typeof lightTheme
