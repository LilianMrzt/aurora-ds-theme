# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2026-01-18

### 🚨 Breaking Changes

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

### Changed

- `createTheme` no longer requires generic - type is inferred from `ThemeRegistry`
- 19 color scales (removed `sky`)

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
