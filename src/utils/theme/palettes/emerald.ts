import { neutralDark, neutralLight } from './shared'
import { emerald, amber, slate, green, red, blue, teal, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Emerald light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const emeraldLight: ColorPalette = {
    ...neutralLight,
    // Primary - Emerald palette
    primary: emerald[600],
    onPrimary: white,
    primaryHover: emerald[700],
    primaryActive: emerald[800],
    primarySubtle: emerald[50],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Accent
    accent: amber[500],
    onAccent: amber[900],
    accentHover: amber[600],
    accentSubtle: amber[50],
    borderFocus: emerald[500],
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
    link: emerald[600],
    linkHover: emerald[700],
    linkVisited: teal[700],
    focus: emerald[500],
}

/**
 * Emerald dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const emeraldDark: ColorPalette = {
    ...neutralDark,
    // Primary - Emerald palette
    primary: emerald[500],
    onPrimary: white,
    primaryHover: emerald[400],
    primaryActive: emerald[600],
    primarySubtle: emerald[950],
    // Secondary - Neutral with slight tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent
    accent: amber[500],
    onAccent: amber[950],
    accentHover: amber[400],
    accentSubtle: amber[950],
    borderFocus: emerald[400],
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
    link: emerald[400],
    linkHover: emerald[300],
    linkVisited: teal[400],
    focus: emerald[400],
}

