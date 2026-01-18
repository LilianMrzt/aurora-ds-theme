import type { ThemeDefinition } from '@/types/theme/ThemeDefinition'

/**
 * Helper type to extract object structure by replacing all values with unknown
 */
type ExtractStructure<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
        ? ExtractStructure<T[K]>
        : unknown
}

/**
 * Defines a theme structure (contract).
 *
 * Creates a theme definition describing the expected structure.
 * The definition is then used with `createTheme` to create conforming themes.
 *
 * **Philosophy:**
 * - No predefined structure enforced by the library
 * - You define ALL categories and tokens
 * - Not limited to "colors" and "spacing" - complete freedom
 * - Guarantees consistency across all themes based on the same definition
 *
 * @template T - Theme structure (object with categories and tokens)
 * @param definition - Object defining structure (values are ignored, only keys matter)
 * @returns Typed definition usable with `createTheme`
 *
 * @example
 * ```typescript
 * // Classic structure - null values are just for syntax
 * const themeDefinition = defineTheme({
 *   colors: {
 *     primary: null,
 *     secondary: null,
 *     background: null,
 *   },
 *   spacing: {
 *     sm: null,
 *     md: null,
 *     lg: null,
 *   },
 * })
 * ```
 *
 * @example
 * ```typescript
 * // Custom structure - you can invent your own categories!
 * const themeDefinition = defineTheme({
 *   palette: {
 *     brand: null,
 *     accent: null,
 *   },
 *   typography: {
 *     heading: null,
 *     body: null,
 *   },
 *   animations: {
 *     fast: null,
 *     slow: null,
 *   },
 * })
 * ```
 *
 * @example
 * ```typescript
 * // With independent types (advanced approach)
 * type AppColors = {
 *   primary: string
 *   secondary: string
 *   background: string
 * }
 *
 * type NullableShape<T> = { [K in keyof T]: null }
 *
 * const themeDefinition = defineTheme({
 *   colors: {} as NullableShape<AppColors>,
 * })
 * ```
 */
// eslint-disable-next-line func-style, @typescript-eslint/no-explicit-any
export const defineTheme = <T extends Record<string, any>>(
    definition: T
): ThemeDefinition<ExtractStructure<T>> => {
    // Return a symbol to identify the definition
    // Null values are not used, only the type structure matters
    return definition as unknown as ThemeDefinition<ExtractStructure<T>>
}
