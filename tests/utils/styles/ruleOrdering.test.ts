import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createStyles } from '@/utils/styles/createStyles'
import { setResponsiveBreakpoints, setThemeContextGetter } from '@/utils/styles/styleEngine'
import { mockTheme, MockThemeType } from '@tests/utils/styles/mockTheme'

const getModuleSheet = (moduleId: string): CSSStyleSheet | null => {
    const el = document.getElementById(`aurora-mod-${moduleId}`) as HTMLStyleElement | null
    return el?.sheet ?? null
}

const ruleTexts = (sheet: CSSStyleSheet | null): string[] => {
    if (!sheet) { return [] }
    const out: string[] = []
    for (let i = 0; i < sheet.cssRules.length; i++) {
        out.push(sheet.cssRules[i].cssText)
    }
    return out
}

/**
 * Regression tests for the CSS cascade ordering bug:
 * the base rule must be inserted BEFORE deferred at-rules / pseudo-classes /
 * compound selectors, so they win at equal specificity.
 */
describe('Rule injection ordering', () => {
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

    it('emits base rule BEFORE responsive @media rules', () => {
        createStyles(() => ({
            box: {
                padding: { base: 8, md: 16, lg: 24 }
            }
        }), { id: 'order-responsive' })

        const rules = ruleTexts(getModuleSheet('order-responsive'))
        const baseIdx = rules.findIndex(r => r.includes('padding: 8px') && !r.includes('@media'))
        const mdIdx = rules.findIndex(r => r.includes('768px'))
        const lgIdx = rules.findIndex(r => r.includes('1024px'))

        expect(baseIdx).toBeGreaterThanOrEqual(0)
        expect(mdIdx).toBeGreaterThan(baseIdx)
        expect(lgIdx).toBeGreaterThan(mdIdx)
    })

    it('emits base rule BEFORE @media at-rule blocks', () => {
        createStyles(() => ({
            panel: {
                minWidth: 520,
                '@media (max-width: 639px)': {
                    minWidth: 'unset',
                    width: '100%'
                }
            }
        }), { id: 'order-at-rule' })

        const rules = ruleTexts(getModuleSheet('order-at-rule'))
        const baseIdx = rules.findIndex(r => r.includes('min-width: 520px') && !r.includes('@media'))
        const mqIdx = rules.findIndex(r => r.includes('max-width: 639px'))

        expect(baseIdx).toBeGreaterThanOrEqual(0)
        expect(mqIdx).toBeGreaterThan(baseIdx)
    })

    it('emits base rule BEFORE pseudo-class rules', () => {
        createStyles(() => ({
            button: {
                color: 'black',
                ':hover': { color: 'red' }
            }
        }), { id: 'order-pseudo' })

        const rules = ruleTexts(getModuleSheet('order-pseudo'))
        const baseIdx = rules.findIndex(r => r.includes('color: black'))
        const hoverIdx = rules.findIndex(r => r.includes(':hover'))

        expect(baseIdx).toBeGreaterThanOrEqual(0)
        expect(hoverIdx).toBeGreaterThan(baseIdx)
    })

    it('emits base rule BEFORE ampersand compound selectors', () => {
        createStyles(() => ({
            link: {
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
            }
        }), { id: 'order-amp' })

        const rules = ruleTexts(getModuleSheet('order-amp'))
        const baseIdx = rules.findIndex(r => r.includes('text-decoration: none'))
        const hoverIdx = rules.findIndex(r => r.includes('text-decoration: underline'))

        expect(baseIdx).toBeGreaterThanOrEqual(0)
        expect(hoverIdx).toBeGreaterThan(baseIdx)
    })

    it('preserves declaration order across mixed deferred rules', () => {
        createStyles(() => ({
            mixed: {
                color: 'black',
                ':hover': { color: 'blue' },
                '@media (min-width: 900px)': { color: 'green' },
                '&:focus': { color: 'purple' }
            }
        }), { id: 'order-mixed' })

        const rules = ruleTexts(getModuleSheet('order-mixed'))
        const baseIdx = rules.findIndex(r => r.includes('color: black'))
        const hoverIdx = rules.findIndex(r => r.includes('color: blue'))
        const mqIdx = rules.findIndex(r => r.includes('color: green'))
        const focusIdx = rules.findIndex(r => r.includes('color: purple'))

        expect(baseIdx).toBe(0)
        expect(hoverIdx).toBe(1)
        expect(mqIdx).toBe(2)
        expect(focusIdx).toBe(3)
    })
})

