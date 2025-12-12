/**
 * Theme Presets - Ready-to-use color palettes for themes
 *
 * @example
 * ```ts
 * import { palettes, roseLight, createTheme, defaultTheme } from '@aurora-ui/theme'
 *
 * // Use a preset directly
 * const roseTheme = createTheme(defaultTheme, { colors: roseLight })
 *
 * // Or via the palettes object
 * const theme = createTheme(defaultTheme, {
 *     colors: palettes.emerald.light
 * })
 * ```
 */

export { indigoLight, indigoDark } from './indigo'
export { roseLight, roseDark } from './rose'
export { emeraldLight, emeraldDark } from './emerald'
export { violetLight, violetDark } from './violet'
export { amberLight, amberDark } from './amber'
export { cyanLight, cyanDark } from './cyan'
export { slateLight, slateDark } from './slate'
export { grayLight, grayDark } from './gray'

// Import for palettes object
import { amberLight, amberDark } from './amber'
import { cyanLight, cyanDark } from './cyan'
import { emeraldLight, emeraldDark } from './emerald'
import { grayLight, grayDark } from './gray'
import { indigoLight, indigoDark } from './indigo'
import { roseLight, roseDark } from './rose'
import { slateLight, slateDark } from './slate'
import { violetLight, violetDark } from './violet'

/**
 * All available color palettes organized by name
 */
export const palettes = {
    indigo: { light: indigoLight, dark: indigoDark },
    rose: { light: roseLight, dark: roseDark },
    emerald: { light: emeraldLight, dark: emeraldDark },
    violet: { light: violetLight, dark: violetDark },
    amber: { light: amberLight, dark: amberDark },
    cyan: { light: cyanLight, dark: cyanDark },
    slate: { light: slateLight, dark: slateDark },
    gray: { light: grayLight, dark: grayDark },
} as const

