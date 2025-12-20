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

// Default palette (indigo)
export { indigoLight, indigoDark } from './indigo'

// Color palettes
export { blueLight, blueDark } from './blue'
export { roseLight, roseDark } from './rose'
export { emeraldLight, emeraldDark } from './emerald'
export { tealLight, tealDark } from './teal'
export { violetLight, violetDark } from './violet'
export { amberLight, amberDark } from './amber'
export { cyanLight, cyanDark } from './cyan'

// Neutral palettes
export { slateLight, slateDark } from './slate'
export { grayLight, grayDark } from './gray'

// Import for palettes object
import { amberLight, amberDark } from './amber'
import { blueLight, blueDark } from './blue'
import { cyanLight, cyanDark } from './cyan'
import { emeraldLight, emeraldDark } from './emerald'
import { grayLight, grayDark } from './gray'
import { indigoLight, indigoDark } from './indigo'
import { roseLight, roseDark } from './rose'
import { slateLight, slateDark } from './slate'
import { tealLight, tealDark } from './teal'
import { violetLight, violetDark } from './violet'

/**
 * All available color palettes organized by name
 */
export const palettes = {
    // Default
    indigo: { light: indigoLight, dark: indigoDark },
    // Colors
    blue: { light: blueLight, dark: blueDark },
    rose: { light: roseLight, dark: roseDark },
    emerald: { light: emeraldLight, dark: emeraldDark },
    teal: { light: tealLight, dark: tealDark },
    violet: { light: violetLight, dark: violetDark },
    amber: { light: amberLight, dark: amberDark },
    cyan: { light: cyanLight, dark: cyanDark },
    // Neutrals
    slate: { light: slateLight, dark: slateDark },
    gray: { light: grayLight, dark: grayDark },
} as const

