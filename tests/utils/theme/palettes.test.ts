import { describe, it, expect } from 'vitest'

import {
    palettes,
    indigoLight,
    indigoDark,
    blueLight,
    blueDark,
    roseLight,
    roseDark,
    emeraldLight,
    emeraldDark,
    tealLight,
    tealDark,
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
} from '@/utils/theme/palettes'

import type { BaseColors } from '@/types'

const requiredColorKeys: (keyof BaseColors)[] = [
    'primary', 'onPrimary', 'primaryHover', 'primaryActive', 'primarySubtle',
    'secondary', 'onSecondary', 'secondaryHover', 'secondaryActive', 'secondarySubtle',
    'accent', 'onAccent', 'accentHover', 'accentSubtle',
    'background', 'surface', 'surfaceHover', 'surfaceActive', 'elevated', 'overlay',
    'text', 'textSecondary', 'textTertiary', 'textInverse',
    'border', 'borderHover', 'borderFocus', 'borderSubtle',
    'success', 'onSuccess', 'successHover', 'successSubtle',
    'warning', 'onWarning', 'warningHover', 'warningSubtle',
    'error', 'onError', 'errorHover', 'errorSubtle',
    'info', 'onInfo', 'infoHover', 'infoSubtle',
    'link', 'linkHover', 'linkVisited', 'focus',
    'disabled', 'disabledText',
]

describe('Palettes', () => {
    describe('palettes object', () => {
        it('should contain all 10 palettes', () => {
            expect(palettes.indigo).toBeDefined()
            expect(palettes.blue).toBeDefined()
            expect(palettes.rose).toBeDefined()
            expect(palettes.emerald).toBeDefined()
            expect(palettes.teal).toBeDefined()
            expect(palettes.violet).toBeDefined()
            expect(palettes.amber).toBeDefined()
            expect(palettes.cyan).toBeDefined()
            expect(palettes.slate).toBeDefined()
            expect(palettes.gray).toBeDefined()
        })

        it('each palette should have light and dark variants', () => {
            Object.values(palettes).forEach(palette => {
                expect(palette.light).toBeDefined()
                expect(palette.dark).toBeDefined()
            })
        })
    })

    describe('palette completeness', () => {
        const allPalettes = [
            { name: 'indigoLight', palette: indigoLight },
            { name: 'indigoDark', palette: indigoDark },
            { name: 'blueLight', palette: blueLight },
            { name: 'blueDark', palette: blueDark },
            { name: 'roseLight', palette: roseLight },
            { name: 'roseDark', palette: roseDark },
            { name: 'emeraldLight', palette: emeraldLight },
            { name: 'emeraldDark', palette: emeraldDark },
            { name: 'tealLight', palette: tealLight },
            { name: 'tealDark', palette: tealDark },
            { name: 'violetLight', palette: violetLight },
            { name: 'violetDark', palette: violetDark },
            { name: 'amberLight', palette: amberLight },
            { name: 'amberDark', palette: amberDark },
            { name: 'cyanLight', palette: cyanLight },
            { name: 'cyanDark', palette: cyanDark },
            { name: 'slateLight', palette: slateLight },
            { name: 'slateDark', palette: slateDark },
            { name: 'grayLight', palette: grayLight },
            { name: 'grayDark', palette: grayDark },
        ]

        allPalettes.forEach(({ name, palette }) => {
            it(`${name} should have all required color keys`, () => {
                requiredColorKeys.forEach(key => {
                    expect(palette[key], `${name} missing ${key}`).toBeDefined()
                })
            })
        })
    })

    describe('light vs dark contrast', () => {
        it('light themes should have light backgrounds', () => {
            const parseHex = (hex: string) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                return (r + g + b) / 3
            }

            // Light themes should have average RGB > 200 for background
            expect(parseHex(indigoLight.background)).toBeGreaterThan(200)
            expect(parseHex(roseLight.background)).toBeGreaterThan(200)
        })

        it('dark themes should have dark backgrounds', () => {
            const parseHex = (hex: string) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                return (r + g + b) / 3
            }

            // Dark themes should have average RGB < 50 for background
            expect(parseHex(indigoDark.background)).toBeLessThan(50)
            expect(parseHex(roseDark.background)).toBeLessThan(50)
        })

        it('light themes should have dark text', () => {
            const parseHex = (hex: string) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                return (r + g + b) / 3
            }

            expect(parseHex(indigoLight.text)).toBeLessThan(50)
        })

        it('dark themes should have light text', () => {
            const parseHex = (hex: string) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                return (r + g + b) / 3
            }

            expect(parseHex(indigoDark.text)).toBeGreaterThan(200)
        })
    })

    describe('primary color distinctiveness', () => {
        it('each palette should have a distinct primary color', () => {
            const primaries = [
                indigoLight.primary,
                blueLight.primary,
                roseLight.primary,
                emeraldLight.primary,
                tealLight.primary,
                violetLight.primary,
                amberLight.primary,
                cyanLight.primary,
            ]

            // All primaries should be unique
            const unique = new Set(primaries)
            expect(unique.size).toBe(primaries.length)
        })
    })

    describe('color format validity', () => {
        it('all colors should be valid hex or rgba', () => {
            const hexRegex = /^#[0-9a-f]{6}$/i
            const rgbaRegex = /^rgba?\([^)]+\)$/

            Object.entries(indigoLight).forEach(([key, value]) => {
                const isValid = hexRegex.test(value) || rgbaRegex.test(value)
                expect(isValid, `${key}: ${value} is not a valid color`).toBe(true)
            })
        })
    })
})

