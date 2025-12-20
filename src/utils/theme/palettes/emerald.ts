import { neutralDark, neutralLight } from './shared'
import { emerald, amber, slate, green, red, blue, teal, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Emerald light palette - Fresh, accessible color scheme
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
    primaryDisabled: emerald[300],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    secondaryDisabled: slate[100],
    // Tertiary - Complementary teal
    tertiary: teal[500],
    onTertiary: white,
    tertiaryHover: teal[600],
    tertiaryActive: teal[700],
    tertiarySubtle: teal[50],
    tertiaryDisabled: teal[300],
    // Accent - Warm amber contrast
    accent: amber[500],
    onAccent: amber[950],
    accentHover: amber[600],
    accentActive: amber[700],
    accentSubtle: amber[50],
    borderFocus: emerald[500],
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
    link: emerald[600],
    linkHover: emerald[700],
    linkActive: emerald[800],
    linkVisited: teal[700],
    focus: emerald[500],
}

/**
 * Emerald dark palette - Fresh, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const emeraldDark: ColorPalette = {
    ...neutralDark,
    // Primary - Emerald palette (lighter for dark mode)
    primary: emerald[400],
    onPrimary: emerald[950],
    primaryHover: emerald[300],
    primaryActive: emerald[500],
    primarySubtle: emerald[950],
    primaryDisabled: emerald[700],
    // Secondary - Neutral with slight tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    secondaryDisabled: slate[800],
    // Tertiary - Complementary teal
    tertiary: teal[400],
    onTertiary: teal[950],
    tertiaryHover: teal[300],
    tertiaryActive: teal[500],
    tertiarySubtle: teal[950],
    tertiaryDisabled: teal[700],
    // Accent - Warm amber contrast
    accent: amber[400],
    onAccent: amber[950],
    accentHover: amber[300],
    accentActive: amber[500],
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
    linkActive: emerald[500],
    linkVisited: teal[400],
    focus: emerald[400],
}

