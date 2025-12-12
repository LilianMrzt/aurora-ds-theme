import { gray, white } from '../colors'

import type { Theme } from '@/types'

type ColorPalette = Theme['colors']

/**
 * Shared neutral colors for light themes
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
    background: white,
    surface: gray[50],
    surfaceHover: gray[100],
    surfaceActive: gray[200],
    elevated: white,
    overlay: 'rgba(9, 9, 11, 0.5)',
    text: gray[950],
    textSecondary: gray[600],
    textTertiary: gray[400],
    textInverse: gray[50],
    border: gray[200],
    borderHover: gray[300],
    borderSubtle: gray[100],
    disabled: gray[100],
    disabledText: gray[400],
}

/**
 * Shared neutral colors for dark themes
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
    background: gray[950],
    surface: gray[900],
    surfaceHover: gray[800],
    surfaceActive: gray[700],
    elevated: gray[800],
    overlay: 'rgba(0, 0, 0, 0.8)',
    text: gray[50],
    textSecondary: gray[400],
    textTertiary: gray[500],
    textInverse: gray[900],
    border: gray[800],
    borderHover: gray[700],
    borderSubtle: gray[900],
    disabled: gray[800],
    disabledText: gray[600],
}

