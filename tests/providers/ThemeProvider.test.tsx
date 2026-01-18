import { renderHook , render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ThemeProvider, useTheme } from '@/providers/ThemeProvider'
import { createTheme } from '@/utils/theme'

// Test theme type
type TestTheme = {
    colors: {
        primary: string
        secondary: string
        background: string
        text: string
    }
    spacing: {
        sm: string
        md: string
        lg: string
    }
}

const defaultTheme = createTheme<TestTheme>({
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        background: '#ffffff',
        text: '#000000',
    },
    spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
    },
})

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
        const customTheme = createTheme<TestTheme>({
            colors: {
                primary: '#custom123',
                secondary: '#6c757d',
                background: '#ffffff',
                text: '#000000',
            },
            spacing: {
                sm: '8px',
                md: '16px',
                lg: '24px',
            },
        })

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
        const altTheme = createTheme<TestTheme>({
            colors: {
                primary: '#007bff',
                secondary: '#6c757d',
                background: '#222222',
                text: '#000000',
            },
            spacing: {
                sm: '8px',
                md: '16px',
                lg: '24px',
            },
        })

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
            <ThemeProvider theme={altTheme}>
                <TestComponent />
            </ThemeProvider>
        )

        expect(screen.getByTestId('bg').textContent).toBe(altTheme.colors.background)
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
        const innerTheme = createTheme<TestTheme>({
            colors: {
                primary: '#nested123',
                secondary: '#6c757d',
                background: '#ffffff',
                text: '#000000',
            },
            spacing: {
                sm: '8px',
                md: '16px',
                lg: '24px',
            },
        })

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
        // Suppress React and jsdom error logging for this expected error test
        const originalError = console.error
        console.error = vi.fn()

        expect(() => {
            renderHook(() => useTheme())
        }).toThrow('useTheme must be used within a ThemeProvider')

        console.error = originalError
    })

    it('should return typed theme', () => {
        type CustomTheme = typeof defaultTheme & {
            custom: { value: string }
        }

        const customTheme: CustomTheme = {
            ...defaultTheme,
            custom: { value: 'test' },
        }

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => (
                <ThemeProvider theme={customTheme}>
                    {children}
                </ThemeProvider>
            ),
        })

        expect((result.current as CustomTheme).custom.value).toBe('test')
    })
})

