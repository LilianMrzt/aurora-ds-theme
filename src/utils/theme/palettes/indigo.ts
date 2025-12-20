import { neutralDark, neutralLight } from './shared'
import { indigo, cyan, slate, green, red, amber, blue, violet, purple, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Indigo light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const indigoLight: ColorPalette = {
    ...neutralLight,
    // Primary - Indigo palette
    primary: indigo[600],
    onPrimary: white,
    primaryHover: indigo[700],
    primaryActive: indigo[800],
    primarySubtle: indigo[50],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Tertiary - Complementary purple
    tertiary: purple[600],
    onTertiary: white,
    tertiaryHover: purple[700],
    tertiaryActive: purple[800],
    tertiarySubtle: purple[50],
    // Accent - Contrasting cyan
    accent: cyan[500],
    onAccent: white,
    accentHover: cyan[600],
    accentSubtle: cyan[50],
    borderFocus: indigo[500],
    // Semantic colors
    success: green[600],
    onSuccess: white,
    successHover: green[700],
    successSubtle: green[50],
    warning: amber[500],
    onWarning: amber[950],
    warningHover: amber[600],
    warningSubtle: amber[50],
    error: red[500],
    onError: white,
    errorHover: red[600],
    errorSubtle: red[50],
    info: blue[500],
    onInfo: white,
    infoHover: blue[600],
    infoSubtle: blue[50],
    // Interactive
    link: indigo[600],
    linkHover: indigo[700],
    linkVisited: violet[700],
    focus: indigo[500],
}

/**
 * Indigo dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const indigoDark: ColorPalette = {
    ...neutralDark,
    // Primary - Indigo palette (lighter for dark mode)
    primary: indigo[400],
    onPrimary: indigo[950],
    primaryHover: indigo[300],
    primaryActive: indigo[500],
    primarySubtle: indigo[950],
    // Secondary - Neutral with slight tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    // Tertiary - Complementary purple
    tertiary: purple[400],
    onTertiary: purple[950],
    tertiaryHover: purple[300],
    tertiaryActive: purple[500],
    tertiarySubtle: purple[950],
    // Accent - Contrasting cyan
    accent: cyan[400],
    onAccent: cyan[950],
    accentHover: cyan[300],
    accentSubtle: cyan[950],
    borderFocus: indigo[400],
    // Semantic colors
    success: green[400],
    onSuccess: green[950],
    successHover: green[300],
    successSubtle: green[950],
    warning: amber[400],
    onWarning: amber[950],
    warningHover: amber[300],
    warningSubtle: amber[950],
    error: red[400],
    onError: red[950],
    errorHover: red[300],
    errorSubtle: red[950],
    info: blue[400],
    onInfo: blue[950],
    infoHover: blue[300],
    infoSubtle: blue[950],
    // Interactive
    link: indigo[400],
    linkHover: indigo[300],
    linkVisited: violet[400],
    focus: indigo[400],
}

