import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { createStyles } from '@/utils/styles/createStyles'
import { setResponsiveBreakpoints, setThemeContextGetter } from '@/utils/styles/styleEngine'
import { mockTheme, MockThemeType } from '@tests/utils/styles/mockTheme'

type WarnCall = [string, ...unknown[]]
const findCall = (calls: unknown[][], substr: string): WarnCall | undefined =>
    calls.find((c): c is WarnCall => typeof c[0] === 'string' && c[0].includes(substr))

describe('Dev warnings', () => {
    let previousGetter: (() => MockThemeType | undefined) | null
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
        warnSpy.mockRestore()
    })

    describe('Suspicious style keys', () => {
        it('warns and skips a key containing "<"', () => {
            createStyles(() => ({
                root: {
                    '<script>alert(1)</script>': { color: 'red' }
                }
            }), { id: 'warn-suspicious-1' })

            expect(warnSpy).toHaveBeenCalled()
            const call = findCall(warnSpy.mock.calls, 'Suspicious style key')
            expect(call).toBeDefined()
        })

        it('warns on a key containing ";" or "{"', () => {
            createStyles(() => ({
                root: {
                    'color:red;background:blue': 'unused'
                }
            }), { id: 'warn-suspicious-2' })

            const call = findCall(warnSpy.mock.calls, 'Suspicious style key')
            expect(call).toBeDefined()
        })
    })

    describe('Object value without selector prefix', () => {
        beforeEach(() => {
            // Without breakpoints registered, an object value on a non-selector
            // key should trigger the "did you forget &?" warning.
            setResponsiveBreakpoints(null)
        })

        it('warns when a non-selector key receives an object value', () => {
            createStyles(() => ({
                root: {
                    'div > span': { color: 'red' }
                }
            }), { id: 'warn-forgot-amp' })

            const call = findCall(warnSpy.mock.calls, 'forget')
            expect(call).toBeDefined()
            expect(call?.[0]).toContain('isn\'t a selector')
        })

        it('does NOT warn for valid selectors', () => {
            createStyles(() => ({
                root: {
                    color: 'red',
                    ':hover': { opacity: 0.5 },
                    '& > span': { color: 'blue' },
                    '@media (min-width: 768px)': { padding: 16 },
                }
            }), { id: 'warn-no-warn' })

            expect(findCall(warnSpy.mock.calls, 'forget')).toBeUndefined()
        })

        it('does NOT warn when the object is a valid responsive token', () => {
            setResponsiveBreakpoints(mockTheme.breakpoints)

            createStyles(() => ({
                root: {
                    padding: { base: 8, md: 16 }
                }
            }), { id: 'warn-no-resp' })

            expect(findCall(warnSpy.mock.calls, 'forget')).toBeUndefined()
        })
    })

    describe('createStyles inside React render (anti-pattern)', () => {
        it('does not warn when called at module top-level', () => {
            createStyles(() => ({
                root: { color: 'red' }
            }), { id: 'warn-top-level' })

            expect(findCall(warnSpy.mock.calls, 'was called from inside a React render')).toBeUndefined()
        })
    })
})




