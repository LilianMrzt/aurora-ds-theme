import { describe, it, expect } from 'vitest'
import { createStyles, keyframes, fontFace, cssVariables, cssVar } from '../src'

describe('Aurora Theme Library', () => {
    describe('createStyles', () => {
        it('should create styles without theme', () => {
            const styles = createStyles({
                root: {
                    display: 'flex',
                    padding: '1rem',
                },
            })
            expect(typeof styles.root).toBe('string')
            expect(styles.root).toContain('-root')
        })
    })

    describe('keyframes', () => {
        it('should create keyframe animation name', () => {
            const fadeIn = keyframes({
                from: { opacity: 0 },
                to: { opacity: 1 },
            })
            expect(typeof fadeIn).toBe('string')
            expect(fadeIn).toContain('aurora-kf-')
        })
    })

    describe('fontFace', () => {
        it('should return font family name', () => {
            const fontFamily = fontFace({
                fontFamily: 'TestFont',
                src: "url('/test.woff2') format('woff2')",
            })
            expect(fontFamily).toBe('TestFont')
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
    })

    describe('cssVar', () => {
        it('should create CSS var reference', () => {
            expect(cssVar('colors-primary')).toBe('var(--theme-colors-primary)')
            expect(cssVar('colors-primary', '#000')).toBe('var(--theme-colors-primary, #000)')
        })
    })
})

