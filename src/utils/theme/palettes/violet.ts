import { neutralDark, neutralLight } from './shared'
import { violet, pink, slate, green, amber, red, blue, purple, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Violet light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const violetLight: ColorPalette = {
    ...neutralLight,
    // Primary - Violet palette
    primary: violet[600],
    onPrimary: white,
    primaryHover: violet[700],
    primaryActive: violet[800],
    primarySubtle: violet[50],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Accent
    accent: pink[500],
    onAccent: white,
    accentHover: pink[600],
    accentSubtle: pink[50],
    borderFocus: violet[500],
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
    link: violet[500],
    linkHover: violet[600],
    linkVisited: purple[600],
    focus: violet[500],
}

/**
 * Violet dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const violetDark: ColorPalette = {
    ...neutralDark,
    // Primary - Violet palette
    primary: violet[500],
    onPrimary: white,
    primaryHover: violet[400],
    primaryActive: violet[600],
    primarySubtle: violet[950],
    // Secondary - Neutral with slight tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent
    accent: pink[500],
    onAccent: white,
    accentHover: pink[400],
    accentSubtle: pink[950],
    borderFocus: violet[400],
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
    link: violet[400],
    linkHover: violet[300],
    linkVisited: purple[400],
    focus: violet[400],
}

