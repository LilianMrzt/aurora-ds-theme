import { neutralDark, neutralLight } from './shared'
import { blue, slate, green, red, amber, violet, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Blue light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const blueLight: ColorPalette = {
    ...neutralLight,
    // Primary - Blue palette
    primary: blue[600],
    onPrimary: white,
    primaryHover: blue[700],
    primaryActive: blue[800],
    primarySubtle: blue[50],
    // Secondary - Neutral with slight blue tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Accent (using primary for consistency)
    accent: blue[600],
    onAccent: white,
    accentHover: blue[700],
    accentSubtle: blue[50],
    borderFocus: blue[500],
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
    link: blue[500],
    linkHover: blue[600],
    linkVisited: violet[600],
    focus: blue[500],
}

/**
 * Blue dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const blueDark: ColorPalette = {
    ...neutralDark,
    // Primary - Blue palette
    primary: blue[500],
    onPrimary: white,
    primaryHover: blue[400],
    primaryActive: blue[600],
    primarySubtle: blue[950],
    // Secondary - Neutral with slight blue tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent (using primary for consistency)
    accent: blue[500],
    onAccent: white,
    accentHover: blue[400],
    accentSubtle: blue[950],
    borderFocus: blue[400],
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
    link: blue[400],
    linkHover: blue[300],
    linkVisited: violet[400],
    focus: blue[400],
}

