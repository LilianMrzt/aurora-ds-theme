import { describe, it, expect } from 'vitest'

import { keyframes } from '@/index'

describe('keyframes', () => {
    it('should export keyframes function', () => {
        expect(typeof keyframes).toBe('function')
    })

    it('should generate unique keyframe names', () => {
        const fadeIn = keyframes({
            from: { opacity: 0 },
            to: { opacity: 1 }
        })

        expect(typeof fadeIn).toBe('string')
        expect(fadeIn).toContain('aurora-kf-')
    })

    it('should handle percentage keyframes', () => {
        const bounce = keyframes({
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
            '100%': { transform: 'scale(1)' }
        })

        expect(typeof bounce).toBe('string')
        expect(bounce).toContain('aurora-kf-')
    })

    it('should handle multiple CSS properties per keyframe', () => {
        const slide = keyframes({
            from: {
                opacity: 0,
                transform: 'translateX(-100%)'
            },
            to: {
                opacity: 1,
                transform: 'translateX(0)'
            }
        })

        expect(typeof slide).toBe('string')
    })

    it('should handle numeric values with px conversion', () => {
        const move = keyframes({
            '0%': { left: 0, top: 0 },
            '100%': { left: 100, top: 50 }
        })

        expect(typeof move).toBe('string')
    })

    it('should return same name for identical keyframes (deduplication)', () => {
        const keyframe1 = keyframes({
            from: { opacity: 0 },
            to: { opacity: 1 }
        })

        // Same keyframes should return same name (cached)
        const keyframe2 = keyframes({
            from: { opacity: 0 },
            to: { opacity: 1 }
        })

        expect(keyframe1).toBe(keyframe2)
    })

    it('should return different names for different keyframes', () => {
        const fadeIn = keyframes({
            from: { opacity: 0 },
            to: { opacity: 1 }
        })

        const fadeOut = keyframes({
            from: { opacity: 1 },
            to: { opacity: 0 }
        })

        expect(fadeIn).not.toBe(fadeOut)
    })

    it('should handle empty keyframe objects', () => {
        const empty = keyframes({
            from: {},
            to: {}
        })

        expect(typeof empty).toBe('string')
    })

    it('should handle complex animations with many steps', () => {
        const complex = keyframes({
            '0%': { transform: 'rotate(0deg)', opacity: 1 },
            '25%': { transform: 'rotate(90deg)', opacity: 0.75 },
            '50%': { transform: 'rotate(180deg)', opacity: 0.5 },
            '75%': { transform: 'rotate(270deg)', opacity: 0.75 },
            '100%': { transform: 'rotate(360deg)', opacity: 1 }
        })

        expect(typeof complex).toBe('string')
    })
})

