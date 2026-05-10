import { describe, it, expect } from 'vitest'

import { cx } from '@/utils/styles/cx'

describe('cx', () => {
    it('returns empty string for no args', () => {
        expect(cx()).toBe('')
    })

    it('joins truthy strings with a single space', () => {
        expect(cx('a', 'b', 'c')).toBe('a b c')
    })

    it('skips falsy values (false, null, undefined, empty string)', () => {
        expect(cx('a', false, null, undefined, '', 'b')).toBe('a b')
    })

    it('supports conditional patterns', () => {
        const isActive = true
        const isDisabled = false
        expect(cx('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active')
    })

    it('returns empty string when all args are falsy', () => {
        expect(cx(false, null, undefined, '')).toBe('')
    })

    it('handles a single class name', () => {
        expect(cx('foo')).toBe('foo')
    })

    it('does not introduce leading/trailing spaces', () => {
        expect(cx(false, 'a', null, 'b', undefined)).toBe('a b')
    })
})

