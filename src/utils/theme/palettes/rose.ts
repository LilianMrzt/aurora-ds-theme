import { neutralDark, neutralLight } from './shared'
import { rose, violet, slate, green, amber, red, blue, purple, pink, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Rose light palette - Elegant, accessible color scheme
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
    primaryDisabled: rose[300],
    // Secondary - Neutral with slight tint
    secondary: slate[100],
    onSecondary: slate[700],
    secondaryHover: slate[200],
    secondaryActive: slate[300],
    secondarySubtle: slate[50],
    secondaryDisabled: slate[100],
    // Tertiary - Complementary pink
    tertiary: pink[500],
    onTertiary: white,
    tertiaryHover: pink[600],
    tertiaryActive: pink[700],
    tertiarySubtle: pink[50],
    tertiaryDisabled: pink[300],
    // Accent - Contrasting violet
    accent: violet[600],
    onAccent: white,
    accentHover: violet[700],
    accentActive: violet[800],
    accentSubtle: violet[50],
    borderFocus: rose[500],
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
    link: rose[600],
    linkHover: rose[700],
    linkActive: rose[800],
    linkVisited: purple[700],
    focus: rose[500],
}

/**
 * Rose dark palette - Elegant, accessible color scheme
 * Follows WCAG AA contrast guidelines
 */
export const roseDark: ColorPalette = {
    ...neutralDark,
    // Primary - Rose palette (lighter for dark mode)
    primary: rose[400],
    onPrimary: rose[950],
    primaryHover: rose[300],
    primaryActive: rose[500],
    primarySubtle: rose[950],
    primaryDisabled: rose[700],
    // Secondary - Neutral with slight tint
    secondary: slate[700],
    onSecondary: slate[100],
    secondaryHover: slate[600],
    secondaryActive: slate[500],
    secondarySubtle: slate[800],
    secondaryDisabled: slate[800],
    // Tertiary - Complementary pink
    tertiary: pink[400],
    onTertiary: pink[950],
    tertiaryHover: pink[300],
    tertiaryActive: pink[500],
    tertiarySubtle: pink[950],
    tertiaryDisabled: pink[700],
    // Accent - Contrasting violet
    accent: violet[400],
    onAccent: violet[950],
    accentHover: violet[300],
    accentActive: violet[500],
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
    linkActive: rose[500],
    linkVisited: purple[400],
    focus: rose[400],
}

