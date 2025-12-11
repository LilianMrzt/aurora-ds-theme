import type { Theme } from '@/types/Theme'

/**
 * Mock theme for tests
 */
export const mockTheme: Theme = {
    colors: {
        primary: '#007bff',
        onPrimary: '#ffffff',
        hoverPrimary: '#0056b3',
        pressedPrimary: '#004085',
        secondary: '#6c757d',
        onSecondary: '#ffffff',
        hoverSecondary: '#545b62',
        background: '#ffffff',
        surface: '#f8f9fa',
        backgroundSecondary: '#e9ecef',
        backgroundHover: '#dee2e6',
        pressedBackground: '#ced4da',
        text: '#212529',
        textSecondary: '#6c757d',
        textTertiary: '#adb5bd',
        border: '#dee2e6',
        borderLight: '#e9ecef',
        success: '#28a745',
        onSuccess: '#ffffff',
        error: '#dc3545',
        onError: '#ffffff',
        warning: '#ffc107',
        onWarning: '#212529'
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
    },
    radius: {
        sm: '4px',
        md: '6px',
        lg: '12px'
    },
    shadows: {
        sm: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        md: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px',
        lg: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px'
    },
    fontSize: {
        xs: '0.85rem',
        sm: '0.95rem',
        md: '1.2rem',
        lg: '1.5rem',
        xl: '3rem',
        xxl: '10rem'
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
    }
}

