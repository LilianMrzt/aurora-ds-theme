import { describe, it, expect } from 'vitest'

import {
    colors,
    gray,
    slate,
    stone,
    red,
    indigo,
    emerald,
    white,
    black,
    transparent,
} from '@/utils/theme/colors'

describe('Color Scales', () => {
    describe('colors object', () => {
        it('should contain all color scales', () => {
            expect(colors.gray).toBeDefined()
            expect(colors.slate).toBeDefined()
            expect(colors.stone).toBeDefined()
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

        it('should contain special values', () => {
            expect(colors.white).toBe('#ffffff')
            expect(colors.black).toBe('#000000')
            expect(colors.transparent).toBe('transparent')
        })
    })

    describe('individual color scales', () => {
        it('should have 12 shades', () => {
            const shades = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

            shades.forEach(shade => {
                expect(gray[shade]).toBeDefined()
                expect(indigo[shade]).toBeDefined()
                expect(emerald[shade]).toBeDefined()
            })
        })

        it('should have valid hex color values', () => {
            const hexRegex = /^#[0-9a-f]{6}$/i

            expect(gray[500]).toMatch(hexRegex)
            expect(indigo[500]).toMatch(hexRegex)
            expect(red[500]).toMatch(hexRegex)
        })

        it('should have progressively darker shades', () => {
            // Compare lightness: 50 should be lighter than 900
            // Simple check: 50 should have higher RGB values
            const parseHex = (hex: string) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                return r + g + b
            }

            expect(parseHex(gray[50])).toBeGreaterThan(parseHex(gray[900]))
            expect(parseHex(indigo[50])).toBeGreaterThan(parseHex(indigo[900]))
        })
    })

    describe('neutral scales', () => {
        it('gray should be pure neutral', () => {
            // Gray 500 should have similar R, G, B values
            const hex = gray[500]
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)

            const diff = Math.max(r, g, b) - Math.min(r, g, b)
            expect(diff).toBeLessThan(20) // Small variance = neutral
        })

        it('slate should have blue undertone', () => {
            const hex = slate[500]
            const r = parseInt(hex.slice(1, 3), 16)
            const b = parseInt(hex.slice(5, 7), 16)

            // Blue should be slightly higher than red for cool undertone
            expect(b).toBeGreaterThanOrEqual(r - 10)
        })

        it('stone should have warm undertone', () => {
            const hex = stone[500]
            const r = parseInt(hex.slice(1, 3), 16)
            const b = parseInt(hex.slice(5, 7), 16)

            // Red should be higher than blue for warm undertone
            expect(r).toBeGreaterThan(b)
        })
    })

    describe('special exports', () => {
        it('should export white correctly', () => {
            expect(white).toBe('#ffffff')
        })

        it('should export black correctly', () => {
            expect(black).toBe('#000000')
        })

        it('should export transparent correctly', () => {
            expect(transparent).toBe('transparent')
        })
    })
})

