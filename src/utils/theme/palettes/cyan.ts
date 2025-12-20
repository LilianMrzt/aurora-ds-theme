import { neutralDark, neutralLight } from './shared'
import { cyan, rose, slate, green, amber, red, blue, teal, sky, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Cyan light palette - Fresh, accessible color scheme
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
    primaryDisabled: cyan[300],
    // Secondary - Neutral with slight tint
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
    // Accent - Warm rose contrast
    accent: rose[500],
    onAccent: white,
    accentHover: rose[600],
    accentActive: rose[700],
    accentSubtle: rose[50],
    borderFocus: cyan[500],
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
    link: cyan[600],
    linkHover: cyan[700],
    linkActive: cyan[800],
    linkVisited: teal[700],
    focus: cyan[500],
}

/**
 * Cyan dark palette - Fresh, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const cyanDark: ColorPalette = {
    ...neutralDark,
    // Primary - Cyan palette (lighter for dark mode)
    primary: cyan[400],
    onPrimary: cyan[950],
    primaryHover: cyan[300],
    primaryActive: cyan[500],
    primarySubtle: cyan[950],
    primaryDisabled: cyan[700],
    // Secondary - Neutral with slight tint
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
    // Accent - Warm rose contrast
    accent: rose[400],
    onAccent: rose[950],
    accentHover: rose[300],
    accentActive: rose[500],
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
    linkActive: cyan[500],
    linkVisited: teal[400],
    focus: cyan[400],
}

