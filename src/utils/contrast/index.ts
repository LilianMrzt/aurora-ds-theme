/**
 * WCAG Contrast Utilities
 *
 * Utilities for checking color contrast ratios according to WCAG 2.1 guidelines.
 *
 * @example
 * ```ts
 * import { getContrastRatio, meetsWCAG, checkThemeContrast } from '@aurora-ds/theme'
 *
 * // Check contrast between two colors
 * const ratio = getContrastRatio('#ffffff', '#000000') // 21
 *
 * // Check if colors meet WCAG standards
 * meetsWCAG('#ffffff', '#767676', 'AA') // true for large text
 * meetsWCAG('#ffffff', '#767676', 'AAA') // false
 *
 * // Check all theme color pairs
 * const issues = checkThemeContrast(myTheme)
 * ```
 */

/**
 * WCAG contrast level requirements
 * - AA: 4.5:1 for normal text, 3:1 for large text
 * - AAA: 7:1 for normal text, 4.5:1 for large text
 */
export type WCAGLevel = 'AA' | 'AAA'

/**
 * Result of a contrast check
 */
export type ContrastResult = {
    /** The two colors being compared */
    colors: [string, string]
    /** The contrast ratio (1-21) */
    ratio: number
    /** Whether it passes WCAG AA for normal text (4.5:1) */
    passesAA: boolean
    /** Whether it passes WCAG AA for large text (3:1) */
    passesAALarge: boolean
    /** Whether it passes WCAG AAA for normal text (7:1) */
    passesAAA: boolean
    /** Whether it passes WCAG AAA for large text (4.5:1) */
    passesAAALarge: boolean
}

/**
 * Theme contrast check result
 */
export type ThemeContrastIssue = {
    /** Name of the color pair (e.g., "primary/onPrimary") */
    pair: string
    /** Foreground color name */
    foreground: string
    /** Background color name */
    background: string
    /** The contrast ratio */
    ratio: number
    /** Required minimum ratio */
    required: number
    /** WCAG level that failed */
    level: 'AA' | 'AALarge'
}

/**
 * Parse a hex color to RGB values
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    // Remove # if present
    const cleanHex = hex.replace(/^#/, '')

    // Handle shorthand hex (e.g., #fff)
    const fullHex = cleanHex.length === 3
        ? cleanHex.split('').map(c => c + c).join('')
        : cleanHex

    if (fullHex.length !== 6) {
        return null
    }

    const num = parseInt(fullHex, 16)
    if (isNaN(num)) {
        return null
    }

    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    }
}

/**
 * Convert RGB to relative luminance
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
        const sRGB = c / 255
        return sRGB <= 0.03928
            ? sRGB / 12.92
            : Math.pow((sRGB + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate the contrast ratio between two colors
 * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 *
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns Contrast ratio (1-21), or null if colors are invalid
 *
 * @example
 * ```ts
 * getContrastRatio('#ffffff', '#000000') // 21
 * getContrastRatio('#ffffff', '#ffffff') // 1
 * getContrastRatio('#6366f1', '#ffffff') // ~4.5
 * ```
 */
export const getContrastRatio = (foreground: string, background: string): number | null => {
    const fgRgb = hexToRgb(foreground)
    const bgRgb = hexToRgb(background)

    if (!fgRgb || !bgRgb) {
        return null
    }

    const fgLuminance = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b)
    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b)

    const lighter = Math.max(fgLuminance, bgLuminance)
    const darker = Math.min(fgLuminance, bgLuminance)

    return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if two colors meet WCAG contrast requirements
 *
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level to check ('AA' or 'AAA')
 * @param largeText - Whether this is for large text (14pt bold or 18pt+)
 * @returns Whether the contrast meets the specified WCAG level
 *
 * @example
 * ```ts
 * meetsWCAG('#ffffff', '#6366f1', 'AA') // true
 * meetsWCAG('#ffffff', '#6366f1', 'AAA') // false
 * meetsWCAG('#ffffff', '#94a3b8', 'AA', true) // true (large text)
 * ```
 */
export const meetsWCAG = (
    foreground: string,
    background: string,
    level: WCAGLevel = 'AA',
    largeText: boolean = false
): boolean => {
    const ratio = getContrastRatio(foreground, background)
    if (ratio === null) {
        return false
    }

    const requirements = {
        AA: largeText ? 3 : 4.5,
        AAA: largeText ? 4.5 : 7,
    }

    return ratio >= requirements[level]
}

/**
 * Get detailed contrast information between two colors
 *
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns Detailed contrast result or null if colors are invalid
 *
 * @example
 * ```ts
 * const result = checkContrast('#ffffff', '#6366f1')
 * // {
 * //   colors: ['#ffffff', '#6366f1'],
 * //   ratio: 4.54,
 * //   passesAA: true,
 * //   passesAALarge: true,
 * //   passesAAA: false,
 * //   passesAAALarge: true
 * // }
 * ```
 */
export const checkContrast = (foreground: string, background: string): ContrastResult | null => {
    const ratio = getContrastRatio(foreground, background)
    if (ratio === null) {
        return null
    }

    return {
        colors: [foreground, background],
        ratio: Math.round(ratio * 100) / 100,
        passesAA: ratio >= 4.5,
        passesAALarge: ratio >= 3,
        passesAAA: ratio >= 7,
        passesAAALarge: ratio >= 4.5,
    }
}

/**
 * Color pairs to check in a theme
 * Format: [foregroundKey, backgroundKey, description]
 */
const THEME_COLOR_PAIRS: [string, string, string][] = [
    // Primary
    ['onPrimary', 'primary', 'primary/onPrimary'],
    ['text', 'primarySubtle', 'primarySubtle/text'],

    // Secondary
    ['onSecondary', 'secondary', 'secondary/onSecondary'],
    ['text', 'secondarySubtle', 'secondarySubtle/text'],

    // Tertiary
    ['onTertiary', 'tertiary', 'tertiary/onTertiary'],
    ['text', 'tertiarySubtle', 'tertiarySubtle/text'],

    // Accent
    ['onAccent', 'accent', 'accent/onAccent'],
    ['text', 'accentSubtle', 'accentSubtle/text'],

    // Surfaces
    ['text', 'background', 'background/text'],
    ['text', 'surface', 'surface/text'],
    ['textSecondary', 'surface', 'surface/textSecondary'],
    ['textTertiary', 'surface', 'surface/textTertiary'],

    // Semantic - Success
    ['onSuccess', 'success', 'success/onSuccess'],
    ['text', 'successSubtle', 'successSubtle/text'],

    // Semantic - Warning
    ['onWarning', 'warning', 'warning/onWarning'],
    ['text', 'warningSubtle', 'warningSubtle/text'],

    // Semantic - Error
    ['onError', 'error', 'error/onError'],
    ['text', 'errorSubtle', 'errorSubtle/text'],

    // Semantic - Info
    ['onInfo', 'info', 'info/onInfo'],
    ['text', 'infoSubtle', 'infoSubtle/text'],

    // Interactive
    ['link', 'surface', 'surface/link'],
    ['link', 'background', 'background/link'],
]

/**
 * Check all important color pairs in a theme for WCAG compliance
 *
 * @param theme - The theme to check
 * @param level - Minimum WCAG level to require ('AA' or 'AAA')
 * @returns Array of contrast issues found
 *
 * @example
 * ```ts
 * import { checkThemeContrast, defaultTheme } from '@aurora-ds/theme'
 *
 * const issues = checkThemeContrast(defaultTheme)
 * if (issues.length > 0) {
 *   console.warn('Theme has contrast issues:', issues)
 * }
 *
 * // Check for AAA compliance
 * const strictIssues = checkThemeContrast(defaultTheme, 'AAA')
 * ```
 */
export const checkThemeContrast = (
    theme: { colors: Record<string, string> },
    level: WCAGLevel = 'AA'
): ThemeContrastIssue[] => {
    const issues: ThemeContrastIssue[] = []
    const required = level === 'AAA' ? 7 : 4.5
    const requiredLarge = level === 'AAA' ? 4.5 : 3

    for (const [fgKey, bgKey, pairName] of THEME_COLOR_PAIRS) {
        const foreground = theme.colors[fgKey]
        const background = theme.colors[bgKey]

        if (!foreground || !background) {
            continue
        }

        // Skip non-hex colors (rgba, etc.)
        if (!foreground.startsWith('#') || !background.startsWith('#')) {
            continue
        }

        const ratio = getContrastRatio(foreground, background)
        if (ratio === null) {
            continue
        }

        // Check normal text requirement
        if (ratio < required) {
            issues.push({
                pair: pairName,
                foreground: fgKey,
                background: bgKey,
                ratio: Math.round(ratio * 100) / 100,
                required,
                level: 'AA',
            })
        } else if (ratio < requiredLarge) {
            // Also flag if it doesn't even meet large text requirement
            issues.push({
                pair: pairName,
                foreground: fgKey,
                background: bgKey,
                ratio: Math.round(ratio * 100) / 100,
                required: requiredLarge,
                level: 'AALarge',
            })
        }
    }

    return issues
}

/**
 * Get a suggested color that meets WCAG contrast requirements
 * Adjusts the lightness of the foreground color to meet the target ratio
 *
 * @param foreground - Current foreground color (hex)
 * @param background - Background color (hex)
 * @param targetRatio - Desired contrast ratio (default 4.5 for AA)
 * @returns Adjusted foreground color or null if adjustment isn't possible
 *
 * @example
 * ```ts
 * // If #94a3b8 on #ffffff doesn't meet AA
 * const suggested = suggestContrastColor('#94a3b8', '#ffffff', 4.5)
 * // Returns a darker shade that meets the requirement
 * ```
 */
export const suggestContrastColor = (
    foreground: string,
    background: string,
    targetRatio: number = 4.5
): string | null => {
    const fgRgb = hexToRgb(foreground)
    const bgRgb = hexToRgb(background)

    if (!fgRgb || !bgRgb) {
        return null
    }

    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b)
    const isLightBg = bgLuminance > 0.5

    // Try adjusting the foreground
    let bestColor = foreground
    let bestRatio = getContrastRatio(foreground, background) || 0

    // Adjust in steps
    for (let i = 0; i <= 100; i += 5) {
        const factor = isLightBg ? (100 - i) / 100 : (100 + i) / 100

        const newR = Math.min(255, Math.max(0, Math.round(fgRgb.r * factor)))
        const newG = Math.min(255, Math.max(0, Math.round(fgRgb.g * factor)))
        const newB = Math.min(255, Math.max(0, Math.round(fgRgb.b * factor)))

        const newHex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
        const newRatio = getContrastRatio(newHex, background)

        if (newRatio && newRatio >= targetRatio) {
            return newHex
        }

        if (newRatio && newRatio > bestRatio) {
            bestColor = newHex
            bestRatio = newRatio
        }
    }

    return bestRatio >= targetRatio ? bestColor : null
}

