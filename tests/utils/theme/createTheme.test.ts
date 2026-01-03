import { describe, it, expect, beforeEach } from 'vitest'

import {
    createTheme,
    mergeThemes,
    createThemeVariant,
    createCustomTheme,
    defaultTheme,
    clearThemeCache,
    getThemeCacheSize,
    MAX_THEME_CACHE_SIZE,
    defaultSpacing,
    defaultRadius,
} from '@/utils/theme'

import type { DeepPartial, Theme } from '@/types'

describe('createTheme', () => {
    beforeEach(() => {
        clearThemeCache()
    })

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

    it('should handle empty overrides', () => {
        const theme = createTheme(defaultTheme, {})

        expect(theme.colors.primary).toBe(defaultTheme.colors.primary)
        expect(theme.spacing).toEqual(defaultTheme.spacing)
    })

    it('should not mutate the original theme', () => {
        const originalPrimary = defaultTheme.colors.primary

        createTheme(defaultTheme, {
            colors: { primary: '#changed' },
        })

        expect(defaultTheme.colors.primary).toBe(originalPrimary)
    })

    it('should handle undefined values in overrides', () => {
        const overrides: DeepPartial<Theme> = {
            colors: {
                primary: undefined,
            },
        }
        const theme = createTheme(defaultTheme, overrides)

        // Should keep original value when override is undefined
        expect(theme.colors.primary).toBe(defaultTheme.colors.primary)
    })

    it('should evict oldest cache entry when cache is full', () => {
        // Clear cache and verify it's empty
        clearThemeCache()
        expect(getThemeCacheSize()).toBe(0)

        // Fill the cache to MAX_THEME_CACHE_SIZE
        for (let i = 0; i < MAX_THEME_CACHE_SIZE; i++) {
            createTheme(defaultTheme, {
                colors: { primary: `#${i.toString(16).padStart(6, '0')}` },
            })
        }

        expect(getThemeCacheSize()).toBe(MAX_THEME_CACHE_SIZE)

        // Add one more theme - should trigger eviction
        createTheme(defaultTheme, {
            colors: { primary: '#ffffff' },
        })

        // Cache size should still be MAX_THEME_CACHE_SIZE (oldest evicted)
        expect(getThemeCacheSize()).toBe(MAX_THEME_CACHE_SIZE)
    })

    it('should not exceed MAX_THEME_CACHE_SIZE', () => {
        clearThemeCache()

        // Create more themes than the cache can hold
        const totalThemes = MAX_THEME_CACHE_SIZE + 10
        for (let i = 0; i < totalThemes; i++) {
            createTheme(defaultTheme, {
                colors: { primary: `#${i.toString(16).padStart(6, '0')}` },
            })
        }

        expect(getThemeCacheSize()).toBe(MAX_THEME_CACHE_SIZE)
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


describe('theme cache utilities', () => {
    beforeEach(() => {
        clearThemeCache()
    })

    it('clearThemeCache should clear all cached themes', () => {
        createTheme(defaultTheme, { colors: { primary: '#111111' } })
        createTheme(defaultTheme, { colors: { primary: '#222222' } })

        expect(getThemeCacheSize()).toBe(2)

        clearThemeCache()

        expect(getThemeCacheSize()).toBe(0)
    })

    it('getThemeCacheSize should return correct size', () => {
        expect(getThemeCacheSize()).toBe(0)

        createTheme(defaultTheme, { colors: { primary: '#333333' } })
        expect(getThemeCacheSize()).toBe(1)

        createTheme(defaultTheme, { colors: { primary: '#444444' } })
        expect(getThemeCacheSize()).toBe(2)

        // Same theme should not increase cache size (memoized)
        createTheme(defaultTheme, { colors: { primary: '#333333' } })
        expect(getThemeCacheSize()).toBe(2)
    })

    it('MAX_THEME_CACHE_SIZE should be exported', () => {
        expect(MAX_THEME_CACHE_SIZE).toBe(50)
    })
})

describe('createTheme with replace mode', () => {
    beforeEach(() => {
        clearThemeCache()
    })

    it('should replace entire category when mode is replace', () => {
        type MinimalColors = {
            brand: string
            surface: string
            text: string
        }

        const customColors: MinimalColors = {
            brand: '#007bff',
            surface: '#ffffff',
            text: '#212529',
        }

        const customTheme = createTheme(
            defaultTheme,
            { colors: customColors as unknown as DeepPartial<Theme>['colors'] },
            { mode: 'replace' }
        )

        // Should have ONLY the custom colors, not merged with defaults
        expect(customTheme.colors).toEqual(customColors)
        // primary should not exist after replace
        expect((customTheme.colors as Record<string, unknown>).primary).toBeUndefined()
    })

    it('should still use merge by default', () => {
        const customTheme = createTheme(defaultTheme, {
            colors: { primary: '#ff0000' },
        })

        // Default merge behavior - preserves other tokens
        expect(customTheme.colors.primary).toBe('#ff0000')
        expect(customTheme.colors.secondary).toBe(defaultTheme.colors.secondary)
    })

    it('should cache differently for merge vs replace mode', () => {
        const overrides = { colors: { primary: '#ff0000' } }

        const mergedTheme = createTheme(defaultTheme, overrides, { mode: 'merge' })
        const replacedTheme = createTheme(defaultTheme, overrides, { mode: 'replace' })

        expect(mergedTheme).not.toBe(replacedTheme)
        expect(mergedTheme.colors.secondary).toBe(defaultTheme.colors.secondary)
        // secondary should not exist after replace
        expect((replacedTheme.colors as Record<string, unknown>).secondary).toBeUndefined()
    })

    it('should only replace specified categories, preserve others', () => {
        const customTheme = createTheme(
            defaultTheme,
            {
                colors: { brand: '#007bff' } as unknown as DeepPartial<Theme>['colors'],
            },
            { mode: 'replace' }
        )

        // Colors are replaced
        expect(customTheme.colors).toEqual({ brand: '#007bff' })

        // Other categories are preserved
        expect(customTheme.spacing).toEqual(defaultTheme.spacing)
        expect(customTheme.radius).toEqual(defaultTheme.radius)
    })
})

describe('createCustomTheme', () => {
    it('should create a theme with custom color tokens', () => {
        type MyColors = {
            brand: string
            brandHover: string
            surface: string
            text: string
        }

        const myTheme = createCustomTheme<MyColors>({
            colors: {
                brand: '#007bff',
                brandHover: '#0056b3',
                surface: '#ffffff',
                text: '#212529',
            },
        })

        expect(myTheme.colors.brand).toBe('#007bff')
        expect(myTheme.colors.brandHover).toBe('#0056b3')
        expect(myTheme.colors.surface).toBe('#ffffff')
        expect(myTheme.colors.text).toBe('#212529')
    })

    it('should use default values for non-color tokens', () => {
        type MyColors = { primary: string }

        const myTheme = createCustomTheme<MyColors>({
            colors: { primary: '#ff0000' },
        })

        expect(myTheme.spacing).toEqual(defaultSpacing)
        expect(myTheme.radius).toEqual(defaultRadius)
    })

    it('should allow overriding non-color tokens', () => {
        type MyColors = { primary: string }

        const customSpacing = {
            ...defaultSpacing,
            md: '2rem',
        }

        const myTheme = createCustomTheme<MyColors, typeof customSpacing>({
            colors: { primary: '#ff0000' },
            spacing: customSpacing,
        })

        expect(myTheme.spacing.md).toBe('2rem')
    })

    it('should not include base color tokens', () => {
        type MinimalColors = {
            accent: string
            background: string
        }

        const theme = createCustomTheme<MinimalColors>({
            colors: {
                accent: '#ff0000',
                background: '#ffffff',
            },
        })

        // TypeScript should not allow accessing primary
        // @ts-expect-error - primary does not exist on MinimalColors
        expect(theme.colors.primary).toBeUndefined()

        // Only our defined colors exist
        expect(Object.keys(theme.colors)).toEqual(['accent', 'background'])
    })

    it('should work with completely custom token structures', () => {
        type BrandColors = {
            'brand-50': string
            'brand-100': string
            'brand-500': string
            'brand-900': string
            'neutral-light': string
            'neutral-dark': string
        }

        const theme = createCustomTheme<BrandColors>({
            colors: {
                'brand-50': '#eff6ff',
                'brand-100': '#dbeafe',
                'brand-500': '#3b82f6',
                'brand-900': '#1e3a8a',
                'neutral-light': '#f8fafc',
                'neutral-dark': '#0f172a',
            },
        })

        expect(theme.colors['brand-500']).toBe('#3b82f6')
        expect(theme.colors['neutral-light']).toBe('#f8fafc')
    })
})

