# Aurora Theme - Developer Guide

This document is intended for developers who want to contribute to the Aurora Theme library.

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

```bash
# 1. Update version in package.json
# 2. Update CHANGELOG.md
# 3. Commit and tag

npm version patch  # or minor, major
git push --follow-tags

# 4. Publish
npm publish --access public
```

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

