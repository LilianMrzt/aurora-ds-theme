export type Theme = {
    colors: {
        // Primary - Main actions
        primary: string
        onPrimary: string
        hoverPrimary: string
        pressedPrimary: string

        // Secondary - Secondary actions (primary tint)
        secondary: string
        onSecondary: string
        hoverSecondary: string

        // Background & Surface
        background: string
        surface: string
        backgroundSecondary: string
        backgroundHover: string
        pressedBackground: string

        // Text
        text: string
        textSecondary: string
        textTertiary: string

        // Border
        border: string
        borderLight: string

        // Semantic - States and feedback
        success: string
        onSuccess: string
        error: string
        onError: string
        warning: string
        onWarning: string
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
    }
    shadows: {
        sm: string
        md: string
        lg: string
    }
    fontSize: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        xxl: string
    }
    fontWeight: {
        regular: number
        medium: number
        semibold: number
        bold: number
    }
}

