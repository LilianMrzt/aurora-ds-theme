import { describe, it, expect } from 'vitest'

import {
    createStyles,
    keyframes,
    fontFace,
    cssVariables,
    cssVar,
    injectCssVariables,
    getSSRStyles,
    getSSRStyleTag,
    clearSSRRules,
    getSSRRulesArray,
    setThemeContextGetter,
    getTheme,
    insertRule,
} from '@/utils/styles'

describe('utils/styles/index.ts exports', () => {
    it('should export createStyles', () => {
        expect(createStyles).toBeDefined()
        expect(typeof createStyles).toBe('function')
    })

    it('should export keyframes', () => {
        expect(keyframes).toBeDefined()
        expect(typeof keyframes).toBe('function')
    })

    it('should export fontFace', () => {
        expect(fontFace).toBeDefined()
        expect(typeof fontFace).toBe('function')
    })

    it('should export cssVariables', () => {
        expect(cssVariables).toBeDefined()
        expect(typeof cssVariables).toBe('function')
    })

    it('should export cssVar', () => {
        expect(cssVar).toBeDefined()
        expect(typeof cssVar).toBe('function')
    })

    it('should export injectCssVariables', () => {
        expect(injectCssVariables).toBeDefined()
        expect(typeof injectCssVariables).toBe('function')
    })

    it('should export getSSRStyles', () => {
        expect(getSSRStyles).toBeDefined()
        expect(typeof getSSRStyles).toBe('function')
    })

    it('should export getSSRStyleTag', () => {
        expect(getSSRStyleTag).toBeDefined()
        expect(typeof getSSRStyleTag).toBe('function')
    })

    it('should export clearSSRRules', () => {
        expect(clearSSRRules).toBeDefined()
        expect(typeof clearSSRRules).toBe('function')
    })

    it('should export getSSRRulesArray', () => {
        expect(getSSRRulesArray).toBeDefined()
        expect(typeof getSSRRulesArray).toBe('function')
    })

    it('should export setThemeContextGetter', () => {
        expect(setThemeContextGetter).toBeDefined()
        expect(typeof setThemeContextGetter).toBe('function')
    })

    it('should export getTheme', () => {
        expect(getTheme).toBeDefined()
        expect(typeof getTheme).toBe('function')
    })

    it('should export insertRule', () => {
        expect(insertRule).toBeDefined()
        expect(typeof insertRule).toBe('function')
    })
})

