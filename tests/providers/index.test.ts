import { describe, it, expect } from 'vitest'

import { ThemeProvider, useTheme } from '@/providers'

describe('providers/index.ts exports', () => {
    it('should export ThemeProvider', () => {
        expect(ThemeProvider).toBeDefined()
        expect(typeof ThemeProvider).toBe('function')
    })

    it('should export useTheme', () => {
        expect(useTheme).toBeDefined()
        expect(typeof useTheme).toBe('function')
    })
})

