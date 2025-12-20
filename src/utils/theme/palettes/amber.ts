import { neutralDark, neutralLight } from './shared'
import { amber, indigo, slate, green, red, blue, yellow, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Amber light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const amberLight: ColorPalette = {
    ...neutralLight,
    // Primary - Amber palette (darker shade for better contrast)
    primary: amber[500],
    onPrimary: amber[900],
    primaryHover: amber[600],
    primaryActive: amber[700],
    primarySubtle: amber[50],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Accent
    accent: indigo[600],
    onAccent: white,
    accentHover: indigo[700],
    accentSubtle: indigo[50],
    borderFocus: amber[500],
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
    link: amber[600],
    linkHover: amber[700],
    linkVisited: yellow[700],
    focus: amber[500],
}

/**
 * Amber dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const amberDark: ColorPalette = {
    ...neutralDark,
    // Primary - Amber palette
    primary: amber[500],
    onPrimary: amber[950],
    primaryHover: amber[400],
    primaryActive: amber[600],
    primarySubtle: amber[950],
    // Secondary - Neutral with slight tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent
    accent: indigo[500],
    onAccent: white,
    accentHover: indigo[400],
    accentSubtle: indigo[950],
    borderFocus: amber[400],
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
    link: amber[400],
    linkHover: amber[300],
    linkVisited: yellow[400],
    focus: amber[400],
}

