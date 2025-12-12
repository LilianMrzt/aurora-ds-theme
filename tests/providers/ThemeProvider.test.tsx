import { renderHook , render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ThemeProvider, useTheme } from '@/providers/ThemeProvider'
import { defaultTheme, defaultDarkTheme } from '@/utils/theme'

describe('ThemeProvider', () => {
    it('should provide theme to children', () => {
        const TestComponent = () => {
            const theme = useTheme()
            return <div data-testid={'primary'}>
                {theme.colors.primary}
            </div>
        }

        render(
            <ThemeProvider theme={defaultTheme}>
                <TestComponent />
            </ThemeProvider>
        )

        expect(screen.getByTestId('primary').textContent).toBe(defaultTheme.colors.primary)
    })

    it('should provide custom theme', () => {
        const customTheme = {
            ...defaultTheme,
            colors: {
                ...defaultTheme.colors,
                primary: '#custom123',
            },
        }

        const TestComponent = () => {
            const theme = useTheme()
            return <div data-testid={'primary'}>
                {theme.colors.primary}
            </div>
        }

        render(
            <ThemeProvider theme={customTheme}>
                <TestComponent />
            </ThemeProvider>
        )

        expect(screen.getByTestId('primary').textContent).toBe('#custom123')
    })

    it('should update when theme changes', () => {
        const TestComponent = () => {
            const theme = useTheme()
            return <div data-testid={'bg'}>
                {theme.colors.background}
            </div>
        }

        const { rerender } = render(
            <ThemeProvider theme={defaultTheme}>
                <TestComponent />
            </ThemeProvider>
        )

        expect(screen.getByTestId('bg').textContent).toBe(defaultTheme.colors.background)

        rerender(
            <ThemeProvider theme={defaultDarkTheme}>
                <TestComponent />
            </ThemeProvider>
        )

        expect(screen.getByTestId('bg').textContent).toBe(defaultDarkTheme.colors.background)
    })

    it('should render children', () => {
        render(
            <ThemeProvider theme={defaultTheme}>
                <div data-testid={'child'}>
                    Hello
                </div>
            </ThemeProvider>
        )

        expect(screen.getByTestId('child').textContent).toBe('Hello')
    })

    it('should handle nested ThemeProviders', () => {
        const innerTheme = {
            ...defaultTheme,
            colors: {
                ...defaultTheme.colors,
                primary: '#nested123',
            },
        }

        const TestComponent = () => {
            const theme = useTheme()
            return <div data-testid={'primary'}>
                {theme.colors.primary}
            </div>
        }

        render(
            <ThemeProvider theme={defaultTheme}>
                <ThemeProvider theme={innerTheme}>
                    <TestComponent />
                </ThemeProvider>
            </ThemeProvider>
        )

        expect(screen.getByTestId('primary').textContent).toBe('#nested123')
    })
})

describe('useTheme', () => {
    it('should return theme from context', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => (
                <ThemeProvider theme={defaultTheme}>
                    {children}
                </ThemeProvider>
            ),
        })

        expect(result.current).toBe(defaultTheme)
    })

    it('should throw error when used outside ThemeProvider', () => {
        expect(() => {
            renderHook(() => useTheme())
        }).toThrow('useTheme must be used within a ThemeProvider')
    })

    it('should return typed theme with generic', () => {
        type CustomTheme = typeof defaultTheme & {
            custom: { value: string }
        }

        const customTheme: CustomTheme = {
            ...defaultTheme,
            custom: { value: 'test' },
        }

        const { result } = renderHook(() => useTheme<CustomTheme>(), {
            wrapper: ({ children }) => (
                <ThemeProvider theme={customTheme}>
                    {children}
                </ThemeProvider>
            ),
        })

        expect(result.current.custom.value).toBe('test')
    })
})

