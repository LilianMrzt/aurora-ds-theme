import { neutralDark, neutralLight } from './shared'
import { indigo, cyan, slate, green, red, amber, blue, violet, white } from '../colors'

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
    // Accent
    accent: cyan[500],
    onAccent: white,
    accentHover: cyan[600],
    accentSubtle: cyan[50],
    borderFocus: indigo[500],
    // Semantic colors - Soft and subtle
    success: green[500],
    onSuccess: white,
    successHover: green[600],
    successSubtle: green[50],
    warning: amber[400],
    onWarning: amber[900],
    warningHover: amber[500],
    warningSubtle: amber[50],
    error: red[400],
    onError: white,
    errorHover: red[500],
    errorSubtle: red[50],
    info: blue[400],
    onInfo: white,
    infoHover: blue[500],
    infoSubtle: blue[50],
    // Interactive
    link: indigo[500],
    linkHover: indigo[600],
    linkVisited: violet[600],
    focus: indigo[500],
}

/**
 * Indigo dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const indigoDark: ColorPalette = {
    ...neutralDark,
    // Primary - Indigo palette
    primary: indigo[500],
    onPrimary: white,
    primaryHover: indigo[400],
    primaryActive: indigo[600],
    primarySubtle: indigo[950],
    // Secondary - Neutral with slight tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent
    accent: cyan[500],
    onAccent: white,
    accentHover: cyan[400],
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

