import type { _InternalTheme } from '@/types/theme/Theme'

/**
 * Creates a typed theme. Type is validated against ThemeRegistry.
 * The theme must match the structure defined in your module augmentation.
 */
export const createTheme = <T extends _InternalTheme>(
    values: T
): T => {
    return values
}
