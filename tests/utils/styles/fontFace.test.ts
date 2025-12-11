import { describe, it, expect } from 'vitest'

import { fontFace } from '@/index'

describe('fontFace', () => {
    it('should export fontFace function', () => {
        expect(typeof fontFace).toBe('function')
    })

    it('should return font family name', () => {
        const fontFamily = fontFace({
            fontFamily: 'TestFont',
            src: "url('/fonts/test.woff2') format('woff2')"
        })

        expect(fontFamily).toBe('TestFont')
    })

    it('should handle all fontFace options', () => {
        const fontFamily = fontFace({
            fontFamily: 'CustomFont',
            src: "url('/fonts/custom.woff2') format('woff2')",
            fontWeight: 700,
            fontStyle: 'italic',
            fontDisplay: 'swap',
            unicodeRange: 'U+0000-00FF'
        })

        expect(fontFamily).toBe('CustomFont')
    })

    it('should not duplicate font-face rules', () => {
        const options = {
            fontFamily: 'DuplicateTest',
            src: "url('/fonts/dup.woff2') format('woff2')"
        }

        const result1 = fontFace(options)
        const result2 = fontFace(options)

        expect(result1).toBe(result2)
    })

    it('should handle different font weights', () => {
        const regular = fontFace({
            fontFamily: 'WeightTest',
            src: "url('/fonts/regular.woff2') format('woff2')",
            fontWeight: 400
        })

        const bold = fontFace({
            fontFamily: 'WeightTest',
            src: "url('/fonts/bold.woff2') format('woff2')",
            fontWeight: 700
        })

        expect(regular).toBe('WeightTest')
        expect(bold).toBe('WeightTest')
    })
})

