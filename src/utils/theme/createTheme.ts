import type { Theme } from '@/types/theme/Theme'

/**
 * Creates a typed theme. Type is inferred from ThemeRegistry.
 */
export const createTheme = <T extends Record<string, unknown>>(
    values: T
): Theme<T> => {
    return values as Theme<T>
}
