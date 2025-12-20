import { neutralDark, neutralLight } from './shared'
import { violet, pink, slate, green, amber, red, blue, purple, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Violet light palette - Creative, accessible color scheme
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
    // Tertiary - Complementary purple
    tertiary: purple[500],
    onTertiary: white,
    tertiaryHover: purple[600],
    tertiaryActive: purple[700],
    tertiarySubtle: purple[50],
    // Accent - Vibrant pink
    accent: pink[500],
    onAccent: white,
    accentHover: pink[600],
    accentSubtle: pink[50],
    borderFocus: violet[500],
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
    link: violet[600],
    linkHover: violet[700],
    linkVisited: purple[700],
    focus: violet[500],
}

/**
 * Violet dark palette - Creative, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const violetDark: ColorPalette = {
    ...neutralDark,
    // Primary - Violet palette (lighter for dark mode)
    primary: violet[400],
    onPrimary: violet[950],
    primaryHover: violet[300],
    primaryActive: violet[500],
    primarySubtle: violet[950],
    // Secondary - Neutral with slight tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    // Tertiary - Complementary purple
    tertiary: purple[400],
    onTertiary: purple[950],
    tertiaryHover: purple[300],
    tertiaryActive: purple[500],
    tertiarySubtle: purple[950],
    // Accent - Vibrant pink
    accent: pink[400],
    onAccent: pink[950],
    accentHover: pink[300],
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

