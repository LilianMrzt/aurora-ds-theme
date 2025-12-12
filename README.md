# Aurora - CSS-in-JS Theme Library

A performant, type-safe, and **fully extensible** CSS-in-JS theme management library for React applications.

## Features

- 🎨 **Theme Management** - Define and switch between themes easily
- 🔧 **Fully Extensible** - Add custom colors, spacing, and any theme tokens
- ⚡ **Optimized Performance** - LRU caching, static style deduplication
- 🖥️ **SSR Support** - Server-side rendering compatible
- 📦 **Lightweight** - No runtime dependencies besides React
- 🔒 **Type-safe** - Full TypeScript support with generics
- 🎯 **CSS-in-JS** - Write styles in JavaScript with full IDE support

## Installation

```bash
npm install @aurora-ui/theme
# or
yarn add @aurora-ui/theme
# or
pnpm add @aurora-ui/theme
```

## Quick Start

### 1. Use the default theme or create your own

```tsx
import { defaultTheme, createTheme, ThemeProvider } from '@aurora-ui/theme'

// Option 1: Use default theme directly
<ThemeProvider theme={defaultTheme}>
    <App />
</ThemeProvider>

// Option 2: Customize the default theme
const myTheme = createTheme(defaultTheme, {
    colors: {
        primary: '#your-brand-color',
    },
})
```

### 2. Create and use styles

```tsx
import { createStyles, useTheme } from '@aurora-ui/theme'

const STYLES = createStyles((theme) => ({
    container: {
        display: 'flex',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
        ':hover': {
            backgroundColor: theme.colors.backgroundHover,
        },
    },
    title: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.text,
    },
}))

function MyComponent() {
    return (
        <div className={STYLES.container}>
            <h1 className={STYLES.title}>Hello World</h1>
        </div>
    )
}
```

## Extending the Theme

Aurora is designed to be **fully extensible**. You can add custom colors, spacing, or any other tokens.

### Adding Custom Colors

```tsx
import type { BaseColors, BaseTheme, ExtendTheme } from '@aurora-ui/theme'
import { defaultTheme, createTheme, ThemeProvider, createStyles } from '@aurora-ui/theme'

// 1. Define your extended color type
type MyColors = BaseColors & {
    accent: string
    info: string
    onInfo: string
}

// 2. Create your theme type
type MyTheme = ExtendTheme<{
    colors: MyColors
}>

// 3. Create your theme
const myTheme = createTheme(defaultTheme, {
    colors: {
        accent: '#ff6b6b',
        info: '#3498db',
        onInfo: '#ffffff',
    },
}) as MyTheme

// 4. Use with full type safety
const STYLES = createStyles<MyTheme>((theme) => ({
    infoBox: {
        backgroundColor: theme.colors.info,     // ✅ TypeScript knows about this!
        color: theme.colors.onInfo,
        borderLeft: `4px solid ${theme.colors.accent}`,
    },
}))

// 5. Get typed theme in components
function MyComponent() {
    const theme = useTheme<MyTheme>()
    return <div style={{ color: theme.colors.accent }}>Accent color!</div>
}
```

### Adding Custom Spacing

```tsx
import type { BaseSpacing, ExtendTheme } from '@aurora-ui/theme'

type MySpacing = BaseSpacing & {
    xxl: string
    '2xl': string
    '3xl': string
}

type MyTheme = ExtendTheme<{
    spacing: MySpacing
}>

const myTheme = createTheme(defaultTheme, {
    spacing: {
        xxl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
    },
}) as MyTheme
```

### Adding Completely Custom Properties

```tsx
import type { BaseTheme, ExtendTheme } from '@aurora-ui/theme'

type MyTheme = ExtendTheme<{
    // Custom breakpoints
    breakpoints: {
        sm: string
        md: string
        lg: string
        xl: string
    }
    // Custom z-index scale
    zIndex: {
        modal: number
        dropdown: number
        tooltip: number
    }
}>

const myTheme: MyTheme = {
    ...defaultTheme,
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    zIndex: {
        modal: 1000,
        dropdown: 100,
        tooltip: 50,
    },
}
```

## Theme Utilities

### createTheme

Merge a base theme with overrides:

```tsx
const myTheme = createTheme(defaultTheme, {
    colors: { primary: '#ff0000' },
    spacing: { md: '1.5rem' },
})
```

### mergeThemes

Merge multiple theme overrides:

```tsx
const theme = mergeThemes(
    defaultTheme,
    brandColors,
    darkModeOverrides,
    userPreferences
)
```

### createThemeVariant

Create reusable theme variants:

```tsx
const createDarkVariant = createThemeVariant({
    colors: {
        background: '#1a1a1a',
        text: '#ffffff',
    },
})

const darkTheme = createDarkVariant(lightTheme)
```

## Dynamic Styles

```tsx
const STYLES = createStyles((theme) => ({
    button: (variant: 'primary' | 'secondary', size: 'sm' | 'md' | 'lg') => ({
        backgroundColor: variant === 'primary' 
            ? theme.colors.primary 
            : theme.colors.secondary,
        padding: theme.spacing[size],
    }),
}))

// Usage
<button className={STYLES.button('primary', 'md')}>Click me</button>
```

## Keyframes

```tsx
import { keyframes, createStyles } from '@aurora-ui/theme'

const fadeIn = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
})

const STYLES = createStyles(() => ({
    animated: {
        animation: `${fadeIn} 0.3s ease-in-out`,
    },
}))
```

## CSS Variables

```tsx
import { cssVariables } from '@aurora-ui/theme'

const vars = cssVariables({
    primaryColor: '#007bff',
    spacing: '1rem',
})

// vars.primaryColor === 'var(--primary-color)'
```

## SSR Support

```tsx
import { getSSRStyles, clearSSRRules } from '@aurora-ui/theme'

// In your server-side code
const html = renderToString(<App />)
const styles = getSSRStyles()

const fullHtml = `
<!DOCTYPE html>
<html>
<head>
    <style id="aurora-styles">${styles}</style>
</head>
<body>${html}</body>
</html>
`

// Clear rules for next request
clearSSRRules()
```

## API Reference

### Types

| Type | Description |
|------|-------------|
| `Theme` | Generic theme type with customizable tokens |
| `BaseTheme` | Minimum required theme structure |
| `BaseColors` | Base color tokens |
| `BaseSpacing` | Base spacing tokens |
| `ExtendTheme<T>` | Helper to create extended theme types |
| `DeepPartial<T>` | Make all properties optional (for overrides) |
| `ThemeOverride<T>` | Type for theme overrides |

### Components & Hooks

| Export | Description |
|--------|-------------|
| `ThemeProvider` | Context provider for theme |
| `useTheme<T>()` | Hook to access current theme with custom type |

### Theme Utilities

| Export | Description |
|--------|-------------|
| `defaultTheme` | Default light theme |
| `defaultDarkTheme` | Default dark theme |
| `createTheme()` | Create theme with overrides |
| `mergeThemes()` | Merge multiple overrides |
| `createThemeVariant()` | Create reusable theme variants |

### Styling

| Export | Description |
|--------|-------------|
| `createStyles<T>()` | Create type-safe styles with theme access |
| `keyframes()` | Define CSS keyframes animations |
| `fontFace()` | Define @font-face rules |
| `cssVariables()` | Create CSS custom properties |

### SSR

| Export | Description |
|--------|-------------|
| `getSSRStyles()` | Get collected styles for SSR |
| `getSSRStyleTag()` | Get styles as complete `<style>` tag |
| `clearSSRRules()` | Clear SSR style buffer |

## License

MIT

