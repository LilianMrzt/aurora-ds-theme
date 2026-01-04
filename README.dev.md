# Aurora Theme - Developer Guide

This document contains development notes and guidelines for maintaining the Aurora Theme library.

## Current Version & Branch Status

- **Stable (v1.x):** `master` branch - v1.6.0
- **Next Major (v2.0):** `v2` branch - Breaking changes for simplification

### v2.0 Major Changes (Breaking)

The v2 branch introduces significant simplifications:

1. **Removed Pre-built Palettes** (~40% bundle reduction)
   - Removed 10+ palette exports (`indigoPalette`, `bluePalette`, etc.)
   - Removed `defaultDarkTheme`
   - Users build their own themes for better tree-shaking

2. **Restricted Color Scale Imports** (better tree-shaking)
   - Direct imports removed: `import { indigo } from '@aurora-ds/theme'`
   - Only via colors object: `import { colors } from '@aurora-ds/theme'`

3. **Removed WCAG Contrast Utilities** (bundle size)
   - Removed `getContrastRatio`, `meetsWCAG`, `checkContrast`, etc.
   - Users should use dedicated accessibility tools

4. **Simplified Color Tokens** (60% reduction: 83 → 33 tokens)
   - Removed accent, tertiary, and many state variations
   - Focused on core tokens only
   - Users can extend themes with custom tokens

See [CHANGELOG.md](./CHANGELOG.md#200---2026-01-04) for full migration guide.

---

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 10.9.0
- **React** >= 18.0.0 (peer dependency)

## Project Setup

```bash
# Clone the repository
git clone https://github.com/LilianMrzt/Aurora.git
cd Aurora

# Install dependencies
npm install
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Build in watch mode (development) |
| `build` | `npm run build` | Production build |
| `test` | `npm test` | Run tests in watch mode |
| `test:run` | `npm run test:run` | Run tests once |
| `test:coverage` | `npm run test:coverage` | Tests with coverage report |
| `lint` | `npm run lint` | ESLint check |
| `lint:fix` | `npm run lint:fix` | Auto-fix ESLint issues |
| `typecheck` | `npm run typecheck` | TypeScript check |
| `size` | `npm run size` | Bundle size check |
| `audit` | `npm run audit` | Dependency security audit |
| `audit:fix` | `npm run audit:fix` | Auto-fix vulnerabilities |
| `validate` | `npm run validate` | Lint + TypeCheck + Tests |
| `ci` | `npm run ci` | Full CI pipeline |

---

## Project Structure

```
aurora/
├── src/                       # Source code
│   ├── index.ts              # Main entry point (exports)
│   ├── providers/            # React Context providers
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   ├── types/                # TypeScript types
│   │   ├── colors/           # Color types
│   │   ├── palettes/         # Palette types
│   │   └── theme/            # Theme types
│   └── utils/                # Utilities
│       ├── styles/           # CSS-in-JS style utilities
│       └── theme/            # Theme creation utilities
├── tests/                    # Unit tests
│   ├── setup.ts              # Vitest configuration
│   ├── providers/            # Provider tests
│   └── utils/                # Utility tests
├── dist/                     # Production build (generated)
├── coverage/                 # Coverage report (generated)
├── tsconfig.json             # Main TS config
├── tsconfig.build.json       # Build TS config
├── tsconfig.test.json        # Test TS config
├── tsup.config.ts            # Bundler config
├── vitest.config.ts          # Test config
└── package.json
```

---

## Development

### Start Development Mode

```bash
npm run dev
```

This launches `tsup` in watch mode which automatically recompiles on every change.

### Run Tests

```bash
# Watch mode (development)
npm test

# Single run
npm run test:run

# With coverage
npm run test:coverage
```

### Code Verification

```bash
# Check everything at once
npm run validate

# Or separately
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run test:run    # Tests
```

---

## Build & Publishing

### Production Build

```bash
npm run build
```

The build generates in `dist/`:
- `index.js` - ESM module
- `index.cjs` - CommonJS module
- `index.d.ts` - TypeScript types
- `index.d.cts` - CommonJS types

### Pre-publish Verification

```bash
# Full CI pipeline
npm run ci
```

This command runs:
1. `lint` - Code verification
2. `typecheck` - Type checking
3. `test:run` - Test execution
4. `build` - Production build
5. `size` - Size check (< 10 KB gzipped)
6. `audit` - Security audit

### Publishing to npm

#### For Patch/Minor Releases

```bash
# 1. Update version in package.json
# 2. Move changes from [Unreleased] to new version in CHANGELOG.md
# 3. Commit and tag

npm version patch  # or minor
git push --follow-tags

# 4. Publish
npm publish --access public
```

#### For Major Releases (Breaking Changes)

**Current Version:** v1.6.0 → **v2.0.0** (current branch: `v2`)

Major releases with breaking changes require extra care:

**1. Finalize Breaking Changes**
- Review all changes in `[Unreleased]` section of CHANGELOG.md
- Ensure migration guide is complete and accurate
- Update README.md with migration summary

**2. Update Version**
```bash
npm version major  # 1.6.0 → 2.0.0
```

**3. Documentation Updates**
- Move `[Unreleased]` to `[2.0.0] - YYYY-MM-DD` in CHANGELOG.md
- Ensure migration guide is comprehensive
- Update any affected code examples

**4. Thorough Testing**
```bash
npm run ci              # Full CI pipeline
npm run test:coverage   # Ensure >80% coverage
```

**5. Create Release Branch/PR**
- Title: `Release v2.0.0`
- Include summary of breaking changes
- Link to migration guide
- Get review if working in a team

**6. Merge and Publish**
```bash
# After merge to main:
git checkout main
git pull
git tag -a v2.0.0 -m "Release v2.0.0 - Major simplification"
git push origin v2.0.0
npm publish --access public
```

**7. Post-Release Communication**
- Create GitHub Release with full changelog
- Announce breaking changes in GitHub Discussions
- Update any example repositories
- Consider writing a blog post explaining the changes

> Note: `prepublishOnly` automatically runs `npm run ci` before publishing.

---

## Updating the Library

### Updating Dependencies

```bash
# View available updates
npm outdated

# Update dependencies
npm update

# Or to update to latest major versions
npx npm-check-updates -u
npm install
```

### After an Update

1. **Run full validation:**
   ```bash
   npm run validate
   ```

2. **Check bundle size:**
   ```bash
   npm run size
   ```

3. **Check for vulnerabilities:**
   ```bash
   npm run audit
   ```

---

## Adding a New Feature

### 1. Create Types (if needed)

Add in `src/types/`:

```typescript
// src/types/theme/NewFeature.ts
export interface NewFeature {
    // ...
}
```

Export in `src/types/index.ts`.

### 2. Create the Utility

Add in `src/utils/`:

```typescript
// src/utils/newFeature.ts
export const newFeature = () => {
    // ...
}
```

Export in `src/utils/index.ts` and `src/index.ts`.

### 3. Write Tests

```typescript
// tests/utils/newFeature.test.ts
import { describe, it, expect } from 'vitest'
import { newFeature } from '@/utils/newFeature'

describe('newFeature', () => {
    it('should ...', () => {
        expect(newFeature()).toBe(...)
    })
})
```

### 4. Update Documentation

- Update `README.md` with the public API
- Update `CHANGELOG.md` in the `[Unreleased]` section

---

## Code Conventions

### Commits

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add new color palette
fix: resolve caching issue
docs: update README
test: add unit tests for createTheme
refactor: improve style engine performance
chore: update dependencies
```

### Code Style

- **Indentation**: 4 spaces
- **Quotes**: Single `'`
- **Semicolons**: No
- **Trailing comma**: Yes

ESLint and TypeScript are configured to validate these rules.

### Exports

All public exports must be in `src/index.ts`:

```typescript
// Types
export type { Theme, BaseColors, ... } from './types'

// Providers
export { ThemeProvider, useTheme } from './providers'

// Utils
export { createStyles, createTheme, ... } from './utils'
```

---

## Size Limits

The bundle must stay under **10 KB gzipped** for each format:

```json
"size-limit": [
    { "path": "dist/index.js", "limit": "10 KB", "gzip": true },
    { "path": "dist/index.cjs", "limit": "10 KB", "gzip": true }
]
```

If the limit is exceeded:
- Optimize the code
- Use tree-shaking
- Avoid unnecessary dependencies

---

## Test Coverage

Target: **> 80%** coverage.

Reports are generated in `coverage/`:
- `coverage/index.html` - Interactive HTML report
- `coverage/coverage-final.json` - Raw data

---

## Security

See [SECURITY.md](./SECURITY.md) for:
- Supported versions
- How to report a vulnerability
- Project security practices

### Key Points

- **No `eval()`** or `Function()` constructor
- **CSS sanitization** to prevent injections
- **Regular auditing** of dependencies

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [tsup Documentation](https://tsup.egoist.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)

---

## Contact

For any development questions:
- Email: lilian.marzet@gmail.com
- Issues: [GitHub Issues](https://github.com/LilianMrzt/Aurora/issues)

