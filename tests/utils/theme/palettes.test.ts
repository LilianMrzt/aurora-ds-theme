import { describe, it, expect } from 'vitest'

import { defaultPalette } from '@/utils/theme/palettes'

import type { BaseColors } from '@/types'

const requiredColorKeys: (keyof BaseColors)[] = [
    'background', 'surface', 'surfaceHover', 'surfaceActive',
    'text', 'textSecondary', 'textTertiary',
    'primary', 'primaryHover', 'primaryActive', 'primarySubtle', 'primaryDisabled', 'onPrimary',
    'secondary', 'secondaryHover', 'secondaryActive', 'secondarySubtle', 'secondaryDisabled', 'onSecondary',
    'border',
    'disabled', 'disabledText',
    'success', 'successSubtle',
    'warning', 'warningSubtle',
    'error', 'errorHover', 'errorSubtle', 'onError',
    'info', 'infoSubtle',
    'link', 'linkHover', 'linkActive', 'linkDisabled',
]

describe('Palettes V2', () => {
    describe('defaultPalette', () => {
        it('should be defined', () => {
            expect(defaultPalette).toBeDefined()
        })

        it('should have all required color tokens', () => {
            requiredColorKeys.forEach(key => {
                expect(defaultPalette[key]).toBeDefined()
                expect(typeof defaultPalette[key]).toBe('string')
            })
        })

        it('should only have the required color tokens and no extras', () => {
            const paletteKeys = Object.keys(defaultPalette)
            expect(paletteKeys).toHaveLength(requiredColorKeys.length)
        })

        it('all color values should be valid hex colors', () => {
            const hexColorRegex = /^#[0-9a-f]{6}$/i
            Object.entries(defaultPalette).forEach(([key, value]) => {
                expect(value, `${key} should be a valid hex color`).toMatch(hexColorRegex)
            })
        })
    })

    describe('color semantics', () => {
        it('background should be lighter than text (light theme)', () => {
            const parseHex = (hex: string) => parseInt(hex.slice(1, 3), 16)
            expect(parseHex(defaultPalette.background)).toBeGreaterThan(parseHex(defaultPalette.text))
        })

        it('text colors should be darker than background (light theme)', () => {
            const parseHex = (hex: string) => parseInt(hex.slice(1, 3), 16)
            expect(parseHex(defaultPalette.text)).toBeLessThan(parseHex(defaultPalette.background))
            expect(parseHex(defaultPalette.textSecondary)).toBeLessThan(parseHex(defaultPalette.background))
        })

        it('primary hover should be different from primary', () => {
            expect(defaultPalette.primaryHover).not.toBe(defaultPalette.primary)
        })

        it('surface hover should be different from surface', () => {
            expect(defaultPalette.surfaceHover).not.toBe(defaultPalette.surface)
        })

        it('error hover should be different from error', () => {
            expect(defaultPalette.errorHover).not.toBe(defaultPalette.error)
        })

        it('link active should be different from link', () => {
            expect(defaultPalette.linkActive).not.toBe(defaultPalette.link)
        })

        it('link hover should be different from link', () => {
            expect(defaultPalette.linkHover).not.toBe(defaultPalette.link)
        })

        it('link disabled should be different from link', () => {
            expect(defaultPalette.linkDisabled).not.toBe(defaultPalette.link)
        })

        it('secondary hover should be different from secondary', () => {
            expect(defaultPalette.secondaryHover).not.toBe(defaultPalette.secondary)
        })

        it('secondary subtle should be different from secondary', () => {
            expect(defaultPalette.secondarySubtle).not.toBe(defaultPalette.secondary)
        })

        it('secondary disabled should be different from secondary', () => {
            expect(defaultPalette.secondaryDisabled).not.toBe(defaultPalette.secondary)
        })

        it('onSecondary should be darker than secondary (text on background)', () => {
            const parseHex = (hex: string) => parseInt(hex.slice(1, 3), 16)
            expect(parseHex(defaultPalette.onSecondary)).toBeLessThan(parseHex(defaultPalette.secondary))
        })
    })
})
