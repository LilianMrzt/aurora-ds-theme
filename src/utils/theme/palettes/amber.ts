import { neutralDark, neutralLight } from './shared'
import { amber, indigo, slate, green, red, blue, yellow, orange, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Amber light palette - Warm, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const amberLight: ColorPalette = {
    ...neutralLight,
    // Primary - Amber palette (darker shade for better contrast)
    primary: amber[500],
    onPrimary: amber[950],
    primaryHover: amber[600],
    primaryActive: amber[700],
    primarySubtle: amber[50],
    // Secondary - Neutral with warm tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    // Tertiary - Warm orange complement
    tertiary: orange[500],
    onTertiary: white,
    tertiaryHover: orange[600],
    tertiaryActive: orange[700],
    tertiarySubtle: orange[50],
    // Accent - Contrasting indigo
    accent: indigo[600],
    onAccent: white,
    accentHover: indigo[700],
    accentSubtle: indigo[50],
    borderFocus: amber[500],
    // Semantic colors
    success: green[600],
    onSuccess: white,
    successHover: green[700],
    successSubtle: green[50],
    warning: yellow[500],
    onWarning: yellow[950],
    warningHover: yellow[600],
    warningSubtle: yellow[50],
    error: red[500],
    onError: white,
    errorHover: red[600],
    errorSubtle: red[50],
    info: blue[500],
    onInfo: white,
    infoHover: blue[600],
    infoSubtle: blue[50],
    // Interactive
    link: amber[700],
    linkHover: amber[800],
    linkVisited: orange[700],
    focus: amber[500],
}

/**
 * Amber dark palette - Warm, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const amberDark: ColorPalette = {
    ...neutralDark,
    // Primary - Amber palette (lighter for dark mode)
    primary: amber[400],
    onPrimary: amber[950],
    primaryHover: amber[300],
    primaryActive: amber[500],
    primarySubtle: amber[950],
    // Secondary - Neutral with warm tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    // Tertiary - Warm orange complement
    tertiary: orange[400],
    onTertiary: orange[950],
    tertiaryHover: orange[300],
    tertiaryActive: orange[500],
    tertiarySubtle: orange[950],
    // Accent - Contrasting indigo
    accent: indigo[400],
    onAccent: indigo[950],
    accentHover: indigo[300],
    accentSubtle: indigo[950],
    borderFocus: amber[400],
    // Semantic colors
    success: green[400],
    onSuccess: green[950],
    successHover: green[300],
    successSubtle: green[950],
    warning: yellow[400],
    onWarning: yellow[950],
    warningHover: yellow[300],
    warningSubtle: yellow[950],
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
    linkVisited: orange[400],
    focus: amber[400],
}

