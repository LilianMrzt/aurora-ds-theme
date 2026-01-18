/**
 * Represents a theme definition.
 * The definition describes the expected theme structure (categories and tokens).
 *
 * @template T - Theme structure defined by the user
 *
 * @example
 * ```typescript
 * const definition = defineTheme({
 *   colors: { primary: null, secondary: null },
 *   spacing: { sm: null, md: null }
 * })
 * // definition has type ThemeDefinition<{ colors: {...}, spacing: {...} }>
 * ```
 */
export type ThemeDefinition<T> = T
