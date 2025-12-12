import { describe, it, expect } from 'vitest'

import {
    createTheme,
    mergeThemes,
    createThemeVariant,
    defaultTheme,
    defaultDarkTheme,
} from '@/utils/theme'

describe('createTheme', () => {
    it('should create a theme with overrides', () => {
        const customTheme = createTheme(defaultTheme, {
            colors: {
                primary: '#ff0000',
            },
        })

        expect(customTheme.colors.primary).toBe('#ff0000')
        // Original values should be preserved
        expect(customTheme.colors.secondary).toBe(defaultTheme.colors.secondary)
        expect(customTheme.spacing.md).toBe(defaultTheme.spacing.md)
    })

    it('should deep merge nested objects', () => {
        const customTheme = createTheme(defaultTheme, {
            colors: {
                primary: '#ff0000',
                secondary: '#00ff00',
            },
            spacing: {
                md: '2rem',
            },
        })

        expect(customTheme.colors.primary).toBe('#ff0000')
        expect(customTheme.colors.secondary).toBe('#00ff00')
        expect(customTheme.colors.error).toBe(defaultTheme.colors.error)
        expect(customTheme.spacing.md).toBe('2rem')
        expect(customTheme.spacing.lg).toBe(defaultTheme.spacing.lg)
    })

    it('should memoize results for same inputs', () => {
        const overrides = { colors: { primary: '#ff0000' } }

        const theme1 = createTheme(defaultTheme, overrides)
        const theme2 = createTheme(defaultTheme, overrides)

        expect(theme1).toBe(theme2) // Same reference (memoized)
    })

    it('should return different themes for different overrides', () => {
        const theme1 = createTheme(defaultTheme, { colors: { primary: '#ff0000' } })
        const theme2 = createTheme(defaultTheme, { colors: { primary: '#00ff00' } })

        expect(theme1).not.toBe(theme2)
        expect(theme1.colors.primary).toBe('#ff0000')
        expect(theme2.colors.primary).toBe('#00ff00')
    })
})

describe('mergeThemes', () => {
    it('should merge multiple overrides', () => {
        const brandOverrides = { colors: { primary: '#ff0000' } }
        const spacingOverrides = { spacing: { md: '2rem' } }

        const merged = mergeThemes(defaultTheme, brandOverrides, spacingOverrides)

        expect(merged.colors.primary).toBe('#ff0000')
        expect(merged.spacing.md).toBe('2rem')
    })

    it('should apply later overrides over earlier ones', () => {
        const first = { colors: { primary: '#ff0000' } }
        const second = { colors: { primary: '#00ff00' } }

        const merged = mergeThemes(defaultTheme, first, second)

        expect(merged.colors.primary).toBe('#00ff00')
    })

    it('should handle empty overrides', () => {
        const merged = mergeThemes(defaultTheme, {}, {})

        expect(merged.colors.primary).toBe(defaultTheme.colors.primary)
    })
})

describe('createThemeVariant', () => {
    it('should create a variant factory', () => {
        const createDark = createThemeVariant({
            colors: {
                background: '#000000',
                text: '#ffffff',
            },
        })

        const darkTheme = createDark(defaultTheme)

        expect(darkTheme.colors.background).toBe('#000000')
        expect(darkTheme.colors.text).toBe('#ffffff')
        expect(darkTheme.colors.primary).toBe(defaultTheme.colors.primary)
    })

    it('should be reusable on different base themes', () => {
        const customBase = createTheme(defaultTheme, {
            colors: { primary: '#ff0000' },
        })

        const createDark = createThemeVariant({
            colors: { background: '#000000' },
        })

        const darkDefault = createDark(defaultTheme)
        const darkCustom = createDark(customBase)

        expect(darkDefault.colors.primary).toBe(defaultTheme.colors.primary)
        expect(darkCustom.colors.primary).toBe('#ff0000')
        expect(darkDefault.colors.background).toBe('#000000')
        expect(darkCustom.colors.background).toBe('#000000')
    })
})

describe('defaultTheme', () => {
    it('should have all required properties', () => {
        expect(defaultTheme.colors).toBeDefined()
        expect(defaultTheme.spacing).toBeDefined()
        expect(defaultTheme.radius).toBeDefined()
        expect(defaultTheme.shadows).toBeDefined()
        expect(defaultTheme.fontSize).toBeDefined()
        expect(defaultTheme.fontWeight).toBeDefined()
        expect(defaultTheme.lineHeight).toBeDefined()
        expect(defaultTheme.zIndex).toBeDefined()
        expect(defaultTheme.transition).toBeDefined()
    })

    it('should have valid color values', () => {
        expect(defaultTheme.colors.primary).toMatch(/^#[0-9a-f]{6}$/i)
        expect(defaultTheme.colors.background).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('should have valid spacing values', () => {
        expect(defaultTheme.spacing.none).toBe('0')
        expect(defaultTheme.spacing.md).toMatch(/rem$/)
    })
})

describe('defaultDarkTheme', () => {
    it('should have different colors than light theme', () => {
        expect(defaultDarkTheme.colors.background).not.toBe(defaultTheme.colors.background)
        expect(defaultDarkTheme.colors.text).not.toBe(defaultTheme.colors.text)
    })

    it('should share non-color properties with light theme', () => {
        expect(defaultDarkTheme.spacing).toEqual(defaultTheme.spacing)
        expect(defaultDarkTheme.radius).toEqual(defaultTheme.radius)
        expect(defaultDarkTheme.fontSize).toEqual(defaultTheme.fontSize)
    })
})

