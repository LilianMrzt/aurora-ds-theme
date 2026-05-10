# Aurora Theme

> A performant, type-safe and fully customizable **CSS-in-JS** theming library for React.

[![npm version](https://img.shields.io/npm/v/@aurora-ds/theme)](https://www.npmjs.com/package/@aurora-ds/theme)
[![bundle size](https://img.shields.io/badge/bundle-~6.74KB_gz-brightgreen)](https://bundlephobia.com/package/@aurora-ds/theme)
[![license](https://img.shields.io/npm/l/@aurora-ds/theme)](./LICENSE)

---

## Installation

```bash
npm install @aurora-ds/theme
# or
yarn add @aurora-ds/theme
# or
pnpm add @aurora-ds/theme
```

**Peer dependencies:** `react >= 18`, `react-dom >= 18`

---

## Quick Start

### 1 — Define your theme

```typescript
// src/theme/index.ts
import { createTheme } from '@aurora-ds/theme'

// Your theme type
type MyTheme = {
    colors: {
        primary: string
        background: string
        text: string
    }
    spacing: { sm: string; md: string; lg: string }
    radius:  { md: string }
    breakpoints: { md: string; lg: string }
}

// Register for global autocomplete (module augmentation)
declare module '@aurora-ds/theme' {
    interface ThemeRegistry {
        theme: MyTheme
    }
}

// Create one or many themes — type is inferred automatically
export const lightTheme = createTheme({
    colors: { primary: '#6366f1', background: '#ffffff', text: '#09090b' },
    spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
    radius:  { md: '0.375rem' },
    breakpoints: { md: '768px', lg: '1024px' },
})

export const darkTheme = createTheme({
    colors: { primary: '#818cf8', background: '#09090b', text: '#fafafa' },
    spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
    radius:  { md: '0.375rem' },
    breakpoints: { md: '768px', lg: '1024px' },
})
```

### 2 — Wrap your app

```tsx
// App.tsx
import { ThemeProvider } from '@aurora-ds/theme'
import { lightTheme } from './theme'

export function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <Router />
        </ThemeProvider>
    )
}
```

### 3 — Style your components

```typescript
// Card.styles.ts
import { createStyles } from '@aurora-ds/theme'

export const styles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.background, // ✅ Full autocomplete
        color: theme.colors.text,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        ':hover': { opacity: 0.95 },
        '@media (min-width: 768px)': { padding: theme.spacing.lg },
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 600,
    },
}), { id: 'card' })
```

```tsx
// Card.tsx
import { styles } from './Card.styles'

export function Card({ title, children }) {
    return (
        <div className={styles.root}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    )
}
```

---

## Core API

### `createTheme(values)`

Creates a typed theme. Type is automatically inferred from your `ThemeRegistry` declaration.

```typescript
import { createTheme } from '@aurora-ds/theme'

const myTheme = createTheme({
    colors: { primary: '#6366f1', background: '#fff', text: '#000' },
    spacing: { sm: '8px', md: '16px', lg: '24px' },
})
```

---

### `ThemeProvider`

Injects theme tokens as CSS variables on `:root`. Theme changes update CSS variables instantly — **no component re-renders**.

```tsx
import { ThemeProvider } from '@aurora-ds/theme'

<ThemeProvider theme={currentTheme}>
    <App />
</ThemeProvider>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `Theme` | required | The active theme |
| `disableTransitionsOnChange` | `boolean` | `true` | Disables CSS transitions during theme switch to prevent flashes |
| `transitionDuration` | `number` | — | Forces a smooth color transition (ms) instead of disabling transitions |

```tsx
// Smooth 300ms transition on theme switch
<ThemeProvider theme={currentTheme} transitionDuration={300}>
    <App />
</ThemeProvider>
```

#### Switching themes

```tsx
function App() {
    const [theme, setTheme] = useState(lightTheme)
    return (
        <ThemeProvider theme={theme} transitionDuration={250}>
            <button onClick={() => setTheme(t => t === lightTheme ? darkTheme : lightTheme)}>
                Toggle dark mode
            </button>
        </ThemeProvider>
    )
}
```

Child components **never re-render** — only the CSS variables on `:root` change.

---

### `useTheme()`

Hook to access the current theme inside a component.

```tsx
import { useTheme } from '@aurora-ds/theme'

function Avatar({ name }: { name: string }) {
    const theme = useTheme()
    return (
        <div style={{ backgroundColor: theme.colors.primary, color: '#fff' }}>
            {name[0]}
        </div>
    )
}
```

> **Note:** throws if called outside a `ThemeProvider`.

---

### `createStyles`

The main CSS-in-JS API. Returns a map of stable class name strings.

```typescript
import { createStyles } from '@aurora-ds/theme'

const styles = createStyles((theme) => ({
    button: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,
        border: 'none',
        cursor: 'pointer',

        // Pseudo-classes
        ':hover': { opacity: 0.9 },
        ':focus-visible': { outline: `2px solid ${theme.colors.primary}` },
        ':disabled': { opacity: 0.5, cursor: 'not-allowed' },

        // Attribute / child selectors
        '&[data-loading="true"]': { color: 'transparent' },
        '& > svg': { marginRight: theme.spacing.sm },

        // At-rules
        '@media (max-width: 480px)': { width: '100%' },
        '@container sidebar (min-width: 300px)': { flexDirection: 'row' },
        '@supports (display: grid)': { display: 'grid' },
    },
}))

<button className={styles.button}>Click</button>
```

#### Supported selector syntax

| Syntax | Example | Generated |
|---|---|---|
| Pseudo-class | `':hover'` | `.cls:hover { … }` |
| Pseudo-element | `':before'` | `.cls:before { … }` |
| `&` child | `'& > span'` | `.cls > span { … }` |
| `&` attribute | `'&[disabled]'` | `.cls[disabled] { … }` |
| Media query | `'@media (…)'` | `@media (…) { .cls { … } }` |
| Container query | `'@container (…)'` | `@container (…) { .cls { … } }` |
| Supports | `'@supports (…)'` | `@supports (…) { .cls { … } }` |

#### Dynamic styles

A style key can be a **function** — Aurora caches the result per unique argument combination.

```typescript
const styles = createStyles(() => ({
    item: (active: boolean) => ({
        backgroundColor: active ? '#6366f1' : 'transparent',
        color: active ? 'white' : 'inherit',
    }),
}))

// Cached after the first call for each unique value
<li className={styles.item(isSelected)}>…</li>
```

#### Explicit module id (recommended in production)

```typescript
// Guarantees identical class names across SSR/CSR + between builds
export const styles = createStyles((theme) => ({
    root: { padding: theme.spacing.md },
}), { id: 'card' })
// → always generates "card-root"
```

---

### `createVariants`

Declare all your component variants in a single config and get a fully-typed className builder. Inspired by CVA / Stitches, built on top of `createStyles`.

```typescript
// Button.styles.ts
import { createVariants } from '@aurora-ds/theme'

export const button = createVariants((theme) => ({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        borderRadius: theme.radius.md,
        transition: 'all 0.2s ease',
        ':disabled': { opacity: 0.5, cursor: 'not-allowed' },
        ':hover:not(:disabled)': { transform: 'translateY(-1px)' },
    },
    variants: {
        size: {
            sm: { padding: `${theme.spacing.xs} ${theme.spacing.sm}`, fontSize: 12 },
            md: { padding: `${theme.spacing.sm} ${theme.spacing.md}`, fontSize: 14 },
            lg: { padding: `${theme.spacing.md} ${theme.spacing.lg}`, fontSize: 16 },
        },
        variant: {
            primary:   { backgroundColor: theme.colors.primary, color: 'white' },
            secondary: { backgroundColor: theme.colors.secondary, color: theme.colors.text },
            ghost:     { backgroundColor: 'transparent', color: theme.colors.text },
            danger:    { backgroundColor: theme.colors.error, color: 'white' },
        },
        fullWidth: {
            true: { width: '100%' },
        },
    },
    defaultVariants: { size: 'md', variant: 'primary' },
    // Applied only when ALL conditions match simultaneously
    compoundVariants: [
        { size: 'sm', variant: 'ghost', styles: { fontWeight: 400 } },
    ],
}), { id: 'button' })
```

```tsx
// Button.tsx
import { button } from './Button.styles'

function Button({ size, variant, fullWidth, className, children, ...props }) {
    return (
        <button
            className={button({ size, variant, fullWidth: String(fullWidth) as 'true' }, className)}
            {...props}
        >
            {children}
        </button>
    )
}

// All props are optional thanks to defaultVariants
<Button>Primary md</Button>
<Button size="lg" variant="ghost">Large ghost</Button>
<Button variant="danger" fullWidth>Delete account</Button>
```

---

### Responsive tokens

Replace any CSS property value with an object keyed by breakpoint names:

```typescript
// theme.ts — declare breakpoints
const myTheme = createTheme({
    // …
    breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
})
```

```typescript
// Card.styles.ts
const styles = createStyles(() => ({
    card: {
        padding: { base: 8, md: 16, lg: 24 },   // → 8px then 16px @md then 24px @lg
        fontSize: { base: 14, lg: 18 },
        gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },

        // Mix freely with non-responsive values
        display: 'grid',
        gap: 16,
    },
}))
```

- **`base`** — unmediated rule (no media query, all screen sizes)
- Other keys must match a `theme.breakpoints` key
- Rules are emitted **mobile-first** in the order declared in `theme.breakpoints`
- `ThemeProvider` registers breakpoints automatically — no extra setup

---

### `cx`

Conditionally joins class names. A zero-dependency replacement for `clsx` / `classnames`.

```tsx
import { cx } from '@aurora-ds/theme'

// Simple join
cx('foo', 'bar')                    // → "foo bar"

// Conditional — falsy values are ignored
cx(styles.base, isActive && styles.active)            // → "base" or "base active"
cx(styles.root, isLarge && styles.lg, props.className)

// With createVariants
<button className={cx(button({ size: 'lg' }), props.className)} />
```

---

### `globalStyles`

Injects global CSS rules. Supports the same nested syntax as `createStyles`.

```typescript
import { globalStyles } from '@aurora-ds/theme'

// Call once at app bootstrap (e.g. in main.tsx)
globalStyles({
    'html, body': {
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    '*': { boxSizing: 'border-box' },
    'a': {
        color: 'inherit',
        ':hover': { textDecoration: 'underline' },
    },
    '@media (prefers-reduced-motion: reduce)': {
        '*': { animation: 'none', transition: 'none' },
    },
})
```

---

### `keyframes`

Creates a `@keyframes` rule and returns the animation name. Deduplicates identical definitions.

```typescript
import { createStyles, keyframes } from '@aurora-ds/theme'

const spin = keyframes({
    from: { transform: 'rotate(0deg)' },
    to:   { transform: 'rotate(360deg)' },
})

const fadeIn = keyframes({
    '0%':   { opacity: 0, transform: 'translateY(8px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
})

const styles = createStyles(() => ({
    spinner: {
        animation: `${spin} 0.6s linear infinite`,
    },
    card: {
        animation: `${fadeIn} 0.3s ease`,
    },
}))
```

---

### `fontFace`

Injects a `@font-face` rule and returns the font family name. Safe to call multiple times.

```typescript
import { fontFace } from '@aurora-ds/theme'

const inter = fontFace({
    fontFamily: 'Inter',
    src: 'url(/fonts/inter-variable.woff2) format("woff2")',
    fontWeight: '100 900',  // variable font range
    fontDisplay: 'swap',
})

const styles = createStyles(() => ({
    body: { fontFamily: inter },  // → 'Inter'
}))
```

| Option | Type | Default |
|---|---|---|
| `fontFamily` | `string` | required |
| `src` | `string` | required |
| `fontStyle` | `'normal'` \| `'italic'` \| `'oblique'` | `'normal'` |
| `fontWeight` | `number` \| `string` | `400` |
| `fontDisplay` | `'auto'` \| `'block'` \| `'swap'` \| `'fallback'` \| `'optional'` | `'swap'` |
| `unicodeRange` | `string` | — |

---

### CSS Variables helpers

#### `cssVar(path, fallback?)`

Returns a CSS variable reference string for any theme path.

```typescript
import { cssVar } from '@aurora-ds/theme'

cssVar('colors.primary')        // → "var(--theme-colors-primary)"
cssVar('spacing.md', '1rem')    // → "var(--theme-spacing-md, 1rem)"
```

#### `cssVariables(variables, options?)`

Creates CSS variable references from an object and optionally injects them on `:root`.

```typescript
import { cssVariables } from '@aurora-ds/theme'

const vars = cssVariables(
    { primaryRgb: '99 102 241', shadowStrength: 0.1 },
    { prefix: 'app', inject: true }
)

vars.primaryRgb      // → "var(--app-primary-rgb)"
vars.shadowStrength  // → "var(--app-shadow-strength)"
```

#### `injectCssVariables(theme, prefix?)`

Manually injects all theme tokens as CSS variables. Already called automatically by `ThemeProvider` — useful for non-React contexts or testing.

```typescript
import { injectCssVariables } from '@aurora-ds/theme'

injectCssVariables(myTheme, 'theme')
// → injects --theme-colors-primary, --theme-spacing-md, etc. on :root
```

---

### SSR utilities

Aurora collects all CSS rules server-side in a buffer. Flush them into your HTML before hydration.

```typescript
import {
    getSSRStyleTag,
    clearSSRRules,
} from '@aurora-ds/theme'

// In your server render:
const html = renderToString(<App />)
const styleTag = getSSRStyleTag()
// → '<style id="aurora-styles">…all collected rules…</style>'

clearSSRRules() // Reset buffer between requests

res.send(`<!DOCTYPE html>
<html>
  <head>${styleTag}</head>
  <body><div id="root">${html}</div></body>
</html>`)
```

| Function | Description |
|---|---|
| `getSSRStyles()` | Returns all collected CSS as a string |
| `getSSRStyleTag()` | Returns a ready-to-inject `<style>` tag |
| `getSSRRulesArray()` | Returns rules as an array of strings |
| `clearSSRRules()` | Resets the SSR buffer (call between requests) |

---

## Best practices

### Name your files `*.styles.ts`

Aurora uses this convention to generate stable development IDs and assign a dedicated `<style>` tag per module — makes HMR clean and DevTools readable.

### Always add an `id` in production

```typescript
// ✅ Guarantees stable class names across builds and SSR/CSR boundaries
export const styles = createStyles((theme) => ({ … }), { id: 'card' })
export const button = createVariants((theme) => ({ … }), { id: 'button' })
```

### Call `createStyles` at module top-level

```typescript
// ✅ Called once when the module loads
const styles = createStyles(...)

function MyComponent() {
    return <div className={styles.root} />
}

// ❌ Called on every render — don't do this
function MyComponent() {
    const styles = createStyles(...)
    return <div className={styles.root} />
}
```

---

## Complete example

```typescript
// main.tsx
import { globalStyles } from '@aurora-ds/theme'

globalStyles({
    'html, body': { margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' },
    '*': { boxSizing: 'border-box' },
})
```

```typescript
// Button.styles.ts
import { createVariants, keyframes } from '@aurora-ds/theme'

const spin = keyframes({ from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } })

export const button = createVariants((theme) => ({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        borderRadius: theme.radius.md,
        // Responsive padding
        padding: { base: `${theme.spacing.xs} ${theme.spacing.sm}`, md: `${theme.spacing.sm} ${theme.spacing.md}` },
        ':disabled': { opacity: 0.5, cursor: 'not-allowed' },
        ':hover:not(:disabled)': { transform: 'translateY(-1px)' },
    },
    variants: {
        variant: {
            primary: { backgroundColor: theme.colors.primary, color: 'white' },
            ghost:   { backgroundColor: 'transparent', color: theme.colors.text },
        },
        loading: { true: { color: 'transparent', position: 'relative' } },
    },
    defaultVariants: { variant: 'primary' },
}), { id: 'button' })

export const spinnerClass = `border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:${spin} 0.6s linear infinite;width:1em;height:1em;position:absolute`
```

```tsx
// Button.tsx
import { cx } from '@aurora-ds/theme'
import { button } from './Button.styles'

function Button({ variant, loading, disabled, className, children, ...props }) {
    return (
        <button
            className={cx(
                button({ variant, loading: loading ? 'true' : undefined }),
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {children}
        </button>
    )
}
```

---

## API Reference

| Export | Type | Description |
|---|---|---|
| `createTheme` | `(values) => Theme` | Creates a typed theme |
| `ThemeProvider` | Component | Injects theme as CSS vars + React context |
| `useTheme` | Hook | Returns the current theme |
| `createStyles` | `(fn, opts?) => classes` | CSS-in-JS class factory |
| `createVariants` | `(config, opts?) => fn` | CVA-style variant builder |
| `cx` | `(...args) => string` | Conditional class name joiner |
| `globalStyles` | `(rules) => void` | Injects global CSS |
| `keyframes` | `(frames) => name` | Creates `@keyframes` rule |
| `fontFace` | `(options) => family` | Creates `@font-face` rule |
| `cssVar` | `(path, fallback?) => string` | Returns `var(--theme-…)` reference |
| `cssVariables` | `(vars, opts?) => refs` | Creates CSS variable references |
| `injectCssVariables` | `(theme, prefix?) => void` | Injects theme as CSS vars on `:root` |
| `getSSRStyles` | `() => string` | SSR: collected CSS string |
| `getSSRStyleTag` | `() => string` | SSR: ready `<style>` tag string |
| `getSSRRulesArray` | `() => string[]` | SSR: rules as array |
| `clearSSRRules` | `() => void` | SSR: reset buffer between requests |
| `colors` | object | Built-in color scales (19 palettes × 12 shades) |
| `ThemeRegistry` | interface | Module augmentation entry point |
| `StyleWithPseudos` | type | Style object with pseudo/at-rule support |
| `ResponsiveValue<T>` | type | `T \| { base?: T, [bp: string]: T }` |
| `FontFaceOptions` | type | Options for `fontFace()` |
| `VariantProps<V>` | type | Inferred variant props from `createVariants` |

---

## Color Scales

Aurora ships built-in color scales, each with **12 shades** (25, 50, 100–900, 950).

```typescript
import { colors } from '@aurora-ds/theme'

colors.indigo[500]  // '#6366f1'
colors.emerald[400] // '#34d399'
colors.gray[900]    // '#18181b'
colors.white        // '#ffffff'
colors.black        // '#000000'
```

Available scales: `gray`, `slate`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **gray** | ![](https://img.shields.io/badge/%20-fcfcfc?style=flat-square) | ![](https://img.shields.io/badge/%20-fafafa?style=flat-square) | ![](https://img.shields.io/badge/%20-f4f4f5?style=flat-square) | ![](https://img.shields.io/badge/%20-e4e4e7?style=flat-square) | ![](https://img.shields.io/badge/%20-d4d4d8?style=flat-square) | ![](https://img.shields.io/badge/%20-a1a1aa?style=flat-square) | ![](https://img.shields.io/badge/%20-71717a?style=flat-square) | ![](https://img.shields.io/badge/%20-52525b?style=flat-square) | ![](https://img.shields.io/badge/%20-3f3f46?style=flat-square) | ![](https://img.shields.io/badge/%20-27272a?style=flat-square) | ![](https://img.shields.io/badge/%20-18181b?style=flat-square) | ![](https://img.shields.io/badge/%20-09090b?style=flat-square) |
| **slate** | ![](https://img.shields.io/badge/%20-fcfcfd?style=flat-square) | ![](https://img.shields.io/badge/%20-f8fafc?style=flat-square) | ![](https://img.shields.io/badge/%20-f1f5f9?style=flat-square) | ![](https://img.shields.io/badge/%20-e2e8f0?style=flat-square) | ![](https://img.shields.io/badge/%20-cbd5e1?style=flat-square) | ![](https://img.shields.io/badge/%20-94a3b8?style=flat-square) | ![](https://img.shields.io/badge/%20-64748b?style=flat-square) | ![](https://img.shields.io/badge/%20-475569?style=flat-square) | ![](https://img.shields.io/badge/%20-334155?style=flat-square) | ![](https://img.shields.io/badge/%20-1e293b?style=flat-square) | ![](https://img.shields.io/badge/%20-0f172a?style=flat-square) | ![](https://img.shields.io/badge/%20-020617?style=flat-square) |
| **red** | ![](https://img.shields.io/badge/%20-fffbfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fef2f2?style=flat-square) | ![](https://img.shields.io/badge/%20-fee2e2?style=flat-square) | ![](https://img.shields.io/badge/%20-fecaca?style=flat-square) | ![](https://img.shields.io/badge/%20-fca5a5?style=flat-square) | ![](https://img.shields.io/badge/%20-f87171?style=flat-square) | ![](https://img.shields.io/badge/%20-ef4444?style=flat-square) | ![](https://img.shields.io/badge/%20-dc2626?style=flat-square) | ![](https://img.shields.io/badge/%20-b91c1c?style=flat-square) | ![](https://img.shields.io/badge/%20-991b1b?style=flat-square) | ![](https://img.shields.io/badge/%20-7f1d1d?style=flat-square) | ![](https://img.shields.io/badge/%20-450a0a?style=flat-square) |
| **orange** | ![](https://img.shields.io/badge/%20-fffcfa?style=flat-square) | ![](https://img.shields.io/badge/%20-fff7ed?style=flat-square) | ![](https://img.shields.io/badge/%20-ffedd5?style=flat-square) | ![](https://img.shields.io/badge/%20-fed7aa?style=flat-square) | ![](https://img.shields.io/badge/%20-fdba74?style=flat-square) | ![](https://img.shields.io/badge/%20-fb923c?style=flat-square) | ![](https://img.shields.io/badge/%20-f97316?style=flat-square) | ![](https://img.shields.io/badge/%20-ea580c?style=flat-square) | ![](https://img.shields.io/badge/%20-c2410c?style=flat-square) | ![](https://img.shields.io/badge/%20-9a3412?style=flat-square) | ![](https://img.shields.io/badge/%20-7c2d12?style=flat-square) | ![](https://img.shields.io/badge/%20-431407?style=flat-square) |
| **amber** | ![](https://img.shields.io/badge/%20-fffdfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fffbeb?style=flat-square) | ![](https://img.shields.io/badge/%20-fef3c7?style=flat-square) | ![](https://img.shields.io/badge/%20-fde68a?style=flat-square) | ![](https://img.shields.io/badge/%20-fcd34d?style=flat-square) | ![](https://img.shields.io/badge/%20-fbbf24?style=flat-square) | ![](https://img.shields.io/badge/%20-f59e0b?style=flat-square) | ![](https://img.shields.io/badge/%20-d97706?style=flat-square) | ![](https://img.shields.io/badge/%20-b45309?style=flat-square) | ![](https://img.shields.io/badge/%20-92400e?style=flat-square) | ![](https://img.shields.io/badge/%20-78350f?style=flat-square) | ![](https://img.shields.io/badge/%20-451a03?style=flat-square) |
| **yellow** | ![](https://img.shields.io/badge/%20-fefef9?style=flat-square) | ![](https://img.shields.io/badge/%20-fefce8?style=flat-square) | ![](https://img.shields.io/badge/%20-fef9c3?style=flat-square) | ![](https://img.shields.io/badge/%20-fef08a?style=flat-square) | ![](https://img.shields.io/badge/%20-fde047?style=flat-square) | ![](https://img.shields.io/badge/%20-facc15?style=flat-square) | ![](https://img.shields.io/badge/%20-eab308?style=flat-square) | ![](https://img.shields.io/badge/%20-ca8a04?style=flat-square) | ![](https://img.shields.io/badge/%20-a16207?style=flat-square) | ![](https://img.shields.io/badge/%20-854d0e?style=flat-square) | ![](https://img.shields.io/badge/%20-713f12?style=flat-square) | ![](https://img.shields.io/badge/%20-422006?style=flat-square) |
| **lime** | ![](https://img.shields.io/badge/%20-fbfef8?style=flat-square) | ![](https://img.shields.io/badge/%20-f7fee7?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfccb?style=flat-square) | ![](https://img.shields.io/badge/%20-d9f99d?style=flat-square) | ![](https://img.shields.io/badge/%20-bef264?style=flat-square) | ![](https://img.shields.io/badge/%20-a3e635?style=flat-square) | ![](https://img.shields.io/badge/%20-84cc16?style=flat-square) | ![](https://img.shields.io/badge/%20-65a30d?style=flat-square) | ![](https://img.shields.io/badge/%20-4d7c0f?style=flat-square) | ![](https://img.shields.io/badge/%20-3f6212?style=flat-square) | ![](https://img.shields.io/badge/%20-365314?style=flat-square) | ![](https://img.shields.io/badge/%20-1a2e05?style=flat-square) |
| **green** | ![](https://img.shields.io/badge/%20-f6fef9?style=flat-square) | ![](https://img.shields.io/badge/%20-f0fdf4?style=flat-square) | ![](https://img.shields.io/badge/%20-dcfce7?style=flat-square) | ![](https://img.shields.io/badge/%20-bbf7d0?style=flat-square) | ![](https://img.shields.io/badge/%20-86efac?style=flat-square) | ![](https://img.shields.io/badge/%20-4ade80?style=flat-square) | ![](https://img.shields.io/badge/%20-22c55e?style=flat-square) | ![](https://img.shields.io/badge/%20-16a34a?style=flat-square) | ![](https://img.shields.io/badge/%20-15803d?style=flat-square) | ![](https://img.shields.io/badge/%20-166534?style=flat-square) | ![](https://img.shields.io/badge/%20-14532d?style=flat-square) | ![](https://img.shields.io/badge/%20-052e16?style=flat-square) |
| **emerald** | ![](https://img.shields.io/badge/%20-f5fefc?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfdf5?style=flat-square) | ![](https://img.shields.io/badge/%20-d1fae5?style=flat-square) | ![](https://img.shields.io/badge/%20-a7f3d0?style=flat-square) | ![](https://img.shields.io/badge/%20-6ee7b7?style=flat-square) | ![](https://img.shields.io/badge/%20-34d399?style=flat-square) | ![](https://img.shields.io/badge/%20-10b981?style=flat-square) | ![](https://img.shields.io/badge/%20-059669?style=flat-square) | ![](https://img.shields.io/badge/%20-047857?style=flat-square) | ![](https://img.shields.io/badge/%20-065f46?style=flat-square) | ![](https://img.shields.io/badge/%20-064e3b?style=flat-square) | ![](https://img.shields.io/badge/%20-022c22?style=flat-square) |
| **teal** | ![](https://img.shields.io/badge/%20-f4fefe?style=flat-square) | ![](https://img.shields.io/badge/%20-f0fdfa?style=flat-square) | ![](https://img.shields.io/badge/%20-ccfbf1?style=flat-square) | ![](https://img.shields.io/badge/%20-99f6e4?style=flat-square) | ![](https://img.shields.io/badge/%20-5eead4?style=flat-square) | ![](https://img.shields.io/badge/%20-2dd4bf?style=flat-square) | ![](https://img.shields.io/badge/%20-14b8a6?style=flat-square) | ![](https://img.shields.io/badge/%20-0d9488?style=flat-square) | ![](https://img.shields.io/badge/%20-0f766e?style=flat-square) | ![](https://img.shields.io/badge/%20-115e59?style=flat-square) | ![](https://img.shields.io/badge/%20-134e4a?style=flat-square) | ![](https://img.shields.io/badge/%20-042f2e?style=flat-square) |
| **cyan** | ![](https://img.shields.io/badge/%20-f3fefe?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfeff?style=flat-square) | ![](https://img.shields.io/badge/%20-cffafe?style=flat-square) | ![](https://img.shields.io/badge/%20-a5f3fc?style=flat-square) | ![](https://img.shields.io/badge/%20-67e8f9?style=flat-square) | ![](https://img.shields.io/badge/%20-22d3ee?style=flat-square) | ![](https://img.shields.io/badge/%20-06b6d4?style=flat-square) | ![](https://img.shields.io/badge/%20-0891b2?style=flat-square) | ![](https://img.shields.io/badge/%20-0e7490?style=flat-square) | ![](https://img.shields.io/badge/%20-155e75?style=flat-square) | ![](https://img.shields.io/badge/%20-164e63?style=flat-square) | ![](https://img.shields.io/badge/%20-083344?style=flat-square) |
| **blue** | ![](https://img.shields.io/badge/%20-f5f8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-eff6ff?style=flat-square) | ![](https://img.shields.io/badge/%20-dbeafe?style=flat-square) | ![](https://img.shields.io/badge/%20-bfdbfe?style=flat-square) | ![](https://img.shields.io/badge/%20-93c5fd?style=flat-square) | ![](https://img.shields.io/badge/%20-60a5fa?style=flat-square) | ![](https://img.shields.io/badge/%20-3b82f6?style=flat-square) | ![](https://img.shields.io/badge/%20-2563eb?style=flat-square) | ![](https://img.shields.io/badge/%20-1d4ed8?style=flat-square) | ![](https://img.shields.io/badge/%20-1e40af?style=flat-square) | ![](https://img.shields.io/badge/%20-1e3a8a?style=flat-square) | ![](https://img.shields.io/badge/%20-172554?style=flat-square) |
| **indigo** | ![](https://img.shields.io/badge/%20-f5f7ff?style=flat-square) | ![](https://img.shields.io/badge/%20-eef2ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e0e7ff?style=flat-square) | ![](https://img.shields.io/badge/%20-c7d2fe?style=flat-square) | ![](https://img.shields.io/badge/%20-a5b4fc?style=flat-square) | ![](https://img.shields.io/badge/%20-818cf8?style=flat-square) | ![](https://img.shields.io/badge/%20-6366f1?style=flat-square) | ![](https://img.shields.io/badge/%20-4f46e5?style=flat-square) | ![](https://img.shields.io/badge/%20-4338ca?style=flat-square) | ![](https://img.shields.io/badge/%20-3730a3?style=flat-square) | ![](https://img.shields.io/badge/%20-312e81?style=flat-square) | ![](https://img.shields.io/badge/%20-1e1b4b?style=flat-square) |
| **violet** | ![](https://img.shields.io/badge/%20-f8f5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f5f3ff?style=flat-square) | ![](https://img.shields.io/badge/%20-ede9fe?style=flat-square) | ![](https://img.shields.io/badge/%20-ddd6fe?style=flat-square) | ![](https://img.shields.io/badge/%20-c4b5fd?style=flat-square) | ![](https://img.shields.io/badge/%20-a78bfa?style=flat-square) | ![](https://img.shields.io/badge/%20-8b5cf6?style=flat-square) | ![](https://img.shields.io/badge/%20-7c3aed?style=flat-square) | ![](https://img.shields.io/badge/%20-6d28d9?style=flat-square) | ![](https://img.shields.io/badge/%20-5b21b6?style=flat-square) | ![](https://img.shields.io/badge/%20-4c1d95?style=flat-square) | ![](https://img.shields.io/badge/%20-2e1065?style=flat-square) |
| **purple** | ![](https://img.shields.io/badge/%20-faf5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-faf5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f3e8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e9d5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-d8b4fe?style=flat-square) | ![](https://img.shields.io/badge/%20-c084fc?style=flat-square) | ![](https://img.shields.io/badge/%20-a855f7?style=flat-square) | ![](https://img.shields.io/badge/%20-9333ea?style=flat-square) | ![](https://img.shields.io/badge/%20-7e22ce?style=flat-square) | ![](https://img.shields.io/badge/%20-6b21a8?style=flat-square) | ![](https://img.shields.io/badge/%20-581c87?style=flat-square) | ![](https://img.shields.io/badge/%20-3b0764?style=flat-square) |
| **fuchsia** | ![](https://img.shields.io/badge/%20-fef5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-fdf4ff?style=flat-square) | ![](https://img.shields.io/badge/%20-fae8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f5d0fe?style=flat-square) | ![](https://img.shields.io/badge/%20-f0abfc?style=flat-square) | ![](https://img.shields.io/badge/%20-e879f9?style=flat-square) | ![](https://img.shields.io/badge/%20-d946ef?style=flat-square) | ![](https://img.shields.io/badge/%20-c026d3?style=flat-square) | ![](https://img.shields.io/badge/%20-a21caf?style=flat-square) | ![](https://img.shields.io/badge/%20-86198f?style=flat-square) | ![](https://img.shields.io/badge/%20-701a75?style=flat-square) | ![](https://img.shields.io/badge/%20-4a044e?style=flat-square) |
| **pink** | ![](https://img.shields.io/badge/%20-fef5f9?style=flat-square) | ![](https://img.shields.io/badge/%20-fdf2f8?style=flat-square) | ![](https://img.shields.io/badge/%20-fce7f3?style=flat-square) | ![](https://img.shields.io/badge/%20-fbcfe8?style=flat-square) | ![](https://img.shields.io/badge/%20-f9a8d4?style=flat-square) | ![](https://img.shields.io/badge/%20-f472b6?style=flat-square) | ![](https://img.shields.io/badge/%20-ec4899?style=flat-square) | ![](https://img.shields.io/badge/%20-db2777?style=flat-square) | ![](https://img.shields.io/badge/%20-be185d?style=flat-square) | ![](https://img.shields.io/badge/%20-9d174d?style=flat-square) | ![](https://img.shields.io/badge/%20-831843?style=flat-square) | ![](https://img.shields.io/badge/%20-500724?style=flat-square) |
| **rose** | ![](https://img.shields.io/badge/%20-fff5f6?style=flat-square) | ![](https://img.shields.io/badge/%20-fff1f2?style=flat-square) | ![](https://img.shields.io/badge/%20-ffe4e6?style=flat-square) | ![](https://img.shields.io/badge/%20-fecdd3?style=flat-square) | ![](https://img.shields.io/badge/%20-fda4af?style=flat-square) | ![](https://img.shields.io/badge/%20-fb7185?style=flat-square) | ![](https://img.shields.io/badge/%20-f43f5e?style=flat-square) | ![](https://img.shields.io/badge/%20-e11d48?style=flat-square) | ![](https://img.shields.io/badge/%20-be123c?style=flat-square) | ![](https://img.shields.io/badge/%20-9f1239?style=flat-square) | ![](https://img.shields.io/badge/%20-881337?style=flat-square) | ![](https://img.shields.io/badge/%20-4c0519?style=flat-square) |

---

## TypeScript & autocomplete

Aurora uses **module augmentation** — declare your theme type once, get autocomplete everywhere.

```typescript
// src/theme.ts
declare module '@aurora-ds/theme' {
    interface ThemeRegistry {
        theme: typeof myTheme   // inferred from createTheme()
    }
}
```

After this:
- `createStyles((theme) => ...)` — `theme` is fully typed ✅
- `useTheme()` — returns your exact theme type ✅
- `createTheme(...)` — validates structure at compile time ✅

---

## License

MIT © [Lilian MARZET](https://github.com/LilianMrzt)
