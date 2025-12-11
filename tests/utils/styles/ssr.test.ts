import { describe, it, expect } from 'vitest'

import {
    getSSRStyles,
    getSSRStyleTag,
    getSSRRulesArray,
    clearSSRRules
} from '@/index'

describe('SSR utilities', () => {
    it('should export getSSRStyles function', () => {
        expect(typeof getSSRStyles).toBe('function')
    })

    it('should export getSSRStyleTag function', () => {
        expect(typeof getSSRStyleTag).toBe('function')
    })

    it('should export clearSSRRules function', () => {
        expect(typeof clearSSRRules).toBe('function')
    })

    it('should export getSSRRulesArray function', () => {
        expect(typeof getSSRRulesArray).toBe('function')
    })

    it('getSSRStyles should return a string', () => {
        const result = getSSRStyles()
        expect(typeof result).toBe('string')
    })

    it('getSSRStyleTag should return empty string or style tag', () => {
        const result = getSSRStyleTag()
        expect(typeof result).toBe('string')
        if (result) {
            expect(result).toContain('<style')
            expect(result).toContain('aurora-styles')
        }
    })

    it('getSSRRulesArray should return an array', () => {
        const result = getSSRRulesArray()
        expect(Array.isArray(result)).toBe(true)
    })

    it('clearSSRRules should not throw', () => {
        expect(() => clearSSRRules()).not.toThrow()
    })
})

