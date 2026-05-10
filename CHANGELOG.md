# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### ✨ New Features

#### Explicit module id for `createStyles` (recommended in production)

`createStyles` now accepts an optional second argument `{ id }` to opt-out of stack-trace based module identification. **Strongly recommended** for production / SSR setups where deterministic class names are required.

```ts
// Before (still works, fragile in some prod bundles):
export const styles = createStyles((theme) => ({ ... }))

// After (recommended for production):
export const styles = createStyles((theme) => ({ ... }), { id: 'button' })
```

When `id` is provided, the engine skips `Error().stack` parsing entirely (faster and engine-agnostic) and guarantees stable class names across builds and SSR ↔ CSR boundaries.

#### `cx(...args)` helper

A tiny dependency-free `clsx`-like helper for joining class names with conditional support:

```ts
import { cx } from '@aurora-ds/theme'

<button className={cx(styles.base, styles[size], isActive && styles.active)} />
```

#### `globalStyles({...})`

A new top-level API to inject global CSS rules (resets, base styles, body, `:root`, `@media`, etc.) using the same nested syntax as `createStyles`:

```ts
import { globalStyles } from '@aurora-ds/theme'

globalStyles({
  'html, body': { margin: 0, padding: 0 },
  'a': { color: 'inherit', ':hover': { textDecoration: 'underline' } },
  '@media (prefers-reduced-motion: reduce)': {
    '*': { animation: 'none', transition: 'none' },
  },
})
```

### 🚀 Improvements

- **`useInsertionEffect`** is now used (when available, React 18+) for theme CSS variable injection. This is the official React API for CSS-in-JS and avoids any FOUC during commit. Falls back to `useLayoutEffect` on older React.
- **Skip redundant `:root` rewrites**: when the user re-creates the `theme` object on each render without memoization, the `<style>` tag is no longer rewritten if the resulting CSS string is identical to the previous one. Saves a style recalc.
- **Stable cache key for object args**: `createStyles` dynamic-style functions now produce identical class names regardless of the key order of object arguments (`{ a, b }` vs `{ b, a }`). Prevents accidental cache misses and double-injection.
- **Dev-only warnings** are now emitted (via `console.warn`) when the engine fails to insert a CSS rule (invalid selector, unsupported syntax, etc.). Stripped from production bundles via dead-code elimination.

### 🔒 Compatibility

All changes are 100% additive and backward-compatible. No existing API was modified.

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
