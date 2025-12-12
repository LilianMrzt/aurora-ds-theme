import { describe, it, expect } from 'vitest'

import {
    // Theme utilities
    createTheme,
    mergeThemes,
    createThemeVariant,
    defaultTheme,
    defaultDarkTheme,
    defaultColors,
    defaultDarkColors,
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
    // Color scales
    colors,
    gray,
    slate,
    stone,
    red,
    orange,
    amber,
    yellow,
    lime,
    green,
    emerald,
    teal,
    cyan,
    sky,
    blue,
    indigo,
    violet,
    purple,
    fuchsia,
    pink,
    rose,
    white,
    black,
    transparent,
    current,
    // Palettes
    palettes,
    indigoLight,
    indigoDark,
    roseLight,
    roseDark,
    emeraldLight,
    emeraldDark,
    violetLight,
    violetDark,
    amberLight,
    amberDark,
    cyanLight,
    cyanDark,
    slateLight,
    slateDark,
    grayLight,
    grayDark,
} from '@/utils/theme'

describe('utils/theme/index.ts exports', () => {
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
    })

    describe('default themes', () => {
        it('should export defaultTheme', () => {
            expect(defaultTheme).toBeDefined()
            expect(defaultTheme.colors).toBeDefined()
        })

        it('should export defaultDarkTheme', () => {
            expect(defaultDarkTheme).toBeDefined()
            expect(defaultDarkTheme.colors).toBeDefined()
        })
    })

    describe('default presets', () => {
        it('should export defaultColors', () => {
            expect(defaultColors).toBeDefined()
            expect(defaultColors.primary).toBeDefined()
        })

        it('should export defaultDarkColors', () => {
            expect(defaultDarkColors).toBeDefined()
            expect(defaultDarkColors.primary).toBeDefined()
        })

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

        it('should export all neutral scales', () => {
            expect(gray).toBeDefined()
            expect(slate).toBeDefined()
            expect(stone).toBeDefined()
        })

        it('should export all color scales', () => {
            expect(red).toBeDefined()
            expect(orange).toBeDefined()
            expect(amber).toBeDefined()
            expect(yellow).toBeDefined()
            expect(lime).toBeDefined()
            expect(green).toBeDefined()
            expect(emerald).toBeDefined()
            expect(teal).toBeDefined()
            expect(cyan).toBeDefined()
            expect(sky).toBeDefined()
            expect(blue).toBeDefined()
            expect(indigo).toBeDefined()
            expect(violet).toBeDefined()
            expect(purple).toBeDefined()
            expect(fuchsia).toBeDefined()
            expect(pink).toBeDefined()
            expect(rose).toBeDefined()
        })

        it('should export special colors', () => {
            expect(white).toBe('#ffffff')
            expect(black).toBe('#000000')
            expect(transparent).toBe('transparent')
            expect(current).toBe('currentColor')
        })
    })

    describe('palettes', () => {
        it('should export palettes object', () => {
            expect(palettes).toBeDefined()
            expect(palettes.indigo).toBeDefined()
        })

        it('should export all light palettes', () => {
            expect(indigoLight).toBeDefined()
            expect(roseLight).toBeDefined()
            expect(emeraldLight).toBeDefined()
            expect(violetLight).toBeDefined()
            expect(amberLight).toBeDefined()
            expect(cyanLight).toBeDefined()
            expect(slateLight).toBeDefined()
            expect(grayLight).toBeDefined()
        })

        it('should export all dark palettes', () => {
            expect(indigoDark).toBeDefined()
            expect(roseDark).toBeDefined()
            expect(emeraldDark).toBeDefined()
            expect(violetDark).toBeDefined()
            expect(amberDark).toBeDefined()
            expect(cyanDark).toBeDefined()
            expect(slateDark).toBeDefined()
            expect(grayDark).toBeDefined()
        })
    })
})

