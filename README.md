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

Aurora includes **10 ready-to-use color palettes**, each with light and dark variants, designed with improved contrast ratios. Each palette includes harmonious **tertiary colors** for additional design flexibility.

### Available Palettes

| Palette | Style | Tertiary | Best For |
|---------|-------|----------|----------|
| `indigo` | Modern, professional | Purple | SaaS, business apps (default) |
| `blue` | Clean, trustworthy | Sky | Corporate, fintech |
| `rose` | Warm, friendly | Pink | Social, lifestyle |
| `emerald` | Fresh, natural | Teal | Health, eco-friendly |
| `teal` | Balanced, calming | Cyan | Healthcare, wellness |
| `violet` | Creative, bold | Purple | Creative, gaming |
| `amber` | Energetic, warm | Orange | Food, education |
| `cyan` | Tech, modern | Sky | Tech, startups |
| `slate` | Minimal, corporate | Slate | Enterprise, B2B |
| `gray` | Ultra minimal | Gray | Portfolios, luxury |

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

## Custom Themes (Complete Token Replacement)

Need a completely different color token structure? Aurora supports **full customization** where you can define your own semantic tokens without inheriting `BaseColors`.

### Option 1: Replace Mode

Use `{ mode: 'replace' }` to completely replace a token category instead of deep-merging:

```tsx
import { createTheme, defaultTheme } from '@aurora-ds/theme'

// Replace the entire colors object (no merge with defaults)
const myTheme = createTheme(defaultTheme, {
    colors: {
        brand: '#007bff',
        brandHover: '#0056b3',
        surface: '#ffffff',
        text: '#212529',
    },
}, { mode: 'replace' })

// Result: theme.colors = { brand, brandHover, surface, text }
// Note: theme.colors.primary no longer exists!
```

### Option 2: Custom Theme Function

For full type safety with your own color tokens, use `createCustomTheme`:

```tsx
import { createCustomTheme } from '@aurora-ds/theme'
import type { CustomTheme } from '@aurora-ds/theme'

// 1. Define your own color token structure
type MyBrandColors = {
    brand: string
    brandHover: string
    brandActive: string
    surface: string
    surfaceElevated: string
    textPrimary: string
    textSecondary: string
    border: string
}

// 2. Create your theme with full type safety
const myTheme = createCustomTheme<MyBrandColors>({
    colors: {
        brand: '#007bff',
        brandHover: '#0056b3',
        brandActive: '#004085',
        surface: '#ffffff',
        surfaceElevated: '#f8f9fa',
        textPrimary: '#212529',
        textSecondary: '#6c757d',
        border: '#dee2e6',
    },
    // Other tokens use defaults, or provide your own:
    // spacing: { ... },
    // radius: { ... },
})

// 3. TypeScript knows your exact token structure!
myTheme.colors.brand        // ✅ OK - string
myTheme.colors.primary      // ❌ Error - property doesn't exist

// 4. Type your theme for components
type MyTheme = typeof myTheme
// or: type MyTheme = CustomTheme<MyBrandColors>
```

### Use Custom Theme in Components

```tsx
import { ThemeProvider, createTypedStyles, useTheme } from '@aurora-ds/theme'

// ✨ Create a pre-typed createStyles function ONCE
export const createStyles = createTypedStyles<MyTheme>()

// Now use it everywhere WITHOUT specifying the type!
const STYLES = createStyles((theme) => ({
    button: {
        backgroundColor: theme.colors.brand,      // ✅ TypeScript knows!
        color: theme.colors.textPrimary,          // ✅ Works
        // backgroundColor: theme.colors.primary,  // ❌ Would error
    },
}))

// Access in components
function MyComponent() {
    const theme = useTheme<MyTheme>()
    return <div style={{ color: theme.colors.textSecondary }}>Hello</div>
}

// Wrap your app
<ThemeProvider theme={myTheme}>
    <App />
</ThemeProvider>
```

### Project Setup (Recommended)

Create a `theme.ts` file in your project to centralize your custom theme:

```tsx
// src/theme.ts
import { 
    createCustomTheme, 
    createTypedStyles,
    ThemeProvider as BaseThemeProvider,
    useTheme as baseUseTheme,
} from '@aurora-ds/theme'
import type { CustomTheme } from '@aurora-ds/theme'

// 1. Define your color tokens
type MyColors = {
    brand: string
    brandHover: string
    brandActive: string
    surface: string
    surfaceElevated: string
    textPrimary: string
    textSecondary: string
    border: string
}

// 2. Create your theme
export const theme = createCustomTheme<MyColors>({
    colors: {
        brand: '#007bff',
        brandHover: '#0056b3',
        brandActive: '#004085',
        surface: '#ffffff',
        surfaceElevated: '#f8f9fa',
        textPrimary: '#212529',
        textSecondary: '#6c757d',
        border: '#dee2e6',
    },
})

// 3. Export typed utilities (use these throughout your app!)
export type MyTheme = typeof theme
export const createStyles = createTypedStyles<MyTheme>()
export const useTheme = () => baseUseTheme<MyTheme>()
export const ThemeProvider = BaseThemeProvider
```

Then use in your components:

```tsx
// src/components/Button.tsx
import { createStyles } from '../theme'

// No need to specify <MyTheme> - it's already typed!
const STYLES = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.brand,
        color: theme.colors.textPrimary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        ':hover': {
            backgroundColor: theme.colors.brandHover,
        },
    },
}))

export const Button = ({ children }) => (
    <button className={STYLES.root}>{children}</button>
)
```

### When to Use Each Approach

| Approach | Use Case |
|----------|----------|
| `createTheme()` (default merge) | Extend default tokens, keep compatibility |
| `createTheme()` with `{ mode: 'replace' }` | Quick replacement without type safety |
| `createCustomTheme<T>()` | Full type safety with custom token structure |
| `createTypedStyles<T>()` | Pre-type your `createStyles` for DX (recommended with custom themes) |

---

## Theme Structure

### Colors

| Token | Description |
|-------|-------------|
| `primary`, `onPrimary`, `primaryHover`, `primaryActive`, `primarySubtle`, `primaryDisabled` | Primary brand color |
| `secondary`, `onSecondary`, `secondaryHover`, `secondaryActive`, `secondarySubtle`, `secondaryDisabled` | Secondary actions |
| `tertiary`, `onTertiary`, `tertiaryHover`, `tertiaryActive`, `tertiarySubtle`, `tertiaryDisabled` | Tertiary actions |
| `accent`, `onAccent`, `accentHover`, `accentActive`, `accentSubtle` | Accent/highlight |
| `background`, `surface`, `surfaceHover`, `surfaceActive`, `elevated`, `overlay` | Surfaces |
| `text`, `textSecondary`, `textTertiary`, `textInverse` | Text hierarchy |
| `border`, `borderHover`, `borderFocus`, `borderSubtle` | Borders |
| `success`, `warning`, `error`, `info` + variants | Semantic colors |
| `link`, `linkHover`, `linkActive`, `linkVisited`, `focus` | Interactive |
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

### Opacity

```tsx
opacity: {
    none: 0,       // Fully transparent
    lowest: 0.05,  // Very subtle
    low: 0.1,      // Subtle
    medium: 0.25,  // Noticeable
    high: 0.5,     // Semi-transparent
    higher: 0.75,  // Mostly opaque
    full: 1,       // Fully opaque
}
```

### Other Tokens

| Token | Values |
|-------|--------|
| `radius` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full` |
| `shadows` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`, `focus` |
| `fontSize` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl` |
| `fontWeight` | `light`, `regular`, `medium`, `semibold`, `bold` |
| `lineHeight` | `none`, `tight`, `normal`, `relaxed`, `loose` |
| `zIndex` | `behind`, `base`, `dropdown`, `sticky`, `overlay`, `modal`, `popover`, `tooltip`, `toast` |
| `transition` | `fast`, `normal`, `slow` |
| `opacity` | `none`, `lowest`, `low`, `medium`, `high`, `higher`, `full` |

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
| `BaseOpacity` | Opacity token type |
| `ColorScale` | Color scale type (25-950) |
| `ColorName` | Union of color scale names |
| `PaletteName` | Union of palette names |
| `ExtendTheme<T>` | Helper to extend theme |
| `DeepPartial<T>` | For partial overrides |
| `CustomTheme<TColors, ...>` | Generic type for fully custom themes |
| `CustomThemeBase<TColors>` | Base type for custom color themes |
| `CreateThemeOptions` | Options for `createTheme()` (`{ mode: 'merge' \| 'replace' }`) |

### Components & Hooks

| Export | Description |
|--------|-------------|
| `ThemeProvider` | Theme context provider |
| `useTheme<T>()` | Access current theme |

### Theme Creation

| Export | Description |
|--------|-------------|
| `createTheme(base, overrides, options?)` | Create theme by merging/replacing base with overrides |
| `createCustomTheme<TColors>(config)` | Create theme with fully custom color tokens |
| `mergeThemes(base, ...overrides)` | Merge multiple theme overrides |
| `createThemeVariant(overrides)` | Create a reusable theme variant factory |

### Styling

| Export | Description |
|--------|-------------|
| `createStyles<T>()` | Create themed styles |
| `createTypedStyles<T>()` | Create a pre-typed `createStyles` function for custom themes |
| `keyframes()` | CSS keyframe animations |
| `fontFace()` | @font-face rules |
| `cssVariables()` | CSS custom properties |

---

## License

MIT



