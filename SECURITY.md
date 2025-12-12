# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within @aurora-ui/theme, please send an email to lilian.marzet@gmail.com.

All security vulnerabilities will be promptly addressed.

### What to include

- Type of issue (e.g., XSS, injection, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Depending on complexity, typically within 30 days

## Security Best Practices

This library follows these security practices:

1. **Dependency Auditing**: Regular `npm audit` checks
2. **No Dynamic Code Execution**: No use of `eval()` or `Function()` constructor
3. **Input Sanitization**: CSS values are sanitized to prevent injection attacks
4. **Minimal Dependencies**: Zero runtime dependencies to reduce attack surface
5. **Type Safety**: Full TypeScript coverage prevents many runtime errors

### CSS Injection Protection

Aurora automatically sanitizes CSS values to block potentially dangerous patterns:

- `expression()` - IE JavaScript execution
- `javascript:` and `data:text/html` URLs
- `behavior:` - IE HTC file loading
- `-moz-binding` - Firefox XBL loading
- `@import` - External stylesheet loading
- `</style>` - Style context breaking

Blocked values are replaced with `unset` and a warning is logged in development mode.

## Content Security Policy (CSP)

Aurora uses **runtime CSS injection** via `CSSStyleSheet.insertRule()`, which has specific CSP implications.

### CSP Compatibility

| CSP Directive | Aurora Behavior | Compatibility |
|---------------|-----------------|---------------|
| `style-src 'self'` | ❌ Blocked | Not compatible |
| `style-src 'unsafe-inline'` | ✅ Works | Fully compatible |
| `style-src 'nonce-xxx'` | ⚠️ Requires setup | See below |
| No CSP | ✅ Works | Fully compatible |

### Recommended CSP Configuration

#### Option 1: Allow unsafe-inline (Simple)

```
Content-Security-Policy: style-src 'self' 'unsafe-inline';
```

This is the simplest approach but provides less security.

#### Option 2: Use nonce-based CSP (Recommended for SSR)

For server-side rendering, you can use nonce-based CSP:

1. Generate a unique nonce per request on your server
2. Pass the nonce to Aurora's SSR utilities
3. Include the nonce in your CSP header

```tsx
// Server-side
import { getSSRStyleTag } from '@aurora-ui/theme'

const nonce = generateSecureNonce() // Your nonce generation

// Get styles with nonce attribute
const styleTag = getSSRStyleTag().replace(
  '<style id="aurora-styles">',
  `<style id="aurora-styles" nonce="${nonce}">`
)

// Set CSP header
res.setHeader('Content-Security-Policy', `style-src 'self' 'nonce-${nonce}'`)
```

#### Option 3: Use hash-based CSP (Static sites)

For static sites, you can pre-compute style hashes:

```
Content-Security-Policy: style-src 'self' 'sha256-<hash>';
```

### Client-Side Hydration

When using SSR with CSP, Aurora will reuse the existing `<style id="aurora-styles">` tag if present, avoiding CSP violations during hydration.

### Strict CSP Environments

If you require strict CSP without `unsafe-inline`:

1. **Consider pre-extraction**: Extract styles at build time
2. **Use SSR with nonces**: As described above
3. **Evaluate alternatives**: Static CSS extraction tools may be more suitable

### Testing CSP Compatibility

```javascript
// Test your CSP configuration
const testCSP = () => {
  try {
    const style = document.createElement('style')
    document.head.appendChild(style)
    style.sheet?.insertRule('.test { color: red }', 0)
    document.head.removeChild(style)
    console.log('✅ Aurora CSS injection will work')
  } catch (e) {
    console.error('❌ CSP blocks style injection:', e)
  }
}
```

## Security Updates

Security updates will be released as patch versions and announced in the CHANGELOG.

