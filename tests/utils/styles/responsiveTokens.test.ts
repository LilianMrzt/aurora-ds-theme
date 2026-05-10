import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createStyles } from '@/utils/styles/createStyles'
import { setResponsiveBreakpoints, setThemeContextGetter } from '@/utils/styles/styleEngine'
import { mockTheme, MockThemeType } from '@tests/utils/styles/mockTheme'

const collectAllRules = (sheet: CSSStyleSheet): string[] => {
    const out: string[] = []
    const walk = (rules: CSSRuleList | undefined): void => {
        if (!rules) { return }
        for (let i = 0; i < rules.length; i++) {
            const r = rules[i]
            out.push(r.cssText)
            const nested = (r as CSSGroupingRule).cssRules
            if (nested) {
                walk(nested)
            }
        }
    }
    walk(sheet.cssRules)
    return out
}

const findRule = (className: string, query?: string): string | null => {
    const styles = document.querySelectorAll<HTMLStyleElement>('style[data-aurora-module]')
    for (const styleEl of styles) {
        const sheet = styleEl.sheet
        if (!sheet) { continue }
        const allRules = collectAllRules(sheet)
        for (const text of allRules) {
            if (!text.includes(className)) { continue }
            if (query && !text.includes(query)) { continue }
            return text
        }
    }
    return null
}

describe('Responsive tokens', () => {
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
        setResponsiveBreakpoints(mockTheme.breakpoints)
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
        setResponsiveBreakpoints(null)
    })

    it('emits a base rule for the `base` key of a responsive token', () => {
        const styles = createStyles(() => ({
            box: {
                padding: { base: 8, md: 16 }
            }
        }), { id: 'rt-base' })

        const baseRule = findRule(styles.box, 'padding: 8px')
        expect(baseRule).not.toBeNull()
    })

    it('emits a @media rule for each declared breakpoint', () => {
        const styles = createStyles(() => ({
            box: {
                padding: { base: 8, md: 16, lg: 24 }
            }
        }), { id: 'rt-bps' })

        const md = findRule(styles.box, 'min-width:768px')
        expect(md).not.toBeNull()
        expect(md).toContain('padding: 16px')

        const lg = findRule(styles.box, 'min-width:1024px')
        expect(lg).not.toBeNull()
        expect(lg).toContain('padding: 24px')
    })

    it('handles a responsive object without `base`', () => {
        const styles = createStyles(() => ({
            box: {
                color: { md: 'red' }
            }
        }), { id: 'rt-nobase' })

        const md = findRule(styles.box, 'min-width:768px')
        expect(md).not.toBeNull()
        expect(md).toContain('color: red')
    })

    it('mixes responsive and non-responsive properties', () => {
        const styles = createStyles(() => ({
            box: {
                display: 'flex',
                padding: { base: 4, lg: 12 },
                color: 'blue'
            }
        }), { id: 'rt-mix' })

        const baseRule = findRule(styles.box, 'display: flex')
        expect(baseRule).not.toBeNull()
        expect(baseRule).toContain('color: blue')
        expect(baseRule).toContain('padding: 4px')

        const lg = findRule(styles.box, 'min-width:1024px')
        expect(lg).not.toBeNull()
        expect(lg).toContain('padding: 12px')
    })

    it('falls back to legacy behavior when breakpoint registry is empty', () => {
        setResponsiveBreakpoints(null)

        const styles = createStyles(() => ({
            // This object should NOT be treated as responsive (no breakpoints registered)
            // → legacy behavior: silently ignored (not a sub-selector either).
            box: {
                padding: 8,
                margin: { base: 4 }
            }
        }), { id: 'rt-fallback' })

        const baseRule = findRule(styles.box, 'padding: 8px')
        expect(baseRule).not.toBeNull()
        // The unknown object value is ignored (no breakpoints registered)
        expect(baseRule).not.toContain('margin')
    })

    it('only treats objects with valid breakpoint keys as responsive', () => {
        const styles = createStyles(() => ({
            box: {
                padding: 8,
                // 'unknownBp' is not a registered breakpoint → should be ignored
                margin: { unknownBp: 16 }
            }
        }), { id: 'rt-unknown' })

        const baseRule = findRule(styles.box, 'padding: 8px')
        expect(baseRule).not.toBeNull()
        expect(baseRule).not.toContain('margin')
    })
})





