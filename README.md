# Aurora Theme

A performant, type-safe, and **fully customizable** CSS-in-JS theme management library for React applications.

## Features

- 🎨 **Modular Theming** - Customize colors, spacing, or any token independently
- 🎯 **Color Scales** - 20 color palettes with 12 shades each (25-950)
- ⚡ **Optimized Performance** - LRU caching, static style deduplication
- 🖥️ **SSR Support** - Server-side rendering compatible
- 📦 **Lightweight** - No runtime dependencies besides React
- 🔒 **Type-safe** - Full TypeScript support with generics
- 🌗 **Dark Mode Ready** - Light and dark variants for all palettes

## Installation

```bash
npm install @aurora-ds/theme
```

## Quick Start

```tsx
import { defaultTheme, ThemeProvider, createStyles } from '@aurora-ds/theme'

// 1. Wrap your app
<ThemeProvider theme={defaultTheme}>
    <App />
</ThemeProvider>

// 2. Create styles
const STYLES = createStyles((theme) => ({
    container: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
    },
}))

// 3. Use in components
function MyComponent() {
    return <div className={STYLES.container}>Hello!</div>
}
```

---

## Color Scales

Aurora provides **20 color scales** with **12 shades each** (25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950).

### Available Scales

**Neutrals**
- `gray` - Pure neutral, universal default
- `slate` - Cool/blue undertone, tech & corporate
- `stone` - Warm undertone, lifestyle & natural

**Colors**
- `red` `orange` `amber` `yellow` `lime` `green`
- `emerald` `teal` `cyan` `sky` `blue` `indigo`
- `violet` `purple` `fuchsia` `pink` `rose`

### Usage

```tsx
import { colors, indigo, emerald } from '@aurora-ds/theme'

// Via the colors object
colors.indigo[500]  // '#6366f1'
colors.emerald[400] // '#34d399'
colors.gray[900]    // '#18181b'

// Or import individual scales
indigo[600]         // '#4f46e5'
emerald[50]         // '#ecfdf5'

// Special values
colors.white        // '#ffffff'
colors.black        // '#000000'
colors.transparent  // 'transparent'
```

### Build Custom Theme Colors

```tsx
import { colors, defaultTheme, createTheme } from '@aurora-ds/theme'

const myTheme = createTheme(defaultTheme, {
    colors: {
        primary: colors.purple[500],
        primaryHover: colors.purple[600],
        primaryActive: colors.purple[700],
        primarySubtle: colors.purple[50],
        // ... other colors
    }
})
```

---

## Theme Palettes (Presets)

Aurora includes **10 ready-to-use color palettes**, each with light and dark variants, designed with improved contrast ratios.

### Available Palettes

| Palette | Style | Best For |
|---------|-------|----------|
| `indigo` | Modern, professional | SaaS, business apps (default) |
| `blue` | Clean, trustworthy | Corporate, fintech |
| `rose` | Warm, friendly | Social, lifestyle |
| `emerald` | Fresh, natural | Health, eco-friendly |
| `teal` | Balanced, calming | Healthcare, wellness |
| `violet` | Creative, bold | Creative, gaming |
| `amber` | Energetic, warm | Food, education |
| `cyan` | Tech, modern | Tech, startups |
| `slate` | Minimal, corporate | Enterprise, B2B |
| `gray` | Ultra minimal | Portfolios, luxury |

### Usage

```tsx
import { 
    palettes, 
    blueLight, 
    blueDark,
    createTheme, 
    defaultTheme 
} from '@aurora-ds/theme'

// Option 1: Import directly
const blueTheme = createTheme(defaultTheme, { colors: blueLight })
const blueDarkTheme = createTheme(defaultTheme, { colors: blueDark })

// Option 2: Via palettes object
const theme = createTheme(defaultTheme, { 
    colors: palettes.emerald.light 
})

// Option 3: Dynamic switching
const [isDark, setIsDark] = useState(false)
const theme = createTheme(defaultTheme, {
    colors: palettes.teal[isDark ? 'dark' : 'light']
})
```

---

## Modular Customization

Customize only what you need - colors, spacing, or any individual token.

### Available Presets

```tsx
import {
    // Complete themes
    defaultTheme,
    defaultDarkTheme,
    
    // Individual presets
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
} from '@aurora-ds/theme'
```

### Customize Only Colors

```tsx
import { defaultTheme, defaultColors, createTheme } from '@aurora-ds/theme'

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
import { defaultTheme, defaultSpacing, createTheme } from '@aurora-ds/theme'

const myTheme = createTheme(defaultTheme, {
    spacing: {
        ...defaultSpacing,
        md: '1.25rem',  // Override medium
        lg: '2rem',     // Override large
    },
})
```

### Mix and Match

```tsx
import { 
    defaultSpacing, 
    defaultRadius,
    defaultShadows,
    emeraldLight,
    createTheme,
    defaultTheme,
} from '@aurora-ds/theme'

const myTheme = createTheme(defaultTheme, {
    colors: emeraldLight,           // Use emerald palette
    spacing: defaultSpacing,         // Keep default spacing
    radius: {
        ...defaultRadius,
        md: '8px',                   // More rounded
    },
})
```

---

## Theme Structure

### Colors

| Token | Description |
|-------|-------------|
| `primary`, `onPrimary`, `primaryHover`, `primaryActive`, `primarySubtle` | Primary brand color |
| `secondary`, `onSecondary`, `secondaryHover`, `secondaryActive`, `secondarySubtle` | Secondary actions |
| `accent`, `onAccent`, `accentHover`, `accentSubtle` | Accent/highlight |
| `background`, `surface`, `surfaceHover`, `surfaceActive`, `elevated`, `overlay` | Surfaces |
| `text`, `textSecondary`, `textTertiary`, `textInverse` | Text hierarchy |
| `border`, `borderHover`, `borderFocus`, `borderSubtle` | Borders |
| `success`, `warning`, `error`, `info` + variants | Semantic colors |
| `link`, `linkHover`, `linkVisited`, `focus` | Interactive |
| `disabled`, `disabledText` | Disabled states |

### Spacing

```tsx
spacing: {
    none: '0',
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
}
```

### Other Tokens

| Token | Values |
|-------|--------|
| `radius` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `shadows` | `none`, `xs`, `sm`, `md`, `lg`, `xl` |
| `fontSize` | `xs`, `sm`, `md`, `lg`, `xl` |
| `fontWeight` | `light`, `regular`, `medium`, `semibold`, `bold` |
| `lineHeight` | `none`, `tight`, `normal`, `relaxed` |
| `zIndex` | `behind`, `base`, `dropdown`, `sticky`, `fixed`, `overlay`, `modal`, `popover`, `tooltip`, `toast` |
| `transition` | `fast`, `normal`, `slow` |

---

## Extending Types

Add custom tokens with full TypeScript support:

```tsx
import type { BaseColors, ExtendTheme } from '@aurora-ds/theme'

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

// Access in components
const theme = useTheme<MyTheme>()
```

---

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

---

## SSR Support

```tsx
import { getSSRStyles, clearSSRRules } from '@aurora-ds/theme'

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

---

## API Reference

### Types

| Type | Description |
|------|-------------|
| `Theme` | Complete theme structure |
| `BaseColors` | Color token type |
| `BaseSpacing` | Spacing token type |
| `ColorScale` | Color scale type (25-950) |
| `ColorName` | Union of color scale names |
| `PaletteName` | Union of palette names |
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

---


## License

MIT



