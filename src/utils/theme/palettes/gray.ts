import { neutralDark, neutralLight } from './shared'
import { gray, indigo, green, amber, red, blue, violet, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Gray light palette - Clean, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const grayLight: ColorPalette = {
    ...neutralLight,
    // Primary - Gray palette
    primary: gray[800],
    onPrimary: white,
    primaryHover: gray[900],
    primaryActive: gray[950],
    primarySubtle: gray[100],
    primaryDisabled: gray[400],
    // Secondary - Neutral
    secondary: gray[100],
    onSecondary: gray[700],
    secondaryHover: gray[200],
    secondaryActive: gray[300],
    secondarySubtle: gray[50],
    secondaryDisabled: gray[100],
    // Tertiary - Warm gray variant
    tertiary: gray[600],
    onTertiary: white,
    tertiaryHover: gray[700],
    tertiaryActive: gray[800],
    tertiarySubtle: gray[100],
    tertiaryDisabled: gray[400],
    // Accent - Vibrant indigo for highlights
    accent: indigo[600],
    onAccent: white,
    accentHover: indigo[700],
    accentActive: indigo[800],
    accentSubtle: indigo[50],
    borderFocus: indigo[500],
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
    link: indigo[600],
    linkHover: indigo[700],
    linkActive: indigo[800],
    linkVisited: violet[700],
    focus: indigo[500],
}

/**
 * Gray dark palette - Clean, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const grayDark: ColorPalette = {
    ...neutralDark,
    // Primary - Gray palette (lighter for dark mode)
    primary: gray[100],
    onPrimary: gray[900],
    primaryHover: gray[50],
    primaryActive: gray[200],
    primarySubtle: gray[900],
    primaryDisabled: gray[600],
    // Secondary - Neutral
    secondary: gray[700],
    onSecondary: gray[100],
    secondaryHover: gray[600],
    secondaryActive: gray[500],
    secondarySubtle: gray[800],
    secondaryDisabled: gray[800],
    // Tertiary - Warm gray variant
    tertiary: gray[400],
    onTertiary: gray[950],
    tertiaryHover: gray[300],
    tertiaryActive: gray[500],
    tertiarySubtle: gray[900],
    tertiaryDisabled: gray[600],
    // Accent - Vibrant indigo for highlights
    accent: indigo[400],
    onAccent: indigo[950],
    accentHover: indigo[300],
    accentActive: indigo[500],
    accentSubtle: indigo[950],
    borderFocus: indigo[400],
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
    link: indigo[400],
    linkHover: indigo[300],
    linkActive: indigo[500],
    linkVisited: violet[400],
    focus: indigo[400],
}

