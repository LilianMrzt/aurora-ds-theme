# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2026-05-12

### 🚨 Breaking Changes

#### Removed `colors` export and all built-in color palettes

Aurora DS Theme is a fully customizable theming library — shipping opinionated color scales alongside that goes against its core philosophy and bloats the bundle unnecessarily.

The following have been **permanently removed**:

- ❌ `colors` — the object grouping 19 color scales (gray, slate, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, blue, indigo, violet, purple, fuchsia, pink, rose, white, black, transparent, current)
- ❌ `ColorName` — union type of scale names
- ❌ `ColorScale` — type for the 12 shades (25 → 950)
- ❌ `ColorShade` — type for the keys of `ColorScale`

#### Migration

If you used `colors` to initialize your theme, copy the hex values you need directly into your own theme definition:

```ts
// Before (≤ 3.x)
import { colors, createTheme } from '@aurora-ds/theme'

export const lightTheme = createTheme({
    colors: {
        primary: colors.blue[500],
        background: colors.gray[50],
    },
})

// After (4.x) — hardcoded values, or from your own source of truth
export const lightTheme = createTheme({
    colors: {
        primary: '#3b82f6',
        background: '#f9fafb',
    },
})
```

If you used `ColorScale`, `ColorName` or `ColorShade` in your own types, define them locally or remove them if no longer needed.

### 📦 Bundle

Removing the 19 color scales (× 12 shades each) significantly reduces bundle size:

| Entry | v3.5.0 (gzip) | v4.0.0 (gzip) | Savings |
|---|---|---|---|
| `dist/index.js` (ESM) | 6.74 KB | **5.11 KB** | −1.63 KB (−24%) |
| `dist/index.cjs` (CJS) | 6.80 KB | **5.18 KB** | −1.62 KB (−24%) |

Size-limit: 10 KB — remaining headroom: **~4.8 KB**.

## [3.5.0] - 2026-05-10

### ✨ New Features

#### `createVariants` — CVA-style variants without a wrapper component

A new top-level API for declaring variant-aware components in a single typed config object. Built on top of `createStyles`, so it shares the same theming, HMR, SSR and per-module stylesheet behavior.

```ts
import { createVariants } from '@aurora-ds/theme'

export const button = createVariants((theme) => ({
  base: { display: 'inline-flex', borderRadius: theme.radius.md, cursor: 'pointer' },
  variants: {
    size: {
      sm: { padding: theme.spacing.xs, fontSize: 12 },
      md: { padding: theme.spacing.sm, fontSize: 14 },
      lg: { padding: theme.spacing.md, fontSize: 16 },
    },
    variant: {
      primary: { backgroundColor: theme.colors.primary, color: 'white' },
      ghost:   { backgroundColor: 'transparent', color: theme.colors.text },
    },
  },
  defaultVariants: { size: 'md', variant: 'primary' },
  compoundVariants: [
    { size: 'sm', variant: 'ghost', styles: { fontWeight: 600 } },
  ],
}), { id: 'button' })

// Usage
<button className={button({ size: 'lg' })} />
<button className={button({ variant: 'ghost' }, props.className)} />
```

Exported types: `CreateVariantsConfig`, `CompoundVariant`, `VariantProps<V>`, `VariantFn`.

#### Responsive tokens

CSS values can now be declared as objects whose keys match `theme.breakpoints`. Aurora detects them automatically and emits `@media (min-width: …)` rules in mobile-first order. The `base` key produces the unmediated rule.

```ts
const styles = createStyles(() => ({
  card: {
    padding: { base: 8, md: 16, lg: 24 },
    fontSize: { base: 14, lg: 18 },
    gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' },
  },
}))
```

`ThemeProvider` registers `theme.breakpoints` automatically — no extra setup required.
`StyleWithPseudos` was widened to accept `ResponsiveValue<T>` for any CSS property (autocomplete works out of the box).

#### Explicit module id for `createStyles` and `createVariants` — ⚠️ recommended in production

Both `createStyles` and `createVariants` now accept an optional `{ id }` second argument to opt-out of stack-trace-based module identification.

```ts
// Guarantees identical class names across builds and SSR ↔ CSR boundaries:
export const styles = createStyles((theme) => ({ ... }), { id: 'card' })
export const button = createVariants((theme) => ({ ... }), { id: 'button' })
```

When `id` is provided the engine skips `Error().stack` parsing entirely (faster, engine-agnostic, immune to minification).

#### `cx(...args)` helper

A tiny, dependency-free `clsx`-like helper for joining class names conditionally:

```ts
import { cx } from '@aurora-ds/theme'

<button className={cx(styles.base, styles[size], isActive && styles.active, props.className)} />
```

Falsy values (`false`, `null`, `undefined`, `''`) are silently ignored.

#### `globalStyles({...})`

Injects global CSS rules (resets, `body`, `:root`, `@media`, etc.) using the same nested syntax as `createStyles`:

```ts
import { globalStyles } from '@aurora-ds/theme'

globalStyles({
  'html, body': { margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' },
  '*': { boxSizing: 'border-box' },
  'a': { color: 'inherit', ':hover': { textDecoration: 'underline' } },
  '@media (prefers-reduced-motion: reduce)': {
    '*': { animation: 'none', transition: 'none' },
  },
})
```

### 🚀 Improvements

- **`useInsertionEffect`** is now used (React 18+) for theme CSS variable injection — the official React API for CSS-in-JS. Eliminates any FOUC during commit. Falls back to `useLayoutEffect` on older React.
- **Skip redundant `:root` rewrites** — when `theme` is re-created on each render without memoization, the style tag is no longer rewritten if the resulting CSS is identical to the previous value. Saves a style recalc.
- **Stable cache key for object args** — dynamic-style functions now produce identical class names regardless of the key insertion order of object arguments (`{ a, b }` vs `{ b, a }`). Prevents accidental cache misses and double-injection.
- **Dev-only warnings on `insertRule` failure** — `console.warn('[aurora-ds] …')` is now emitted in dev when the engine fails to insert a CSS rule (invalid selector, unsupported syntax, etc.). Stripped from production bundles via `process.env.NODE_ENV` dead-code elimination.

### 🔍 Dev-only diagnostics (new in 3.5.0)

Three new warnings are surfaced in development and completely removed from production builds:

1. **Suspicious style key** — keys containing `<`, `{`, `}` or `;` are flagged and skipped to prevent CSS injection mistakes.
2. **Object value on non-selector key** — when an object value is used on a key that isn't a selector (`@`, `&`, `:`) and doesn't match any registered breakpoint, a clear message hints at the likely typo (`"Did you forget the & prefix or the base key?"`).
3. **`createStyles` called inside a React render** — detected via stack trace heuristic (`renderWithHooks`, `react-dom`). Warning fires at most once per module id to avoid console spam.

### 🧪 Testing

- Added **193 tests total** (up from 139 in 3.3.0), including:
  - 13 tests for `createVariants` (variants, defaults, compounds, theme, extra class)
  - 6 tests for responsive tokens (base + @media, mobile-first, unknown breakpoints)
  - 7 tests for `cx` (conditionals, falsy filtering, edge cases)
  - 7 tests for `globalStyles` (selectors, pseudos, `&`, `@media`, px conversion)
  - 6 tests for dev warnings (suspicious keys, object-on-non-selector, valid selector no-warn)
  - **8 integration tests** for SSR in a real Node.js environment (no DOM): buffer collection, `<style>` tag generation, responsive tokens on the server, stable class names, multi-module, `clearSSRRules`

### 🔒 Compatibility

All changes are **100% additive and backward-compatible**. No existing API was modified or removed. Consumer code using `createStyles`, `ThemeProvider`, `useTheme`, `keyframes`, `fontFace`, `cssVar`, `injectCssVariables` or any SSR helpers requires **zero migration**.

### 📦 Bundle

| Entry | Size (gzip) |
|---|---|
| `dist/index.js` (ESM) | **6.74 KB** |
| `dist/index.cjs` (CJS) | **6.80 KB** |

Limit: 10 KB — remaining headroom: **~3.2 KB**.

## [3.2.10] - 2026-05-10

### 🐛 Bug Fixes

#### Production builds: styles silently overwritten

Fixed a critical regression where, in minified consumer bundles (Vite/webpack/etc.), multiple `createStyles()` calls compiled into the same chunk would all share a single module stylesheet and **clobber each other's rules**, resulting in completely missing styles for some components while others rendered correctly.

Root cause: `getModuleId()` derived the module name from `*.styles.[tj]s` matches in `new Error().stack`. In production builds those filenames are stripped during minification, so the fallback path returned the same name for every call inside a chunk. `getModuleStyleSheet()` then treated each subsequent call as an HMR re-injection and wiped the previously injected rules.

Fix: when the original module name cannot be recovered from the stack trace (i.e. in any minified/production bundle), `getModuleId()` now allocates a unique id per call via a monotonic counter, ensuring every `createStyles()` call owns its own isolated stylesheet.



## [3.2.0] - 2026-02-07

### 🎉 Dynamic Theme Switching

This version introduces a major improvement to theme switching. Components now update **instantly** when the theme changes, without requiring React re-renders.

### ✨ New Features

#### CSS Variables Architecture

`createStyles` now generates CSS classes using CSS variables (`var(--theme-xxx)`) instead of hardcoded values. This enables:

- **Instant theme switching** - No React re-renders needed
- **Better performance** - Styles are generated once, cached forever
- **Smaller bundle** - No Proxy overhead at runtime

```typescript
// Before (v3.1.x): Generated hardcoded values
.button-root { background-color: #3b82f6; }

// After (v3.2.0): Generated with CSS variables
.button-root { background-color: var(--theme-colors-primary); }
```

#### Automatic CSS Variables Injection

`ThemeProvider` now automatically injects all theme values as CSS variables into `:root`:

```css
:root {
  --theme-colors-primary: #3b82f6;
  --theme-colors-background: #ffffff;
  --theme-spacing-md: 16px;
  /* ... all theme values */
}
```

#### Transition Disable During Theme Change

New `disableTransitionsOnChange` prop (default: `true`) prevents jarring transition animations when switching themes:

```tsx
// Default: transitions disabled during theme switch
<ThemeProvider theme={currentTheme}>
  <App />
</ThemeProvider>

// Opt-out if you want transitions during theme change
<ThemeProvider theme={currentTheme} disableTransitionsOnChange={false}>
  <App />
</ThemeProvider>
```

#### Smooth Theme Transitions

New `transitionDuration` prop enables smooth color transitions when switching themes:

```tsx
// Smooth 300ms transition for all colors during theme switch
<ThemeProvider theme={currentTheme} transitionDuration={300}>
  <App />
</ThemeProvider>
```

When set, this prop:
- Forces smooth transitions on color-related properties (color, background-color, border-color, fill, stroke)
- Takes precedence over `disableTransitionsOnChange`
- Automatically removes the transition after the specified duration

### 🐛 Bug Fixes

- **Fixed**: Components not re-rendering when theme changes in real applications
- **Fixed**: Theme switching not working correctly with Redux or external state management

### ⚠️ Migration Notes

**No breaking changes** - The API remains exactly the same:

```typescript
// This still works exactly as before
const styles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md
  }
}))
```

The only difference is that now it works correctly when you switch themes! 🎉

---

## [3.1.0] - 2026-01-18

### 🎉 Official v3 Release

This is the **official and stable v3 release**. 

**⚠️ Important:** Version 3.0.0 was deprecated and should not be used. Please use v3.1.0 instead.

### 🚨 Breaking Changes (from v2.x)

Aurora v3 is a **complete API redesign** for maximum simplicity and type-safety.

#### 1. New API: Module Augmentation + createTheme

```typescript
// 1. Define your theme type
type MyTheme = {
    colors: { primary: string; secondary: string }
    spacing: { sm: string; md: string }
}

// 2. Register it via module augmentation (required for autocomplete)
declare module '@aurora-ds/theme' {
    interface ThemeRegistry {
        theme: MyTheme
    }
}

// 3. Create your theme - type is inferred automatically!
export const lightTheme = createTheme({
    colors: { primary: '#007bff', secondary: '#6c757d' },
    spacing: { sm: '8px', md: '16px' }
})
```

#### 2. Removed Exports

- ❌ `defaultTheme` - Define your own theme
- ❌ `defaultPalette` - Use `colors` object instead
- ❌ `createTypedStyles` - No longer needed, type is inferred
- ❌ `setThemeContextGetter`, `getTheme`, `insertRule`, `sanitizeCssValue` - Internal only
- ❌ All `Base*` types (`BaseColors`, `BaseSpacing`, etc.) - Define your own
- ❌ `sky` color scale - Removed (use `blue` or `cyan` instead)

### Added

- `ThemeRegistry` interface for module augmentation
- Full `@internal` JSDoc tags for internal functions

### Changed

- `createTheme` no longer requires generic - type is inferred from `ThemeRegistry`
- `useTheme` and `ThemeProvider` simplified without generics
- 19 color scales (removed `sky`)
- All documentation simplified and clarified

---

## [3.0.0] - 2026-01-XX

**⚠️ DEPRECATED - DO NOT USE**

This version was published in error and has been deprecated. Please use v2.x or v3.1.0 instead.

---

## [2.0.1] - 2026-01-04

### Fixed
- **Critical:** Fixed hover and pseudo-class styles not being applied.

## [2.0.0] - 2026-01-04

### Breaking Changes
- Removed pre-built palettes (`indigoPalette`, `bluePalette`, etc.)
- Color scales only via `colors` object
- Removed WCAG contrast utilities
- Simplified color tokens (83 → 33)

---

## [1.0.0] - 2025-12-15

### Added
- Initial release
- Theme system with `createTheme`
- `createStyles` for CSS-in-JS
- `ThemeProvider` and `useTheme`
- 20 color scales with 12 shades each
- SSR support
