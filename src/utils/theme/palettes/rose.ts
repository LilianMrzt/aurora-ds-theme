import { neutralDark, neutralLight } from './shared'
import { rose, violet, slate, green, amber, red, blue, purple, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Rose light palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const roseLight: ColorPalette = {
    ...neutralLight,
    // Primary - Rose palette
    primary: rose[600],
    onPrimary: white,
    primaryHover: rose[700],
    primaryActive: rose[800],
    primarySubtle: rose[50],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Accent
    accent: violet[600],
    onAccent: white,
    accentHover: violet[700],
    accentSubtle: violet[50],
    borderFocus: rose[500],
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
    link: rose[500],
    linkHover: rose[600],
    linkVisited: purple[600],
    focus: rose[500],
}

/**
 * Rose dark palette - Modern, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const roseDark: ColorPalette = {
    ...neutralDark,
    // Primary - Rose palette
    primary: rose[500],
    onPrimary: white,
    primaryHover: rose[400],
    primaryActive: rose[600],
    primarySubtle: rose[950],
    // Secondary - Neutral with slight tint
    secondary: slate[800],
    onSecondary: slate[200],
    secondaryHover: slate[700],
    secondaryActive: slate[600],
    secondarySubtle: slate[900],
    // Accent
    accent: violet[500],
    onAccent: white,
    accentHover: violet[400],
    accentSubtle: violet[950],
    borderFocus: rose[400],
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
    link: rose[400],
    linkHover: rose[300],
    linkVisited: purple[400],
    focus: rose[400],
}

