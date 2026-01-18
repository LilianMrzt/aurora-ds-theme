import type { Theme } from '@/types/theme/Theme'
import type { ThemeDefinition } from '@/types/theme/ThemeDefinition'

/**
 * Helper type to convert definition structure to values structure
 */
type ThemeValues<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
        ? ThemeValues<T[K]>
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          any
}

/**
 * Creates a theme conforming to a theme definition.
 *
 * Validates (at compile-time via TypeScript) that the created theme
 * exactly matches the structure defined by `defineTheme`.
 *
 * **Strict signature:** Requires a definition created with `defineTheme` as first parameter.
 *
 * @template T - Theme structure defined by `defineTheme`
 * @param _definition - Theme definition (created with `defineTheme`) - **REQUIRED**
 * @param values - Concrete values matching the definition
 * @returns Typed theme conforming to the definition
 *
 * @example
 * ```typescript
 * // 1. Define structure with defineTheme (required)
 * const themeDefinition = defineTheme({
 *   colors: {
 *     primary: null,
 *     secondary: null,
 *   },
 *   spacing: {
 *     sm: null,
 *     md: null,
 *   },
 * })
 *
 * // 2. Create conforming theme
 * const myTheme = createTheme(themeDefinition, {
 *   colors: {
 *     primary: '#007bff',
 *     secondary: '#6c757d',
 *   },
 *   spacing: {
 *     sm: '8px',
 *     md: '16px',
 *   },
 * })
 * ```
 *
 * @example
 * ```typescript
 * // Multiple themes with same definition
 * const lightTheme = createTheme(themeDefinition, {
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' },
 * })
 *
 * const darkTheme = createTheme(themeDefinition, {
 *   colors: { primary: '#4dabf7', secondary: '#909296' },
 *   spacing: { sm: '8px', md: '16px' },
 * })
 *
 * // Both themes have the same structure guaranteed by TypeScript
 * ```
 *
 * @throws {TypeError} If a required property is missing (detected at compile-time)
 * @throws {TypeError} If an additional property is added (detected at compile-time)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTheme = <T extends Record<string, any>>(
    // Parameter _definition is used only for TypeScript type inference
    _definition: ThemeDefinition<T>,
    values: ThemeValues<T>
): Theme<ThemeValues<T>> => {
    // TypeScript validation ensures `values` matches the `definition` structure
    // No runtime validation needed - TypeScript does the work at compile-time

    // For now, simply return the values
    // Future enhancements could include:
    // - Generate CSS variables
    // - Validate values at runtime (optional)
    // - Apply transformations

    return values as Theme<ThemeValues<T>>
}
