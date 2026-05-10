// @vitest-environment node

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createStyles } from '@/utils/styles/createStyles'
import {
    getSSRStyles,
    getSSRStyleTag,
    getSSRRulesArray,
    clearSSRRules
} from '@/utils/styles/ssr'
import {
    setThemeContextGetter,
    setResponsiveBreakpoints,
    getSSRRulesInternal
} from '@/utils/styles/styleEngine'
import { mockTheme, MockThemeType } from '@tests/utils/styles/mockTheme'

describe('SSR end-to-end', () => {
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
        setResponsiveBreakpoints(mockTheme.breakpoints)
        clearSSRRules()
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
        setResponsiveBreakpoints(null)
        clearSSRRules()
    })

    it('runs without a DOM (typeof document === "undefined")', () => {
        // Sanity check: this test file must execute in node env
        expect(typeof document).toBe('undefined')
    })

    it('collects rules into the SSR buffer when running on the server', () => {
        const styles = createStyles(() => ({
            root: {
                color: 'red',
                padding: 8,
            }
        }), { id: 'ssr-card' })

        expect(styles.root).toBe('ssr-card-root')

        const css = getSSRStyles()
        expect(css).toContain('.ssr-card-root')
        expect(css).toContain('color:red')
        expect(css).toContain('padding:8px')
    })

    it('produces a ready-to-inject <style> tag', () => {
        createStyles(() => ({
            box: { backgroundColor: 'blue' }
        }), { id: 'ssr-tag' })

        const tag = getSSRStyleTag()
        expect(tag).toMatch(/^<style id="aurora-styles">/)
        expect(tag).toContain('.ssr-tag-box')
        expect(tag).toContain('background-color:blue')
        expect(tag).toMatch(/<\/style>$/)
    })

    it('returns an empty tag when no rules have been collected', () => {
        // Buffer cleared in beforeEach
        expect(getSSRStyleTag()).toBe('')
    })

    it('emits responsive @media rules from responsive tokens', () => {
        createStyles(() => ({
            row: {
                padding: { base: 4, md: 16, lg: 24 }
            }
        }), { id: 'ssr-resp' })

        const css = getSSRStyles()
        expect(css).toContain('.ssr-resp-row')
        expect(css).toContain('padding:4px')
        expect(css).toContain('@media (min-width:768px)')
        expect(css).toContain('padding:16px')
        expect(css).toContain('@media (min-width:1024px)')
        expect(css).toContain('padding:24px')
    })

    it('produces stable class names across calls (with explicit id)', () => {
        // Two separate createStyles calls with the same id should produce
        // identical class names — this is what guarantees SSR↔CSR consistency.
        const a = createStyles(() => ({
            root: { color: 'red' }
        }), { id: 'ssr-stable' })

        clearSSRRules()

        const b = createStyles(() => ({
            root: { color: 'red' }
        }), { id: 'ssr-stable' })

        expect(a.root).toBe(b.root)
        expect(a.root).toBe('ssr-stable-root')
    })

    it('clearSSRRules resets the buffer', () => {
        createStyles(() => ({
            x: { color: 'red' }
        }), { id: 'ssr-clear' })

        expect(getSSRRulesArray().length).toBeGreaterThan(0)

        clearSSRRules()
        expect(getSSRStyles()).toBe('')
        expect(getSSRRulesArray().length).toBe(0)
        expect(getSSRRulesInternal().length).toBe(0)
    })

    it('handles multiple modules in one render pass', () => {
        createStyles(() => ({
            root: { color: 'red' }
        }), { id: 'ssr-multi-a' })

        createStyles(() => ({
            root: { color: 'blue' }
        }), { id: 'ssr-multi-b' })

        const css = getSSRStyles()
        expect(css).toContain('.ssr-multi-a-root')
        expect(css).toContain('color:red')
        expect(css).toContain('.ssr-multi-b-root')
        expect(css).toContain('color:blue')
    })
})





