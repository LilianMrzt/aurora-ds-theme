import { slate, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Shared neutral colors for light themes
 * Follows WCAG AA contrast guidelines with slate palette
 */
export const neutralLight: Omit<ColorPalette,
    | 'primary' | 'onPrimary' | 'primaryHover' | 'primaryActive' | 'primarySubtle'
    | 'secondary' | 'onSecondary' | 'secondaryHover' | 'secondaryActive' | 'secondarySubtle'
    | 'accent' | 'onAccent' | 'accentHover' | 'accentSubtle'
    | 'borderFocus' | 'link' | 'linkHover' | 'linkVisited' | 'focus'
    | 'success' | 'onSuccess' | 'successHover' | 'successSubtle'
    | 'warning' | 'onWarning' | 'warningHover' | 'warningSubtle'
    | 'error' | 'onError' | 'errorHover' | 'errorSubtle'
    | 'info' | 'onInfo' | 'infoHover' | 'infoSubtle'
> = {
    background: slate[50],
    surface: white,
    surfaceHover: slate[200],
    surfaceActive: slate[300],
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
    | 'primary' | 'onPrimary' | 'primaryHover' | 'primaryActive' | 'primarySubtle'
    | 'secondary' | 'onSecondary' | 'secondaryHover' | 'secondaryActive' | 'secondarySubtle'
    | 'accent' | 'onAccent' | 'accentHover' | 'accentSubtle'
    | 'borderFocus' | 'link' | 'linkHover' | 'linkVisited' | 'focus'
    | 'success' | 'onSuccess' | 'successHover' | 'successSubtle'
    | 'warning' | 'onWarning' | 'warningHover' | 'warningSubtle'
    | 'error' | 'onError' | 'errorHover' | 'errorSubtle'
    | 'info' | 'onInfo' | 'infoHover' | 'infoSubtle'
> = {
    background: slate[950],
    surface: slate[900],
    surfaceHover: slate[800],
    surfaceActive: slate[700],
    elevated: slate[800],
    overlay: 'rgba(0, 0, 0, 0.8)',
    text: slate[50],
    textSecondary: slate[400],
    textTertiary: slate[500],
    textInverse: slate[900],
    border: slate[800],
    borderHover: slate[700],
    borderSubtle: slate[900],
    disabled: slate[700],
    disabledText: slate[500],
}

