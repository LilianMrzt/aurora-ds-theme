import { neutralDark, neutralLight } from './shared'
import { teal, orange, slate, green, amber, red, blue, cyan, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Teal light palette - Cool, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const tealLight: ColorPalette = {
    ...neutralLight,
    // Primary - Teal palette
    primary: teal[600],
    onPrimary: white,
    primaryHover: teal[700],
    primaryActive: teal[800],
    primarySubtle: teal[50],
    primaryDisabled: teal[300],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    secondaryDisabled: slate[100],
    // Tertiary - Complementary cyan
    tertiary: cyan[500],
    onTertiary: white,
    tertiaryHover: cyan[600],
    tertiaryActive: cyan[700],
    tertiarySubtle: cyan[50],
    tertiaryDisabled: cyan[300],
    // Accent - Warm orange contrast
    accent: orange[500],
    onAccent: white,
    accentHover: orange[600],
    accentActive: orange[700],
    accentSubtle: orange[50],
    borderFocus: teal[500],
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
    link: teal[600],
    linkHover: teal[700],
    linkActive: teal[800],
    linkVisited: cyan[700],
    focus: teal[500],
}

/**
 * Teal dark palette - Cool, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const tealDark: ColorPalette = {
    ...neutralDark,
    // Primary - Teal palette (lighter for dark mode)
    primary: teal[400],
    onPrimary: teal[950],
    primaryHover: teal[300],
    primaryActive: teal[500],
    primarySubtle: teal[950],
    primaryDisabled: teal[700],
    // Secondary - Neutral with slight tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    secondaryDisabled: slate[800],
    // Tertiary - Complementary cyan
    tertiary: cyan[400],
    onTertiary: cyan[950],
    tertiaryHover: cyan[300],
    tertiaryActive: cyan[500],
    tertiarySubtle: cyan[950],
    tertiaryDisabled: cyan[700],
    // Accent - Warm orange contrast
    accent: orange[400],
    onAccent: orange[950],
    accentHover: orange[300],
    accentActive: orange[500],
    accentSubtle: orange[950],
    borderFocus: teal[400],
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
    link: teal[400],
    linkHover: teal[300],
    linkActive: teal[500],
    linkVisited: cyan[400],
    focus: teal[400],
}

