# Aurora - CSS-in-JS Theme Library

A performant, type-safe, and **fully extensible** CSS-in-JS theme management library for React applications.

## Features

- 🎨 **Theme Management** - Define and switch between themes easily
- 🔧 **Modular Customization** - Customize colors, spacing, or any token independently
- ⚡ **Optimized Performance** - LRU caching, static style deduplication
- 🖥️ **SSR Support** - Server-side rendering compatible
- 📦 **Lightweight** - No runtime dependencies besides React
- 🔒 **Type-safe** - Full TypeScript support with generics
- 🎯 **CSS-in-JS** - Write styles in JavaScript with full IDE support

## Installation

```bash
npm install @aurora-ui/theme
```

## Quick Start

```tsx
import { defaultTheme, ThemeProvider, createStyles } from '@aurora-ui/theme'

// Wrap your app
<ThemeProvider theme={defaultTheme}>
    <App />
</ThemeProvider>

// Create styles
const STYLES = createStyles((theme) => ({
    container: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
    },
}))

// Use in components
function MyComponent() {
    return <div className={STYLES.container}>Hello!</div>
}
```

## Modular Customization

Aurora exports individual presets so you can customize only what you need:

### Customize Only Colors

```tsx
import {
    defaultTheme,
    defaultColors,
    createTheme,
} from '@aurora-ui/theme'

// Override just the colors you want
const myTheme = createTheme(defaultTheme, {
    colors: {
        ...defaultColors,
        primary: '#your-brand-color',
        primaryHover: '#your-brand-hover',
    },
})
```

### Customize Only Spacing

```tsx
import {
    defaultTheme,
    defaultSpacing,
    createTheme,
} from '@aurora-ui/theme'

const myTheme = createTheme(defaultTheme, {
    spacing: {
        ...defaultSpacing,
        md: '1.25rem', // Override medium spacing
        lg: '2rem',    // Override large spacing
    },
})
```

### Mix and Match

```tsx
import {
    defaultColors,
    defaultDarkColors,
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
} from '@aurora-ui/theme'

// Build a completely custom theme from presets
const myCustomTheme: BaseTheme = {
    colors: {
        ...defaultColors,
        primary: '#0066cc',
    },
    spacing: defaultSpacing,
    radius: {
        ...defaultRadius,
        md: '8px', // More rounded
    },
    shadows: defaultShadows,
    fontSize: defaultFontSize,
    fontWeight: defaultFontWeight,
    lineHeight: defaultLineHeight,
    zIndex: defaultZIndex,
    transition: defaultTransition,
}
```

## Available Presets

| Preset | Description |
|--------|-------------|
| `defaultColors` | Light mode color palette |
| `defaultDarkColors` | Dark mode color palette |
| `defaultSpacing` | Spacing scale (none → 4xl) |
| `defaultRadius` | Border radius scale |
| `defaultShadows` | Shadow/elevation scale |
| `defaultFontSize` | Typography size scale |
| `defaultFontWeight` | Font weight scale |
| `defaultLineHeight` | Line height scale |
| `defaultZIndex` | Z-index layering scale |
| `defaultTransition` | Animation timing presets |

## Extending Types

Add custom tokens with full TypeScript support:

```tsx
import type { BaseColors, ExtendTheme } from '@aurora-ui/theme'

// Extend colors
type MyColors = BaseColors & {
    brand: string
    brandHover: string
}

// Create extended theme type
type MyTheme = ExtendTheme<{
    colors: MyColors
}>

// Use with type safety
const STYLES = createStyles<MyTheme>((theme) => ({
    button: {
        backgroundColor: theme.colors.brand, // ✅ TypeScript knows this!
    },
}))
```

## Dynamic Styles

```tsx
const STYLES = createStyles((theme) => ({
    button: (variant: 'primary' | 'secondary', size: 'sm' | 'md' | 'lg') => ({
        backgroundColor: theme.colors[variant],
        padding: theme.spacing[size],
        borderRadius: theme.radius.md,
        transition: theme.transition.fast,
    }),
}))

// Usage
<button className={STYLES.button('primary', 'md')}>Click me</button>
```

## Theme Utilities

### createTheme

```tsx
const myTheme = createTheme(defaultTheme, {
    colors: { primary: '#ff0000' },
})
```

### mergeThemes

```tsx
const theme = mergeThemes(
    defaultTheme,
    brandOverrides,
    darkModeOverrides
)
```

### createThemeVariant

```tsx
const createDarkVariant = createThemeVariant({
    colors: defaultDarkColors,
})

const darkTheme = createDarkVariant(lightTheme)
```

## SSR Support

```tsx
import { getSSRStyles, clearSSRRules } from '@aurora-ui/theme'

// Server-side
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

clearSSRRules() // Reset for next request
```

## API Reference

### Theme Types

| Type | Description |
|------|-------------|
| `BaseTheme` | Complete theme structure |
| `BaseColors` | Color token type |
| `BaseSpacing` | Spacing token type |
| `ExtendTheme<T>` | Helper to extend theme |
| `DeepPartial<T>` | For partial overrides |

### Components & Hooks

| Export | Description |
|--------|-------------|
| `ThemeProvider` | Theme context provider |
| `useTheme<T>()` | Access current theme |

### Styling

| Export | Description |
|--------|-------------|
| `createStyles<T>()` | Create themed styles |
| `keyframes()` | CSS keyframe animations |
| `fontFace()` | @font-face rules |
| `cssVariables()` | CSS custom properties |

## License

MIT

