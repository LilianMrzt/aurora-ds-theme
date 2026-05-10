import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createVariants } from '@/utils/styles/createVariants'
import { setThemeContextGetter } from '@/utils/styles/styleEngine'
import { mockTheme, MockThemeType } from '@tests/utils/styles/mockTheme'

describe('createVariants', () => {
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('returns a function', () => {
        const fn = createVariants({ base: { display: 'flex' } }, { id: 'cv-1' })
        expect(typeof fn).toBe('function')
    })

    it('produces the base class when no variants are declared', () => {
        const fn = createVariants({ base: { display: 'flex' } }, { id: 'cv-base' })
        expect(fn()).toBe('cv-base-base')
    })

    it('applies a single variant value', () => {
        const fn = createVariants({
            base: { display: 'flex' },
            variants: {
                size: {
                    sm: { padding: 4 },
                    md: { padding: 8 },
                },
            },
        }, { id: 'cv-size' })

        const cls = fn({ size: 'sm' })
        expect(cls).toContain('cv-size-base')
        expect(cls).toContain('cv-size-size--sm')
        expect(cls).not.toContain('cv-size-size--md')
    })

    it('honors defaultVariants when prop is omitted', () => {
        const fn = createVariants({
            base: { display: 'flex' },
            variants: {
                size: { sm: { padding: 4 }, md: { padding: 8 } },
            },
            defaultVariants: { size: 'md' },
        }, { id: 'cv-default' })

        const cls = fn()
        expect(cls).toContain('cv-default-base')
        expect(cls).toContain('cv-default-size--md')
    })

    it('lets explicit prop override defaultVariants', () => {
        const fn = createVariants({
            base: { display: 'flex' },
            variants: {
                size: { sm: { padding: 4 }, md: { padding: 8 } },
            },
            defaultVariants: { size: 'md' },
        }, { id: 'cv-override' })

        const cls = fn({ size: 'sm' })
        expect(cls).toContain('cv-override-size--sm')
        expect(cls).not.toContain('cv-override-size--md')
    })

    it('combines multiple variant groups', () => {
        const fn = createVariants({
            base: { display: 'flex' },
            variants: {
                size: { sm: { padding: 4 }, md: { padding: 8 } },
                tone: { primary: { color: 'red' }, ghost: { color: 'blue' } },
            },
            defaultVariants: { size: 'md', tone: 'primary' },
        }, { id: 'cv-multi' })

        const cls = fn({ size: 'sm', tone: 'ghost' })
        expect(cls).toContain('cv-multi-base')
        expect(cls).toContain('cv-multi-size--sm')
        expect(cls).toContain('cv-multi-tone--ghost')
    })

    it('applies a compound variant only when all conditions match', () => {
        const fn = createVariants({
            variants: {
                size: { sm: { padding: 4 }, md: { padding: 8 } },
                tone: { primary: { color: 'red' }, ghost: { color: 'blue' } },
            },
            defaultVariants: { size: 'md', tone: 'primary' },
            compoundVariants: [
                { size: 'sm', tone: 'ghost', styles: { fontWeight: 700 } },
            ],
        }, { id: 'cv-compound' })

        const matching = fn({ size: 'sm', tone: 'ghost' })
        const notMatching = fn({ size: 'md', tone: 'ghost' })

        expect(matching).toContain('cv-compound-compound-0')
        expect(notMatching).not.toContain('cv-compound-compound-0')
    })

    it('appends an extra className passed as second argument', () => {
        const fn = createVariants({ base: { display: 'flex' } }, { id: 'cv-extra' })
        expect(fn(undefined, 'my-extra')).toBe('cv-extra-base my-extra')
    })

    it('skips falsy extra className', () => {
        const fn = createVariants({ base: { display: 'flex' } }, { id: 'cv-falsy' })
        expect(fn(undefined, false)).toBe('cv-falsy-base')
        expect(fn(undefined, null)).toBe('cv-falsy-base')
        expect(fn(undefined, undefined)).toBe('cv-falsy-base')
    })

    it('supports the function form with theme access', () => {
        const fn = createVariants((theme) => ({
            base: { color: theme.colors.primary },
            variants: {
                size: {
                    sm: { padding: theme.spacing.sm },
                    md: { padding: theme.spacing.md },
                },
            },
            defaultVariants: { size: 'sm' },
        }), { id: 'cv-themed' })

        const cls = fn()
        expect(cls).toContain('cv-themed-base')
        expect(cls).toContain('cv-themed-size--sm')
    })

    it('handles configs without base', () => {
        const fn = createVariants({
            variants: {
                size: { sm: { padding: 4 } },
            },
        }, { id: 'cv-nobase' })

        const cls = fn({ size: 'sm' })
        // base is absent so the class string is just the variant class
        expect(cls).toBe('cv-nobase-size--sm')
    })

    it('skips a variant prop when value is undefined / false', () => {
        const fn = createVariants({
            base: { display: 'flex' },
            variants: {
                size: { sm: { padding: 4 }, md: { padding: 8 } },
            },
        }, { id: 'cv-skip' })

        // Explicit undefined → no size class
        const cls = fn({ size: undefined })
        expect(cls).toBe('cv-skip-base')
    })

    it('produces the same class string for same input', () => {
        const fn = createVariants({
            base: { display: 'flex' },
            variants: {
                size: { sm: { padding: 4 }, md: { padding: 8 } },
            },
        }, { id: 'cv-stable' })

        expect(fn({ size: 'md' })).toBe(fn({ size: 'md' }))
    })
})

