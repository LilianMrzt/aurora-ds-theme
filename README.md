# Aurora Theme

A performant, type-safe, and **fully customizable** CSS-in-JS theme library for React.

## Installation

```bash
npm install @aurora-ds/theme
```

## Quick Start

```typescript
// theme.ts
import { createTheme } from '@aurora-ds/theme'

// 1. Define your theme type
type MyTheme = {
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

// 2. Module augmentation (required for autocomplete)
declare module '@aurora-ds/theme' {
    interface ThemeRegistry {
        theme: MyTheme
    }
}

// 3. Create your themes (type is inferred automatically!)
export const lightTheme = createTheme({
    colors: {
        primary: '#6366f1',
        secondary: '#64748b',
        background: '#ffffff',
        text: '#09090b',
    },
    spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
    },
})
```

```tsx
// App.tsx
import { ThemeProvider, createStyles } from '@aurora-ds/theme'
import { lightTheme } from './theme'

const styles = createStyles((theme) => ({
    container: {
        padding: theme.spacing.md,           // ✅ Autocomplete!
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.sm,
        ':hover': {
            opacity: 0.9
        }
    }
}))

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <div className={styles.container}>
                <button className={styles.button}>Click me</button>
            </div>
        </ThemeProvider>
    )
}
```

## API

### `createTheme(values)`

Creates a theme. Type is inferred from `ThemeRegistry`.

```typescript
const theme = createTheme({
    colors: { primary: '#007bff' },
    spacing: { sm: '8px' }
})
```

### `createStyles((theme) => styles)`

Creates CSS classes from a style object.

```typescript
const styles = createStyles((theme) => ({
    root: { color: theme.colors.primary }
}))
// styles.root → "root-abc123"
```

### `useTheme()`

Hook to access the current theme in components.

```typescript
function Component() {
    const theme = useTheme()
    return <div style={{ color: theme.colors.primary }} />
}
```

### `ThemeProvider`

Provides the theme to your app.

```tsx
<ThemeProvider theme={myTheme}>
    <App />
</ThemeProvider>
```

---

## Color Scales

Aurora provides **19 color scales** with **12 shades each** (25, 50, 100-900, 950).

```typescript
import { colors } from '@aurora-ds/theme'

colors.indigo[500]  // '#6366f1'
colors.emerald[400] // '#34d399'
colors.gray[900]    // '#18181b'
colors.white        // '#ffffff'
colors.black        // '#000000'
```

### Available Scales

**Neutrals:** `gray`, `slate`, `stone`

**Colors:** `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

### Use with your theme

```typescript
import { colors, createTheme } from '@aurora-ds/theme'

export const theme = createTheme({
    colors: {
        primary: colors.indigo[500],
        secondary: colors.slate[600],
        background: colors.white,
        text: colors.gray[900],
    },
    // ...
})
```

---

## Features

- ⚡ **Performant** - LRU caching, static style deduplication
- 🔒 **Type-safe** - Full TypeScript support with module augmentation
- 🎨 **Flexible** - Define your own theme structure
- 🖥️ **SSR Support** - Server-side rendering compatible
- 📦 **Lightweight** - No runtime dependencies besides React

## License

MIT
