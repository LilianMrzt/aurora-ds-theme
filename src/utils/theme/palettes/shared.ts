import { slate, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Shared neutral colors for light themes
 * Follows WCAG AA contrast guidelines with slate palette
 */
export const neutralLight: Omit<ColorPalette,
    | 'primary' | 'onPrimary' | 'primaryHover' | 'primaryActive' | 'primarySubtle' | 'primaryDisabled'
    | 'secondary' | 'onSecondary' | 'secondaryHover' | 'secondaryActive' | 'secondarySubtle' | 'secondaryDisabled'
    | 'accent' | 'onAccent' | 'accentHover' | 'accentActive' | 'accentSubtle'
    | 'tertiary' | 'onTertiary' | 'tertiaryHover' | 'tertiaryActive' | 'tertiarySubtle' | 'tertiaryDisabled'
    | 'borderFocus' | 'link' | 'linkHover' | 'linkActive' | 'linkVisited' | 'focus'
    | 'success' | 'onSuccess' | 'successHover' | 'successSubtle'
    | 'warning' | 'onWarning' | 'warningHover' | 'warningSubtle'
    | 'error' | 'onError' | 'errorHover' | 'errorSubtle'
    | 'info' | 'onInfo' | 'infoHover' | 'infoSubtle'
> = {
    background: slate[25],
    surface: white,
    surfaceHover: slate[100],
    surfaceActive: slate[200],
    elevated: white,
    overlay: 'rgba(15, 23, 42, 0.6)',
    text: slate[800],
    textSecondary: slate[500],
    textTertiary: slate[400],
    textInverse: white,
    border: slate[200],
    borderHover: slate[300],
    borderSubtle: slate[100],
    disabled: slate[300],
    disabledText: slate[400],
}

/**
 * Shared neutral colors for dark themes
 * Follows WCAG AA contrast guidelines with slate palette
 */
export const neutralDark: Omit<ColorPalette,
    | 'primary' | 'onPrimary' | 'primaryHover' | 'primaryActive' | 'primarySubtle' | 'primaryDisabled'
    | 'secondary' | 'onSecondary' | 'secondaryHover' | 'secondaryActive' | 'secondarySubtle' | 'secondaryDisabled'
    | 'accent' | 'onAccent' | 'accentHover' | 'accentActive' | 'accentSubtle'
    | 'tertiary' | 'onTertiary' | 'tertiaryHover' | 'tertiaryActive' | 'tertiarySubtle' | 'tertiaryDisabled'
    | 'borderFocus' | 'link' | 'linkHover' | 'linkActive' | 'linkVisited' | 'focus'
    | 'success' | 'onSuccess' | 'successHover' | 'successSubtle'
    | 'warning' | 'onWarning' | 'warningHover' | 'warningSubtle'
    | 'error' | 'onError' | 'errorHover' | 'errorSubtle'
    | 'info' | 'onInfo' | 'infoHover' | 'infoSubtle'
> = {
    background: slate[900],
    surface: slate[800],
    surfaceHover: slate[700],
    surfaceActive: slate[600],
    elevated: slate[700],
    overlay: 'rgba(0, 0, 0, 0.7)',
    text: slate[100],
    textSecondary: slate[400],
    textTertiary: slate[500],
    textInverse: slate[900],
    border: slate[600],
    borderHover: slate[500],
    borderSubtle: slate[700],
    disabled: slate[600],
    disabledText: slate[500],
}

