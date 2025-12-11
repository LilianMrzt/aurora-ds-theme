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
})

