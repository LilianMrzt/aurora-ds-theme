/**
 * Base color tokens following modern design system semantics - V2
 */
export type BaseColors = {
    // === SURFACE ===
    background: string
    surface: string
    surfaceHover: string
    surfaceActive: string

    // === TEXT ===
    text: string
    textSecondary: string
    textTertiary: string

    // === PRIMARY ===
    primary: string
    primaryHover: string
    primaryActive: string
    primarySubtle: string
    primaryDisabled: string
    onPrimary: string

    // === SECONDARY ===
    secondary: string
    secondaryHover: string
    secondaryActive: string
    secondarySubtle: string
    secondaryDisabled: string
    onSecondary: string

    // === BORDER ===
    border: string

    // === DISABLED ===
    disabled: string
    disabledText: string

    // === SEMANTIC: SUCCESS ===
    success: string
    successSubtle: string

    // === SEMANTIC: WARNING ===
    warning: string
    warningSubtle: string

    // === SEMANTIC: ERROR ===
    error: string
    errorHover: string
    errorSubtle: string
    onError: string

    // === SEMANTIC: INFO ===
    info: string
    infoSubtle: string

    // === INTERACTIVE ===
    link: string
    linkHover: string
    linkActive: string
    linkDisabled: string
}

