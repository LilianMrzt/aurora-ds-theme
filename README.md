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

// 2. Create your theme
export const lightTheme = createTheme<MyTheme>({
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

// 3. Module augmentation (required for autocomplete)
declare module '@aurora-ds/theme' {
    interface ThemeRegistry {
        theme: MyTheme
    }
}
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

### `createTheme<T>(values)`

Creates a typed theme.

```typescript
const theme = createTheme<MyTheme>({ ... })
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

Aurora provides **20 color scales** with **12 shades each** (25, 50, 100-900, 950).

```typescript
import { colors } from '@aurora-ds/theme'

colors.indigo[500]  // '#6366f1'
colors.emerald[400] // '#34d399'
colors.gray[900]    // '#18181b'
colors.white        // '#ffffff'
colors.black        // '#000000'
```

### Complete Color Scales Reference

All color scales with their hex values (25-950 shades):

#### Neutrals

| Scale | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **gray** | ![](https://img.shields.io/badge/%20-fcfcfc?style=flat-square) | ![](https://img.shields.io/badge/%20-fafafa?style=flat-square) | ![](https://img.shields.io/badge/%20-f4f4f5?style=flat-square) | ![](https://img.shields.io/badge/%20-e4e4e7?style=flat-square) | ![](https://img.shields.io/badge/%20-d4d4d8?style=flat-square) | ![](https://img.shields.io/badge/%20-a1a1aa?style=flat-square) | ![](https://img.shields.io/badge/%20-71717a?style=flat-square) | ![](https://img.shields.io/badge/%20-52525b?style=flat-square) | ![](https://img.shields.io/badge/%20-3f3f46?style=flat-square) | ![](https://img.shields.io/badge/%20-27272a?style=flat-square) | ![](https://img.shields.io/badge/%20-18181b?style=flat-square) | ![](https://img.shields.io/badge/%20-09090b?style=flat-square) |
| **slate** | ![](https://img.shields.io/badge/%20-fcfcfd?style=flat-square) | ![](https://img.shields.io/badge/%20-f8fafc?style=flat-square) | ![](https://img.shields.io/badge/%20-f1f5f9?style=flat-square) | ![](https://img.shields.io/badge/%20-e2e8f0?style=flat-square) | ![](https://img.shields.io/badge/%20-cbd5e1?style=flat-square) | ![](https://img.shields.io/badge/%20-94a3b8?style=flat-square) | ![](https://img.shields.io/badge/%20-64748b?style=flat-square) | ![](https://img.shields.io/badge/%20-475569?style=flat-square) | ![](https://img.shields.io/badge/%20-334155?style=flat-square) | ![](https://img.shields.io/badge/%20-1e293b?style=flat-square) | ![](https://img.shields.io/badge/%20-0f172a?style=flat-square) | ![](https://img.shields.io/badge/%20-020617?style=flat-square) |
| **stone** | ![](https://img.shields.io/badge/%20-fcfcfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fafaf9?style=flat-square) | ![](https://img.shields.io/badge/%20-f5f5f4?style=flat-square) | ![](https://img.shields.io/badge/%20-e7e5e4?style=flat-square) | ![](https://img.shields.io/badge/%20-d6d3d1?style=flat-square) | ![](https://img.shields.io/badge/%20-a8a29e?style=flat-square) | ![](https://img.shields.io/badge/%20-78716c?style=flat-square) | ![](https://img.shields.io/badge/%20-57534e?style=flat-square) | ![](https://img.shields.io/badge/%20-44403c?style=flat-square) | ![](https://img.shields.io/badge/%20-292524?style=flat-square) | ![](https://img.shields.io/badge/%20-1c1917?style=flat-square) | ![](https://img.shields.io/badge/%20-0c0a09?style=flat-square) |
| **red** | ![](https://img.shields.io/badge/%20-fffbfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fef2f2?style=flat-square) | ![](https://img.shields.io/badge/%20-fee2e2?style=flat-square) | ![](https://img.shields.io/badge/%20-fecaca?style=flat-square) | ![](https://img.shields.io/badge/%20-fca5a5?style=flat-square) | ![](https://img.shields.io/badge/%20-f87171?style=flat-square) | ![](https://img.shields.io/badge/%20-ef4444?style=flat-square) | ![](https://img.shields.io/badge/%20-dc2626?style=flat-square) | ![](https://img.shields.io/badge/%20-b91c1c?style=flat-square) | ![](https://img.shields.io/badge/%20-991b1b?style=flat-square) | ![](https://img.shields.io/badge/%20-7f1d1d?style=flat-square) | ![](https://img.shields.io/badge/%20-450a0a?style=flat-square) |
| **orange** | ![](https://img.shields.io/badge/%20-fffcfa?style=flat-square) | ![](https://img.shields.io/badge/%20-fff7ed?style=flat-square) | ![](https://img.shields.io/badge/%20-ffedd5?style=flat-square) | ![](https://img.shields.io/badge/%20-fed7aa?style=flat-square) | ![](https://img.shields.io/badge/%20-fdba74?style=flat-square) | ![](https://img.shields.io/badge/%20-fb923c?style=flat-square) | ![](https://img.shields.io/badge/%20-f97316?style=flat-square) | ![](https://img.shields.io/badge/%20-ea580c?style=flat-square) | ![](https://img.shields.io/badge/%20-c2410c?style=flat-square) | ![](https://img.shields.io/badge/%20-9a3412?style=flat-square) | ![](https://img.shields.io/badge/%20-7c2d12?style=flat-square) | ![](https://img.shields.io/badge/%20-431407?style=flat-square) |
| **amber** | ![](https://img.shields.io/badge/%20-fffdfb?style=flat-square) | ![](https://img.shields.io/badge/%20-fffbeb?style=flat-square) | ![](https://img.shields.io/badge/%20-fef3c7?style=flat-square) | ![](https://img.shields.io/badge/%20-fde68a?style=flat-square) | ![](https://img.shields.io/badge/%20-fcd34d?style=flat-square) | ![](https://img.shields.io/badge/%20-fbbf24?style=flat-square) | ![](https://img.shields.io/badge/%20-f59e0b?style=flat-square) | ![](https://img.shields.io/badge/%20-d97706?style=flat-square) | ![](https://img.shields.io/badge/%20-b45309?style=flat-square) | ![](https://img.shields.io/badge/%20-92400e?style=flat-square) | ![](https://img.shields.io/badge/%20-78350f?style=flat-square) | ![](https://img.shields.io/badge/%20-451a03?style=flat-square) |
| **yellow** | ![](https://img.shields.io/badge/%20-fefef9?style=flat-square) | ![](https://img.shields.io/badge/%20-fefce8?style=flat-square) | ![](https://img.shields.io/badge/%20-fef9c3?style=flat-square) | ![](https://img.shields.io/badge/%20-fef08a?style=flat-square) | ![](https://img.shields.io/badge/%20-fde047?style=flat-square) | ![](https://img.shields.io/badge/%20-facc15?style=flat-square) | ![](https://img.shields.io/badge/%20-eab308?style=flat-square) | ![](https://img.shields.io/badge/%20-ca8a04?style=flat-square) | ![](https://img.shields.io/badge/%20-a16207?style=flat-square) | ![](https://img.shields.io/badge/%20-854d0e?style=flat-square) | ![](https://img.shields.io/badge/%20-713f12?style=flat-square) | ![](https://img.shields.io/badge/%20-422006?style=flat-square) |
| **lime** | ![](https://img.shields.io/badge/%20-fbfef8?style=flat-square) | ![](https://img.shields.io/badge/%20-f7fee7?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfccb?style=flat-square) | ![](https://img.shields.io/badge/%20-d9f99d?style=flat-square) | ![](https://img.shields.io/badge/%20-bef264?style=flat-square) | ![](https://img.shields.io/badge/%20-a3e635?style=flat-square) | ![](https://img.shields.io/badge/%20-84cc16?style=flat-square) | ![](https://img.shields.io/badge/%20-65a30d?style=flat-square) | ![](https://img.shields.io/badge/%20-4d7c0f?style=flat-square) | ![](https://img.shields.io/badge/%20-3f6212?style=flat-square) | ![](https://img.shields.io/badge/%20-365314?style=flat-square) | ![](https://img.shields.io/badge/%20-1a2e05?style=flat-square) |
| **green** | ![](https://img.shields.io/badge/%20-f6fef9?style=flat-square) | ![](https://img.shields.io/badge/%20-f0fdf4?style=flat-square) | ![](https://img.shields.io/badge/%20-dcfce7?style=flat-square) | ![](https://img.shields.io/badge/%20-bbf7d0?style=flat-square) | ![](https://img.shields.io/badge/%20-86efac?style=flat-square) | ![](https://img.shields.io/badge/%20-4ade80?style=flat-square) | ![](https://img.shields.io/badge/%20-22c55e?style=flat-square) | ![](https://img.shields.io/badge/%20-16a34a?style=flat-square) | ![](https://img.shields.io/badge/%20-15803d?style=flat-square) | ![](https://img.shields.io/badge/%20-166534?style=flat-square) | ![](https://img.shields.io/badge/%20-14532d?style=flat-square) | ![](https://img.shields.io/badge/%20-052e16?style=flat-square) |
| **emerald** | ![](https://img.shields.io/badge/%20-f5fefc?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfdf5?style=flat-square) | ![](https://img.shields.io/badge/%20-d1fae5?style=flat-square) | ![](https://img.shields.io/badge/%20-a7f3d0?style=flat-square) | ![](https://img.shields.io/badge/%20-6ee7b7?style=flat-square) | ![](https://img.shields.io/badge/%20-34d399?style=flat-square) | ![](https://img.shields.io/badge/%20-10b981?style=flat-square) | ![](https://img.shields.io/badge/%20-059669?style=flat-square) | ![](https://img.shields.io/badge/%20-047857?style=flat-square) | ![](https://img.shields.io/badge/%20-065f46?style=flat-square) | ![](https://img.shields.io/badge/%20-064e3b?style=flat-square) | ![](https://img.shields.io/badge/%20-022c22?style=flat-square) |
| **teal** | ![](https://img.shields.io/badge/%20-f4fefe?style=flat-square) | ![](https://img.shields.io/badge/%20-f0fdfa?style=flat-square) | ![](https://img.shields.io/badge/%20-ccfbf1?style=flat-square) | ![](https://img.shields.io/badge/%20-99f6e4?style=flat-square) | ![](https://img.shields.io/badge/%20-5eead4?style=flat-square) | ![](https://img.shields.io/badge/%20-2dd4bf?style=flat-square) | ![](https://img.shields.io/badge/%20-14b8a6?style=flat-square) | ![](https://img.shields.io/badge/%20-0d9488?style=flat-square) | ![](https://img.shields.io/badge/%20-0f766e?style=flat-square) | ![](https://img.shields.io/badge/%20-115e59?style=flat-square) | ![](https://img.shields.io/badge/%20-134e4a?style=flat-square) | ![](https://img.shields.io/badge/%20-042f2e?style=flat-square) |
| **cyan** | ![](https://img.shields.io/badge/%20-f3fefe?style=flat-square) | ![](https://img.shields.io/badge/%20-ecfeff?style=flat-square) | ![](https://img.shields.io/badge/%20-cffafe?style=flat-square) | ![](https://img.shields.io/badge/%20-a5f3fc?style=flat-square) | ![](https://img.shields.io/badge/%20-67e8f9?style=flat-square) | ![](https://img.shields.io/badge/%20-22d3ee?style=flat-square) | ![](https://img.shields.io/badge/%20-06b6d4?style=flat-square) | ![](https://img.shields.io/badge/%20-0891b2?style=flat-square) | ![](https://img.shields.io/badge/%20-0e7490?style=flat-square) | ![](https://img.shields.io/badge/%20-155e75?style=flat-square) | ![](https://img.shields.io/badge/%20-164e63?style=flat-square) | ![](https://img.shields.io/badge/%20-083344?style=flat-square) |
| **sky** | ![](https://img.shields.io/badge/%20-f5faff?style=flat-square) | ![](https://img.shields.io/badge/%20-f0f9ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e0f2fe?style=flat-square) | ![](https://img.shields.io/badge/%20-bae6fd?style=flat-square) | ![](https://img.shields.io/badge/%20-7dd3fc?style=flat-square) | ![](https://img.shields.io/badge/%20-38bdf8?style=flat-square) | ![](https://img.shields.io/badge/%20-0ea5e9?style=flat-square) | ![](https://img.shields.io/badge/%20-0284c7?style=flat-square) | ![](https://img.shields.io/badge/%20-0369a1?style=flat-square) | ![](https://img.shields.io/badge/%20-075985?style=flat-square) | ![](https://img.shields.io/badge/%20-0c4a6e?style=flat-square) | ![](https://img.shields.io/badge/%20-082f49?style=flat-square) |
| **blue** | ![](https://img.shields.io/badge/%20-f5f8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-eff6ff?style=flat-square) | ![](https://img.shields.io/badge/%20-dbeafe?style=flat-square) | ![](https://img.shields.io/badge/%20-bfdbfe?style=flat-square) | ![](https://img.shields.io/badge/%20-93c5fd?style=flat-square) | ![](https://img.shields.io/badge/%20-60a5fa?style=flat-square) | ![](https://img.shields.io/badge/%20-3b82f6?style=flat-square) | ![](https://img.shields.io/badge/%20-2563eb?style=flat-square) | ![](https://img.shields.io/badge/%20-1d4ed8?style=flat-square) | ![](https://img.shields.io/badge/%20-1e40af?style=flat-square) | ![](https://img.shields.io/badge/%20-1e3a8a?style=flat-square) | ![](https://img.shields.io/badge/%20-172554?style=flat-square) |
| **indigo** | ![](https://img.shields.io/badge/%20-f5f7ff?style=flat-square) | ![](https://img.shields.io/badge/%20-eef2ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e0e7ff?style=flat-square) | ![](https://img.shields.io/badge/%20-c7d2fe?style=flat-square) | ![](https://img.shields.io/badge/%20-a5b4fc?style=flat-square) | ![](https://img.shields.io/badge/%20-818cf8?style=flat-square) | ![](https://img.shields.io/badge/%20-6366f1?style=flat-square) | ![](https://img.shields.io/badge/%20-4f46e5?style=flat-square) | ![](https://img.shields.io/badge/%20-4338ca?style=flat-square) | ![](https://img.shields.io/badge/%20-3730a3?style=flat-square) | ![](https://img.shields.io/badge/%20-312e81?style=flat-square) | ![](https://img.shields.io/badge/%20-1e1b4b?style=flat-square) |
| **violet** | ![](https://img.shields.io/badge/%20-f8f5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f5f3ff?style=flat-square) | ![](https://img.shields.io/badge/%20-ede9fe?style=flat-square) | ![](https://img.shields.io/badge/%20-ddd6fe?style=flat-square) | ![](https://img.shields.io/badge/%20-c4b5fd?style=flat-square) | ![](https://img.shields.io/badge/%20-a78bfa?style=flat-square) | ![](https://img.shields.io/badge/%20-8b5cf6?style=flat-square) | ![](https://img.shields.io/badge/%20-7c3aed?style=flat-square) | ![](https://img.shields.io/badge/%20-6d28d9?style=flat-square) | ![](https://img.shields.io/badge/%20-5b21b6?style=flat-square) | ![](https://img.shields.io/badge/%20-4c1d95?style=flat-square) | ![](https://img.shields.io/badge/%20-2e1065?style=flat-square) |
| **purple** | ![](https://img.shields.io/badge/%20-faf5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-faf5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f3e8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-e9d5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-d8b4fe?style=flat-square) | ![](https://img.shields.io/badge/%20-c084fc?style=flat-square) | ![](https://img.shields.io/badge/%20-a855f7?style=flat-square) | ![](https://img.shields.io/badge/%20-9333ea?style=flat-square) | ![](https://img.shields.io/badge/%20-7e22ce?style=flat-square) | ![](https://img.shields.io/badge/%20-6b21a8?style=flat-square) | ![](https://img.shields.io/badge/%20-581c87?style=flat-square) | ![](https://img.shields.io/badge/%20-3b0764?style=flat-square) |
| **fuchsia** | ![](https://img.shields.io/badge/%20-fef5ff?style=flat-square) | ![](https://img.shields.io/badge/%20-fdf4ff?style=flat-square) | ![](https://img.shields.io/badge/%20-fae8ff?style=flat-square) | ![](https://img.shields.io/badge/%20-f5d0fe?style=flat-square) | ![](https://img.shields.io/badge/%20-f0abfc?style=flat-square) | ![](https://img.shields.io/badge/%20-e879f9?style=flat-square) | ![](https://img.shields.io/badge/%20-d946ef?style=flat-square) | ![](https://img.shields.io/badge/%20-c026d3?style=flat-square) | ![](https://img.shields.io/badge/%20-a21caf?style=flat-square) | ![](https://img.shields.io/badge/%20-86198f?style=flat-square) | ![](https://img.shields.io/badge/%20-701a75?style=flat-square) | ![](https://img.shields.io/badge/%20-4a044e?style=flat-square) |
| **pink** | ![](https://img.shields.io/badge/%20-fef5f9?style=flat-square) | ![](https://img.shields.io/badge/%20-fdf2f8?style=flat-square) | ![](https://img.shields.io/badge/%20-fce7f3?style=flat-square) | ![](https://img.shields.io/badge/%20-fbcfe8?style=flat-square) | ![](https://img.shields.io/badge/%20-f9a8d4?style=flat-square) | ![](https://img.shields.io/badge/%20-f472b6?style=flat-square) | ![](https://img.shields.io/badge/%20-ec4899?style=flat-square) | ![](https://img.shields.io/badge/%20-db2777?style=flat-square) | ![](https://img.shields.io/badge/%20-be185d?style=flat-square) | ![](https://img.shields.io/badge/%20-9d174d?style=flat-square) | ![](https://img.shields.io/badge/%20-831843?style=flat-square) | ![](https://img.shields.io/badge/%20-500724?style=flat-square) |
| **rose** | ![](https://img.shields.io/badge/%20-fff5f6?style=flat-square) | ![](https://img.shields.io/badge/%20-fff1f2?style=flat-square) | ![](https://img.shields.io/badge/%20-ffe4e6?style=flat-square) | ![](https://img.shields.io/badge/%20-fecdd3?style=flat-square) | ![](https://img.shields.io/badge/%20-fda4af?style=flat-square) | ![](https://img.shields.io/badge/%20-fb7185?style=flat-square) | ![](https://img.shields.io/badge/%20-f43f5e?style=flat-square) | ![](https://img.shields.io/badge/%20-e11d48?style=flat-square) | ![](https://img.shields.io/badge/%20-be123c?style=flat-square) | ![](https://img.shields.io/badge/%20-9f1239?style=flat-square) | ![](https://img.shields.io/badge/%20-881337?style=flat-square) | ![](https://img.shields.io/badge/%20-4c0519?style=flat-square) |

```
const theme = createTheme<MyTheme>({
    colors: {
        primary: colors.indigo[500],
        primaryHover: colors.indigo[600],
        background: colors.white,
        text: colors.gray[900],
    },
    // ...
})
```
---

## License

MIT
