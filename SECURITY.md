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
3. **Input Sanitization**: CSS values are sanitized to prevent injection
4. **Minimal Dependencies**: Zero runtime dependencies to reduce attack surface
5. **Type Safety**: Full TypeScript coverage prevents many runtime errors

## Security Updates

Security updates will be released as patch versions and announced in the CHANGELOG.

