import { describe, it, expect } from 'vitest'

import { cssVar, injectCssVariables } from '@/index'
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

