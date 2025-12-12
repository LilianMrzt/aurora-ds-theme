import { describe, it, expect } from 'vitest'

import { cssVar, cssVariables, injectCssVariables } from '@/index'
import { mockTheme } from '@tests/utils/styles/mockTheme'

describe('cssVar', () => {
    it('should export cssVar helper', () => {
        expect(typeof cssVar).toBe('function')
    })

    it('should generate correct variable reference', () => {
        const result = cssVar('colors-primary')
        expect(result).toBe('var(--theme-colors-primary)')
    })

    it('should support fallback values', () => {
        const result = cssVar('colors-primary', '#000')
        expect(result).toBe('var(--theme-colors-primary, #000)')
    })

    it('should handle nested paths', () => {
        const result = cssVar('colors.primary')
        expect(result).toBe('var(--theme-colors-primary)')
    })

    it('should handle complex fallback values', () => {
        const result = cssVar('spacing-md', '1rem')
        expect(result).toBe('var(--theme-spacing-md, 1rem)')
    })
})

describe('injectCssVariables', () => {
    it('should export injectCssVariables function', () => {
        expect(typeof injectCssVariables).toBe('function')
    })

    it('should not throw when injecting variables', () => {
        expect(() => injectCssVariables(mockTheme, 'test')).not.toThrow()
    })

    it('should accept custom prefix', () => {
        expect(() => injectCssVariables(mockTheme, 'custom-prefix')).not.toThrow()
    })

    it('should use default prefix when not specified', () => {
        expect(() => injectCssVariables(mockTheme)).not.toThrow()
    })
})

describe('cssVariables', () => {
    it('should create CSS variable references', () => {
        const vars = cssVariables({
            primaryColor: '#007bff',
            spacing: '1rem',
        })

        expect(vars.primaryColor).toBe('var(--primary-color)')
        expect(vars.spacing).toBe('var(--spacing)')
    })

    it('should handle camelCase to kebab-case conversion', () => {
        const vars = cssVariables({
            backgroundColor: '#fff',
            borderTopWidth: '1px',
        })

        expect(vars.backgroundColor).toBe('var(--background-color)')
        expect(vars.borderTopWidth).toBe('var(--border-top-width)')
    })

    it('should support custom prefix', () => {
        const vars = cssVariables(
            { primary: '#007bff' },
            { prefix: 'brand' }
        )

        expect(vars.primary).toBe('var(--brand-primary)')
    })

    it('should support inject option', () => {
        // Should not throw when injecting
        expect(() => {
            cssVariables(
                { primary: '#007bff', secondary: '#6c757d' },
                { inject: true }
            )
        }).not.toThrow()
    })

    it('should support prefix and inject together', () => {
        expect(() => {
            cssVariables(
                { primary: '#007bff' },
                { prefix: 'app', inject: true }
            )
        }).not.toThrow()
    })

    it('should handle numeric values', () => {
        const vars = cssVariables({
            zIndex: 100,
            opacity: 0.5,
        })

        expect(vars.zIndex).toBe('var(--z-index)')
        expect(vars.opacity).toBe('var(--opacity)')
    })

    it('should return empty object for empty input', () => {
        const vars = cssVariables({})
        expect(Object.keys(vars).length).toBe(0)
    })

    it('should handle single character keys', () => {
        const vars = cssVariables({ x: '10px', y: '20px' })
        expect(vars.x).toBe('var(--x)')
        expect(vars.y).toBe('var(--y)')
    })
})

