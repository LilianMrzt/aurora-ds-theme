# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-12-12

### Added

- Initial release
- **Theme System**
  - `ThemeProvider` and `useTheme` hook for React context
  - `createTheme`, `mergeThemes`, `createThemeVariant` utilities
  - `defaultTheme` and `defaultDarkTheme` presets
  - Modular presets: `defaultColors`, `defaultSpacing`, `defaultRadius`, etc.
  - Full TypeScript support with `ExtendTheme<T>` helper

- **Color Scales**
  - 20 color scales with 12 shades each (25-950)
  - Neutrals: `gray`, `slate`, `stone`
  - Colors: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

- **Theme Palettes**
  - 8 ready-to-use palettes: `indigo`, `rose`, `emerald`, `violet`, `amber`, `cyan`, `slate`, `gray`
  - Light and dark variants for each palette

- **Styling Utilities**
  - `createStyles` with theme access and pseudo-class support
  - `keyframes` for CSS animations
  - `fontFace` for custom fonts
  - `cssVariables` for CSS custom properties

- **Performance**
  - LRU cache for dynamic styles
  - Static style deduplication
  - Memoized theme creation
  - Tree-shakeable exports

- **SSR Support**
  - `getSSRStyles`, `getSSRStyleTag`, `clearSSRRules`

