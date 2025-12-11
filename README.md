# Aurora - CSS-in-JS Theme Library

A performant CSS-in-JS theme management library for React applications.

## Features

- 🎨 **Theme Management** - Define and switch between themes easily
- ⚡ **Optimized Performance** - LRU caching, static style deduplication
- 🖥️ **SSR Support** - Server-side rendering compatible
- 📦 **Lightweight** - No runtime dependencies besides React
- 🔒 **Type-safe** - Full TypeScript support
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

### 1. Define your theme

```tsx
import { Theme } from '@aurora-ui/theme'

const lightTheme: Theme = {
    colors: {
        primary: '#007bff',
        background: '#ffffff',
        text: '#212529',
        // ... other colors
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    // ... other tokens
}
```

### 2. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from '@aurora-ui/theme'

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <YourApp />
        </ThemeProvider>
    )
}
```

### 3. Create and use styles

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
    const theme = useTheme()
    
    return (
        <div className={STYLES.container}>
            <h1 className={STYLES.title}>Hello World</h1>
        </div>
    )
}
```

## Advanced Features

### Dynamic Styles

```tsx
const STYLES = createStyles((theme) => ({
    button: (variant: 'primary' | 'secondary') => ({
        backgroundColor: variant === 'primary' 
            ? theme.colors.primary 
            : theme.colors.secondary,
        padding: theme.spacing.md,
    }),
}))

// Usage
<button className={STYLES.button('primary')}>Click me</button>
```

### Keyframes

```tsx
import { keyframes } from '@aurora-ui/theme'

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

### CSS Variables

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

// Include styles in your HTML
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

### Components

- `ThemeProvider` - Context provider for theme
- `useTheme` - Hook to access current theme

### Styling

- `createStyles` - Create type-safe styles with theme access
- `keyframes` - Define CSS keyframes animations
- `fontFace` - Define @font-face rules
- `cssVariables` - Create CSS custom properties

### SSR

- `getSSRStyles` - Get collected styles for SSR
- `clearSSRRules` - Clear SSR style buffer

## License

MIT

