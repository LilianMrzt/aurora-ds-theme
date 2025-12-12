import { describe, it, expect } from 'vitest'

import {
    toKebabCase,
    toKebabCaseClassName,
    toCssValue,
    objectToCss,
    createCacheKey,
    cacheKeyToSuffix,
    createLRUCache,
    hashStyles,
    hashString,
    getUniqueClassName,
    resolveAmpersandSelector,
} from '@/utils/styles/styleEngine'

describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
        expect(toKebabCase('backgroundColor')).toBe('background-color')
        expect(toKebabCase('borderTopWidth')).toBe('border-top-width')
        expect(toKebabCase('zIndex')).toBe('z-index')
    })

    it('should handle already kebab-case', () => {
        expect(toKebabCase('color')).toBe('color')
        expect(toKebabCase('display')).toBe('display')
    })

    it('should cache results', () => {
        const result1 = toKebabCase('marginTop')
        const result2 = toKebabCase('marginTop')
        expect(result1).toBe(result2)
    })
})

describe('toKebabCaseClassName', () => {
    it('should convert PascalCase to kebab-case', () => {
        expect(toKebabCaseClassName('MyComponent')).toBe('my-component')
        expect(toKebabCaseClassName('ButtonPrimary')).toBe('button-primary')
    })

    it('should handle consecutive uppercase letters', () => {
        expect(toKebabCaseClassName('XMLParser')).toBe('xml-parser')
        expect(toKebabCaseClassName('HTMLElement')).toBe('html-element')
    })

    it('should handle camelCase', () => {
        expect(toKebabCaseClassName('myComponent')).toBe('my-component')
    })
})

describe('toCssValue', () => {
    it('should convert numbers to px for non-unitless properties', () => {
        expect(toCssValue('width', 100)).toBe('100px')
        expect(toCssValue('height', 50)).toBe('50px')
        expect(toCssValue('marginTop', 10)).toBe('10px')
    })

    it('should not add px to unitless properties', () => {
        expect(toCssValue('opacity', 0.5)).toBe('0.5')
        expect(toCssValue('zIndex', 100)).toBe('100')
        expect(toCssValue('fontWeight', 700)).toBe('700')
        expect(toCssValue('lineHeight', 1.5)).toBe('1.5')
        expect(toCssValue('flexGrow', 1)).toBe('1')
        expect(toCssValue('flexShrink', 0)).toBe('0')
        expect(toCssValue('order', 2)).toBe('2')
    })

    it('should pass through strings as-is', () => {
        expect(toCssValue('color', '#ff0000')).toBe('#ff0000')
        expect(toCssValue('display', 'flex')).toBe('flex')
        expect(toCssValue('width', '100%')).toBe('100%')
    })
})

describe('objectToCss', () => {
    it('should convert object to CSS string', () => {
        const css = objectToCss({
            color: 'red',
            fontSize: '16px',
        })
        expect(css).toContain('color:red')
        expect(css).toContain('font-size:16px')
    })

    it('should handle numeric values', () => {
        const css = objectToCss({
            width: 100,
            opacity: 0.5,
        })
        expect(css).toContain('width:100px')
        expect(css).toContain('opacity:0.5')
    })

    it('should ignore null and undefined values', () => {
        const css = objectToCss({
            color: 'red',
            background: null,
            border: undefined,
        } as Record<string, unknown>)
        expect(css).toContain('color:red')
        expect(css).not.toContain('background')
        expect(css).not.toContain('border')
    })

    it('should ignore nested objects', () => {
        const css = objectToCss({
            color: 'red',
            ':hover': { color: 'blue' },
        } as Record<string, unknown>)
        expect(css).toContain('color:red')
        expect(css).not.toContain('hover')
    })

    it('should return empty string for empty object', () => {
        const css = objectToCss({})
        expect(css).toBe('')
    })
})

describe('createCacheKey', () => {
    it('should create key for simple arguments', () => {
        expect(createCacheKey(['primary'])).toBe('primary')
        expect(createCacheKey([123])).toBe('123')
        expect(createCacheKey([true])).toBe('true')
        expect(createCacheKey([false])).toBe('false')
    })

    it('should create key for multiple arguments', () => {
        expect(createCacheKey(['primary', 'large'])).toBe('primary|large')
        expect(createCacheKey([1, 2, 3])).toBe('1|2|3')
    })

    it('should handle undefined and null', () => {
        expect(createCacheKey([undefined])).toBe('u')
        expect(createCacheKey([null])).toBe('n')
        expect(createCacheKey(['a', undefined, 'b'])).toBe('a|u|b')
        expect(createCacheKey(['a', null, 'b'])).toBe('a|n|b')
    })

    it('should use JSON for complex types', () => {
        const key = createCacheKey([{ a: 1 }])
        expect(key).toBe('[{"a":1}]')
    })

    it('should use JSON for more than 4 arguments', () => {
        const key = createCacheKey([1, 2, 3, 4, 5])
        expect(key).toBe('[1,2,3,4,5]')
    })
})

describe('cacheKeyToSuffix', () => {
    it('should return true/false as-is', () => {
        expect(cacheKeyToSuffix('true')).toBe('true')
        expect(cacheKeyToSuffix('false')).toBe('false')
    })

    it('should return numbers as-is', () => {
        expect(cacheKeyToSuffix('123')).toBe('123')
        expect(cacheKeyToSuffix('-5')).toBe('-5')
        expect(cacheKeyToSuffix('0')).toBe('0')
    })

    it('should convert simple strings to kebab-case', () => {
        expect(cacheKeyToSuffix('primary')).toBe('primary')
        expect(cacheKeyToSuffix('PrimaryButton')).toBe('primary-button')
    })

    it('should hash complex keys', () => {
        const hash = cacheKeyToSuffix('primary|large|active')
        expect(typeof hash).toBe('string')
        expect(hash.length).toBeGreaterThan(0)
    })
})

describe('createLRUCache', () => {
    it('should cache values', () => {
        const cache = createLRUCache<string>(3)
        let factoryCalls = 0

        const result1 = cache.getOrSet('key1', () => {
            factoryCalls++
            return 'value1'
        })

        const result2 = cache.getOrSet('key1', () => {
            factoryCalls++
            return 'value1-new'
        })

        expect(result1).toBe('value1')
        expect(result2).toBe('value1')
        expect(factoryCalls).toBe(1) // Factory only called once
    })

    it('should evict oldest when full', () => {
        const cache = createLRUCache<string>(2)

        cache.getOrSet('key1', () => 'value1')
        cache.getOrSet('key2', () => 'value2')
        cache.getOrSet('key3', () => 'value3') // Should evict key1

        let key1Calls = 0
        cache.getOrSet('key1', () => {
            key1Calls++
            return 'value1-new'
        })

        expect(key1Calls).toBe(1) // key1 was evicted, factory called again
    })

    it('should refresh recently used items', () => {
        const cache = createLRUCache<string>(2)

        cache.getOrSet('key1', () => 'value1')
        cache.getOrSet('key2', () => 'value2')
        cache.getOrSet('key1', () => 'value1') // Refresh key1
        cache.getOrSet('key3', () => 'value3') // Should evict key2, not key1

        let key1Calls = 0
        let key2Calls = 0

        cache.getOrSet('key1', () => {
            key1Calls++
            return 'value1-new'
        })

        cache.getOrSet('key2', () => {
            key2Calls++
            return 'value2-new'
        })

        expect(key1Calls).toBe(0) // key1 was refreshed, still cached
        expect(key2Calls).toBe(1) // key2 was evicted
    })
})

describe('hashStyles', () => {
    it('should return consistent hash for same styles', () => {
        const styles = { color: 'red', fontSize: '16px' }
        const hash1 = hashStyles(styles)
        const hash2 = hashStyles(styles)
        expect(hash1).toBe(hash2)
    })

    it('should return different hash for different styles', () => {
        const hash1 = hashStyles({ color: 'red' })
        const hash2 = hashStyles({ color: 'blue' })
        expect(hash1).not.toBe(hash2)
    })
})

describe('hashString', () => {
    it('should return consistent hash for same string', () => {
        const hash1 = hashString('test')
        const hash2 = hashString('test')
        expect(hash1).toBe(hash2)
    })

    it('should return different hash for different strings', () => {
        const hash1 = hashString('test1')
        const hash2 = hashString('test2')
        expect(hash1).not.toBe(hash2)
    })
})

describe('getUniqueClassName', () => {
    it('should return base name if not used', () => {
        const name = getUniqueClassName('unique-test-class')
        expect(name).toBe('unique-test-class')
    })

    it('should append counter for duplicate names', () => {
        const name1 = getUniqueClassName('duplicate-class')
        const name2 = getUniqueClassName('duplicate-class')
        const name3 = getUniqueClassName('duplicate-class')

        expect(name1).toBe('duplicate-class')
        expect(name2).toBe('duplicate-class-2')
        expect(name3).toBe('duplicate-class-3')
    })
})

describe('resolveAmpersandSelector', () => {
    it('should replace & with class name', () => {
        expect(resolveAmpersandSelector('&:hover', 'btn')).toBe('.btn:hover')
        expect(resolveAmpersandSelector('& > span', 'container')).toBe('.container > span')
    })

    it('should handle multiple & occurrences', () => {
        expect(resolveAmpersandSelector('& &', 'item')).toBe('.item .item')
        expect(resolveAmpersandSelector('&&', 'cls')).toBe('.cls.cls')
    })
})

