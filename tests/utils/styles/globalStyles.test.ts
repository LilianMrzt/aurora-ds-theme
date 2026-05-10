import { describe, it, expect, beforeEach } from 'vitest'

import { globalStyles } from '@/utils/styles/globalStyles'

const getAuroraSheet = (): CSSStyleSheet | null => {
    const el = document.getElementById('aurora-styles') as HTMLStyleElement | null
    return el?.sheet ?? null
}

const dumpRules = (): string => {
    const sheet = getAuroraSheet()
    if (!sheet) { return '' }
    let out = ''
    for (let i = 0; i < sheet.cssRules.length; i++) {
        out += sheet.cssRules[i].cssText + '\n'
    }
    return out
}

describe('globalStyles', () => {
    beforeEach(() => {
        const sheet = getAuroraSheet()
        if (sheet) {
            for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
                sheet.deleteRule(i)
            }
        }
    })

    it('injects a simple top-level rule into the global sheet', () => {
        globalStyles({
            body: { margin: 0, padding: 0 }
        })
        const dump = dumpRules()
        expect(dump).toContain('body')
        expect(dump).toContain('margin: 0')
        expect(dump).toContain('padding: 0')
    })

    it('supports multiple selectors in one call', () => {
        globalStyles({
            'html': { fontFamily: 'sans-serif' },
            'a': { color: 'red' }
        })
        const dump = dumpRules()
        expect(dump).toContain('html')
        expect(dump).toContain('font-family: sans-serif')
        expect(dump).toContain('a {')
        expect(dump).toContain('color: red')
    })

    it('supports nested pseudo-classes', () => {
        globalStyles({
            'a': {
                color: 'blue',
                ':hover': { color: 'red' }
            }
        })
        const dump = dumpRules()
        expect(dump).toContain('a {')
        expect(dump).toContain('a:hover')
        expect(dump).toContain('color: red')
    })

    it('supports & ampersand selectors', () => {
        globalStyles({
            '.foo': {
                '& > .bar': { color: 'green' }
            }
        })
        const dump = dumpRules()
        expect(dump).toContain('.foo > .bar')
        expect(dump).toContain('color: green')
    })

    it('supports top-level @media at-rules', () => {
        globalStyles({
            '@media (max-width: 600px)': {
                'body': { fontSize: 12 }
            }
        })
        const dump = dumpRules()
        expect(dump).toContain('@media')
        expect(dump).toContain('font-size: 12px')
    })

    it('skips empty / null blocks gracefully', () => {
        expect(() => {
            globalStyles({})
        }).not.toThrow()
    })

    it('converts numeric values to px (with unitless exceptions)', () => {
        globalStyles({
            '.unit-test': { padding: 8, lineHeight: 1.5, zIndex: 10 }
        })
        const dump = dumpRules()
        expect(dump).toContain('padding: 8px')
        expect(dump).toContain('line-height: 1.5')
        expect(dump).toContain('z-index: 10')
    })
})

