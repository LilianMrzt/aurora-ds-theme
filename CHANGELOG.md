# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-12-21

### Added

- **Disabled State Colors** - Added disabled state tokens for primary, secondary and tertiary colors
  - `primaryDisabled` - Disabled state for primary buttons/actions
  - `secondaryDisabled` - Disabled state for secondary buttons/actions
  - `tertiaryDisabled` - Disabled state for tertiary buttons/actions

- **Accent Active State** - Added `accentActive` token for active/pressed state on accent elements

- **Link Active State** - Added `linkActive` token for active/pressed state on links

- **Opacity Tokens** - New `opacity` scale for consistent transparency values
  - `none` (0), `lowest` (0.05), `low` (0.1), `medium` (0.25), `high` (0.5), `higher` (0.75), `full` (1)
  - Accessible via `theme.opacity.medium`, etc.

- **Enhanced Token Scales** - Extended existing token scales with new values:
  - `radius`: Added `2xl` (16px) for larger rounded corners
  - `shadows`: Added `2xl` (large shadow), `inner` (inset shadow), `focus` (focus ring)
  - `lineHeight`: Added `loose` (2) for extra-spaced text
  - `zIndex`: Added `sticky` (1100), `popover` (1500), `toast` (1700)

- **WCAG Contrast Utilities** - New utilities for checking color accessibility
  - `getContrastRatio(fg, bg)` - Calculate contrast ratio between two colors
  - `meetsWCAG(fg, bg, level)` - Check if colors meet WCAG AA/AAA requirements
  - `checkContrast(fg, bg)` - Get detailed contrast information
  - `checkThemeContrast(theme)` - Validate all color pairs in a theme
  - `suggestContrastColor(fg, bg)` - Get a suggested color that meets contrast requirements

### Changed

- **Improved Dark Mode Surface Colors** - Adjusted dark mode surface hierarchy for better visibility
  - `background`: `slate[900]` (was `slate[950]`)
  - `surface`: `slate[800]` (was `slate[900]`)
  - Better contrast between layers

## [1.3.0] - 2025-12-20

### Added

- **Tertiary Colors** - Added tertiary color tokens to all palettes
  - `tertiary` - Tertiary action color
  - `onTertiary` - Text color on tertiary backgrounds
  - `tertiaryHover` - Hover state for tertiary
  - `tertiaryActive` - Active/pressed state for tertiary
  - `tertiarySubtle` - Subtle background variant

- **Harmonious Tertiary Palettes** - Each palette now includes a complementary tertiary color:
  - `indigo` → Purple
  - `blue` → Sky
  - `rose` → Pink
  - `emerald` → Teal
  - `teal` → Cyan
  - `violet` → Purple
  - `amber` → Orange
  - `cyan` → Sky
  - `slate` → Slate (variation)
  - `gray` → Gray (variation)

### Changed

- **Improved Dark Mode Contrast** - Dark mode palettes now use `[400]` shades for primary colors with `[950]` backgrounds for better readability
- **Consistent Semantic Colors** - Unified semantic colors to use `[600]` for light mode and `[400]` for dark mode

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

