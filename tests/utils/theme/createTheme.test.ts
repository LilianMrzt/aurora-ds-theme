import { describe, it, expect } from 'vitest'

import { createTheme } from '@/utils/theme'

import { mockTheme } from '../styles/mockTheme'

describe('createTheme', () => {
    it('should create a theme without requiring explicit type annotation', () => {
        // Create theme - type is inferred automatically from _InternalTheme
        // which uses ThemeRegistry via module augmentation
        const theme = createTheme({
            ...mockTheme,
            colors: {
                ...mockTheme.colors,
                primary: '#007bff',
                secondary: '#6c757d',
            },
            spacing: {
                ...mockTheme.spacing,
                sm: '8px',
                md: '16px',
            },
        })

        // Verify the theme values
        expect(theme.colors.primary).toBe('#007bff')
        expect(theme.colors.secondary).toBe('#6c757d')
        expect(theme.spacing.sm).toBe('8px')
        expect(theme.spacing.md).toBe('16px')
    })

    it('should return the theme object as-is (identity function)', () => {
        const input = mockTheme

        const result = createTheme(input)

        // Should be the same reference
        expect(result).toBe(input)
    })

    it('should work with mockTheme structure', () => {
        const customTheme = createTheme({
            ...mockTheme,
            colors: {
                ...mockTheme.colors,
                primary: '#000',
                secondary: '#fff',
            },
            spacing: {
                ...mockTheme.spacing,
                sm: '1px',
                md: '2px',
                lg: '3px',
            },
        })

        expect(customTheme).toBeDefined()
        expect(customTheme.colors.primary).toBe('#000')
        expect(customTheme.spacing.sm).toBe('1px')
    })

    it('should preserve all theme properties', () => {
        const theme = createTheme({
            ...mockTheme,
            colors: {
                ...mockTheme.colors,
                primary: '#123',
            },
            spacing: {
                ...mockTheme.spacing,
                sm: '8px',
            },
        })

        expect(theme.colors.primary).toBe('#123')
        expect(theme.spacing.sm).toBe('8px')
        // Verify other properties are preserved
        expect(theme.radius).toBeDefined()
        expect(theme.shadows).toBeDefined()
        expect(theme.fontSize).toBeDefined()
    })
})
