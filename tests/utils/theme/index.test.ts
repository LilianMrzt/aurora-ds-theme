import { describe, it, expect } from 'vitest'

import {
    // Theme utilities
    createTheme,
    mergeThemes,
    createThemeVariant,
    clearThemeCache,
    getThemeCacheSize,
    MAX_THEME_CACHE_SIZE,
    defaultTheme,
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
    // Color scales (only accessible via colors object)
    colors,
    // Palette
    defaultPalette,
} from '@/utils/theme'

describe('utils/theme/index.ts exports - V2', () => {
    describe('theme utilities', () => {
        it('should export createTheme', () => {
            expect(createTheme).toBeDefined()
            expect(typeof createTheme).toBe('function')
        })

        it('should export mergeThemes', () => {
            expect(mergeThemes).toBeDefined()
            expect(typeof mergeThemes).toBe('function')
        })

        it('should export createThemeVariant', () => {
            expect(createThemeVariant).toBeDefined()
            expect(typeof createThemeVariant).toBe('function')
        })

        it('should export clearThemeCache', () => {
            expect(clearThemeCache).toBeDefined()
            expect(typeof clearThemeCache).toBe('function')
        })

        it('should export getThemeCacheSize', () => {
            expect(getThemeCacheSize).toBeDefined()
            expect(typeof getThemeCacheSize).toBe('function')
        })

        it('should export MAX_THEME_CACHE_SIZE', () => {
            expect(MAX_THEME_CACHE_SIZE).toBeDefined()
            expect(typeof MAX_THEME_CACHE_SIZE).toBe('number')
            expect(MAX_THEME_CACHE_SIZE).toBe(50)
        })
    })

    describe('default theme', () => {
        it('should export defaultTheme', () => {
            expect(defaultTheme).toBeDefined()
            expect(defaultTheme.colors).toBeDefined()
        })
    })

    describe('default presets', () => {
        it('should export defaultSpacing', () => {
            expect(defaultSpacing).toBeDefined()
            expect(defaultSpacing.md).toBeDefined()
        })

        it('should export defaultRadius', () => {
            expect(defaultRadius).toBeDefined()
            expect(defaultRadius.md).toBeDefined()
        })

        it('should export defaultShadows', () => {
            expect(defaultShadows).toBeDefined()
            expect(defaultShadows.md).toBeDefined()
        })

        it('should export defaultFontSize', () => {
            expect(defaultFontSize).toBeDefined()
            expect(defaultFontSize.md).toBeDefined()
        })

        it('should export defaultFontWeight', () => {
            expect(defaultFontWeight).toBeDefined()
            expect(defaultFontWeight.regular).toBeDefined()
        })

        it('should export defaultLineHeight', () => {
            expect(defaultLineHeight).toBeDefined()
            expect(defaultLineHeight.normal).toBeDefined()
        })

        it('should export defaultZIndex', () => {
            expect(defaultZIndex).toBeDefined()
            expect(defaultZIndex.modal).toBeDefined()
        })

        it('should export defaultTransition', () => {
            expect(defaultTransition).toBeDefined()
            expect(defaultTransition.normal).toBeDefined()
        })
    })

    describe('color scales', () => {
        it('should export colors object', () => {
            expect(colors).toBeDefined()
            expect(colors.gray).toBeDefined()
        })

        it('should have all neutral scales accessible via colors', () => {
            expect(colors.gray).toBeDefined()
            expect(colors.slate).toBeDefined()
            expect(colors.stone).toBeDefined()
        })

        it('should have all color scales accessible via colors', () => {
            expect(colors.red).toBeDefined()
            expect(colors.orange).toBeDefined()
            expect(colors.amber).toBeDefined()
            expect(colors.yellow).toBeDefined()
            expect(colors.lime).toBeDefined()
            expect(colors.green).toBeDefined()
            expect(colors.emerald).toBeDefined()
            expect(colors.teal).toBeDefined()
            expect(colors.cyan).toBeDefined()
            expect(colors.sky).toBeDefined()
            expect(colors.blue).toBeDefined()
            expect(colors.indigo).toBeDefined()
            expect(colors.violet).toBeDefined()
            expect(colors.purple).toBeDefined()
            expect(colors.fuchsia).toBeDefined()
            expect(colors.pink).toBeDefined()
            expect(colors.rose).toBeDefined()
        })

        it('should export special colors', () => {
            expect(colors.white).toBe('#ffffff')
            expect(colors.black).toBe('#000000')
            expect(colors.transparent).toBe('transparent')
            expect(colors.current).toBe('currentColor')
        })
    })

    describe('palette V2', () => {
        it('should export defaultPalette', () => {
            expect(defaultPalette).toBeDefined()
            expect(defaultPalette.primary).toBeDefined()
            expect(defaultPalette.background).toBeDefined()
        })
    })
})

