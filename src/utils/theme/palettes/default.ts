import { colors } from '../colors'

import type { BaseColors } from '@/types'

/**
 * Default light theme palette - V2
 * A clean, modern palette using Indigo as primary and Slate as neutral
 */
export const defaultPalette: BaseColors = {
    // Surface colors
    background: colors.slate[25],
    surface: colors.white,
    surfaceHover: colors.slate[100],
    surfaceActive: colors.slate[200],

    // Text colors
    text: colors.slate[800],
    textSecondary: colors.slate[500],
    textTertiary: colors.slate[400],

    // Primary colors
    primary: colors.indigo[600],
    primaryHover: colors.indigo[700],
    primaryActive: colors.indigo[800],
    primarySubtle: colors.indigo[50],
    primaryDisabled: colors.indigo[300],
    onPrimary: colors.white,

    // Secondary colors
    secondary: colors.slate[100],
    secondaryHover: colors.slate[200],
    secondaryActive: colors.slate[300],
    secondarySubtle: colors.slate[50],
    secondaryDisabled: colors.slate[200],
    onSecondary: colors.slate[700],

    // Border colors
    border: colors.slate[200],

    // Disabled state
    disabledText: colors.slate[400],
    disabled: colors.slate[300],

    // Semantic colors - Success
    success: colors.emerald[600],
    successSubtle: colors.emerald[50],

    // Semantic colors - Warning
    warning: colors.amber[500],
    warningSubtle: colors.amber[50],

    // Semantic colors - Error
    error: colors.red[600],
    errorHover: colors.red[700],
    errorSubtle: colors.red[50],
    onError: colors.white,

    // Semantic colors - Info
    info: colors.blue[600],
    infoSubtle: colors.blue[50],

    // Link colors
    link: colors.indigo[600],
    linkHover: colors.indigo[700],
    linkActive: colors.indigo[800],
    linkDisabled: colors.indigo[300],
}

