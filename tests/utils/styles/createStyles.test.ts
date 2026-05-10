import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createStyles } from '@/index'
import { setThemeContextGetter } from '@/utils/styles/styleEngine'
import { mockTheme, MockThemeType } from '@tests/utils/styles/mockTheme'

describe('createStyles', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should return class names for static styles', () => {
        const styles = createStyles((theme) => ({
            root: {
                display: 'flex',
                padding: theme.spacing.md
            }
        }))

        expect(typeof styles.root).toBe('string')
        expect(styles.root).toContain('root')
    })

    it('should return function for dynamic styles', () => {
        const styles = createStyles((theme) => ({
            container: (isActive: boolean) => ({
                backgroundColor: isActive ? theme.colors.primary : theme.colors.background
            })
        }))

        expect(typeof styles.container).toBe('function')
        expect(typeof styles.container(true)).toBe('string')
        expect(styles.container(true)).toContain('container')
    })

    it('should cache dynamic styles with same arguments', () => {
        const styles = createStyles((_theme) => ({
            item: (index: number) => ({
                order: index
            })
        }))

        const class1 = styles.item(1)
        const class2 = styles.item(1)

        expect(class1).toBe(class2)
    })

    it('should generate different classes for different arguments', () => {
        const styles = createStyles((_theme) => ({
            item: (active: boolean) => ({
                opacity: active ? 1 : 0.5
            })
        }))

        const classActive = styles.item(true)
        const classInactive = styles.item(false)

        expect(classActive).not.toBe(classInactive)
    })

    it('should handle multiple style keys', () => {
        const styles = createStyles((theme) => ({
            root: {
                display: 'flex'
            },
            title: {
                fontSize: theme.fontSize.lg
            },
            button: (variant: 'primary' | 'secondary') => ({
                backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.secondary
            })
        }))

        expect(typeof styles.root).toBe('string')
        expect(typeof styles.title).toBe('string')
        expect(typeof styles.button).toBe('function')
    })


    it('should handle pseudo-classes in styles', () => {
        const styles = createStyles((theme) => ({
            button: {
                backgroundColor: theme.colors.primary,
                ':hover': {
                    backgroundColor: theme.colors.primaryHover
                }
            }
        }))

        expect(typeof styles.button).toBe('string')
    })

    it('should handle number values with px units', () => {
        const styles = createStyles(() => ({
            box: {
                width: 100,
                height: 50,
                padding: 16
            }
        }))

        expect(typeof styles.box).toBe('string')
    })

    it('should handle unitless properties without px', () => {
        const styles = createStyles(() => ({
            text: {
                fontWeight: 700,
                lineHeight: 1.5,
                opacity: 0.8,
                zIndex: 10
            }
        }))

        expect(typeof styles.text).toBe('string')
    })

    describe('explicit id option', () => {
        it('uses the explicit id as a stable namespace prefix', () => {
            const styles = createStyles(() => ({
                root: { display: 'flex' }
            }), { id: 'my-button' })

            expect(styles.root).toBe('my-button-root')
        })

        it('produces identical class names across calls with the same id', () => {
            const a = createStyles(() => ({ root: { color: 'red' } }), { id: 'fixed-id' })
            const b = createStyles(() => ({ root: { color: 'blue' } }), { id: 'fixed-id' })

            expect(a.root).toBe(b.root)
            expect(a.root).toBe('fixed-id-root')
        })

        it('kebab-cases camelCase ids', () => {
            const styles = createStyles(() => ({
                root: { display: 'flex' }
            }), { id: 'MyAwesomeWidget' })

            expect(styles.root).toBe('my-awesome-widget-root')
        })

        it('produces distinct namespaces for distinct ids', () => {
            const a = createStyles(() => ({ root: { color: 'red' } }), { id: 'foo' })
            const b = createStyles(() => ({ root: { color: 'red' } }), { id: 'bar' })

            expect(a.root).not.toBe(b.root)
        })

        it('still supports dynamic styles with explicit id', () => {
            const styles = createStyles(() => ({
                item: (active: boolean) => ({ opacity: active ? 1 : 0.5 })
            }), { id: 'dyn' })

            expect(styles.item(true)).toContain('dyn-item-')
            expect(styles.item(true)).toBe(styles.item(true))
            expect(styles.item(true)).not.toBe(styles.item(false))
        })
    })

    describe('stable cache key for object args', () => {
        it('produces the same className for objects with same content but different key order', () => {
            const styles = createStyles(() => ({
                box: (config: { a: number; b: number }) => ({ order: config.a + config.b })
            }), { id: 'stable-cache' })

            const c1 = styles.box({ a: 1, b: 2 })
            const c2 = styles.box({ b: 2, a: 1 })

            expect(c1).toBe(c2)
        })

        it('produces different classNames for different object content', () => {
            const styles = createStyles(() => ({
                box: (config: { value: number }) => ({ order: config.value })
            }), { id: 'stable-cache-2' })

            expect(styles.box({ value: 1 })).not.toBe(styles.box({ value: 2 }))
        })
    })
})

describe('setThemeContextGetter', () => {
    it('should return previous getter', () => {
        const getter1 = () => mockTheme
        const getter2 = () => mockTheme

        setThemeContextGetter(getter1)
        const previous = setThemeContextGetter(getter2)

        expect(previous).toBe(getter1)
    })

    it('should accept null getter', () => {
        const getter = () => mockTheme
        setThemeContextGetter(getter)

        const previous = setThemeContextGetter(null)

        expect(previous).toBe(getter)
    })
})

describe('createStyles edge cases', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should handle null and undefined values in styles', () => {
        const styles = createStyles(() => ({
            box: {
                width: 100,
                height: undefined,
                margin: null as unknown as string
            }
        }))

        expect(typeof styles.box).toBe('string')
    })

    it('should handle empty pseudo-class styles', () => {
        const styles = createStyles((theme) => ({
            button: {
                color: theme.colors.text,
                ':hover': {}
            }
        }))

        expect(typeof styles.button).toBe('string')
    })

    it('should cache results for same theme', () => {
        const styles = createStyles((theme) => ({
            root: {
                color: theme.colors.primary
            }
        }))

        const class1 = styles.root
        const class2 = styles.root

        expect(class1).toBe(class2)
    })
})

describe('createStyles without theme function', () => {
    it('should handle static styles object directly', () => {
        const styles = createStyles({
            container: {
                display: 'flex',
                padding: 16
            }
        })

        expect(typeof styles.container).toBe('string')
        expect(styles.container).toContain('container')
    })

    it('should handle dynamic styles without theme', () => {
        const styles = createStyles({
            item: (isActive: boolean) => ({
                opacity: isActive ? 1 : 0.5
            })
        })

        expect(typeof styles.item).toBe('function')
        expect(styles.item(true)).toContain('item')
    })

    it('should cache dynamic styles without theme', () => {
        const styles = createStyles({
            dynamic: (value: number) => ({
                order: value
            })
        })

        const class1 = styles.dynamic(5)
        const class2 = styles.dynamic(5)

        expect(class1).toBe(class2)
    })
})

describe('static style caching', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should produce isolated classes for separate createStyles calls', () => {
        // Each createStyles call must own its own module stylesheet, even when
        // the input is identical. Sharing the same class across distinct calls
        // used to cause stylesheets to clobber each other in minified
        // production bundles (see getModuleId fallback).
        const styles1 = createStyles({
            identical: {
                display: 'flex',
                alignItems: 'center'
            }
        })

        const styles2 = createStyles({
            identical: {
                display: 'flex',
                alignItems: 'center'
            }
        })

        expect(typeof styles1.identical).toBe('string')
        expect(typeof styles2.identical).toBe('string')
        expect(styles1.identical).not.toBe(styles2.identical)
    })

    it('should generate deterministic class names based on key name', () => {
        const styles1 = createStyles({
            box: {
                display: 'flex'
            }
        })

        const styles2 = createStyles({
            box: {
                display: 'block'
            }
        })

        // Same key name from same call-site → same deterministic className
        // The CSS content differs in their respective module <style> elements
        expect(styles1.box).toContain('box')
        expect(styles2.box).toContain('box')
    })
})

describe('media queries support', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should handle media queries in styles', () => {
        const styles = createStyles((_theme) => ({
            responsive: {
                display: 'flex',
                '@media (max-width: 768px)': {
                    flexDirection: 'column'
                }
            }
        }))

        expect(typeof styles.responsive).toBe('string')
        expect(styles.responsive).toContain('responsive')
    })

    it('should handle multiple media queries', () => {
        const styles = createStyles(() => ({
            container: {
                width: '100%',
                '@media (min-width: 768px)': {
                    width: '750px'
                },
                '@media (min-width: 1024px)': {
                    width: '970px'
                }
            }
        }))

        expect(typeof styles.container).toBe('string')
    })
})

describe('container queries support', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should handle container queries in styles', () => {
        const styles = createStyles(() => ({
            card: {
                display: 'block',
                '@container (min-width: 400px)': {
                    display: 'flex'
                }
            }
        }))

        expect(typeof styles.card).toBe('string')
        expect(styles.card).toContain('card')
    })

    it('should handle multiple container queries', () => {
        const styles = createStyles(() => ({
            grid: {
                display: 'grid',
                gridTemplateColumns: '1fr',
                '@container (min-width: 400px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)'
                },
                '@container (min-width: 800px)': {
                    gridTemplateColumns: 'repeat(4, 1fr)'
                }
            }
        }))

        expect(typeof styles.grid).toBe('string')
    })
})

describe('complex selectors support', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should handle child selectors (& > div)', () => {
        const styles = createStyles((theme) => ({
            parent: {
                display: 'flex',
                '& > div': {
                    marginBottom: theme.spacing.sm
                }
            }
        }))

        expect(typeof styles.parent).toBe('string')
    })

    it('should handle pseudo-class selectors (&:first-child)', () => {
        const styles = createStyles(() => ({
            list: {
                padding: 0,
                '&:first-child': {
                    marginTop: 0
                },
                '&:last-child': {
                    marginBottom: 0
                }
            }
        }))

        expect(typeof styles.list).toBe('string')
    })

    it('should handle attribute selectors (&[disabled])', () => {
        const styles = createStyles(() => ({
            input: {
                opacity: 1,
                '&[disabled]': {
                    opacity: 0.5
                }
            }
        }))

        expect(typeof styles.input).toBe('string')
    })
})

describe('@supports feature queries', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should handle @supports queries in styles', () => {
        const styles = createStyles(() => ({
            grid: {
                display: 'flex',
                '@supports (display: grid)': {
                    display: 'grid'
                }
            }
        }))

        expect(typeof styles.grid).toBe('string')
    })

    it('should handle multiple @supports queries', () => {
        const styles = createStyles(() => ({
            layout: {
                display: 'block',
                '@supports (display: flex)': {
                    display: 'flex'
                },
                '@supports (display: grid)': {
                    display: 'grid'
                }
            }
        }))

        expect(typeof styles.layout).toBe('string')
    })
})

describe('createStyles - CSS Variables mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockThemeType | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should use CSS variables for theme values', () => {
        const styles = createStyles((theme) => ({
            root: {
                backgroundColor: theme.colors.background,
                color: theme.colors.text
            }
        }))

        expect(typeof styles.root).toBe('string')
        expect(styles.root).toContain('root')
    })

    it('should isolate distinct createStyles calls into their own module sheets', () => {
        const stylesCreator = (theme: MockThemeType) => ({
            button: {
                backgroundColor: theme.colors.primary
            }
        })

        const styles1 = createStyles(stylesCreator)
        const styles2 = createStyles(stylesCreator)

        // Distinct calls must yield distinct classes so module sheets never collide.
        expect(typeof styles1.button).toBe('string')
        expect(typeof styles2.button).toBe('string')
        expect(styles1.button).not.toBe(styles2.button)
    })

    it('should not require theme context at runtime', () => {
        // Clear theme context - CSS variables don't need it at runtime
        setThemeContextGetter(null)

        const styles = createStyles((theme) => ({
            container: {
                padding: theme.spacing.md
            }
        }))

        // Should not throw because CSS variables mode doesn't need the theme at access time
        expect(typeof styles.container).toBe('string')
    })

    it('should handle nested theme properties', () => {
        const styles = createStyles((theme) => ({
            text: {
                fontSize: theme.fontSize.lg,
                fontWeight: theme.fontWeight.bold,
                lineHeight: theme.lineHeight.normal
            }
        }))

        expect(typeof styles.text).toBe('string')
    })

    it('should handle dynamic styles with CSS variables', () => {
        const styles = createStyles((theme) => ({
            button: (variant: 'primary' | 'secondary') => ({
                backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.secondary
            })
        }))

        expect(typeof styles.button).toBe('function')
        const primaryClass = styles.button('primary')
        const secondaryClass = styles.button('secondary')

        expect(typeof primaryClass).toBe('string')
        expect(typeof secondaryClass).toBe('string')
        expect(primaryClass).not.toBe(secondaryClass)
    })

    it('should support arbitrary theme structure with any nesting depth', () => {
        // Test with completely custom theme keys that are NOT in any predefined list
        const styles = createStyles((theme) => ({
            custom: {
                // @ts-expect-error - Testing arbitrary access
                color: theme.myCustomCategory.deeplyNested.value,
                // @ts-expect-error - Testing arbitrary access
                background: theme.brandColors.primary.light.shade100,
                // @ts-expect-error - Testing arbitrary access
                padding: theme.customSpacing.xl
            }
        }))

        expect(typeof styles.custom).toBe('string')
    })

    it('should handle deeply nested arbitrary paths', () => {
        const styles = createStyles((theme) => ({
            deep: {
                // @ts-expect-error - Testing arbitrary deep access
                value: theme.a.b.c.d.e.f.g
            }
        }))

        expect(typeof styles.deep).toBe('string')
    })
})

