# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2026-01-04

### Fixed
- **Critical:** Fixed hover and pseudo-class styles not being applied. Multiple pseudo-classes (`:hover`, `:active`, `:focus`, etc.) were being concatenated and inserted as a single invalid CSS rule, causing them to fail silently. Each pseudo-class rule is now inserted individually, ensuring proper hover effects and state changes on components.

## [2.0.0] - 2026-01-04

### 🚨 Breaking Changes

Aurora v2 is a **major simplification** focused on flexibility and reduced bundle size. See the [Migration Guide](#migration-guide-v1-to-v2) below for detailed instructions.

#### 1. Removed Pre-built Theme Palettes

**Removed exports:**
- ❌ `indigoPalette`, `bluePalette`, `rosePalette`, `emeraldPalette`, `tealPalette`, `violetPalette`, `amberPalette`, `cyanPalette`, `slatePalette`, `grayPalette`
- ❌ `indigoDarkPalette`, `blueDarkPalette`, etc. (all dark variants)
- ❌ `defaultDarkTheme`

**Why?** These 10+ pre-built palettes added significant bundle weight. Most users only need 1-2 themes, so we moved this responsibility to user-land for better tree-shaking.

#### 2. Color Scales Import Restriction

**Changed:**
```tsx
// ❌ v1 - Direct imports (removed)
import { indigo, blue, slate } from '@aurora-ds/theme'

// ✅ v2 - Only via colors object
import { colors } from '@aurora-ds/theme'
colors.indigo[500]
colors.blue[600]
```

**Why?** Better tree-shaking and prevents accidental bundle bloat.

#### 3. Removed WCAG Contrast Utilities

**Removed exports:**
- ❌ `getContrastRatio(fg, bg)`
- ❌ `meetsWCAG(fg, bg, level)`
- ❌ `checkContrast(fg, bg)`
- ❌ `checkThemeContrast(theme)`
- ❌ `suggestContrastColor(fg, bg)`

**Why?** These utilities are better served by dedicated accessibility tools and static analysis. Removed to reduce bundle size.

#### 4. Simplified Color Tokens

**Removed tokens from `BaseColors`:**

| Category | Removed Tokens |
|----------|----------------|
| **Accent** | `accent`, `onAccent`, `accentHover`, `accentActive`, `accentSubtle` |
| **Tertiary** | `tertiary`, `onTertiary`, `tertiaryHover`, `tertiaryActive`, `tertiarySubtle`, `tertiaryDisabled` |
| **Surface** | `elevated`, `overlay` |
| **Text** | `textInverse` |
| **Border** | `borderHover`, `borderFocus`, `borderSubtle` |
| **Success** | `onSuccess`, `successHover` |
| **Warning** | `onWarning`, `warningHover` |
| **Info** | `onInfo`, `infoHover` |
| **Interactive** | `linkVisited`, `linkDisabled`, `focus` |

**Token count: 83 → 33 (60% reduction)**

**Why?** Most applications don't need this many color variations. This reduces decision fatigue and bundle size. You can still add custom tokens via theme extensions.

### Changed

- **Default Neutral** - Now uses `slate` instead of `gray` for better visual hierarchy
- **Optimized Exports** - Better tree-shaking support across all modules

### Performance

- 📦 **~40% smaller bundle** - Removed unused palettes and utilities
- ⚡ **Better tree-shaking** - Centralized color imports
- 🎯 **Focused API** - Fewer decisions, clearer patterns

---

## Migration Guide: v1 to v2

### Quick Summary

1. ✅ Replace removed color tokens with custom extensions
2. ✅ Update color scale imports to use `colors` object
3. ✅ Remove palette imports (or create them yourself)
4. ✅ Replace contrast utilities with static analysis tools
5. ✅ Test your theme thoroughly

---

### 1. Removed Color Tokens

#### Accent Colors (Removed)

```tsx
// ❌ v1
theme.colors.accent
theme.colors.onAccent
theme.colors.accentHover
theme.colors.accentActive
theme.colors.accentSubtle

// ✅ v2 - Use primary or create custom token
theme.colors.primary        // Use existing primary
// OR extend theme:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    accent: colors.cyan[500],
    accentHover: colors.cyan[600],
  }
})
```

#### Tertiary Colors (Removed)

```tsx
// ❌ v1
theme.colors.tertiary
theme.colors.onTertiary
theme.colors.tertiaryHover
theme.colors.tertiaryActive
theme.colors.tertiarySubtle
theme.colors.tertiaryDisabled

// ✅ v2 - Use secondary or extend theme
theme.colors.secondary      // Use existing secondary
// OR extend:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    tertiary: colors.violet[500],
    tertiaryHover: colors.violet[600],
  }
})
```

#### Surface Tokens (Removed)

```tsx
// ❌ v1
theme.colors.elevated
theme.colors.overlay

// ✅ v2 - Use existing or add custom
theme.colors.surface         // Use for elevated surfaces
theme.colors.surfaceHover    // Use for slight elevation
// OR extend:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    elevated: colors.slate[100],
    overlay: 'rgba(0, 0, 0, 0.5)',
  }
})
```

#### Border Tokens (Removed)

```tsx
// ❌ v1
theme.colors.borderHover
theme.colors.borderFocus
theme.colors.borderSubtle

// ✅ v2 - Use border or extend
theme.colors.border          // Single border token
// OR extend:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    borderHover: colors.slate[400],
    borderFocus: colors.indigo[500],
    borderSubtle: colors.slate[200],
  }
})
```

#### Text Tokens (Removed)

```tsx
// ❌ v1
theme.colors.textInverse

// ✅ v2 - Use onPrimary or extend
theme.colors.onPrimary       // White text on dark backgrounds
// OR extend:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    textInverse: colors.white,
  }
})
```

#### Success/Warning/Info Tokens (Removed)

```tsx
// ❌ v1
theme.colors.onSuccess
theme.colors.successHover
theme.colors.onWarning
theme.colors.warningHover
theme.colors.onInfo
theme.colors.infoHover

// ✅ v2 - Use existing or extend
theme.colors.success         // Main semantic color
theme.colors.successSubtle   // Subtle variant
// OR extend for more control:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    onSuccess: colors.white,
    successHover: colors.green[700],
    // ... etc
  }
})
```

#### Interactive Tokens (Removed)

```tsx
// ❌ v1
theme.colors.linkVisited
theme.colors.linkDisabled  
theme.colors.focus

// ✅ v2 - Use existing or extend
theme.colors.link
theme.colors.linkHover
theme.colors.linkActive
theme.colors.disabled        // For disabled states
// OR extend:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    linkVisited: colors.violet[600],
    focusRing: colors.indigo[500],
  }
})
```

---

### 2. Color Scale Imports

```tsx
// ❌ v1 - Direct imports no longer work
import { indigo, blue, slate } from '@aurora-ds/theme'
const primary = indigo[500]

// ✅ v2 - Import via colors object
import { colors } from '@aurora-ds/theme'
const primary = colors.indigo[500]
const secondary = colors.blue[600]
const neutral = colors.slate[700]

// Special colors still available
colors.white
colors.black
colors.transparent
colors.current
```

---

### 3. Pre-built Palettes (Removed)

```tsx
// ❌ v1 - Pre-built palettes removed
import { 
  indigoPalette, 
  bluePalette, 
  defaultDarkTheme 
} from '@aurora-ds/theme'

// ✅ v2 - Build your own (gives you full control!)
import { colors, createTheme, defaultTheme } from '@aurora-ds/theme'

// Light theme (example)
const myLightTheme = createTheme(defaultTheme, {
  colors: {
    // Primary
    primary: colors.indigo[600],
    primaryHover: colors.indigo[700],
    primaryActive: colors.indigo[800],
    primarySubtle: colors.indigo[50],
    primaryDisabled: colors.indigo[300],
    onPrimary: colors.white,
    
    // Secondary
    secondary: colors.slate[600],
    secondaryHover: colors.slate[700],
    secondaryActive: colors.slate[800],
    secondarySubtle: colors.slate[100],
    secondaryDisabled: colors.slate[300],
    onSecondary: colors.white,
    
    // Surfaces
    background: colors.white,
    surface: colors.slate[50],
    surfaceHover: colors.slate[100],
    surfaceActive: colors.slate[200],
    
    // Text
    text: colors.slate[900],
    textSecondary: colors.slate[600],
    textTertiary: colors.slate[500],
    
    // Border
    border: colors.slate[200],
    
    // Disabled
    disabled: colors.slate[300],
    disabledText: colors.slate[400],
    
    // Semantic
    success: colors.green[600],
    successSubtle: colors.green[50],
    warning: colors.amber[500],
    warningSubtle: colors.amber[50],
    error: colors.red[600],
    errorHover: colors.red[700],
    errorSubtle: colors.red[50],
    onError: colors.white,
    info: colors.blue[600],
    infoSubtle: colors.blue[50],
    
    // Interactive
    link: colors.indigo[600],
    linkHover: colors.indigo[700],
    linkActive: colors.indigo[800],
  }
})

// Dark theme (example)
const myDarkTheme = createTheme(defaultTheme, {
  colors: {
    // Primary
    primary: colors.indigo[400],
    primaryHover: colors.indigo[300],
    primaryActive: colors.indigo[200],
    primarySubtle: colors.indigo[950],
    primaryDisabled: colors.indigo[800],
    onPrimary: colors.slate[950],
    
    // Secondary
    secondary: colors.slate[400],
    secondaryHover: colors.slate[300],
    secondaryActive: colors.slate[200],
    secondarySubtle: colors.slate[900],
    secondaryDisabled: colors.slate[700],
    onSecondary: colors.slate[950],
    
    // Surfaces
    background: colors.slate[950],
    surface: colors.slate[900],
    surfaceHover: colors.slate[800],
    surfaceActive: colors.slate[700],
    
    // Text
    text: colors.slate[50],
    textSecondary: colors.slate[400],
    textTertiary: colors.slate[500],
    
    // Border
    border: colors.slate[700],
    
    // Disabled
    disabled: colors.slate[800],
    disabledText: colors.slate[600],
    
    // Semantic
    success: colors.green[400],
    successSubtle: colors.green[950],
    warning: colors.amber[400],
    warningSubtle: colors.amber[950],
    error: colors.red[400],
    errorHover: colors.red[300],
    errorSubtle: colors.red[950],
    onError: colors.slate[950],
    info: colors.blue[400],
    infoSubtle: colors.blue[950],
    
    // Interactive
    link: colors.indigo[400],
    linkHover: colors.indigo[300],
    linkActive: colors.indigo[200],
  }
})
```

**Tip:** Create a `themes.ts` file in your project to centralize your theme definitions.

---

### 4. WCAG Contrast Utilities (Removed)

```tsx
// ❌ v1 - Contrast utilities removed
import { getContrastRatio, meetsWCAG, checkThemeContrast } from '@aurora-ds/theme'

const ratio = getContrastRatio('#ffffff', '#000000')
const passes = meetsWCAG('#ffffff', '#000000', 'AA')

// ✅ v2 - Use external tools or static analysis
// Option 1: Use a dedicated library
import { contrast } from 'polished' // or 'color2k'
const ratio = contrast('#ffffff', '#000000')

// Option 2: Use static analysis tools
// - axe DevTools (browser extension)
// - pa11y (automated testing)
// - Lighthouse (Chrome DevTools)

// Option 3: Online tools
// - WebAIM Contrast Checker
// - Accessible Colors

// Option 4: Implement your own (if needed)
function getContrastRatio(fg: string, bg: string): number {
  // ... implementation
}
```

---

### 5. Testing Your Migration

#### Automated Checks

```bash
# 1. Type check - will catch removed token usage
npm run typecheck

# 2. Build - ensures no import errors
npm run build

# 3. Run tests
npm run test:run
```

#### Manual Checks

1. **Visual regression** - Compare UI before/after migration
2. **Accessibility audit** - Run Lighthouse/axe DevTools
3. **Color contrast** - Verify all text is readable
4. **Interactive states** - Test hover, focus, active, disabled
5. **Dark mode** - If applicable, test dark theme

#### Common Issues

**Issue: "Property 'accent' does not exist on type 'BaseColors'"**
```tsx
// Fix: Add it to your theme
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    accent: colors.cyan[500],
  }
})
```

**Issue: "Cannot find module 'indigo'"**
```tsx
// Fix: Import via colors object
import { colors } from '@aurora-ds/theme'
const primary = colors.indigo[500]
```

**Issue: "Module 'indigoPalette' has no exported member"**
```tsx
// Fix: Build your own palette (see section 3 above)
```

---

### 6. Benefits of v2

- **Smaller bundle** - Only import what you use
- **More flexible** - Full control over your color tokens
- **Better tree-shaking** - Optimized exports
- **Simpler mental model** - Fewer built-in tokens to remember
- **Future-proof** - Easier to maintain and extend

---

## [1.5.0] - 2025-12-25

### Added

- **Custom Theme Support** - New utilities for creating themes with completely custom color tokens
  - `createCustomTheme<TColors>()` - Create a theme with your own color token structure, without inheriting `BaseColors`
  - `CustomTheme<TColors, ...>` - Type for fully customizable themes
  - `CustomThemeBase<TColors>` - Base type for custom themes with user-defined colors
  
- **Replace Mode for createTheme** - New option to replace entire token categories instead of deep merging
  - `createTheme(base, overrides, { mode: 'replace' })` - Replaces specified categories completely
  - Default behavior (`mode: 'merge'`) unchanged - still deep merges overrides

- **Pre-typed createStyles Factory** - Eliminate repetitive type annotations
  - `createTypedStyles<TTheme>()` - Create a pre-typed `createStyles` function for your custom theme
  - Use once, then call `createStyles()` everywhere without specifying the type
  
- **New Types**
  - `CreateThemeOptions` - Options for `createTheme` function
  - `CreateCustomThemeOptions` - Options for custom theme creation

### Usage Examples

```typescript
// 1. Replace mode - replace entire color category
const myTheme = createTheme(defaultTheme, {
    colors: {
        brand: '#007bff',
        surface: '#ffffff',
        text: '#000000',
    },
}, { mode: 'replace' })
// Result: Only brand, surface, text exist (no primary, secondary, etc.)

// 2. Custom theme - define your own color tokens with full type safety
type MyColors = {
    brand: string
    brandHover: string
    surface: string
    textPrimary: string
}

const customTheme = createCustomTheme<MyColors>({
    colors: {
        brand: '#007bff',
        brandHover: '#0056b3',
        surface: '#ffffff',
        textPrimary: '#212529',
    },
    // Other tokens use defaults (spacing, radius, etc.)
})

// TypeScript knows your theme structure:
customTheme.colors.brand      // ✅ OK
customTheme.colors.primary    // ❌ Error - doesn't exist

// 3. Pre-typed createStyles - no more <MyTheme> everywhere!
type MyTheme = typeof customTheme
export const createStyles = createTypedStyles<MyTheme>()

// Now use without type annotation:
const STYLES = createStyles((theme) => ({
    button: {
        backgroundColor: theme.colors.brand,  // ✅ TypeScript knows!
    },
}))
```

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

