# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **New Color Palettes** - Added 2 new palettes for a total of 10
  - `blue` - Clean, trustworthy palette ideal for corporate and fintech apps
  - `teal` - Balanced, calming palette ideal for healthcare and wellness apps

### Changed

- **Improved Color Contrast** - Enhanced contrast ratios across all palettes
  - Primary colors use `600` shade for better contrast on light backgrounds
  - Warning colors use `amber[400]` with `amber[900]` text for improved readability
  - Secondary buttons now use ghost style (`slate[100]` background, `slate[700]` text)
  - Error and info colors use softer `400` shades
  - Switched neutral base from `gray` to `slate` for better visual hierarchy

- **Indigo Palette Restored** - `indigo` palette now uses true indigo colors instead of blue
  - Primary: `indigo[600]` (was `blue[600]`)
  - Accent: `cyan[500]` for complementary contrast

- **Simplified Token Scales** - Reduced token options for a cleaner, more usable API
  - `spacing`: Removed `px`, `2xl`, `3xl`, `4xl` → Now `none`, `xs`, `sm`, `md`, `lg`, `xl`
  - `fontSize`: Removed `2xl` to `6xl` → Now `xs`, `sm`, `md`, `lg`, `xl`
  - `radius`: Removed `2xl`, added `xs` → Now `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`
  - `shadows`: Removed `2xl`, `inner` → Now `none`, `xs`, `sm`, `md`, `lg`, `xl`
  - `fontWeight`: Removed `thin`, `extrabold` → Now `light`, `regular`, `medium`, `semibold`, `bold`
  - `lineHeight`: Removed `snug`, `loose` → Now `none`, `tight`, `normal`, `relaxed`
  - `zIndex`: Removed `sticky`, `fixed`, `popover`, `toast` → Now `behind`, `base`, `dropdown`, `overlay`, `modal`, `tooltip`
  - `transition`: Removed `slower` → Now `fast`, `normal`, `slow`

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
  - 10 ready-to-use palettes: `indigo`, `blue`, `rose`, `emerald`, `teal`, `violet`, `amber`, `cyan`, `slate`, `gray`
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

