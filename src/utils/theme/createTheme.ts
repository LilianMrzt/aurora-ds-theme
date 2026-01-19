import type { _InternalTheme } from '@/types/theme/Theme'

/**
 * Creates a typed theme. Type is automatically inferred from ThemeRegistry.
 * The theme must match the structure defined in your module augmentation.
 */
export const createTheme = (
    values: _InternalTheme
): _InternalTheme => {
    return values
}
