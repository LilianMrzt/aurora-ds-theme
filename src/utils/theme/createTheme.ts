import type { Theme } from '@/types/theme/Theme'

/**
 * Creates a typed theme.
 *
 * Pass your theme type as generic parameter to ensure all themes follow the same structure.
 * Use module augmentation to enable autocomplete in createStyles and useTheme.
 *
 * @template T - Theme structure type
 * @param values - Theme values matching the type T
 * @returns Typed theme
 *
 * @example
 * ```typescript
 * // 1. Define your theme type
 * type MyTheme = {
 *   colors: { primary: string; secondary: string }
 *   spacing: { sm: string; md: string }
 * }
 *
 * // 2. Create themes with the same type
 * export const lightTheme = createTheme<MyTheme>({
 *   colors: { primary: '#007bff', secondary: '#6c757d' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * export const darkTheme = createTheme<MyTheme>({
 *   colors: { primary: '#4dabf7', secondary: '#868e96' },
 *   spacing: { sm: '8px', md: '16px' }
 * })
 *
 * // 3. Register type for autocomplete (once)
 * declare module '@aurora-ds/theme' {
 *   interface ThemeRegistry {
 *     theme: MyTheme
 *   }
 * }
 *
 * // 4. Use createStyles with full autocomplete!
 * const useStyles = createStyles((theme) => ({
 *   root: { color: theme.colors.primary }  // ✅ Autocomplete!
 * }))
 * ```
 */
export const createTheme = <T extends Record<string, unknown>>(
    values: T
): Theme<T> => {
    return values as Theme<T>
}
