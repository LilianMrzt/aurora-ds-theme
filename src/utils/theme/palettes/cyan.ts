import { neutralDark, neutralLight } from './shared'
import { cyan, rose, slate, green, amber, red, blue, teal, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Cyan light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const cyanLight: ColorPalette = {
    ...neutralLight,
    // Primary - Cyan palette
    primary: cyan[600],
    onPrimary: white,
    primaryHover: cyan[700],
    primaryActive: cyan[800],
    primarySubtle: cyan[50],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Accent
    accent: rose[500],
    onAccent: white,
    accentHover: rose[600],
    accentSubtle: rose[50],
    borderFocus: cyan[500],
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
    link: cyan[600],
    linkHover: cyan[700],
    linkVisited: teal[700],
    focus: cyan[500],
}

/**
 * Cyan dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const cyanDark: ColorPalette = {
    ...neutralDark,
    // Primary - Cyan palette
    primary: cyan[500],
    onPrimary: white,
    primaryHover: cyan[400],
    primaryActive: cyan[600],
    primarySubtle: cyan[950],
    // Secondary - Neutral with slight tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent
    accent: rose[500],
    onAccent: white,
    accentHover: rose[400],
    accentSubtle: rose[950],
    borderFocus: cyan[400],
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
    link: cyan[400],
    linkHover: cyan[300],
    linkVisited: teal[400],
    focus: cyan[400],
}

