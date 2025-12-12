/**
 * Base color tokens following modern design system semantics
 */
export type BaseColors = {
    // === PRIMARY ===
    primary: string
    onPrimary: string
    primaryHover: string
    primaryActive: string
    primarySubtle: string

    // === SECONDARY ===
    secondary: string
    onSecondary: string
    secondaryHover: string
    secondaryActive: string
    secondarySubtle: string

    // === ACCENT ===
    accent: string
    onAccent: string
    accentHover: string
    accentSubtle: string

    // === NEUTRAL / SURFACE ===
    background: string
    surface: string
    surfaceHover: string
    surfaceActive: string
    elevated: string
    overlay: string

    // === TEXT ===
    text: string
    textSecondary: string
    textTertiary: string
    textInverse: string

    // === BORDER ===
    border: string
    borderHover: string
    borderFocus: string
    borderSubtle: string

    // === SEMANTIC: SUCCESS ===
    success: string
    onSuccess: string
    successHover: string
    successSubtle: string

    // === SEMANTIC: WARNING ===
    warning: string
    onWarning: string
    warningHover: string
    warningSubtle: string

    // === SEMANTIC: ERROR ===
    error: string
    onError: string
    errorHover: string
    errorSubtle: string

    // === SEMANTIC: INFO ===
    info: string
    onInfo: string
    infoHover: string
    infoSubtle: string

    // === INTERACTIVE ===
    link: string
    linkHover: string
    linkVisited: string
    focus: string

    // === DISABLED ===
    disabled: string
    disabledText: string
}

