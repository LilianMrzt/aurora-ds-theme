/**
 * Represents an Aurora DS theme.
 *
 * Fully generic type based on the user-defined structure via `defineTheme`.
 * No predefined structure - you define all categories and tokens.
 *
 * @template T - Theme structure defined by the user
 *
 * @example
 * ```typescript
 * const definition = defineTheme({
 *   colors: { primary: null, secondary: null },
 *   spacing: { sm: null, md: null }
 * })
 *
 * const myTheme = createTheme(definition, {
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 * // myTheme has type Theme<{ colors: {...}, spacing: {...} }>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Theme<T = Record<string, any>> = T
