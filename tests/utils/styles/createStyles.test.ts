import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createStyles } from '@/index'
import { setThemeContextGetter } from '@/utils/styles/styleEngine'
import { mockTheme, type MockTheme } from '@tests/utils/styles/mockTheme'

describe('createStyles', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockTheme | undefined) | null

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

    it('should throw error when theme context is not set', () => {
        setThemeContextGetter(null)

        const styles = createStyles((theme) => ({
            root: {
                color: theme.colors.text
            }
        }))

        expect(() => styles.root).toThrow('createStyles: Theme context not found')
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
    let previousGetter: (() => MockTheme | undefined) | null

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

    it('should reinitialize classes when theme changes', () => {
        const alternateTheme = { ...mockTheme, colors: { ...mockTheme.colors, primary: '#ff0000' } }

        const styles = createStyles((theme) => ({
            colored: {
                color: theme.colors.primary
            }
        }))

        const class1 = styles.colored

        setThemeContextGetter(() => alternateTheme)

        const class2 = styles.colored

        expect(class1).not.toBe(class2)
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
    let previousGetter: (() => MockTheme | undefined) | null

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        previousGetter = setThemeContextGetter(() => mockTheme) as any
    })

    afterEach(() => {
        setThemeContextGetter(previousGetter)
    })

    it('should reuse cached class for identical static styles', () => {
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

        expect(styles1.identical).toBe(styles2.identical)
    })

    it('should generate different classes for different static styles', () => {
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

        expect(styles1.box).not.toBe(styles2.box)
    })
})

describe('media queries support', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previousGetter: (() => MockTheme | undefined) | null

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
    let previousGetter: (() => MockTheme | undefined) | null

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
    let previousGetter: (() => MockTheme | undefined) | null

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
    let previousGetter: (() => MockTheme | undefined) | null

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

