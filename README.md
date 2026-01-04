# Aurora Theme

A performant, type-safe, and **fully customizable** CSS-in-JS theme management library for React applications.

## Features

- 🎨 **Modular Theming** - Customize colors, spacing, or any token independently
- 🎯 **Color Scales** - 20 color scales with 12 shades each (25-950)
- ⚡ **Optimized Performance** - LRU caching, static style deduplication
- 🖥️ **SSR Support** - Server-side rendering compatible
- 📦 **Lightweight** - No runtime dependencies besides React
- 🔒 **Type-safe** - Full TypeScript support with generics
- 🎨 **Ready to Use** - Default palette with semantic color tokens

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
import { colors } from '@aurora-ds/theme'

// Access colors via the colors object
colors.indigo[500]  // '#6366f1'
colors.emerald[400] // '#34d399'
colors.gray[900]    // '#18181b'

// Special values (also via colors)
colors.white        // '#ffffff'
colors.black        // '#000000'
colors.transparent  // 'transparent'
colors.current      // 'currentColor'
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

### Complete Color Scales Reference

All color scales with their hex values (25-950 shades):

#### Neutrals

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **gray** | ![](https://img.shields.io/badge/%20-fcfcfc?style=flat-square) | ![](https://img.shields.io/badge/%20-fafafa?style=flat-square) | ![](https://img.shields.io/badge/%20-f4f4f5?style=flat-square) | ![](https://img.shields.io/badge/%20-e4e4e7?style=flat-square) | ![](https://img.shields.io/badge/%20-d4d4d8?style=flat-square) | ![](https://img.shields.io/badge/%20-a1a1aa?style=flat-square) | ![](https://img.shields.io/badge/%20-71717a?style=flat-square) | ![](https://img.shields.io/badge/%20-52525b?style=flat-square) | ![](https://img.shields.io/badge/%20-3f3f46?style=flat-square) | ![](https://img.shields.io/badge/%20-27272a?style=flat-square) | ![](https://img.shields.io/badge/%20-18181b?style=flat-square) | ![](https://img.shields.io/badge/%20-09090b?style=flat-square) |
| **slate** | ![](https://img.shields.io/badge/%20-fcfcfd?style=flat-square) | ![](https://img.shields.io/badge/%20-f8fafc?style=flat-square) | ![](https://img.shields.io/badge/%20-f1f5f9?style=flat-square) | ![](https://img.shields.io/badge/%20-e2e8f0?style=flat-square) | ![](https://img.shields.io/badge/%20-cbd5e1?style=flat-square) | ![](https://img.shields.io/badge/%20-94a3b8?style=flat-square) | ![](https://img.shields.io/badge/%20-64748b?style=flat-square) | ![](https://img.shields.io/badge/%20-475569?style=flat-square) | ![](https://img.shields.io/badge/%20-334155?style=flat-square) | ![](https://img.shields.io/badge/%20-1e293b?style=flat-square) | ![](https://img.shields.io/badge/%20-0f172a?style=flat-square) | ![](https://img.shields.io/badge/%20-020617?style=flat-square) |
| **stone** | ![](https://img.shields.io/badge/%20-fcfcfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fafaf9?style=flat-square) | ![](https://img.shields.io/badge/%20-f5f5f4?style=flat-square) | ![](https://img.shields.io/badge/%20-e7e5e4?style=flat-square) | ![](https://img.shields.io/badge/%20-d6d3d1?style=flat-square) | ![](https://img.shields.io/badge/%20-a8a29e?style=flat-square) | ![](https://img.shields.io/badge/%20-78716c?style=flat-square) | ![](https://img.shields.io/badge/%20-57534e?style=flat-square) | ![](https://img.shields.io/badge/%20-44403c?style=flat-square) | ![](https://img.shields.io/badge/%20-292524?style=flat-square) | ![](https://img.shields.io/badge/%20-1c1917?style=flat-square) | ![](https://img.shields.io/badge/%20-0c0a09?style=flat-square) |

#### Warm Colors

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **red** | ![](https://img.shields.io/badge/%20-fffbfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fef2f2?style=flat-square) | ![](https://img.shields.io/badge/%20-fee2e2?style=flat-square) | ![](https://img.shields.io/badge/%20-fecaca?style=flat-square) | ![](https://img.shields.io/badge/%20-fca5a5?style=flat-square) | ![](https://img.shields.io/badge/%20-f87171?style=flat-square) | ![](https://img.shields.io/badge/%20-ef4444?style=flat-square) | ![](https://img.shields.io/badge/%20-dc2626?style=flat-square) | ![](https://img.shields.io/badge/%20-b91c1c?style=flat-square) | ![](https://img.shields.io/badge/%20-991b1b?style=flat-square) | ![](https://img.shields.io/badge/%20-7f1d1d?style=flat-square) | ![](https://img.shields.io/badge/%20-450a0a?style=flat-square) |
| **orange** | ![](https://img.shields.io/badge/%20-fffcfa?style=flat-square) | ![](https://img.shields.io/badge/%20-fff7ed?style=flat-square) | ![](https://img.shields.io/badge/%20-ffedd5?style=flat-square) | ![](https://img.shields.io/badge/%20-fed7aa?style=flat-square) | ![](https://img.shields.io/badge/%20-fdba74?style=flat-square) | ![](https://img.shields.io/badge/%20-fb923c?style=flat-square) | ![](https://img.shields.io/badge/%20-f97316?style=flat-square) | ![](https://img.shields.io/badge/%20-ea580c?style=flat-square) | ![](https://img.shields.io/badge/%20-c2410c?style=flat-square) | ![](https://img.shields.io/badge/%20-9a3412?style=flat-square) | ![](https://img.shields.io/badge/%20-7c2d12?style=flat-square) | ![](https://img.shields.io/badge/%20-431407?style=flat-square) |
| **amber** | ![](https://img.shields.io/badge/%20-fffdfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fffbeb?style=flat-square) | ![](https://img.shields.io/badge/%20-fef3c7?style=flat-square) | ![](https://img.shields.io/badge/%20-fde68a?style=flat-square) | ![](https://img.shields.io/badge/%20-fcd34d?style=flat-square) | ![](https://img.shields.io/badge/%20-fbbf24?style=flat-square) | ![](https://img.shields.io/badge/%20-f59e0b?style=flat-square) | ![](https://img.shields.io/badge/%20-d97706?style=flat-square) | ![](https://img.shields.io/badge/%20-b45309?style=flat-square) | ![](https://img.shields.io/badge/%20-92400e?style=flat-square) | ![](https://img.shields.io/badge/%20-78350f?style=flat-square) | ![](https://img.shields.io/badge/%20-451a03?style=flat-square) |
| **yellow** | ![](https://img.shields.io/badge/%20-fefef9?style=flat-square) | ![](https://img.shields.io/badge/%20-fefce8?style=flat-square) | ![](https://img.shields.io/badge/%20-fef9c3?style=flat-square) | ![](https://img.shields.io/badge/%20-fef08a?style=flat-square) | ![](https://img.shields.io/badge/%20-fde047?style=flat-square) | ![](https://img.shields.io/badge/%20-facc15?style=flat-square) | ![](https://img.shields.io/badge/%20-eab308?style=flat-square) | ![](https://img.shields.io/badge/%20-ca8a04?style=flat-square) | ![](https://img.shields.io/badge/%20-a16207?style=flat-square) | ![](https://img.shields.io/badge/%20-854d0e?style=flat-square) | ![](https://img.shields.io/badge/%20-713f12?style=flat-square) | ![](https://img.shields.io/badge/%20-422006?style=flat-square) |

#### Green Colors

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **lime** | ![](https://img.shields.io/badge/%20-fbfef8?style=flat-square) | ![](https://img.shields.io/badge/%20-f7fee7?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfccb?style=flat-square) | ![](https://img.shields.io/badge/%20-d9f99d?style=flat-square) | ![](https://img.shields.io/badge/%20-bef264?style=flat-square) | ![](https://img.shields.io/badge/%20-a3e635?style=flat-square) | ![](https://img.shields.io/badge/%20-84cc16?style=flat-square) | ![](https://img.shields.io/badge/%20-65a30d?style=flat-square) | ![](https://img.shields.io/badge/%20-4d7c0f?style=flat-square) | ![](https://img.shields.io/badge/%20-3f6212?style=flat-square) | ![](https://img.shields.io/badge/%20-365314?style=flat-square) | ![](https://img.shields.io/badge/%20-1a2e05?style=flat-square) |
| **green** | ![](https://img.shields.io/badge/%20-f6fef9?style=flat-square) | ![](https://img.shields.io/badge/%20-f0fdf4?style=flat-square) | ![](https://img.shields.io/badge/%20-dcfce7?style=flat-square) | ![](https://img.shields.io/badge/%20-bbf7d0?style=flat-square) | ![](https://img.shields.io/badge/%20-86efac?style=flat-square) | ![](https://img.shields.io/badge/%20-4ade80?style=flat-square) | ![](https://img.shields.io/badge/%20-22c55e?style=flat-square) | ![](https://img.shields.io/badge/%20-16a34a?style=flat-square) | ![](https://img.shields.io/badge/%20-15803d?style=flat-square) | ![](https://img.shields.io/badge/%20-166534?style=flat-square) | ![](https://img.shields.io/badge/%20-14532d?style=flat-square) | ![](https://img.shields.io/badge/%20-052e16?style=flat-square) |
| **emerald** | ![](https://img.shields.io/badge/%20-f5fefc?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfdf5?style=flat-square) | ![](https://img.shields.io/badge/%20-d1fae5?style=flat-square) | ![](https://img.shields.io/badge/%20-a7f3d0?style=flat-square) | ![](https://img.shields.io/badge/%20-6ee7b7?style=flat-square) | ![](https://img.shields.io/badge/%20-34d399?style=flat-square) | ![](https://img.shields.io/badge/%20-10b981?style=flat-square) | ![](https://img.shields.io/badge/%20-059669?style=flat-square) | ![](https://img.shields.io/badge/%20-047857?style=flat-square) | ![](https://img.shields.io/badge/%20-065f46?style=flat-square) | ![](https://img.shields.io/badge/%20-064e3b?style=flat-square) | ![](https://img.shields.io/badge/%20-022c22?style=flat-square) |
| **teal** | ![](https://img.shields.io/badge/%20-f4fefe?style=flat-square) | ![](https://img.shields.io/badge/%20-f0fdfa?style=flat-square) | ![](https://img.shields.io/badge/%20-ccfbf1?style=flat-square) | ![](https://img.shields.io/badge/%20-99f6e4?style=flat-square) | ![](https://img.shields.io/badge/%20-5eead4?style=flat-square) | ![](https://img.shields.io/badge/%20-2dd4bf?style=flat-square) | ![](https://img.shields.io/badge/%20-14b8a6?style=flat-square) | ![](https://img.shields.io/badge/%20-0d9488?style=flat-square) | ![](https://img.shields.io/badge/%20-0f766e?style=flat-square) | ![](https://img.shields.io/badge/%20-115e59?style=flat-square) | ![](https://img.shields.io/badge/%20-134e4a?style=flat-square) | ![](https://img.shields.io/badge/%20-042f2e?style=flat-square) |

#### Blue Colors

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **cyan** | ![](https://img.shields.io/badge/%20-f3fefe?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfeff?style=flat-square) | ![](https://img.shields.io/badge/%20-cffafe?style=flat-square) | ![](https://img.shields.io/badge/%20-a5f3fc?style=flat-square) | ![](https://img.shields.io/badge/%20-67e8f9?style=flat-square) | ![](https://img.shields.io/badge/%20-22d3ee?style=flat-square) | ![](https://img.shields.io/badge/%20-06b6d4?style=flat-square) | ![](https://img.shields.io/badge/%20-0891b2?style=flat-square) | ![](https://img.shields.io/badge/%20-0e7490?style=flat-square) | ![](https://img.shields.io/badge/%20-155e75?style=flat-square) | ![](https://img.shields.io/badge/%20-164e63?style=flat-square) | ![](https://img.shields.io/badge/%20-083344?style=flat-square) |
| **sky** | ![](https://img.shields.io/badge/%20-f5faff?style=flat-square) | ![](https://img.shields.io/badge/%20-f0f9ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e0f2fe?style=flat-square) | ![](https://img.shields.io/badge/%20-bae6fd?style=flat-square) | ![](https://img.shields.io/badge/%20-7dd3fc?style=flat-square) | ![](https://img.shields.io/badge/%20-38bdf8?style=flat-square) | ![](https://img.shields.io/badge/%20-0ea5e9?style=flat-square) | ![](https://img.shields.io/badge/%20-0284c7?style=flat-square) | ![](https://img.shields.io/badge/%20-0369a1?style=flat-square) | ![](https://img.shields.io/badge/%20-075985?style=flat-square) | ![](https://img.shields.io/badge/%20-0c4a6e?style=flat-square) | ![](https://img.shields.io/badge/%20-082f49?style=flat-square) |
| **blue** | ![](https://img.shields.io/badge/%20-f5f8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-eff6ff?style=flat-square) | ![](https://img.shields.io/badge/%20-dbeafe?style=flat-square) | ![](https://img.shields.io/badge/%20-bfdbfe?style=flat-square) | ![](https://img.shields.io/badge/%20-93c5fd?style=flat-square) | ![](https://img.shields.io/badge/%20-60a5fa?style=flat-square) | ![](https://img.shields.io/badge/%20-3b82f6?style=flat-square) | ![](https://img.shields.io/badge/%20-2563eb?style=flat-square) | ![](https://img.shields.io/badge/%20-1d4ed8?style=flat-square) | ![](https://img.shields.io/badge/%20-1e40af?style=flat-square) | ![](https://img.shields.io/badge/%20-1e3a8a?style=flat-square) | ![](https://img.shields.io/badge/%20-172554?style=flat-square) |
| **indigo** | ![](https://img.shields.io/badge/%20-f5f7ff?style=flat-square) | ![](https://img.shields.io/badge/%20-eef2ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e0e7ff?style=flat-square) | ![](https://img.shields.io/badge/%20-c7d2fe?style=flat-square) | ![](https://img.shields.io/badge/%20-a5b4fc?style=flat-square) | ![](https://img.shields.io/badge/%20-818cf8?style=flat-square) | ![](https://img.shields.io/badge/%20-6366f1?style=flat-square) | ![](https://img.shields.io/badge/%20-4f46e5?style=flat-square) | ![](https://img.shields.io/badge/%20-4338ca?style=flat-square) | ![](https://img.shields.io/badge/%20-3730a3?style=flat-square) | ![](https://img.shields.io/badge/%20-312e81?style=flat-square) | ![](https://img.shields.io/badge/%20-1e1b4b?style=flat-square) |
| **violet** | ![](https://img.shields.io/badge/%20-f8f5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f5f3ff?style=flat-square) | ![](https://img.shields.io/badge/%20-ede9fe?style=flat-square) | ![](https://img.shields.io/badge/%20-ddd6fe?style=flat-square) | ![](https://img.shields.io/badge/%20-c4b5fd?style=flat-square) | ![](https://img.shields.io/badge/%20-a78bfa?style=flat-square) | ![](https://img.shields.io/badge/%20-8b5cf6?style=flat-square) | ![](https://img.shields.io/badge/%20-7c3aed?style=flat-square) | ![](https://img.shields.io/badge/%20-6d28d9?style=flat-square) | ![](https://img.shields.io/badge/%20-5b21b6?style=flat-square) | ![](https://img.shields.io/badge/%20-4c1d95?style=flat-square) | ![](https://img.shields.io/badge/%20-2e1065?style=flat-square) |

#### Purple & Pink Colors

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **purple** | ![](https://img.shields.io/badge/%20-faf5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-faf5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f3e8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e9d5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-d8b4fe?style=flat-square) | ![](https://img.shields.io/badge/%20-c084fc?style=flat-square) | ![](https://img.shields.io/badge/%20-a855f7?style=flat-square) | ![](https://img.shields.io/badge/%20-9333ea?style=flat-square) | ![](https://img.shields.io/badge/%20-7e22ce?style=flat-square) | ![](https://img.shields.io/badge/%20-6b21a8?style=flat-square) | ![](https://img.shields.io/badge/%20-581c87?style=flat-square) | ![](https://img.shields.io/badge/%20-3b0764?style=flat-square) |
| **fuchsia** | ![](https://img.shields.io/badge/%20-fef5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-fdf4ff?style=flat-square) | ![](https://img.shields.io/badge/%20-fae8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f5d0fe?style=flat-square) | ![](https://img.shields.io/badge/%20-f0abfc?style=flat-square) | ![](https://img.shields.io/badge/%20-e879f9?style=flat-square) | ![](https://img.shields.io/badge/%20-d946ef?style=flat-square) | ![](https://img.shields.io/badge/%20-c026d3?style=flat-square) | ![](https://img.shields.io/badge/%20-a21caf?style=flat-square) | ![](https://img.shields.io/badge/%20-86198f?style=flat-square) | ![](https://img.shields.io/badge/%20-701a75?style=flat-square) | ![](https://img.shields.io/badge/%20-4a044e?style=flat-square) |
| **pink** | ![](https://img.shields.io/badge/%20-fef5f9?style=flat-square) | ![](https://img.shields.io/badge/%20-fdf2f8?style=flat-square) | ![](https://img.shields.io/badge/%20-fce7f3?style=flat-square) | ![](https://img.shields.io/badge/%20-fbcfe8?style=flat-square) | ![](https://img.shields.io/badge/%20-f9a8d4?style=flat-square) | ![](https://img.shields.io/badge/%20-f472b6?style=flat-square) | ![](https://img.shields.io/badge/%20-ec4899?style=flat-square) | ![](https://img.shields.io/badge/%20-db2777?style=flat-square) | ![](https://img.shields.io/badge/%20-be185d?style=flat-square) | ![](https://img.shields.io/badge/%20-9d174d?style=flat-square) | ![](https://img.shields.io/badge/%20-831843?style=flat-square) | ![](https://img.shields.io/badge/%20-500724?style=flat-square) |
| **rose** | ![](https://img.shields.io/badge/%20-fff5f6?style=flat-square) | ![](https://img.shields.io/badge/%20-fff1f2?style=flat-square) | ![](https://img.shields.io/badge/%20-ffe4e6?style=flat-square) | ![](https://img.shields.io/badge/%20-fecdd3?style=flat-square) | ![](https://img.shields.io/badge/%20-fda4af?style=flat-square) | ![](https://img.shields.io/badge/%20-fb7185?style=flat-square) | ![](https://img.shields.io/badge/%20-f43f5e?style=flat-square) | ![](https://img.shields.io/badge/%20-e11d48?style=flat-square) | ![](https://img.shields.io/badge/%20-be123c?style=flat-square) | ![](https://img.shields.io/badge/%20-9f1239?style=flat-square) | ![](https://img.shields.io/badge/%20-881337?style=flat-square) | ![](https://img.shields.io/badge/%20-4c0519?style=flat-square) |

---


## Modular Customization

Customize only what you need - colors, spacing, or any individual token.

### Available Presets

```tsx
import {
    // Complete theme
    defaultTheme,
    
    // Individual presets
    defaultPalette,
    defaultSpacing,
    defaultRadius,
    defaultShadows,
    defaultFontSize,
    defaultFontWeight,
    defaultLineHeight,
    defaultZIndex,
    defaultTransition,
    defaultOpacity,
    defaultBreakpoints,
} from '@aurora-ds/theme'
```

### Customize Only Colors

```tsx
import { defaultTheme, defaultPalette, createTheme } from '@aurora-ds/theme'

const myTheme = createTheme(defaultTheme, {
    colors: {
        ...defaultPalette,
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
    colors,
    createTheme,
    defaultTheme,
} from '@aurora-ds/theme'

const myTheme = createTheme(defaultTheme, {
    colors: {
        ...defaultTheme.colors,
        primary: colors.emerald[600],       // Use emerald as primary
        primaryHover: colors.emerald[700],
        primaryActive: colors.emerald[800],
    },
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
| `primary`, `primaryHover`, `primaryActive`, `primarySubtle`, `primaryDisabled`, `onPrimary` | Primary brand color |
| `secondary`, `secondaryHover`, `secondaryActive`, `secondarySubtle`, `secondaryDisabled`, `onSecondary` | Secondary actions |
| `background`, `surface`, `surfaceHover`, `surfaceActive` | Surfaces |
| `text`, `textSecondary`, `textTertiary` | Text hierarchy |
| `border` | Borders |
| `success`, `successSubtle` | Success state |
| `warning`, `warningSubtle` | Warning state |
| `error`, `errorHover`, `errorSubtle`, `onError` | Error state |
| `info`, `infoSubtle` | Info state |
| `link`, `linkHover`, `linkActive`, `linkDisabled` | Links |
| `disabled`, `disabledText` | Disabled states |

### Spacing

```tsx
spacing: {
    none: '0',
    '2xs': '0.125rem',  // 2px
    xs: '0.25rem',      // 4px
    sm: '0.5rem',       // 8px
    md: '1rem',         // 16px
    lg: '1.5rem',       // 24px
    xl: '2rem',         // 32px
    '2xl': '3rem',      // 48px
    '3xl': '4rem',      // 64px
    '4xl': '6rem',      // 96px
    '5xl': '8rem',      // 128px
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
| `breakpoints` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |

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
| `BaseBreakpoints` | Breakpoints token type |
| `ColorScale` | Color scale type (25-950) |
| `ColorName` | Union of color scale names |
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

## Migration Guide (v1 → v2)

Aurora v2 is a **major simplification** focused on flexibility and reduced bundle size. This guide helps you upgrade from v1.x to v2.0.

> 📖 **Full migration guide with all details:** [CHANGELOG.md - Migration Guide](./CHANGELOG.md#migration-guide-v1-to-v2)

### 🚨 Breaking Changes Summary

#### 1. Removed Pre-built Theme Palettes (~40% smaller bundle)

```tsx
// ❌ v1 - Pre-built palettes (removed)
import { indigoPalette, bluePalette, defaultDarkTheme } from '@aurora-ds/theme'

// ✅ v2 - Build your own with full control
import { colors, createTheme, defaultTheme } from '@aurora-ds/theme'

const myTheme = createTheme(defaultTheme, {
  colors: {
    primary: colors.indigo[600],
    primaryHover: colors.indigo[700],
    // ... full control over all tokens
  }
})
```

#### 2. Color Scales Import Restriction

```tsx
// ❌ v1 - Direct imports (removed for better tree-shaking)
import { indigo, blue } from '@aurora-ds/theme'

// ✅ v2 - Import via colors object only
import { colors } from '@aurora-ds/theme'
colors.indigo[500]
colors.blue[600]
```

#### 3. Removed WCAG Contrast Utilities

```tsx
// ❌ v1 - Contrast utilities (removed)
import { getContrastRatio, meetsWCAG } from '@aurora-ds/theme'

// ✅ v2 - Use dedicated accessibility tools
// - polished / color2k (libraries)
// - axe DevTools (browser extension)
// - Lighthouse (Chrome DevTools)
```

#### 4. Simplified Color Tokens (83 → 33 tokens, 60% reduction)

**Removed color tokens:**
- ❌ Accent colors (5 tokens): `accent`, `accentHover`, `accentActive`, `onAccent`, `accentSubtle`
- ❌ Tertiary colors (6 tokens): `tertiary`, `tertiaryHover`, `tertiaryActive`, `onTertiary`, `tertiarySubtle`, `tertiaryDisabled`
- ❌ Extra surface (2): `elevated`, `overlay`
- ❌ Extra text (1): `textInverse`
- ❌ Extra borders (3): `borderHover`, `borderFocus`, `borderSubtle`
- ❌ Extra semantic (6): `onSuccess`, `successHover`, `onWarning`, `warningHover`, `onInfo`, `infoHover`
- ❌ Extra interactive (3): `linkVisited`, `linkDisabled`, `focus`

**Migration:**

```tsx
// ❌ v1
theme.colors.accent
theme.colors.tertiary
theme.colors.elevated

// ✅ v2 - Use existing tokens or extend theme
theme.colors.primary        // Use existing
theme.colors.secondary      // Use existing
theme.colors.surface        // Use existing

// OR extend if needed:
const myTheme = createTheme(defaultTheme, {
  colors: {
    ...defaultTheme.colors,
    accent: colors.cyan[500],
    tertiary: colors.violet[500],
    elevated: colors.slate[100],
  }
})
```

### Quick Migration Steps

1. **Replace color scale imports**
   ```tsx
   // Before: import { indigo } from '@aurora-ds/theme'
   // After:  import { colors } from '@aurora-ds/theme'
   //         colors.indigo[500]
   ```

2. **Replace palette imports** - Build your own theme (see [CHANGELOG](./CHANGELOG.md#3-pre-built-palettes-removed))

3. **Replace removed color tokens** - Use existing tokens or extend theme (see [CHANGELOG](./CHANGELOG.md#1-removed-color-tokens))

4. **Replace contrast utilities** - Use external tools

5. **Test thoroughly**
   ```bash
   npm run typecheck  # Catch type errors
   npm run build      # Ensure no import errors
   npm test           # Run tests
   ```

### Benefits of v2

- 📦 **~40% smaller bundle** - Only include what you use
- 🎯 **More flexible** - Full control over color tokens
- ⚡ **Better tree-shaking** - Optimized exports
- 🧩 **Simpler** - Fewer built-in tokens = less decision fatigue

## License

MIT



