import { neutralDark, neutralLight } from './shared'
import { blue, sky, slate, green, red, amber, violet, cyan, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Blue light palette - Classic, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const blueLight: ColorPalette = {
    ...neutralLight,
    // Primary - Blue palette
    primary: blue[600],
    onPrimary: white,
    primaryHover: blue[700],
    primaryActive: blue[800],
    primarySubtle: blue[50],
    primaryDisabled: blue[300],
    // Secondary - Neutral with slight blue tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    secondaryDisabled: slate[100],
    // Tertiary - Complementary sky blue
    tertiary: sky[500],
    onTertiary: white,
    tertiaryHover: sky[600],
    tertiaryActive: sky[700],
    tertiarySubtle: sky[50],
    tertiaryDisabled: sky[300],
    // Accent - Contrasting cyan
    accent: cyan[500],
    onAccent: white,
    accentHover: cyan[600],
    accentActive: cyan[700],
    accentSubtle: cyan[50],
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
    linkActive: blue[800],
    linkVisited: violet[700],
    focus: blue[500],
}

/**
 * Blue dark palette - Classic, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const blueDark: ColorPalette = {
    ...neutralDark,
    // Primary - Blue palette (lighter for dark mode)
    primary: blue[400],
    onPrimary: blue[950],
    primaryHover: blue[300],
    primaryActive: blue[500],
    primarySubtle: blue[950],
    primaryDisabled: blue[700],
    // Secondary - Neutral with slight blue tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    secondaryDisabled: slate[800],
    // Tertiary - Complementary sky blue
    tertiary: sky[400],
    onTertiary: sky[950],
    tertiaryHover: sky[300],
    tertiaryActive: sky[500],
    tertiarySubtle: sky[950],
    tertiaryDisabled: sky[700],
    // Accent - Contrasting cyan
    accent: cyan[400],
    onAccent: cyan[950],
    accentHover: cyan[300],
    accentActive: cyan[500],
    accentSubtle: cyan[950],
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
    linkActive: blue[500],
    linkVisited: violet[400],
    focus: blue[400],
}

