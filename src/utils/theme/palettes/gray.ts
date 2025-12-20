import { neutralDark, neutralLight } from './shared'
import { gray, indigo, slate, green, amber, red, blue, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Gray light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const grayLight: ColorPalette = {
    ...neutralLight,
    // Primary - Gray palette
    primary: gray[900],
    onPrimary: white,
    primaryHover: gray[800],
    primaryActive: gray[950],
    primarySubtle: gray[100],
    // Secondary - Neutral
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
    borderFocus: gray[900],
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
    link: gray[900],
    linkHover: gray[700],
    linkVisited: gray[600],
    focus: gray[900],
}

/**
 * Gray dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const grayDark: ColorPalette = {
    ...neutralDark,
    // Primary - Gray palette
    primary: gray[50],
    onPrimary: gray[900],
    primaryHover: gray[100],
    primaryActive: gray[200],
    primarySubtle: gray[900],
    // Secondary - Neutral
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
    borderFocus: gray[50],
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
    link: gray[50],
    linkHover: gray[200],
    linkVisited: gray[300],
    focus: gray[50],
}

