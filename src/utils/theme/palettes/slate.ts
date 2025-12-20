import { neutralDark, neutralLight } from './shared'
import { slate, blue, green, amber, red, indigo, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Slate light palette - Professional, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const slateLight: ColorPalette = {
    ...neutralLight,
    // Primary - Slate palette
    primary: slate[700],
    onPrimary: white,
    primaryHover: slate[800],
    primaryActive: slate[900],
    primarySubtle: slate[100],
    // Secondary - Neutral
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Tertiary - Complementary blue-gray
    tertiary: slate[600],
    onTertiary: white,
    tertiaryHover: slate[700],
    tertiaryActive: slate[800],
    tertiarySubtle: slate[100],
    // Accent - Vibrant blue for highlights
    accent: blue[600],
    onAccent: white,
    accentHover: blue[700],
    accentSubtle: blue[50],
    borderFocus: blue[500],
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
    link: blue[600],
    linkHover: blue[700],
    linkVisited: indigo[700],
    focus: blue[500],
}

/**
 * Slate dark palette - Professional, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const slateDark: ColorPalette = {
    ...neutralDark,
    // Primary - Slate palette (lighter for dark mode)
    primary: slate[200],
    onPrimary: slate[900],
    primaryHover: slate[100],
    primaryActive: slate[300],
    primarySubtle: slate[900],
    // Secondary - Neutral
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    // Tertiary - Complementary blue-gray
    tertiary: slate[400],
    onTertiary: slate[950],
    tertiaryHover: slate[300],
    tertiaryActive: slate[500],
    tertiarySubtle: slate[900],
    // Accent - Vibrant blue for highlights
    accent: blue[400],
    onAccent: blue[950],
    accentHover: blue[300],
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
    linkVisited: indigo[400],
    focus: blue[400],
}

